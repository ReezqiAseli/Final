<template>
  <div class="page-shell page-bg-controls min-h-screen w-full flex flex-col font-['Finger_Paint'] text-white">
    
    <main class="flex-1 w-full max-w-7xl mx-auto px-6 py-12 flex flex-col items-center gap-8">
      
      <PageWrap class="flex flex-col items-center gap-8 w-full">
        
        <header class="text-center w-full">
          <h1 class="text-5xl md:text-6xl leading-tight m-0">Game Controls</h1>
          <p class="text-lg md:text-xl mt-2 opacity-90">See the control scheme across PC, Console and Mobile</p>
        </header>

        <nav class="flex justify-center w-full">
          <div class="flex flex-wrap justify-center gap-5 bg-black/20 backdrop-blur-sm py-2.5 px-10 rounded-full w-fit mx-auto border border-white/5">
            <FilterButton
              v-for="tab in controlTabs"
              :key="tab.id"
              :label="tab.label"
              :active="activeTab === tab.id"
              size="lg"
              @click="activeTab = tab.id"
            />
          </div>
        </nav>

        <section class="w-full flex justify-center">
          <div class="w-full max-w-[1100px]">
            
            <PageWrap variant="solid" padding="none" class="min-h-[600px] p-6 md:p-[50px]">
              <h2 class="text-4xl mb-6 pb-3 text-center">
                <span class="border-b px-6 border-emerald-500">{{ currentContent.title }}</span>
              </h2>

              <div class="card-body">
                <div class="flex flex-col gap-5">
                  
                  <div 
                    v-for="(section, index) in currentContent.sections" 
                    :key="index" 
                    class="border border-emerald-500 rounded-xl p-3 transition-all duration-200"
                    :class="activePreview === section.heading ? 'bg-gradient-to-b from-white/5 to-transparent' : 'bg-transparent'"
                  >
                    <button 
                      class="w-full flex justify-between items-center text-left bg-transparent border-none text-inherit p-0 cursor-pointer group focus-visible:outline-2 focus-visible:outline-emerald-500 focus-visible:rounded-lg"
                      @click="togglePreview(section.heading)"
                    >
                      <div class="pr-4">
                        <span class="block font-bold text-emerald-500 mb-1.5">{{ section.heading }}</span>
                        <p class="text-lg leading-relaxed text-gray-200">{{ section.text }}</p>
                      </div>
                      <span 
                        class="text-xl text-slate-300 transition-transform duration-200 flex-shrink-0"
                        :class="{ 'rotate-180': activePreview === section.heading }"
                      >⌄</span>
                    </button>

                    <p v-if="section.additionalText" class="mt-4 italic opacity-80 text-gray-300 text-sm">
                      {{ section.additionalText }}
                    </p>
                    
                    <ul v-if="section.subItems" class="list-none pl-5 my-4 space-y-2 text-gray-200">
                      <li v-for="item in section.subItems" :key="item" class="relative before:content-['•'] before:absolute before:-left-4 before:text-emerald-500">
                        {{ item }}
                      </li>
                    </ul>

                    <transition
                      enter-active-class="transition duration-200 ease-out"
                      enter-from-class="opacity-0 -translate-y-2"
                      enter-to-class="opacity-100 translate-y-0"
                      leave-active-class="transition duration-150 ease-in"
                      leave-from-class="opacity-100 translate-y-0"
                      leave-to-class="opacity-0 -translate-y-2"
                    >
                      <div v-if="activePreview === section.heading" class="mt-4 border border-slate-700 rounded-xl p-2.5 bg-[#0b111a]">
                        
                        <video 
                          v-if="section.preview && section.preview.endsWith('.mp4')" 
                          autoplay loop muted playsinline 
                          class="w-full rounded-lg block mt-1.5"
                        >
                          <source :src="section.preview" type="video/mp4" />
                        </video>
                        
                        <img 
                          v-else 
                          :src="section.preview" 
                          :alt="`${section.heading} preview`" 
                          class="w-full rounded-lg object-cover mb-2"
                        />
                      </div>
                    </transition>

                  </div>
                </div>
              </div>
            </PageWrap>

          </div>
        </section>

      </PageWrap>

    </main>
    <Footer/>
  </div>
</template>

