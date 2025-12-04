<template>
  <div class="min-h-screen flex flex-col font-['Finger_Paint'] text-white bg-[radial-gradient(circle_at_top_left,#005c57_0%,#050a14_40%,#2c3e50_100%)]">
    
    <main class="flex-1 w-full max-w-7xl mx-auto px-5 py-10 flex flex-col items-center box-border">
      
      <div class="text-center mb-8">
        <h1 class="text-5xl md:text-6xl">Characters</h1>
        <p class="text-lg md:text-xl mt-2 opacity-80">See all available Characters in Jujutsu Shenanigans</p>
      </div>

      <div class="flex flex-col items-center gap-5 mb-10 w-full">
        <div class="relative w-full max-w-md">
          <span class="absolute left-4 top-1/2 -translate-y-1/2 opacity-50 text-lg">🔍</span>
          <input 
            type="text" 
            v-model="searchQuery" 
            placeholder="Search Characters..." 
            class="w-full py-3 pl-10 pr-4 rounded-full border border-slate-700 bg-[#050a14] text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
          />
        </div>

        <div class="flex flex-wrap justify-center gap-5 bg-black/20 backdrop-blur-sm py-2.5 px-10 rounded-full border border-white/5">
          <FilterButton
            v-for="filter in filters"
            :key="filter"
            :label="filter"
            :active="activeFilter === filter"
            size="md"
            @click="activeFilter = filter"
          />
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 w-full">
        <div 
          class="group relative bg-[#0d141e] border border-slate-800 rounded-xl p-4 flex flex-col gap-4 cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:border-emerald-500"
          v-for="(char, index) in filteredCharacters"
          :key="index"
          @click="openCharacterModal(char)"
        >
          <div class="w-full aspect-video bg-slate-900 rounded-lg overflow-hidden flex items-center justify-center">
            <div class="w-full h-full flex items-center justify-center transition-colors" :style="{ backgroundColor: char.color + '20' }">
              <img :src="char.image" :alt="`${char.name} portrait`" class="w-full h-full object-cover" />
            </div>
          </div>
          
          <div class="flex flex-col gap-1">
            <h2 class="text-2xl flex items-center gap-2" :style="{ color: char.color }">
              <svg viewBox="0 0 24 24" class="w-3 h-3 fill-current">
                <path d="M12 2L2 22h20L12 2z"/>
              </svg>
              {{ char.name }}
            </h2>
            <p class="text-sm text-slate-400 leading-relaxed">Explore all available characters with unique abilities and playstyles</p>
          </div>
        </div>
      </div>
    </main>

    <div 
      v-if="selectedCharacter" 
      class="fixed inset-0 bg-black/70 flex justify-center items-center p-5 z-50 backdrop-blur-sm"
      @click="closeCharacterModal"
    >
      <div class="bg-[#0b111a] border border-slate-800 rounded-2xl w-full max-w-2xl max-h-[90vh] p-6 md:p-8 relative overflow-y-auto scrollbar-hide" @click.stop>
        <button class="absolute top-3 right-3 text-white text-2xl hover:text-emerald-500 transition-colors" @click="closeCharacterModal">×</button>

        <div class="flex flex-col md:flex-row gap-5 items-start md:items-center mb-6">
          <img :src="selectedCharacter.image" :alt="`${selectedCharacter.name} portrait`" class="w-28 h-28 object-cover rounded-xl border-2 border-slate-800" />
          <div>
            <p class="uppercase tracking-widest text-xs opacity-70 mb-1">{{ selectedCharacter.type }}</p>
            <h2 class="text-3xl md:text-4xl text-white">{{ selectedCharacter.name }}</h2>
          </div>
        </div>

        <div>
          <h3 class="text-xl mb-3">Skill Loadout</h3>
          
          <div class="flex gap-2 mb-4 overflow-x-auto pb-2">
            <button
              v-for="category in skillCategories"
              :key="category.key"
              :class="[
                'flex-1 border py-2 px-3 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-200',
                activeSkillCategory === category.key 
                  ? 'bg-emerald-500 text-slate-900 border-emerald-500' 
                  : 'bg-transparent text-slate-300 border-slate-700 hover:border-slate-500'
              ]"
              @click="setSkillCategory(category.key)"
            >
              {{ category.label }}
            </button>
          </div>

          <ul class="space-y-3">
            <li 
              v-for="skill in currentSkills" 
              :key="skill.name"
              class="bg-slate-900 border border-slate-800 rounded-xl p-3 md:p-4"
            >
              <button class="w-full flex justify-between items-center text-left group" @click="toggleSkill(skill.name)">
                <div class="pr-4">
                  <span class="inline-block font-bold text-emerald-500 mb-1">{{ skill.name }}</span>
                  <p class="text-slate-300 text-sm leading-relaxed">{{ skill.desc }}</p>
                </div>
                <span 
                  class="text-xl text-slate-300 transition-transform duration-200"
                  :class="{ 'rotate-180': activeSkill === skill.name }"
                >⌄</span>
              </button>
              
              <transition
                enter-active-class="transition duration-200 ease-out"
                enter-from-class="opacity-0 -translate-y-2"
                enter-to-class="opacity-100 translate-y-0"
                leave-active-class="transition duration-150 ease-in"
                leave-from-class="opacity-100 translate-y-0"
                leave-to-class="opacity-0 -translate-y-2"
              >
                <div v-if="activeSkill === skill.name" class="mt-4 border border-slate-700 rounded-xl p-2 bg-[#0b111a]">
                  <video 
                    v-if="skill.preview.endsWith('.mp4')"
                    autoplay loop muted playsinline 
                    class="w-full rounded-lg object-cover"
                  >
                    <source :src="skill.preview" type="video/mp4"/>
                  </video>
                  <img v-else :src="skill.preview" :alt="skill.name" class="w-full rounded-lg object-cover" />
                </div>
              </transition>
            </li>
            
            <li v-if="!currentSkills.length" class="p-5 text-center text-slate-500 border border-dashed border-slate-700 rounded-xl italic">
              Belum ada skill di kategori ini.
            </li>
          </ul>
        </div>
      </div>
    </div>

    <Footer />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import Footer from '@/components/Reusable/Footer.vue';
