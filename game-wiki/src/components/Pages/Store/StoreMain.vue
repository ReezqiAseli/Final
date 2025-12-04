<template>
  <div class="page-container">
    <main class="content-wrapper">
      
      <header class="header-section">
        <h1>Store</h1>
        <p>See the goods you can spend your money on this game</p>
      </header>

      <nav class="tabs-nav">
        <div class="tabs-container">
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

            <div class="offers-grid">
              <div
                v-for="offer in shopItems"
                :key="offer.title"
                class="offer-card"
              >
                <div class="offer-headline">
                  <span class="offer-tag">{{ offer.category }}</span>
                  <span class="offer-price">{{ offer.price }}</span>
                </div>
                <h4>{{ offer.title }}</h4>
                <p>{{ offer.desc }}</p>
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
import FilterButton from '@/components/Reusable/FilterButton.vue';
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

.offers-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 16px;
  width: 100%;
}

.offer-card {
  background: rgba(5, 10, 20, 0.7);
  border: 1px solid rgba(0, 184, 148, 0.2);
  border-radius: 12px;
  padding: 16px;
}

.offer-headline {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.85rem;
  margin-bottom: 8px;
}

.offer-tag {
  text-transform: uppercase;
  letter-spacing: 1px;
  color: #00bba6;
}

.offer-price {
  font-weight: 700;
  color: #f1c40f;
}

.offer-card h4 {
  margin: 0 0 6px;
  font-size: 1.1rem;
}

.offer-card p {
  font-family: 'Nunito', sans-serif;
  font-size: 0.95rem;
  color: #d6d8df;
  margin: 0;
}

.empty-offers {
  grid-column: 1 / -1;
  text-align: center;
  color: #9ba5c4;
  font-style: italic;
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