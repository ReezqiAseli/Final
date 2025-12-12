<template>
  <nav class="sticky top-0 z-50 w-full flex flex-wrap justify-between items-center px-4 md:px-[50px] py-4 md:py-5 font-['Finger_Paint'] bg-[#050f1f] shadow-md">
    
    <div class="flex items-center gap-3 md:gap-4 flex-shrink-0 cursor-pointer" @click="$router.push({ name: 'Home' })">
      <img src="@/assets/img/Miwa.png" alt="Logo" class="w-[40px] h-[40px] md:w-[50px] md:h-[50px] bg-black rounded-lg object-cover" />
      
      <span class="text-lg md:text-2xl text-white hover:text-[#00bba6] transition-colors">
        Jujutsu Shenanigans
      </span>
    </div>

    <button 
      class="md:hidden text-white p-2 focus:outline-none" 
      @click="toggleMenu"
      aria-label="Toggle menu"
    >
      <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path v-if="!isMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
        <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
      </svg>
    </button>

    <div 
      class="w-full md:w-auto md:flex md:items-center md:gap-5 transition-all duration-300 ease-in-out overflow-hidden md:overflow-visible"
      :class="[isMenuOpen ? 'max-h-[400px] opacity-100 mt-4 pb-4 border-t border-white/10 pt-4' : 'max-h-0 opacity-0 md:max-h-full md:opacity-100 md:mt-0 md:pb-0 md:border-none md:pt-0']"
    >
      <div class="flex flex-col md:flex-row gap-2 md:gap-5">
        <router-link 
          v-for="link in links" 
          :key="link.name"
          :to="link.path"
          class="px-5 py-2 rounded-[20px] text-[1.1rem] transition-all duration-300 whitespace-nowrap text-center md:text-left"
          :class="[
            route.name === link.name 
              ? 'bg-[#00b894] text-black' 
              : 'text-white hover:text-[#00b894]'
          ]"
          @click="isMenuOpen = false"
        >
          {{ link.name }}
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const isMenuOpen = ref(false);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const links = [
  { name: 'Home', path: '/' },
  { name: 'Characters', path: '/characters' },
  { name: 'Controls', path: '/controls' },
  { name: 'Counters', path: '/counters' },
  { name: 'Store', path: '/store' },
  { name: 'About', path: '/about'}
];
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Finger+Paint&display=swap');
</style>