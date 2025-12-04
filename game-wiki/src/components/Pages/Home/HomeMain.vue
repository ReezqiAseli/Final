<template>
  <div class="min-h-screen flex flex-col font-['Finger_Paint'] text-white bg-[radial-gradient(circle_at_top_left,#005c57_0%,#050a14_40%,#2c3e50_100%)]">
    
    <main class="flex-1 flex flex-col items-center px-[10%] py-5">
      
      <div class="text-center mb-[50px]">
        <h1 class="text-[2.5rem] md:text-[4rem] m-0">
          Jujutsu Shenanigans
        </h1>
        <p class="text-2xl md:text-[1.5rem] mt-2.5 opacity-80">
          Guide or Something IDK
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-5 w-full max-w-[1000px] mb-10">
        <div 
          class="group flex items-center gap-5 bg-[#0d141e]/80 border border-[#1f2f3f] rounded-[15px] p-5 transition-transform duration-200 hover:-translate-y-1.5 hover:border-[#00b894] cursor-default"
          v-for="(item, index) in cards" 
          :key="index"
        >
          <div class="w-20 h-20 rounded-[10px] overflow-hidden flex-shrink-0">
            <img :src="item.icon" :alt="`${item.title} icon`" class="w-full h-full object-cover block" />
          </div>
          
          <div>
            <h2 class="text-[2rem] mb-1.5">{{ item.title }}</h2>
            <p class="text-sm opacity-70 leading-snug">{{ item.desc }}</p>
          </div>
        </div>
      </div>

      <div class="w-full max-w-[1000px] bg-gradient-to-r from-[#0f2040] to-[#2c3e60] p-10 rounded-[15px] text-center mb-[50px] border border-[#3e5e80]">
        <h2 class="text-[2rem] m-0">ts game so peak go play it</h2>
      </div>

    </main>

    <Footer/>
  </div>
</template>

<script setup>
import gojoImg from '@/assets/img/Gojo.png';
import yujiImg from '@/assets/img/Yuji.png';
import sukunaImg from '@/assets/img/Sukuna.png';
import yutaImg from '@/assets/img/Yuta.png';
import Footer from '@/components/Reusable/Footer.vue';

const cards = [
  { title: 'Characters', desc: 'Explore all available characters with unique abilities and playstyles', icon: gojoImg },
  { title: 'Controls', desc: 'Master every keybind and combo to stay ahead in battle', icon: yujiImg },
  { title: 'Counters', desc: 'Learn the best responses to every cursed technique you face', icon: sukunaImg },
  { title: 'Store', desc: 'Stay up to date on the latest in-game drops and bundles', icon: yutaImg },
];
</script>

<style>
/* Kita tetap perlu import font karena Tailwind tidak otomatis mengunduh font Google */
@import url('https://fonts.googleapis.com/css2?family=Finger+Paint&display=swap');
</style>