import FilterButton from '@/components/Reusable/FilterButton.vue';
import gojoImg from '@/assets/img/Gojo.png';
import yujiImg from '@/assets/img/Yuji.png';
import megumiImg from '@/assets/img/Megumi.png';
import hakariImg from '@/assets/img/Hakari.png';
import todoImg from '@/assets/img/Todo.png';
import yutaImg from '@/assets/img/Yuta.png';
import mechamaruImg from '@/assets/img/Mechamaru.png';
import chosoImg from '@/assets/img/Choso.png';
import mahitoImg from '@/assets/img/Mahito.png';
import captionGifs from '@/assets/img/gifs/caption.gif';
import LapseBlueGif from '@/assets/img/gifs/LapseBlue25.gif';

const searchQuery = ref('');
const activeFilter = ref('All');
const selectedCharacter = ref(null);
const activeSkill = ref(null);
const activeSkillCategory = ref('base');
const skillCategories = [
  { key: 'base', label: 'Base Skills' },
  { key: 'awakening', label: 'Awakening' },
  { key: 'special', label: 'Special' },
];

const defaultSkillPreview = 'https://media1.tenor.com/m/gFWrsd6_SvkAAAAd/jujutsu-kaisen-shenanigans.gif';

const filters = ['All', 'Completed', 'Early Access', 'Base Only', 'Overpowered', 'Developer'];

