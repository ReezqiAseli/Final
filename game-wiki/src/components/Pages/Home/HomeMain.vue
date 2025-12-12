<template>
  <div class="page-shell page-bg-home min-h-screen flex flex-col font-['Finger_Paint'] text-white">
    
    <main class="flex-1 w-full max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12 flex flex-col items-center gap-6 md:gap-8">
      <PageWrap class="w-full max-w-[1100px] min-h-[600px] flex flex-col items-center gap-6 md:gap-8">
        <div class="text-center">
          <h1 class="text-4xl md:text-5xl lg:text-6xl m-0">
            Jujutsu Shenanigans
          </h1>
          <p class="text-base md:text-lg lg:text-xl mt-2.5 opacity-80">
            Guide or Something IDK
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 w-full">
          <router-link
            class="group flex items-center gap-4 md:gap-5 bg-[#0d141e]/80 border border-[#1f2f3f] rounded-[15px] p-4 md:p-5 transition-transform duration-200 hover:-translate-y-1.5 hover:border-[#00b894] cursor-default"
            v-for="(item, index) in cards" 
            :key="index"
            :to="item.path"
          >
            <div class="w-16 h-16 md:w-20 md:h-20 rounded-[10px] overflow-hidden flex-shrink-0">
              <img :src="item.icon" :alt="`${item.title} icon`" class="w-full h-full object-cover block" />
            </div>
            
            <div>
              <h2 class="text-2xl md:text-3xl mb-1.5">{{ item.title }}</h2>
              <p class="text-xs md:text-sm opacity-70 leading-snug">{{ item.desc }}</p>
            </div>
          </router-link>
        </div>

        <div class="w-full bg-gradient-to-r from-[#0f2040] to-[#2c3e60] p-6 md:p-10 rounded-[15px] text-center border border-[#3e5e80]">
          <h2 class="text-xl md:text-3xl m-0">ts game so peak go play it</h2>
        </div>
      </PageWrap>
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
import PageWrap from '@/components/Reusable/PageWrap.vue';

const cards = [
  { title: 'Characters', desc: 'Explore all available characters with unique abilities and playstyles', icon: gojoImg, path: "/Characters" },
  { title: 'Controls', desc: 'Master every keybind and combo to stay ahead in battle', icon: yujiImg, path: "/Controls" },
  { title: 'Counters', desc: 'Learn the best responses to every cursed technique you face', icon: sukunaImg, path: "/Counters" },
  { title: 'Store', desc: 'Stay up to date on the latest in-game drops and bundles', icon: yutaImg, path: "/Store" },
];
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Finger+Paint&display=swap');
</style>