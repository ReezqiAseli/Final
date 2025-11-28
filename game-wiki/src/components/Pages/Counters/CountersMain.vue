<template>
  <div class="page-container">
    <main class="content-wrapper">
      
      <header class="header-section">
        <h1>Counter Guide</h1>
        <p>Learn the best responses to every cursed technique</p>
      </header>

      <section class="selection-container">
        <h3>Select Your Character:</h3>
        <div class="char-scroll">
          <button 
            v-for="char in characters" 
            :key="char.id"
            @click="selectedChar = char"
            :class="['char-btn', { active: selectedChar.id === char.id }]"
            :title="char.name"
          >
            <span class="char-name" :style="{ color: char.color }">{{ char.name }}</span>
            </button>
        </div>
      </section>

      <div class="status-indicator">
        <span class="finger-paint-text">Playing as {{ selectedChar.name }}</span>
      </div>

      <section class="matchups-grid">
        <div 
          v-for="(matchup, index) in currentMatchups" 
          :key="index" 
          class="matchup-card"
        >
          <div class="opponent-header">
            <div class="opponent-icon" :style="{ backgroundColor: matchup.color }">
              <img :src="matchup.img" :alt="matchup.name + ' icon'" style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%;" />
            </div>
            <div class="opponent-info">
              <h4>VS. {{ matchup.name }}</h4>
              <span :class="['difficulty-badge', matchup.difficulty.toLowerCase()]">
                {{ matchup.difficulty }}
              </span>
            </div>
          </div>
          
          <div class="strategy-body">
            <p>{{ matchup.tip }}</p>
          </div>
        </div>

        <div v-if="currentMatchups.length === 0" class="empty-state">
          <p>Select a character to see counter strategies.</p>
        </div>
      </section>

    </main>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import gojoImg from '@/assets/img/Gojo.png';
import yujiImg from '@/assets/img/Yuji.png';
import hakariImg from '@/assets/img/Hakari.png';
import mahitoImg from '@/assets/img/Mahito.png';
import todoImg from '@/assets/img/Todo.png';

// --- Data Karakter ---
const characters = [
  { id: 'honored', name: 'Honored One', color: '#3498db', img: gojoImg },
  { id: 'vessel', name: 'Vessel', color: '#e74c3c', img: yujiImg },
  { id: 'gambler', name: 'Restless Gambler', color: '#2ecc71', img: hakariImg },
  { id: 'perfection', name: 'Perfection', color: '#9b59b6', img: mahitoImg },
  { id: 'switcher', name: 'Switcher', color: '#e67e22', img: todoImg },
];

// State karakter yang sedang dipilih (Default: Honored One)
const selectedChar = ref(characters[0]);

// --- Data Mockup Matchups/Counters ---
// Di aplikasi nyata, ini bisa diambil dari API / JSON terpisah
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
  // Tambahkan data lain sesuai kebutuhan...
};

// Computed property untuk mengambil list matchup berdasarkan karakter yang dipilih
const currentMatchups = computed(() => {
  return matchupDatabase[selectedChar.value.id] || [];
});
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Finger+Paint&family=Nunito:wght@400;700&display=swap');

/* --- Layout Utama --- */
.page-container {
  min-height: 100vh;
  background: radial-gradient(circle at top left, #005c57 0%, #050a14 40%, #2c3e50 100%);
  color: white;
  display: flex;
  justify-content: center;
  font-family: 'Nunito', sans-serif;
}

.content-wrapper {
  width: 100%;
  max-width: 1200px;
  padding: 80px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
}

/* --- Header --- */
.header-section {
  text-align: center;
}

.header-section h1 {
  font-family: 'Finger Paint', cursive;
  font-size: 3.5rem;
  margin: 0;
  text-shadow: 0 4px 10px rgba(0,0,0,0.5);
}

.header-section p {
  font-size: 1.2rem;
  opacity: 0.8;
  margin-top: 10px;
}

/* --- Selection Section --- */
.selection-container {
  text-align: center;
  width: 100%;
}

.selection-container h3 {
  font-family: 'Finger Paint', cursive;
  margin-bottom: 20px;
  color: #00bba6;
}

.char-scroll {
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
}


.char-btn {
  background: rgba(255, 255, 255, 0.05);
  border: 2px solid rgba(0, 187, 166, 0.2);
  border-radius: 15px;
  padding: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.char-name {
  margin-top: 8px;
  font-size: 1rem;
  color: #fff;
  font-family: 'Finger Paint', cursive;
  text-align: center;
  word-break: break-word;
}

.char-btn:hover {
  transform: translateY(-5px);
  border-color: #00bba6;
}

.char-btn.active {
  background: rgba(0, 187, 166, 0.2);
  border-color: #00bba6;
  box-shadow: 0 0 15px rgba(0, 187, 166, 0.5);
}

.char-icon {
  width: 60px;
  height: 60px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
}

/* --- Indicator Text --- */
.status-indicator {
  padding: 10px 30px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.finger-paint-text {
  font-family: 'Finger Paint', cursive;
  font-size: 1.5rem;
  color: #e0e0e0;
}

/* --- Matchups Grid --- */
.matchups-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 25px;
  width: 100%;
}

.matchup-card {
  background: rgba(13, 20, 30, 0.8);
  border: 1px solid #1f2f3f;
  border-radius: 12px;
  padding: 20px;
  transition: transform 0.2s;
}

.matchup-card:hover {
  border-color: #00bba6;
}

.opponent-header {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 15px;
  border-bottom: 1px solid rgba(255,255,255,0.05);
  padding-bottom: 15px;
}

.opponent-icon {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
}

.opponent-info h4 {
  font-family: 'Finger Paint', cursive;
  margin: 0 0 5px 0;
  font-size: 1.2rem;
}

.difficulty-badge {
  font-size: 0.8rem;
  padding: 4px 12px;
  border-radius: 20px;
  font-weight: bold;
  text-transform: uppercase;
}

.difficulty-badge.easy { background: rgba(46, 204, 113, 0.2); color: #2ecc71; }
.difficulty-badge.medium { background: rgba(241, 196, 15, 0.2); color: #f1c40f; }
.difficulty-badge.hard { background: rgba(231, 76, 60, 0.2); color: #e74c3c; }

.strategy-body p {
  color: #a0aab5;
  line-height: 1.6;
  margin: 0;
}

.empty-state {
  grid-column: 1 / -1;
  text-align: center;
  color: #666;
  font-style: italic;
  padding: 40px;
}

/* --- Responsive --- */
@media (max-width: 768px) {
  .header-section h1 { font-size: 2.5rem; }
  .matchups-grid { grid-template-columns: 1fr; }
}
</style>