const characters = [
  {
    name: 'Honored One',
    type: 'Base',
    color: '#3498db',
    image: gojoImg,
    skillSets: {
      base: [
        { name: 'Lapse Blue', desc: 'he user attracts the opponent towards them, then suspends them in place to kick them skyward. Youre able to follow up with the special immediately after the kick to deal additional damage.', preview: LapseBlueGif },
        { name: 'Reversal: Red', desc: 'Explosive repulsion burst that deletes anything caught in the blast radius.', preview: captionGifs },
        { name: 'Hollow Purple', desc: 'Combines Blue and Red into an unstoppable beam that pierces the entire arena.' },
      ],
      awakening: [
        { name: 'Limitless Singularity', desc: 'Freeze time in a micro singularity, dealing true damage over time.' },
        { name: "Six Eyes Overclock", desc: 'Massively reduces cursed technique cooldowns for a short burst.' },
      ],
      special: [
        { name: 'Unlimited Void', desc: 'Domain expansion that overwhelms senses, stunning foes on entry.' },
        { name: 'Reverse Curse Surge', desc: 'Instant full heal plus damage buff using reverse cursed energy.' },
      ],
    },
  },
  {
    name: 'Perfection',
    type: 'Base',
    color: '#9b59b6',
    image: mahitoImg,
    skillSets: {
      base: [
        { name: 'Idle Transfiguration', desc: 'Shapes a target’s soul to mutate their body, dealing burst damage.' },
        { name: 'Body Swap', desc: 'Quickly distort your own form to dodge and counter with a follow-up strike.' },
        { name: 'Self-Embodiment of Perfection', desc: 'Awakens domain for rapid slashes inside an inescapable sphere.' },
      ],
      awakening: [
        { name: 'Soul Multiplicity', desc: 'Split clones from distorted souls that divebomb enemies.' },
        { name: 'Instant Transfiguration', desc: 'Rapid-fire soul strikes that detonate in succession.' },
      ],
      special: [
        { name: "Domain: Self-Embodiment", desc: 'Trap foes in a soul-grinding arena with unavoidable hits.' },
        { name: 'Patchwork Overload', desc: 'Augment allies or self with twisted buffs for brief bursts.' },
      ],
    },
  },
  {
    name: 'Vessel',
    type: 'Base',
    color: '#e74c3c',
    image: yujiImg,
    skillSets: {
      base: [
        { name: 'Divergent Fist', desc: 'Two-step punch where the delayed cursed energy hits harder than the first impact.' },
        { name: 'Black Flash', desc: '0.000001 second cursed energy lag that quadruples strike damage.' },
        { name: 'Sukuna Surge', desc: 'Borrow the King of Curses’ power for a short flurry of cleaving attacks.' },
      ],
      awakening: [
        { name: 'Malevolent Shrine Echo', desc: 'Briefly channel Sukuna’s domain for radial cleaves.' },
        { name: 'Raging Vessel', desc: 'Gain lifesteal and armor break on combo finishers.' },
      ],
      special: [
        { name: 'King’s Command', desc: 'Invoke Sukuna to issue shockwave slashes in a cone.' },
        { name: 'Binding Oath: Control', desc: 'Risk HP to temporarily access cursed finger techniques.' },
      ],
    },
  },
  {
    name: 'Ten Shadows',
    type: 'Base',
    color: '#2ecc71',
    image: megumiImg,
    skillSets: {
      base: [
        { name: 'Divine Dogs', desc: 'Summon twin hounds that track and maul the target relentlessly.' },
        { name: 'Max Elephant', desc: 'Call a massive shikigami that flattens opponents with a water cannon.' },
        { name: 'Chimera Shadow Garden', desc: 'Flood the map with shadows to freely reposition and ambush enemies.' },
      ],
      awakening: [
        { name: 'Mahoraga Call', desc: 'Spin the wheel to adapt and negate the next incoming attack.' },
        { name: 'Shadow Doppelganger', desc: 'Create a mirror clone that repeats your last input.' },
      ],
      special: [
        { name: 'Eight-Handled Blade', desc: 'Briefly wield Mahoraga’s gear for devastating cleaves.' },
        { name: 'Shadow Arsenal', desc: 'Cycle through stored shikigami weapons for varied combos.' },
      ],
    },
  },
  {
    name: 'Restless Gambler',
    type: 'Early Access',
    color: '#2ecc71',
    image: hakariImg,
    skillSets: {
      base: [
        { name: 'Idle Death Gamble', desc: 'Spin Hakari’s jackpot reel for random buffs and cursed energy regen.' },
        { name: 'Theme Music Buff', desc: 'Hitting the bonus grants temporary immortality and endless CE.' },
        { name: 'Domain Expansion: Private Pure Love Train', desc: 'Locks foes in a cinematic beatdown when jackpot is active.' },
      ],
      awakening: [
        { name: 'Jackpot Loop', desc: 'Instantly reroll the slot machine up to three times.' },
        { name: 'Infinite Beatdown', desc: 'Lock an enemy in a rhythm minigame to shred their HP.' },
      ],
      special: [
        { name: 'VIP Backstage', desc: 'Teleport behind targets while granting team-wide CE regen.' },
        { name: 'Encore Finale', desc: 'Massive finisher that scales with remaining jackpot timer.' },
      ],
    },
  },
  {
    name: 'Switcher',
    type: 'Completed',
    color: '#e67e22',
    image: todoImg,
    skillSets: {
      base: [
        { name: 'Boogie Woogie', desc: 'Swap places with any target you clap at, confusing combos and positioning.' },
        { name: 'Heavy Slam', desc: 'Follow up swaps with crushing elbows and knees that break guard.' },
        { name: 'Brother’s Rally', desc: 'Call Yuji for tandem strikes that extend every launcher.' },
      ],
      awakening: [
        { name: 'Unstoppable Clap', desc: 'Boogie Woogie cooldown resets instantly for a short time.' },
        { name: 'Gorilla Mode', desc: 'Gain hyper armor and empowered grapples after each swap.' },
      ],
      special: [
        { name: 'Chain Swap', desc: 'Swap multiple enemies sequentially to break formations.' },
        { name: 'Best Friend Assist', desc: 'Summon an NPC ally for combo extensions after claps.' },
      ],
    },
  },
  {
    name: 'Defense Attorney',
    type: 'Base',
    color: '#f1c40f',
    image: yutaImg,
    skillSets: {
      base: [
        { name: 'Copy Technique', desc: 'Mimic an ally’s skill for one cast, adapting to any matchup.' },
        { name: 'Rika Guard', desc: 'Manifest Rika to shield and counter-grab over-aggressive foes.' },
        { name: 'Pure Love Katana', desc: 'Channel Rika into the blade for a decisive, armor-breaking finisher.' },
      ],
      awakening: [
        { name: 'Manifest Rika', desc: 'Full manifestation fights by your side, doubling your output.' },
        { name: 'Love Overflow', desc: 'Gain continuous cursed energy regen and upgraded copies.' },
      ],
      special: [
        { name: 'Judgment Chain', desc: 'Bind enemies with spirit threads that explode after a delay.' },
        { name: 'Oathseeker', desc: 'Place a binding vow on opponents, lowering their damage if broken.' },
      ],
    },
  },
  {
    name: 'Puppet Master',
    type: 'Completed',
    color: '#e74c3c',
    image: mechamaruImg,
    skillSets: {
      base: [
        { name: 'Simple Domain', desc: 'Deploy a compact barrier that nullifies enemy domains briefly.' },
        { name: 'Execution Slash', desc: 'Dash forward with a cursed katana swing that crits silenced enemies.' },
        { name: 'Blade Recall', desc: 'Throw your sword and snap it back to reposition while dealing chip damage.' },
      ],
      awakening: [
        { name: 'Mecha Barrage', desc: 'Summon artillery drones that pepper the arena.' },
        { name: 'Puppet Override', desc: 'Hijack an enemy input for one second, interrupting combos.' },
      ],
      special: [
        { name: 'Total Puppet Form', desc: 'Transform into a giant mech for a short destructive rampage.' },
        { name: 'Control Seal', desc: 'Tag an enemy with a seal that reflects the next projectile.' },
      ],
    },
  },
  {
    name: 'Blood Manipulator',
    type: 'Completed',
    color: '#c0392b',
    image: chosoImg,
    skillSets: {
      base: [
        { name: 'Convergence', desc: 'Condense blood bullets for sniper-like precision hits.' },
        { name: 'Supernova', desc: 'Orbiting plasma droplets explode on command for AoE control.' },
        { name: 'Slicing Exorcism', desc: 'Unleash a spiraling slash that shreds anything too close.' },
      ],
      awakening: [
        { name: 'Flowing Red Scale', desc: 'Accelerate blood flow to boost movement and damage.' },
        { name: 'Piercing Bloodstorm', desc: 'Channel a continuous beam that can bend mid-flight.' },
      ],
      special: [
        { name: 'Crimson Armor', desc: 'Harden blood around your body, granting damage reduction.' },
        { name: 'Death Painting Pact', desc: 'Buff nearby allies from the same clan with bonus lifesteal.' },
      ],
    },
  },
];

