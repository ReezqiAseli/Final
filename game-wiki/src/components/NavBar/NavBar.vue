<template>
  <nav class="navbar">
    <div class="logo-container">
      <img src="@/assets/img/Miwa.png" alt="Logo" class="logo" />
    </div>

    <div class="nav-links">
      <router-link 
        v-for="link in links" 
        :key="link.name"
        :to="link.path"
        :class="['nav-item', { active: route.name === link.name }]"
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

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 50px;
  background: radial-gradient(circle at top left, #000000 0%, #050a14 40%, #2c3e50 100%);
  font-family: 'Permanent Marker', cursive;
  position: sticky;
  top: 0;
  z-index: 50;
  width: 100%;
}

.logo {
  width: 50px;
  height: 50px;
  background: #000;
  border-radius: 8px;
  object-fit: cover;
}

.nav-links {
  display: flex;
  list-style: none;
  gap: 20px;
}

.nav-item {
  text-decoration: none;
  color: white;
  font-size: 1.1rem;
  padding: 8px 20px;
  border-radius: 20px;
  transition: all 0.3s ease;
}

.nav-item.active {
  background-color: #00b894;
  color: #000;
}

.nav-item:hover:not(.active) {
  color: #00b894;
}
</style>