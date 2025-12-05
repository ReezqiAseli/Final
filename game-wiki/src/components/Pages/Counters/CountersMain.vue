<template>
  <div class="page-shell page-bg-counters min-h-screen flex justify-center text-white font-sans">
    
    <main class="w-full max-w-7xl py-20 px-5 flex flex-col items-center">
      <article class="w-full bg-slate-900/80 border-2 border-emerald-500 rounded-[20px] p-6 md:p-10 flex flex-col items-center gap-10">
        <header class="text-center w-full">
          <h1 class="font-['Finger_Paint'] text-5xl md:text-6xl m-0">Counter Guide</h1>
          <p class="text-lg md:text-xl opacity-80 mt-2">Learn the best responses to every cursed technique</p>
        </header>

        <section class="text-center w-full">
          <h3 class="font-['Finger_Paint'] text-xl text-[#00bba6] mb-5">Select Your Character:</h3>
          
          <div class="flex justify-center w-full">
            <div class="flex flex-wrap justify-center gap-5 bg-black/20 backdrop-blur-sm py-2.5 px-10 rounded-full border border-white/5">
              <FilterButton
                v-for="char in characters"
                :key="char.id"
                size="lg"
                :active="selectedChar.id === char.id"
                @click="selectedChar = char"
                :title="char.name"
              >
                <span class="font-['Finger_Paint'] text-base">
                  {{ char.name }}
                </span>
              </FilterButton>
            </div>
            </div>
        </section>

        <div class="py-2 px-8 border-b border-emerald-500 w-full text-center">
          <span class="font-['Finger_Paint'] text-2xl text-gray-200">Playing as {{ selectedChar.name }}</span>
        </div>

        <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          <div 
            v-for="(matchup, index) in currentMatchups" 
            :key="index" 
            class="bg-[#0d141e]/80 border border-slate-700 rounded-xl p-6 transition-colors duration-200 hover:border-[#00bba6]"
          >
            <div class="flex items-center gap-4 mb-4 border-b border-white/5 pb-4">
              <div class="w-12 h-12 rounded-full flex items-center justify-center overflow-hidden shrink-0" :style="{ backgroundColor: matchup.color }">
                <img :src="matchup.img" :alt="matchup.name + ' icon'" class="w-full h-full object-cover" />
              </div>
              
              <div class="flex flex-col items-start">
                <h4 class="font-['Finger_Paint'] text-lg mb-1">VS. {{ matchup.name }}</h4>
                
                <span 
                  class="text-xs font-bold uppercase px-3 py-1 rounded-full"
                  :class="{
                    'bg-emerald-500/20 text-emerald-500': matchup.difficulty === 'Easy',
                    'bg-yellow-500/20 text-yellow-500': matchup.difficulty === 'Medium',
                    'bg-red-500/20 text-red-500': matchup.difficulty === 'Hard'
                  }"
                >
                  {{ matchup.difficulty }}
                </span>
              </div>
            </div>
            
            <div>
              <p class="text-slate-400 leading-relaxed text-base">{{ matchup.tip }}</p>
            </div>
          </div>

          <div v-if="currentMatchups.length === 0" class="col-span-full text-center py-10 text-slate-500 italic">
            <p>Select a character to see counter strategies.</p>
          </div>
        </section>
      </article>
    </main>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import FilterButton from '@/components/Reusable/FilterButton.vue';
import gojoImg from '@/assets/img/Gojo.png';
import yujiImg from '@/assets/img/Yuji.png';
import hakariImg from '@/assets/img/Hakari.png';
import mahitoImg from '@/assets/img/Mahito.png';
import todoImg from '@/assets/img/Todo.png';
import megumiImg from '@/assets/img/Megumi.png';

// --- Data Karakter ---
const characters = [
  { id: 'honored', name: 'Honored One', img: gojoImg },
  { id: 'vessel', name: 'Vessel', img: yujiImg },
  { id: 'gambler', name: 'Restless Gambler', img: hakariImg },
  { id: 'perfection', name: 'Perfection', img: mahitoImg },
  { id: 'switcher', name: 'Switcher', img: todoImg },
  { id: 'megumi', name: 'Megumi', img: megumiImg },
];

const selectedChar = ref(characters[0]);

const matchupDatabase = {
  honored: [
    { name: 'Vessel', color: '#e74c3c', img: yujiImg, difficulty: 'Easy', tip: 'Keep your distance using Blue. If they try to dash in, use Red to repel them. Your infinity blocks their basic punches.' },
    { name: 'Perfection', color: '#9b59b6', img: mahitoImg, difficulty: 'Hard', tip: 'Watch out for their domain expansion. It disables your Infinity. Teleport constantly to avoid getting cornered.' },
    { name: 'Restless Gambler', color: '#2ecc71', img: hakariImg, difficulty: 'Medium', tip: 'If they hit Jackpot, do NOT engage. Run away until their immortality music stops.' },
  ],
  vessel: [
    { name: 'Honored One', color: '#3498db', img: gojoImg, difficulty: 'Hard', tip: 'You cannot hit him normally. Wait for his cooldowns or try to catch him mid-animation with Black Flash.' },
    { name: 'Switcher', color: '#e67e22', img: todoImg, difficulty: 'Easy', tip: 'Predict the clap swap. Charge your Manji Kick and release it immediately after he swaps places with you.' },
  ],
};

const currentMatchups = computed(() => {
  return matchupDatabase[selectedChar.value.id] || [];
});
</script>

<style>
/* Import Font Global */
@import url('https://fonts.googleapis.com/css2?family=Finger+Paint&family=Nunito:wght@400;700&display=swap');
</style>