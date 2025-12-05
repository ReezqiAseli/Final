<template>
  <footer class="w-full p-5 flex justify-center bg-[#050f1f]">
    <div class="flex gap-5">
      
      <div class="w-16 h-16 p-[1px] flex justify-center items-center rounded-[20%] bg-[#23272a] cursor-pointer hover:scale-105 transition-transform duration-200">
        <img :src="discordIcon" alt="Discord" class="w-full h-full object-cover rounded-[20%]" />
      </div>

      <div class="w-16 h-16 p-[1px] flex justify-center items-center rounded-[20%] bg-[#23272a] cursor-pointer hover:scale-105 transition-transform duration-200">
        <img :src="robloxIcon" alt="Roblox" class="w-full h-full object-cover rounded-[20%]" />
      </div>

    </div>
  </footer>
</template>

<script setup>
import discordIcon from '@/assets/img/discord.png';
import robloxIcon from '@/assets/img/roblox.png';
</script>