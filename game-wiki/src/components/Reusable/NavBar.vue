<template>
  <nav class="sticky top-0 z-50 w-full flex justify-between items-center px-6 md:px-[50px] py-5 font-['Finger_Paint'] bg-[#050f1f] shadow-md">
    
    <div class="flex-shrink-0">
      <img src="@/assets/img/Miwa.png" alt="Logo" class="w-[50px] h-[50px] bg-black rounded-lg object-cover" />
    </div>

    <div class="flex gap-5 overflow-x-auto">
      <router-link 
        v-for="link in links" 
        :key="link.name"
        :to="link.path"
        class="px-5 py-2 rounded-[20px] text-[1.1rem] transition-all duration-300 whitespace-nowrap"
        :class="[
          route.name === link.name 
            ? 'bg-[#00b894] text-black' 
            : 'text-white hover:text-[#00b894]'
        ]"
      >
        {{ link.name }}
      </router-link>
    </div>
  </nav>
</template>

<script setup>
import { useRoute } from 'vue-router';

const route = useRoute();

const links = [
  { name: 'Home', path: '/' },
  { name: 'Characters', path: '/characters' },
  { name: 'Controls', path: '/controls' },
  { name: 'Counters', path: '/counters' },
  { name: 'Store', path: '/store' },
];
</script>

<style>
/* Font import tetap diperlukan */
@import url('https://fonts.googleapis.com/css2?family=Finger+Paint&display=swap');
</style>