characters.forEach(char => {
  const sets = char.skillSets ?? { base: [], awakening: [], special: [] };
  if (!sets.special) sets.special = [];
  Object.keys(sets).forEach(key => {
    sets[key] = sets[key].map(skill => ({
      preview: skill.preview ?? defaultSkillPreview,
      ...skill,
    }));
  });
  char.skillSets = sets;
});

// Logic Filtering
const filteredCharacters = computed(() => {
  return characters.filter(char => {
    const matchesSearch = char.name.toLowerCase().includes(searchQuery.value.toLowerCase());
    const matchesFilter = activeFilter.value === 'All' || 
                          (activeFilter.value === 'Base Only' && char.type === 'Base') ||
                          (activeFilter.value === 'Completed' && char.type === 'Completed') ||
                          (activeFilter.value === 'Early Access' && char.type === 'Early Access');

    return matchesSearch && matchesFilter;
  });
});

const openCharacterModal = (character) => {
  selectedCharacter.value = character;
  activeSkillCategory.value = 'base';
  activeSkill.value = null;
};

const closeCharacterModal = () => {
  selectedCharacter.value = null;
  activeSkill.value = null;
};

const toggleSkill = (skillName) => {
  activeSkill.value = activeSkill.value === skillName ? null : skillName;
};

const setSkillCategory = (categoryKey) => {
  if (activeSkillCategory.value === categoryKey) return;
  activeSkillCategory.value = categoryKey;
  activeSkill.value = null;
};

const currentSkills = computed(() => {
  if (!selectedCharacter.value) return [];
  const sets = selectedCharacter.value.skillSets ?? {};
  return sets[activeSkillCategory.value] ?? [];
});
</script>

<style>
/* Hanya untuk import font, sisa styling sudah pindah ke kelas Tailwind di template */
@import url('https://fonts.googleapis.com/css2?family=Finger+Paint&display=swap');
</style>