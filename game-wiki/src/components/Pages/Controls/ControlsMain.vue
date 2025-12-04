<template>
  <div class="min-h-screen w-full flex flex-col font-['Finger_Paint'] text-white bg-[radial-gradient(circle_at_top_left,#005c57_0%,#050a14_40%,#2c3e50_100%)]">
    
    <main class="flex-1 w-full max-w-[1400px] mx-auto pt-[100px] px-5 pb-10 flex flex-col items-center gap-5">
      
      <header class="text-center mb-5">
        <h1 class="text-5xl md:text-6xl leading-tight">Game Controls</h1>
        <p class="text-lg md:text-xl mt-2 opacity-90">See the control scheme across PC, Console and Mobile</p>
      </header>

      <nav class="flex justify-center w-full mb-5">
        <div class="flex flex-wrap justify-center gap-5 bg-black/20 backdrop-blur-sm py-2.5 px-10 rounded-full border border-white/5">
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
          
          <article class="min-h-[600px] bg-[linear-gradient(127deg,rgba(3,7,18,0.95)_0%,rgba(20,47,120,0.95)_100%)] border-2 border-[#00bba6]/20 rounded-[20px] p-6 md:p-[50px]">
            <h2 class="text-3xl md:text-4xl mt-0 mb-8 pb-5 text-center border-b border-white/10">{{ currentContent.title }}</h2>

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
          </article>
        </div>
      </section>

    </main>
    <Footer/>
  </div>
</template>

<script setup>
import Footer from '@/components/Reusable/Footer.vue';
import FilterButton from '@/components/Reusable/FilterButton.vue';
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

// Data Konten
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
        preview: 'https://media1.tenor.com/m/7H4OJzSRpgkAAAAC/rise-kujikawa-yu-narukami.gif',
      },
    ],
  },
  combat: {
    title: "Combat",
    sections: [{ heading: "Coming Soon", text: "Combat controls information will be displayed here." }]
  },
  abilities: {
    title: "Abilities",
    sections: [{ heading: "Coming Soon", text: "Abilities controls information will be displayed here." }]
  }
};

const currentContent = computed(() => {
  return contentData[activeTab.value];
});
</script>

<style>
/* Import Font (Global) */
@import url('https://fonts.googleapis.com/css2?family=Finger+Paint&display=swap');
</style>