<script setup>
import Footer from '@/components/Reusable/Footer.vue';
import FilterButton from '@/components/Reusable/FilterButton.vue';
import PageWrap from '@/components/Reusable/PageWrap.vue';
import { ref, computed } from 'vue';

const activeTab = ref('movement');
const activePreview = ref(null);

const defaultControlPreview = 'https://media1.tenor.com/m/gFWrsd6_SvkAAAAd/jujutsu-kaisen-shenanigans.gif';

const togglePreview = (heading) => {
  activePreview.value = activePreview.value === heading ? null : heading;
};

const controlTabs = [
  { id: 'movement', label: 'Movement' },
  { id: 'combat', label: 'Combat' },
  { id: 'abilities', label: 'Abilities' },
];

const contentData = {
  movement: {
    title: "Movement",
    sections: [
      {
        heading: "Sprinting",
        text: "While sprinting, your character will run faster than normal, and will automatically slide, mantle and vault in order to avoid small obstacles such as debris and ledges. To sprint, press W twice on PC. On other platforms, it is impossible to sprint unless you have Auto-Run on from the in-game Settings (Note that sprinting is only performed when walking forwards).",
        preview: 'https://media1.tenor.com/m/7H4OJzSRpgkAAAAC/rise-kujikawa-yu-narukami.gif',
      },
      {
        heading: "Dashing",
        text: "When using Q on PC, the button with a running figure icon on mobile, △ on Playstation or Y on Xbox, while walking in a certain direction, the player will perform a dash towards their chosen path. There are 3 kinds of dashes, each performed depending on the direction the player is walking, and their current state.",
        preview: defaultControlPreview,
      },
      {
        heading: "Parkour",
        text: "When the player sprints forwards and is met by an obstacle, the parkour mechanic will come into play, causing them to perform an action depending on the wall they're met with in order to not lose momentum:",
        subItems: [
          "Vaulting: For low obstacles such as tables, throwables..",
          "Mantling: For elevated walls and ledges.",
          "Sliding: For obstacles that are raised slightly above the ground, offering a gap.",
        ],
        additionalText: "By holding the jump button (Space on PC, UP Arrow on mobile, X on PlayStation and A on Xbox) and looking sideways against a vertical surface (don't look straight at it or you won't bounce) while moving you towards it, and you will be able to wallclimb 3 times before having to touch the ground again (parkouring also counts touching the ground).",
        preview: defaultControlPreview,
      },
    ],
  },
  combat: {
    title: "Combat",
    sections: [{ heading: "Coming Soon", text: "Combat controls information will be displayed here." }]
  },
  abilities: {
    title: "Abilities",
    sections: [
      { 
        heading: "Moves", 
        text: `Clicking one of the 1, 2, 3, 4 keybinds on PC, pressing a skill box on mobile, using L1, L2, R2, R1 on Playstation or LB, LT, RT, RB on Xbox will activate one of your moves. Moves are skills unique to each character, that allow you to deal damage or counter an attack, and will typically go on cooldown once used. 
        Some moves may have certain requirements to work properly, such as needing a target in sight. The user will perform a "variant" of a move when a certain condition is fulfilled, notably being in the air, pressing the move twice, holding the move's input, and finally using the move after, during or before the activation of another move/special. `,
        preview: 'https://media1.tenor.com/m/7H4OJzSRpgkAAAAC/rise-kujikawa-yu-narukami.gif',
      },
      {
        heading: "Special",
        text: `Specials are considered like an extra move for a certain character with its cooldown being shown under the Awakening Bar to the right, and will sometimes require a portion of it to be used (depending on the character). The player's special is activated by pressing R on PC, the star button icon on mobile, the left directional key on PlayStation, and the D-pad Left on Xbox. 
        Using Limitless on an airborne enemy (e.g Using Limitless on an airborne enemy (e.g. after Lapse Blue) Specials will either function as utility or combat, and can have varying effects depending on how and when they're used (e.g. Honored One's special performs a kick when used on an airborne player).`,
        preview: `https://media1.tenor.com/m/7H4OJzSRpgkAAAAC/rise-kujikawa-yu-narukami.gif`,
      },
    ],
  },
};

const currentContent = computed(() => {
  return contentData[activeTab.value];
});
</script>

<style>
/* Import Font (Global) */
@import url('https://fonts.googleapis.com/css2?family=Finger+Paint&display=swap');
</style>