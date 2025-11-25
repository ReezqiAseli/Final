<template>
  <div class="page-container">
    <main class="content-wrapper">
      
      <header class="header-section">
        <h1>Game Controls</h1>
        <p>See the control scheme across PC, Console and Mobile</p>
      </header>

      <nav class="tabs-nav">
        <div class="tabs-container">
          <button 
            v-for="tab in controlTabs" 
            :key="tab.id"
            @click="activeTab = tab.id"
            :class="['tab-btn', { active: activeTab === tab.id }]"
          >
            <span>{{ tab.label }}</span>
          </button>
        </div>
      </nav>

      <section class="info-section">
        <div class="info-card-wrapper">
          <article class="info-card">
            <h2>{{ currentContent.title }}</h2>

            <div class="card-body">
              <div class="text-content">
                <div v-for="(section, index) in currentContent.sections" :key="index" class="section-block">
                  <button class="skill-toggle" @click="togglePreview(section.heading)">
                    <div>
                      <h3>{{ section.heading }}</h3>
                      <p>{{ section.text }}</p>
                    </div>
                    <span class="chevron" :class="{ open: activePreview === section.heading }">⌄</span>
                  </button>

                  <ul v-if="section.subItems" class="sub-list">
                    <li v-for="(item, i) in section.subItems" :key="i">
                      • {{ item }}
                    </li>
                  </ul>

                  <p v-if="section.additionalText" class="additional-text">
                    {{ section.additionalText }}
                  </p>

                  <transition name="fade-slide">
                    <div v-if="activePreview === section.heading" class="control-preview-card">
                      <img :src="section.preview" :alt="`${section.heading} preview`" />
                      <span class="preview-label">GIF Preview</span>
                    </div>
                  </transition>
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>

    </main>
  </div>
<Footer/>
</template>

<script setup>
import Footer from '@/components/Reusable/Footer.vue';
import { ref, computed } from 'vue';

const activeTab = ref('movement');
const activePreview = ref(null);

const defaultControlPreview = 'https://media1.tenor.com/m/gFWrsd6_SvkAAAAd/jujutsu-kaisen-shenanigans.gif';

const togglePreview = (heading) => {
  activePreview.value = activePreview.value === heading ? null : heading;
};

const controlTabs = [
  { id: 'movement', label: 'Movement' },
  { id: 'combat', label: 'Combat' },
  { id: 'abilities', label: 'Abilities' },
];

// Data Konten
const contentData = {
  movement: {
    title: "Movement",
    sections: [
      {
        heading: "Sprinting",
        text: "While sprinting, your character will run faster than normal, and will automatically slide, mantle and vault in order to avoid small obstacles such as debris and ledges. To sprint, press W twice on PC. On other platforms, it is impossible to sprint unless you have Auto-Run on from the in-game Settings (Note that sprinting is only performed when walking forwards).",
        preview: 'https://media1.tenor.com/m/7H4OJzSRpgkAAAAC/rise-kujikawa-yu-narukami.gif',
      },
      {
        heading: "Dashing",
        text: "When using Q on PC, the button with a running figure icon on mobile, △ on Playstation or Y on Xbox, while walking in a certain direction, the player will perform a dash towards their chosen path. There are 3 kinds of dashes, each performed depending on the direction the player is walking, and their current state.",
        preview: defaultControlPreview,
      },
      {
        heading: "Parkour",
        text: "When the player sprints forwards and is met by an obstacle, the parkour mechanic will come into play, causing them to perform an action depending on the wall they're met with in order to not lose momentum:",
        subItems: [
          "Vaulting: For low obstacles such as tables, throwables..",
          "Mantling: For elevated walls and ledges.",
          "Sliding: For obstacles that are raised slightly above the ground, offering a gap.",
        ],
        additionalText: "By holding the jump button (Space on PC, UP Arrow on mobile, X on PlayStation and A on Xbox) and looking sideways against a vertical surface (don't look straight at it or you won't bounce) while moving you towards it, and you will be able to wallclimb 3 times before having to touch the ground again (parkouring also counts touching the ground).",
        preview: 'https://media1.tenor.com/images/6b3a5b8e6c9e6f8f3f6fd2d1b8a6c2a4/tenor.gif',
      },
    ],
  },
  // Placeholder untuk tab lain agar tidak error saat diklik
  combat: {
    title: "Combat",
    sections: [{ heading: "Coming Soon", text: "Combat controls information will be displayed here." }]
  },
  abilities: {
    title: "Abilities",
    sections: [{ heading: "Coming Soon", text: "Abilities controls information will be displayed here." }]
  }
};

