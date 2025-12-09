<template>
  <div class="page-shell page-bg-store min-h-screen flex flex-col items-center text-white font-['Finger_Paint']">
    
    <main class="flex-1 w-full max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12 flex flex-col items-center gap-6 md:gap-8">
      
      <PageWrap class="flex flex-col items-center gap-6 md:gap-8 w-full">
        <header class="text-center">
          <h1 class="text-4xl md:text-5xl lg:text-6xl leading-tight m-0">Store</h1>
          <p class="text-base md:text-lg lg:text-xl mt-2.5 opacity-90">See the goods you can spend your money on this game</p>
        </header>

        <nav class="flex justify-center w-full">
          <div class="flex flex-wrap justify-center gap-2 md:gap-[15px] bg-black/20 py-2.5 md:py-[15px] px-4 md:px-[30px] rounded-2xl md:rounded-[40px] w-full md:w-fit mx-auto border border-white/5">
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
          
          <div v-if="!Array.isArray(currentData)" class="w-full max-w-[1000px]">
             <div class="text-center text-2xl md:text-3xl mb-6 md:mb-8 pb-5">
               <span class="border-b border-emerald-500 px-6 py-3 leading-loose">
                 {{ currentData.subtitle }}
               </span>
             </div>

             <div class="flex flex-col gap-[30px]">
               
               <div class="w-full rounded-xl overflow-hidden border border-emerald-500 p-1.5 bg-black/20 shadow-2xl">
                 <img 
                   :src="currentData.bannerImage" 
                   :alt="activeTabLabel + ' Banner'" 
                   class="w-full h-auto block object-cover rounded-lg" 
                 />
               </div>

               <div class="flex flex-col gap-5">
                 <div 
                   v-for="(section, idx) in currentData.sections" 
                   :key="idx"
                   class="border border-emerald-500 rounded-xl p-5 bg-black/20 transition-all hover:bg-white/5"
                 >
                   <h3 class="text-emerald-400 text-2xl md:text-3xl mb-2.5">
                     {{ section.title }}
                   </h3>
                   <p class="text-base md:text-lg leading-relaxed text-[#e0e0e0] opacity-90">
                     {{ section.text }}
                   </p>
                 </div>
               </div>

             </div>
          </div>

          <div v-else class="w-full max-w-[1100px]">
            <div class="text-center mb-8 md:mb-10">
              <h2 class="text-2xl md:text-3xl border-b border-emerald-500 inline-block px-8 pb-2">
                {{ activeTabLabel }} List
              </h2>
            </div>

            <div v-if="currentData.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div 
                v-for="(item, index) in currentData" 
                :key="index"
                class="group bg-[#0d141e] border border-slate-700 rounded-2xl overflow-hidden flex flex-col hover:border-emerald-500 hover:-translate-y-1 transition-all duration-300"
              >
                <div class="aspect-video w-full bg-black/50 overflow-hidden relative">
                  <img :src="item.image" :alt="item.title" class="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                  <div class="absolute top-3 right-3 bg-emerald-600 text-white text-sm font-bold px-3 py-1 rounded-full shadow-lg">
                    {{ item.price }}
                  </div>
                </div>

                <div class="p-5 flex flex-col gap-3 flex-1">
                  <h3 class="text-xl text-emerald-400">{{ item.title }}</h3>
                  <p class="text-sm text-slate-300 leading-relaxed opacity-80">
                    {{ item.desc }}
                  </p>
                </div>
              </div>
            </div>

            <div v-else class="text-center py-20 text-slate-500 italic border-2 border-dashed border-slate-800 rounded-2xl">
              <p class="text-xl">No items available in {{ activeTabLabel }} yet.</p>
            </div>
          </div>

        </section>
      </PageWrap>

    </main>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import captionGifs from '@/assets/img/gifs/Shop.webp'; 
import FilterButton from '@/components/Reusable/FilterButton.vue';
import PageWrap from '@/components/Reusable/PageWrap.vue';

// Placeholder Images
const placeholderImg = 'https://placehold.co/800x400/0f2c4a/white?text=Rewards+Banner';
// const rewardImg = 'https://placehold.co/800x400/00b894/white?text=Daily+Login+Event'; // Unused in this version but kept for ref

const activeTab = ref('shop');

const tabItems = [
  { id: 'shop', label: 'Shop' },
  { id: 'gamepasses', label: 'Gamepasses' },
  { id: 'merch', label: 'Merch' },
  { id: 'rewards', label: 'Rewards' },
];

const storeContent = {
  shop: {
    bannerImage: captionGifs,
    subtitle: 'Offers the choice to buy Emotes and Items.',
    sections: [
      {
        title: 'Shopkeeper',
        text: "At the right bottom corner of the shop interface is a desk where Tze's avatar sits in a random pose beside his Bonnie plushie. He will greet the player initially, but when pressed, he will express pain and make a squeaking noise. "
      },
      {
        title: 'Cash ($)',
        text: "$ is a symbol that stands for the in-game currency, that can only be used for Emotes, Soda, Items, Victory Flashes, Arcade Machines, and Customizable Billboards."
      }
    ]
  },

  rewards: {
    bannerImage: captionGifs, // You might want to change this to rewardImg later
    subtitle: 'Claim free items simply by playing the game.',
    sections: [
      {
        title: 'Daily Login Bonus',
        text: 'Log in every day to claim increasing cash rewards. The streak resets on day 7, granting a massive bonus box containing random emotes or items. Don\'t miss a day!'
      },
      {
        title: 'Level Milestones',
        text: 'Grinding levels isn\'t just for status. Upon reaching Level 50, you unlock the exclusive "Master" title and receive 5000$ instant cash to spend on your favorite finishers.'
      }
    ]
  },

  gamepasses: [
    {
      title: 'Early Access',
      price: 'R$ 299',
      image: placeholderImg,
      desc: 'Get access to new characters 2 weeks before they are released globally.'
    },
    {
      title: 'Custom Emotes',
      price: 'R$ 150',
      image: placeholderImg,
      desc: 'Unlock 5 additional slots for custom emotes to taunt your enemies.'
    },
    {
      title: 'Double Cash',
      price: 'R$ 450',
      image: placeholderImg,
      desc: 'Permanently earn 2x cash from all sources (Kills, Daily, Codes).'
    }
  ],
  
  merch: [
    {
      title: 'Gojo Hoodie',
      price: 'R$ 50',
      image: placeholderImg,
      desc: 'Official Jujutsu Shenanigans hoodie with printed logo.'
    },
    {
      title: 'Toji Pants',
      price: 'R$ 15',
      image: placeholderImg,
      desc: 'Stylish pants inspired by the Sorcerer Killer.'
    }
  ]
};

const currentData = computed(() => {
  return storeContent[activeTab.value] || [];
});

const activeTabLabel = computed(() => {
  const tab = tabItems.find(t => t.id === activeTab.value);
  return tab ? tab.label : '';
});
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Finger+Paint&display=swap');
</style>