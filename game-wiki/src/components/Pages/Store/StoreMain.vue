<template>
  <div class="page-shell page-bg-store min-h-screen flex justify-center text-white font-['Finger_Paint']">
    
    <main class="w-full max-w-[1200px] pt-[100px] px-5 pb-10 flex flex-col items-center">
      <article class="w-full bg-slate-900/80 border-2 border-emerald-500 rounded-[20px] p-6 md:p-10 flex flex-col items-center gap-8">
        <header class="text-center">
          <h1 class="text-[2.5rem] md:text-[4rem] leading-tight m-0">Store</h1>
          <p class="text-xl md:text-[1.2rem] mt-2.5 opacity-90">See the goods you can spend your money on this game</p>
        </header>

        <nav class="flex justify-center w-full">
          <div class="flex flex-wrap justify-center gap-[15px] bg-black/20 py-[15px] px-[30px] rounded-[40px]">
            <FilterButton
              v-for="tab in tabItems"
              :key="tab.id"
              :label="tab.label"
              :active="activeTab === tab.id"
              size="lg"
              @click="activeTab = tab.id"
            />
          </div>
        </nav>

        <section class="w-full flex justify-center">
          
          <article 
            v-if="activeTab === 'shop'" 
            class="w-full max-w-[1000px] bg-[linear-gradient(127deg,rgba(3,7,18,0.95)_0%,rgba(20,47,120,0.95)_100%)] border border-[#00bba6]/30 rounded-[20px] p-5 md:p-10"
          >
            <div class="text-center border-b border-white/10 mb-[30px] pb-5">
              <h2 class="text-2xl md:text-[1.8rem] m-0 leading-snug">Offers the choice to buy Emotes and Items.</h2>
            </div>

            <div class="flex flex-col gap-[30px]">
              
              <div class="w-full rounded-xl overflow-hidden border border-white/10">
                <img 
                  :src="captionGifs"
                  alt="Shop Interface" 
                  class="w-full h-auto block object-cover" 
                />
              </div>

              <div class="flex flex-col gap-[30px]">
                
                <div>
                  <h3 class="text-[#00bba6] text-2xl md:text-[1.8rem] mb-2.5">Shopkeeper</h3>
                  <p class="font-['Nunito'] text-[1.1rem] leading-relaxed text-[#e0e0e0]">
                    At the right bottom corner of the shop interface is a desk
                    where Tze's avatar sits in a random pose beside his Bonnie plushie. 
                    He will greet the player initially, but when pressed, he will express pain
                    and make a squeaking noise.
                  </p>
                </div>

                <div>
                  <h3 class="text-[#00bba6] text-2xl md:text-[1.8rem] mb-2.5">Cash ($)</h3>
                  <p class="font-['Nunito'] text-[1.1rem] leading-relaxed text-[#e0e0e0]">
                    $ is a symbol that stands for the in-game currency, that
                    can only be used for Emotes, Soda, Items, Victory Flashes,
                    Arcade Machines, and Customizable Billboards.
                  </p>
                </div>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-4 w-full">
                <div
                  v-for="offer in shopItems"
                  :key="offer.title"
                  class="bg-[#050a14]/70 border border-[#00b894]/20 rounded-xl p-4"
                >
                  <div class="flex justify-between items-center text-sm mb-2">
                    <span class="uppercase tracking-widest text-[#00bba6]">{{ offer.category }}</span>
                    <span class="font-bold text-[#f1c40f]">{{ offer.price }}</span>
                  </div>
                  <h4 class="text-[1.1rem] mb-1.5">{{ offer.title }}</h4>
                  <p class="font-['Nunito'] text-[0.95rem] text-[#d6d8df]">{{ offer.desc }}</p>
                </div>
              </div>

            </div>
          </article>

          <article v-else class="w-full max-w-[1000px] bg-[linear-gradient(127deg,rgba(3,7,18,0.95)_0%,rgba(20,47,120,0.95)_100%)] border border-[#00bba6]/30 rounded-[20px] p-[60px] text-center italic text-[#888]">
            <h2 class="text-2xl mb-2">{{ activeTabLabel }}</h2>
            <p>Content for {{ activeTabLabel }} is coming soon.</p>
          </article>

        </section>
      </article>
    </main>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import captionGifs from '@/assets/img/gifs/caption.gif';
import FilterButton from '@/components/Reusable/FilterButton.vue';

const activeTab = ref('shop');

const tabItems = [
  { id: 'shop', label: 'Shop' },
  { id: 'gamepasses', label: 'Gamepasses' },
  { id: 'merch', label: 'Merch' },
  { id: 'rewards', label: 'Rewards' },
];

// Data Mockup untuk Shop Items (agar grid terlihat)
const shopItems = [
  { title: 'Hakari Dance', category: 'Emote', price: '150 $', desc: 'Tuca Donka dance move.' },
  { title: 'Cursed Soda', category: 'Item', price: '50 $', desc: 'Restores small amount of HP.' },
  { title: 'Victory Flash', category: 'Effect', price: '300 $', desc: 'Custom effect on kill.' },
  { title: 'Arcade Token', category: 'Item', price: '100 $', desc: 'Play mini-games in the lobby.' },
];

const activeTabLabel = computed(() => {
  const tab = tabItems.find(t => t.id === activeTab.value);
  return tab ? tab.label : '';
});
</script>

<style>
/* Font Import tetap diperlukan */
@import url('https://fonts.googleapis.com/css2?family=Finger+Paint&family=Nunito:wght@400;700&display=swap');
</style>