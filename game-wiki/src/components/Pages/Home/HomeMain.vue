<template>
  <div class="app-container">
    <main class="content">
      <div class="header-text">
        <h1>Jujutsu Shenanigans</h1>
        <p>Guide or Something IDK</p>
      </div>

      <div class="grid-container">
        <div class="card" v-for="(item, index) in cards" :key="index">
          <div class="card-image-placeholder">
            <img :src="item.icon" :alt="`${item.title} icon`" class="card-image" />
          </div>
          <div class="card-content">
            <h2>{{ item.title }}</h2>
            <p>{{ item.desc }}</p>
          </div>
        </div>
      </div>

      <div class="cta-banner">
        <h2>ts game so peak go play it</h2>
      </div>
    </main>
    <Footer />
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
@import url('https://fonts.googleapis.com/css2?family=Permanent+Marker&family=Nunito:wght@400;700&display=swap');

body, html {
  margin: 0;
  padding: 0;
  height: 100%;
}

.app-container {
  min-height: 100vh;
  background: radial-gradient(circle at top left, #005c57 0%, #050a14 40%, #2c3e50 100%);
  color: white;
  font-family: 'Nunito', sans-serif;
  display: flex;
  flex-direction: column;
}

.content {
  flex: 1;
  padding: 20px 10%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.header-text {
  text-align: center;
  margin-bottom: 50px;
  font-family: 'Permanent Marker', cursive;
} 

.header-text h1 {
  font-size: 4rem;
  margin: 0;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
}

.header-text p {
  font-size: 1.5rem;
  margin-top: 10px;
  opacity: 0.8;
}

/* Grid System */
.grid-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  width: 100%;
  max-width: 1000px;
  margin-bottom: 40px;
}

.card {
  background: rgba(13, 20, 30, 0.8);
  border: 1px solid #1f2f3f;
  border-radius: 15px;
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 20px;
  transition: transform 0.2s;
  box-shadow: 0 4px 15px rgba(0,0,0,0.3);
}

.card:hover {
  transform: translateY(-5px);
  border-color: #00b894;
}

.card-image-placeholder {
  width: 80px;
  height: 80px;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: inset 0 0 10px rgba(0,0,0,0.6);
}

.card-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.card-content h2 {
  font-family: 'Permanent Marker', cursive;
  font-size: 2rem;
  margin: 0 0 5px 0;
}

.card-content p {
  font-size: 0.9rem;
  opacity: 0.7;
  margin: 0;
  line-height: 1.4;
}

.cta-banner {
  width: 100%;
  max-width: 1000px;
  background: linear-gradient(to right, #0f2040, #2c3e60);
  padding: 40px;
  border-radius: 15px;
  text-align: center;
  margin-bottom: 50px;
  border: 1px solid #3e5e80;
}

.cta-banner h2 {
  font-family: 'Permanent Marker', cursive;
  font-size: 2rem;
  margin: 0;
}

@media (max-width: 768px) {
  .grid-container {
    grid-template-columns: 1fr;
  }
  
  .header-text h1 {
    font-size: 2.5rem;
  }
}
</style>