// Computed property untuk mengambil konten berdasarkan tab yang aktif
const currentContent = computed(() => {
  return contentData[activeTab.value];
});
</script>

<style scoped>
/* Import Font Finger Paint sesuai desain asli */
@import url('https://fonts.googleapis.com/css2?family=Finger+Paint&display=swap');

/* Reset & Container Utama */
.page-container {
  min-height: 100vh;
  width: 100%;
  /* Gradient Background sesuai React */
  background: linear-gradient(139deg, rgba(0,0,0,1) 0%, rgba(3,7,18,1) 43%, rgba(2,47,46,0.3) 100%);
  display: flex;
  justify-content: center;
  color: white;
  font-family: 'Finger Paint', cursive;
}

.content-wrapper {
  width: 100%;
  max-width: 1400px; /* Agar tidak terlalu lebar di layar besar */
  padding: 100px 20px 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

/* --- Header --- */
.header-section {
  text-align: center;
  margin-bottom: 20px;
}

.header-section h1 {
  font-size: 4rem; /* 100px di desain asli mungkin terlalu besar untuk web responsif */
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
  gap: 20px;
  background: rgba(0,0,0,0.2);
  padding: 10px 40px;
  border-radius: 40px;
}

.tab-btn {
  background: transparent;
  border: 2px solid rgba(0, 187, 166, 0.2);
  color: white;
  padding: 10px 30px;
  border-radius: 20px;
  cursor: pointer;
  font-family: 'Finger Paint', cursive;
  font-size: 1.2rem;
  transition: all 0.3s ease;
  min-width: 150px;
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
.info-section {
  width: 100%;
  display: flex;
  justify-content: center;
}

.info-card-wrapper {
  width: 100%;
  max-width: 1100px;
}

.info-card {
  background: linear-gradient(127deg, rgba(3,7,18,0.95) 0%, rgba(20,47,120,0.95) 100%);
  border: 2px solid rgba(0, 187, 166, 0.2);
  border-radius: 20px;
  padding: 50px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.5);
  min-height: 600px;
}

.info-card h2 {
  font-size: 2.5rem;
  margin-top: 0;
  margin-bottom: 30px;
  text-align: center;
  border-bottom: 1px solid rgba(255,255,255,0.1);
  padding-bottom: 20px;
}

.section-block {
  margin-bottom: 40px;
}

.section-block h3 {
  font-size: 1.5rem;
  color: #00bba6;
  margin-bottom: 15px;
}

.section-block p, .section-block li {
  font-family: 'Nunito', sans-serif; /* Menggunakan Nunito untuk teks body agar lebih mudah dibaca */
  font-size: 1.1rem;
  line-height: 1.6;
  color: #e0e0e0;
}

.sub-list {
  list-style-type: none;
  padding-left: 20px;
  margin: 15px 0;
}

.additional-text {
  margin-top: 15px;
  font-style: italic;
  opacity: 0.8;
}

/* --- Preview Toggle (reused style names similar to Characters page) --- */
.skill-toggle {
  width: 100%;
  background: transparent;
  border: none;
  color: inherit;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
  text-align: left;
  padding: 0;
  cursor: pointer;
}

.skill-toggle h3 { margin: 0; }

.chevron {
  font-size: 1.2rem;
  transition: transform 0.2s ease;
  color: #cfd6e6;
}

.chevron.open {
  transform: rotate(180deg);
}

.control-preview-card {
  margin-top: 12px;
  border: 1px solid rgba(0,0,0,0.25);
  border-radius: 12px;
  padding: 10px;
  background: rgba(11,17,26,0.9);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.4);
}

.control-preview-card img {
  width: 100%;
  border-radius: 8px;
  object-fit: cover;
  margin-bottom: 8px;
}

.preview-label {
  display: block;
  font-size: 0.8rem;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: #00b894;
}

.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-5px);
}

/* --- Responsive Adjustments --- */
@media (max-width: 768px) {
  .header-section h1 { font-size: 2.5rem; }
  .tabs-container { flex-direction: column; padding: 10px; border-radius: 10px; }
  .tab-btn { width: 100%; }
  .info-card { padding: 20px; }
}
</style>