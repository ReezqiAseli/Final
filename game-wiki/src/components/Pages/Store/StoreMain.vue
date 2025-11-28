<template>
  <div class="page-container">
    <main class="content-wrapper">
      
      <header class="header-section">
        <h1>Store</h1>
        <p>See the goods you can spend your money on this game</p>
      </header>

      <nav class="tabs-nav">
        <div class="tabs-container">
          <button 
            v-for="tab in tabItems" 
            :key="tab.id"
            @click="activeTab = tab.id"
            :class="['tab-btn', { active: activeTab === tab.id }]"
          >
            {{ tab.label }}
          </button>
        </div>
      </nav>

      <section class="store-content">
        
        <article v-if="activeTab === 'shop'" class="info-card">
          <div class="card-header">
            <h2>Offers the choice to buy Emotes and Items.</h2>
          </div>

          <div class="card-body">
            <div class="image-wrapper">
              <img 
                :src="captionGifs"
                alt="Shop Interface" 
                class="shop-image" 
              />
            </div>

            <div class="text-content">
              <div class="info-block">
                <h3>Shopkeeper</h3>
                <p>
                  At the right bottom corner of the shop interface is a desk
                  where Tze's avatar sits in a random pose beside his Bonnie plushie. 
                  He will greet the player initially, but when pressed, he will express pain
                  and make a squeaking noise.
                </p>
              </div>

              <div class="info-block">
                <h3>Cash ($)</h3>
                <p>
                  $ is a symbol that stands for the in-game currency, that
                  can only be used for Emotes, Soda, Items, Victory Flashes,
                  Arcade Machines, and Customizable Billboards.
                </p>
              </div>
            </div>
          </div>
        </article>

        <article v-else class="info-card empty-state">
          <h2>{{ activeTabLabel }}</h2>
          <p>Content for {{ activeTabLabel }} is coming soon.</p>
        </article>

      </section>

    </main>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import captionGifs from '@/assets/img/gifs/caption.gif';
// State untuk Tab Aktif
const activeTab = ref('shop');

const tabItems = [
  { id: 'shop', label: 'Shop' },
  { id: 'gamepasses', label: 'Gamepasses' },
  { id: 'merch', label: 'Merch' },
  { id: 'rewards', label: 'Rewards' },
];

// Computed untuk mendapatkan label tab yang sedang aktif (untuk placeholder)
const activeTabLabel = computed(() => {
  const tab = tabItems.find(t => t.id === activeTab.value);
  return tab ? tab.label : '';
});
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Finger+Paint&family=Nunito:wght@400;700&display=swap');

/* --- Global Container --- */
.page-container {
  min-height: 100vh;
  /* Gradient Background konsisten dengan halaman lain */
  background: radial-gradient(circle at top left, #005c57 0%, #050a14 40%, #2c3e50 100%);
  color: white;
  font-family: 'Finger Paint', cursive;
  display: flex;
  justify-content: center;
}

.content-wrapper {
  width: 100%;
  max-width: 1200px;
  padding: 100px 20px 40px; /* Padding atas besar untuk kompensasi navbar yang hilang */
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
}

/* --- Header --- */
.header-section {
  text-align: center;
  margin-bottom: 20px;
}

.header-section h1 {
  font-size: 4rem;
  margin: 0;
  line-height: 1.2;
  text-shadow: 0 4px 10px rgba(0,0,0,0.5);
}

.header-section p {
  font-size: 1.2rem;
  margin-top: 10px;
  opacity: 0.9;
}

/* --- Navigation Tabs --- */
.tabs-nav {
  display: flex;
  justify-content: center;
  width: 100%;
  margin-bottom: 20px;
}

.tabs-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 15px;
  background: rgba(0,0,0,0.2);
  padding: 15px 30px;
  border-radius: 40px;
}

.tab-btn {
  background: transparent;
  border: 2px solid rgba(0, 187, 166, 0.2);
  color: white;
  padding: 8px 30px;
  border-radius: 20px;
  cursor: pointer;
  font-family: 'Finger Paint', cursive;
  font-size: 1.1rem;
  transition: all 0.3s ease;
  min-width: 120px;
}

.tab-btn:hover {
  border-color: #009689;
}

.tab-btn.active {
  background-color: #009689;
  border-color: #009689;
  box-shadow: 0 0 15px rgba(0, 150, 137, 0.4);
}

/* --- Content Card --- */
.store-content {
  width: 100%;
  display: flex;
  justify-content: center;
}

.info-card {
  width: 100%;
  max-width: 1000px;
  background: linear-gradient(127deg, rgba(3,7,18,0.95) 0%, rgba(20,47,120,0.95) 100%);
  border: 2px solid rgba(0, 187, 166, 0.2);
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.5);
}

.card-header h2 {
  font-size: 1.8rem;
  text-align: center;
  margin-top: 0;
  margin-bottom: 30px;
  border-bottom: 1px solid rgba(255,255,255,0.1);
  padding-bottom: 20px;
  line-height: 1.4;
}

.card-body {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

/* Image Styling */
.image-wrapper {
  width: 100%;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid rgba(255,255,255,0.1);
  box-shadow: 0 5px 15px rgba(0,0,0,0.3);
}

.shop-image {
  width: 100%;
  height: auto;
  display: block;
  object-fit: cover;
}

/* Text Styling */
.text-content {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.info-block h3 {
  color: #00bba6;
  font-size: 1.8rem;
  margin-bottom: 10px;
}

.info-block p {
  font-family: 'Nunito', sans-serif; /* Menggunakan Nunito untuk paragraf agar mudah dibaca */
  font-size: 1.1rem;
  line-height: 1.6;
  color: #e0e0e0;
  margin: 0;
}

.empty-state {
  text-align: center;
  padding: 60px;
  font-style: italic;
  color: #888;
}

/* --- Responsive --- */
@media (max-width: 768px) {
  .header-section h1 { font-size: 2.5rem; }
  .tabs-container { padding: 10px; gap: 10px; }
  .tab-btn { flex: 1; padding: 8px 10px; font-size: 0.9rem; }
  .info-card { padding: 20px; }
  .card-header h2 { font-size: 1.4rem; }
}
</style>