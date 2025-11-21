<template>
  <div class="app-container">
    <main class="content">
      <div class="header-text">
        <h1>Characters</h1>
        <p>See all available Characters in Jujutsu Shenanigans</p>
      </div>

      <div class="controls-container">
        <div class="search-wrapper">
          <span class="search-icon">🔍</span>
          <input 
            type="text" 
            v-model="searchQuery" 
            placeholder="Search Characters..." 
            class="search-input"
          />
        </div>

        <div class="filter-tags">
          <button 
            v-for="filter in filters" 
            :key="filter"
            @click="activeFilter = filter"
            :class="['filter-btn', { active: activeFilter === filter }]"
          >
            {{ filter }}
          </button>
        </div>
      </div>

      <div class="grid-container">
        <div 
          class="character-card"
          v-for="(char, index) in filteredCharacters"
          :key="index"
          @click="openCharacterModal(char)"
        >
          <div class="card-image-wrapper">
            <div class="img-placeholder" :style="{ backgroundColor: char.color + '20' }">
              <img :src="char.image" :alt="`${char.name} portrait`" class="char-img" />
            </div>
            </div>
          
          <div class="card-info">
            <h2 :style="{ color: char.color }">
              <span class="icon-marker">Asset</span> {{ char.name }}
            </h2>
            <p class="desc-text">Explore all available characters with unique abilities and playstyles</p>
          </div>
        </div>
      </div>
    </main>

    <div 
      v-if="selectedCharacter" 
      class="character-modal-overlay"
      @click="closeCharacterModal"
    >
      <div class="character-modal" @click.stop>
        <button class="modal-close" @click="closeCharacterModal">×</button>

        <div class="modal-header">
          <img :src="selectedCharacter.image" :alt="`${selectedCharacter.name} portrait`" class="modal-image" />
          <div class="modal-text">
            <p class="modal-type">{{ selectedCharacter.type }}</p>
            <h2>{{ selectedCharacter.name }}</h2>
          </div>
        </div>

        <div class="modal-skills">
          <h3>Skill Loadout</h3>
          <div class="skill-tabs">
            <button
              v-for="category in skillCategories"
              :key="category.key"
              :class="['skill-tab', { active: activeSkillCategory === category.key }]"
              @click="setSkillCategory(category.key)"
            >
              {{ category.label }}
            </button>
          </div>
          <ul>
            <li 
              v-for="skill in currentSkills" 
              :key="skill.name"
            >
              <button class="skill-toggle" @click="toggleSkill(skill.name)">
                <div>
                  <span class="skill-pill">{{ skill.name }}</span>
                  <p>{{ skill.desc }}</p>
                </div>
                <span class="chevron" :class="{ open: activeSkill === skill.name }">⌄</span>
              </button>
              <transition name="fade-slide">
                <div v-if="activeSkill === skill.name" class="skill-preview-card">
                  <img :src="skill.preview" :alt="`${skill.name} preview`" />
                  <span class="preview-label">GIF Preview</span>
                </div>
              </transition>
            </li>
            <li v-if="!currentSkills.length" class="empty-skills">Belum ada skill di kategori ini.</li>
          </ul>
        </div>
      </div>
    </div>

    <footer class="footer">
      <div class="social-icons">
        <div class="icon discord">
          <img :src="discordIcon" alt="Discord" class="social-icon-img"/>
        </div>
        <div class="icon roblox">
            <img :src="robloxIcon" alt="Roblox" class="social-icon-img"/>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import discordIcon from '@/assets/img/discord.png';
import robloxIcon from '@/assets/img/roblox.png';
import gojoImg from '@/assets/img/Gojo.png';
import yujiImg from '@/assets/img/Yuji.png';
import megumiImg from '@/assets/img/Megumi.png';
import hakariImg from '@/assets/img/Hakari.png';
import todoImg from '@/assets/img/Todo.png';
import yutaImg from '@/assets/img/Yuta.png';
import mechamaruImg from '@/assets/img/Mechamaru.png';
import chosoImg from '@/assets/img/Choso.png';
import mahitoImg from '@/assets/img/Mahito.png';

const searchQuery = ref('');
const activeFilter = ref('All');
const selectedCharacter = ref(null);
const activeSkill = ref(null);
const activeSkillCategory = ref('base');
const skillCategories = [
  { key: 'base', label: 'Base Skills' },
  { key: 'awakening', label: 'Awakening' },
  { key: 'special', label: 'Special' },
];

const defaultSkillPreview = 'https://media1.tenor.com/m/gFWrsd6_SvkAAAAd/jujutsu-kaisen-shenanigans.gif';

const filters = ['All', 'Completed', 'Early Access', 'Base Only', 'Overpowered', 'Developer'];

const characters = [
  {
    name: 'Honored One',
    type: 'Base',
    color: '#3498db',
    image: gojoImg,
    skillSets: {
      base: [
        { name: 'Cursed Technique Amplification: Blue', desc: 'Generates a crushing vacuum that drags foes into a single point.', preview: 'https://media1.tenor.com/m/ciWCfCGCt74AAAAC/jjs-tze-roblox-jjs.gif' },
        { name: 'Reversal: Red', desc: 'Explosive repulsion burst that deletes anything caught in the blast radius.' },
        { name: 'Hollow Purple', desc: 'Combines Blue and Red into an unstoppable beam that pierces the entire arena.' },
      ],
      awakening: [
        { name: 'Limitless Singularity', desc: 'Freeze time in a micro singularity, dealing true damage over time.' },
        { name: "Six Eyes Overclock", desc: 'Massively reduces cursed technique cooldowns for a short burst.' },
      ],
      special: [
        { name: 'Unlimited Void', desc: 'Domain expansion that overwhelms senses, stunning foes on entry.' },
        { name: 'Reverse Curse Surge', desc: 'Instant full heal plus damage buff using reverse cursed energy.' },
      ],
    },
  },
  {
    name: 'Perfection',
    type: 'Base',
    color: '#9b59b6',
    image: mahitoImg,
    skillSets: {
      base: [
        { name: 'Idle Transfiguration', desc: 'Shapes a target’s soul to mutate their body, dealing burst damage.' },
        { name: 'Body Swap', desc: 'Quickly distort your own form to dodge and counter with a follow-up strike.' },
        { name: 'Self-Embodiment of Perfection', desc: 'Awakens domain for rapid slashes inside an inescapable sphere.' },
      ],
      awakening: [
        { name: 'Soul Multiplicity', desc: 'Split clones from distorted souls that divebomb enemies.' },
        { name: 'Instant Transfiguration', desc: 'Rapid-fire soul strikes that detonate in succession.' },
      ],
      special: [
        { name: "Domain: Self-Embodiment", desc: 'Trap foes in a soul-grinding arena with unavoidable hits.' },
        { name: 'Patchwork Overload', desc: 'Augment allies or self with twisted buffs for brief bursts.' },
      ],
    },
  },
  {
    name: 'Vessel',
    type: 'Base',
    color: '#e74c3c',
    image: yujiImg,
    skillSets: {
      base: [
        { name: 'Divergent Fist', desc: 'Two-step punch where the delayed cursed energy hits harder than the first impact.' },
        { name: 'Black Flash', desc: '0.000001 second cursed energy lag that quadruples strike damage.' },
        { name: 'Sukuna Surge', desc: 'Borrow the King of Curses’ power for a short flurry of cleaving attacks.' },
      ],
      awakening: [
        { name: 'Malevolent Shrine Echo', desc: 'Briefly channel Sukuna’s domain for radial cleaves.' },
        { name: 'Raging Vessel', desc: 'Gain lifesteal and armor break on combo finishers.' },
      ],
      special: [
        { name: 'King’s Command', desc: 'Invoke Sukuna to issue shockwave slashes in a cone.' },
        { name: 'Binding Oath: Control', desc: 'Risk HP to temporarily access cursed finger techniques.' },
      ],
    },
  },
  {
    name: 'Ten Shadows',
    type: 'Base',
    color: '#2ecc71',
    image: megumiImg,
    skillSets: {
      base: [
        { name: 'Divine Dogs', desc: 'Summon twin hounds that track and maul the target relentlessly.' },
        { name: 'Max Elephant', desc: 'Call a massive shikigami that flattens opponents with a water cannon.' },
        { name: 'Chimera Shadow Garden', desc: 'Flood the map with shadows to freely reposition and ambush enemies.' },
      ],
      awakening: [
        { name: 'Mahoraga Call', desc: 'Spin the wheel to adapt and negate the next incoming attack.' },
        { name: 'Shadow Doppelganger', desc: 'Create a mirror clone that repeats your last input.' },
      ],
      special: [
        { name: 'Eight-Handled Blade', desc: 'Briefly wield Mahoraga’s gear for devastating cleaves.' },
        { name: 'Shadow Arsenal', desc: 'Cycle through stored shikigami weapons for varied combos.' },
      ],
    },
  },
  {
    name: 'Restless Gambler',
    type: 'Early Access',
    color: '#2ecc71',
    image: hakariImg,
    skillSets: {
      base: [
        { name: 'Idle Death Gamble', desc: 'Spin Hakari’s jackpot reel for random buffs and cursed energy regen.' },
        { name: 'Theme Music Buff', desc: 'Hitting the bonus grants temporary immortality and endless CE.' },
        { name: 'Domain Expansion: Private Pure Love Train', desc: 'Locks foes in a cinematic beatdown when jackpot is active.' },
      ],
      awakening: [
        { name: 'Jackpot Loop', desc: 'Instantly reroll the slot machine up to three times.' },
        { name: 'Infinite Beatdown', desc: 'Lock an enemy in a rhythm minigame to shred their HP.' },
      ],
      special: [
        { name: 'VIP Backstage', desc: 'Teleport behind targets while granting team-wide CE regen.' },
        { name: 'Encore Finale', desc: 'Massive finisher that scales with remaining jackpot timer.' },
      ],
    },
  },
  {
    name: 'Switcher',
    type: 'Completed',
    color: '#e67e22',
    image: todoImg,
    skillSets: {
      base: [
        { name: 'Boogie Woogie', desc: 'Swap places with any target you clap at, confusing combos and positioning.' },
        { name: 'Heavy Slam', desc: 'Follow up swaps with crushing elbows and knees that break guard.' },
        { name: 'Brother’s Rally', desc: 'Call Yuji for tandem strikes that extend every launcher.' },
      ],
      awakening: [
        { name: 'Unstoppable Clap', desc: 'Boogie Woogie cooldown resets instantly for a short time.' },
        { name: 'Gorilla Mode', desc: 'Gain hyper armor and empowered grapples after each swap.' },
      ],
      special: [
        { name: 'Chain Swap', desc: 'Swap multiple enemies sequentially to break formations.' },
        { name: 'Best Friend Assist', desc: 'Summon an NPC ally for combo extensions after claps.' },
      ],
    },
  },
  {
    name: 'Defense Attorney',
    type: 'Base',
    color: '#f1c40f',
    image: yutaImg,
    skillSets: {
      base: [
        { name: 'Copy Technique', desc: 'Mimic an ally’s skill for one cast, adapting to any matchup.' },
        { name: 'Rika Guard', desc: 'Manifest Rika to shield and counter-grab over-aggressive foes.' },
        { name: 'Pure Love Katana', desc: 'Channel Rika into the blade for a decisive, armor-breaking finisher.' },
      ],
      awakening: [
        { name: 'Manifest Rika', desc: 'Full manifestation fights by your side, doubling your output.' },
        { name: 'Love Overflow', desc: 'Gain continuous cursed energy regen and upgraded copies.' },
      ],
      special: [
        { name: 'Judgment Chain', desc: 'Bind enemies with spirit threads that explode after a delay.' },
        { name: 'Oathseeker', desc: 'Place a binding vow on opponents, lowering their damage if broken.' },
      ],
    },
  },
  {
    name: 'Puppet Master',
    type: 'Completed',
    color: '#e74c3c',
    image: mechamaruImg,
    skillSets: {
      base: [
        { name: 'Simple Domain', desc: 'Deploy a compact barrier that nullifies enemy domains briefly.' },
        { name: 'Execution Slash', desc: 'Dash forward with a cursed katana swing that crits silenced enemies.' },
        { name: 'Blade Recall', desc: 'Throw your sword and snap it back to reposition while dealing chip damage.' },
      ],
      awakening: [
        { name: 'Mecha Barrage', desc: 'Summon artillery drones that pepper the arena.' },
        { name: 'Puppet Override', desc: 'Hijack an enemy input for one second, interrupting combos.' },
      ],
      special: [
        { name: 'Total Puppet Form', desc: 'Transform into a giant mech for a short destructive rampage.' },
        { name: 'Control Seal', desc: 'Tag an enemy with a seal that reflects the next projectile.' },
      ],
    },
  },
  {
    name: 'Blood Manipulator',
    type: 'Completed',
    color: '#c0392b',
    image: chosoImg,
    skillSets: {
      base: [
        { name: 'Convergence', desc: 'Condense blood bullets for sniper-like precision hits.' },
        { name: 'Supernova', desc: 'Orbiting plasma droplets explode on command for AoE control.' },
        { name: 'Slicing Exorcism', desc: 'Unleash a spiraling slash that shreds anything too close.' },
      ],
      awakening: [
        { name: 'Flowing Red Scale', desc: 'Accelerate blood flow to boost movement and damage.' },
        { name: 'Piercing Bloodstorm', desc: 'Channel a continuous beam that can bend mid-flight.' },
      ],
      special: [
        { name: 'Crimson Armor', desc: 'Harden blood around your body, granting damage reduction.' },
        { name: 'Death Painting Pact', desc: 'Buff nearby allies from the same clan with bonus lifesteal.' },
      ],
    },
  },
];

characters.forEach(char => {
  const sets = char.skillSets ?? { base: [], awakening: [], special: [] };
  if (!sets.special) sets.special = [];
  Object.keys(sets).forEach(key => {
    sets[key] = sets[key].map(skill => ({
      preview: skill.preview ?? defaultSkillPreview,
      ...skill,
    }));
  });
  char.skillSets = sets;
});

// Logic Filtering
const filteredCharacters = computed(() => {
  return characters.filter(char => {
    const matchesSearch = char.name.toLowerCase().includes(searchQuery.value.toLowerCase());
    const matchesFilter = activeFilter.value === 'All' || 
                          (activeFilter.value === 'Base Only' && char.type === 'Base') ||
                          (activeFilter.value === 'Completed' && char.type === 'Completed') ||
                          (activeFilter.value === 'Early Access' && char.type === 'Early Access');
                          // Tambahkan logika filter lain sesuai kebutuhan data

    return matchesSearch && matchesFilter;
  });
});

const openCharacterModal = (character) => {
  selectedCharacter.value = character;
  activeSkillCategory.value = 'base';
  activeSkill.value = null;
};

const closeCharacterModal = () => {
  selectedCharacter.value = null;
  activeSkill.value = null;
};

const toggleSkill = (skillName) => {
  activeSkill.value = activeSkill.value === skillName ? null : skillName;
};

const setSkillCategory = (categoryKey) => {
  if (activeSkillCategory.value === categoryKey) return;
  activeSkillCategory.value = categoryKey;
  activeSkill.value = null;
};

const currentSkills = computed(() => {
  if (!selectedCharacter.value) return [];
  const sets = selectedCharacter.value.skillSets ?? {};
  return sets[activeSkillCategory.value] ?? [];
});
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Permanent+Marker&family=Nunito:wght@400;700&display=swap');

/* --- Global Layout (Mewarisi style Home) --- */
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
  padding: 40px 5%;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  box-sizing: border-box;
}

/* --- Header --- */
.header-text {
  text-align: center;
  margin-bottom: 30px;
  font-family: 'Permanent Marker', cursive;
}

.header-text h1 {
  font-size: 3.5rem;
  margin: 0;
  text-shadow: 0 0 10px rgba(255,255,255,0.1);
}

.header-text p {
  font-size: 1.2rem;
  margin-top: 5px;
  opacity: 0.8;
  font-family: 'Permanent Marker', cursive;
}

/* --- Controls (Search & Filter) --- */
.controls-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  margin-bottom: 40px;
  width: 100%;
}

.search-wrapper {
  position: relative;
  width: 100%;
  max-width: 400px;
}

.search-icon {
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
  opacity: 0.5;
}

.search-input {
  width: 100%;
  padding: 12px 15px 12px 40px;
  border-radius: 25px;
  border: 1px solid #2c3e50;
  background: #050a14;
  color: white;
  font-family: 'Nunito', sans-serif;
  font-size: 0.95rem;
  box-sizing: border-box; /* Penting agar padding tidak merusak width */
}

.search-input:focus {
  outline: none;
  border-color: #00b894;
}

.filter-tags {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
}

.filter-btn {
  background: transparent;
  border: 1px solid #2c3e50;
  color: #aaa;
  padding: 6px 16px;
  border-radius: 20px;
  cursor: pointer;
  font-family: 'Nunito', sans-serif;
  font-size: 0.85rem;
  transition: all 0.3s ease;
}

.filter-btn:hover {
  border-color: #00b894;
  color: white;
}

.filter-btn.active {
  background: #00b894; /* Warna Teal sesuai tombol 'All' di gambar */
  border-color: #00b894;
  color: #050a14;
  font-weight: bold;
  box-shadow: 0 0 10px rgba(0, 184, 148, 0.4);
}

/* --- Grid System (Updated to 3 columns) --- */
.grid-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 3 Kolom sesuai gambar */
  gap: 20px;
  width: 100%;
}

/* --- Character Card Styling --- */
.character-card {
  background: #0d141e; /* Warna kartu gelap */
  border: 1px solid #1f2f3f;
  border-radius: 12px;
  padding: 15px;
  display: flex;
  flex-direction: column; /* Layout vertikal: Gambar atas, Teks bawah */
  gap: 15px;
  transition: transform 0.2s, border-color 0.2s;
  cursor: pointer;
}

.character-card:hover {
  transform: translateY(-5px);
  border-color: #00b894;
  box-shadow: 0 5px 15px rgba(0,0,0,0.3);
}

.card-image-wrapper {
  width: 100%;
  aspect-ratio: 16/9; /* Rasio gambar */
  background: #151d29;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.img-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.char-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.card-info h2 {
  font-family: 'Permanent Marker', cursive;
  font-size: 1.4rem;
  margin: 0 0 5px 0;
  display: flex;
  align-items: center;
  gap: 8px;
}

/* Icon kecil di sebelah nama (titik warna/icon) */
.icon-marker {
  font-size: 0; /* Hide text "Asset" */
  width: 12px;
  height: 12px;
  display: inline-block;
  background-color: currentColor; /* Mengikut warna text parent */
  /* Bentuk icon custom bisa disini */
  mask: url('data:image/svg+xml;utf8,<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2L2 22h20L12 2z"/></svg>') no-repeat center / contain;
  -webkit-mask: url('data:image/svg+xml;utf8,<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2L2 22h20L12 2z"/></svg>') no-repeat center / contain;
  background-color: currentColor;
}

.desc-text {
  font-size: 0.8rem;
  color: #8a9bb0;
  margin: 0;
  line-height: 1.4;
}

/* --- Character Modal --- */
.character-modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  z-index: 100;
}

.character-modal {
  background: #0b111a;
  border: 1px solid #1f2f3f;
  border-radius: 16px;
  width: min(90vw, 600px);
  max-height: 90vh;
  padding: 30px;
  position: relative;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.5);
  overflow-y: auto;
}

.modal-close {
  position: absolute;
  top: 12px;
  right: 12px;
  background: transparent;
  border: none;
  color: #fff;
  font-size: 1.5rem;
  cursor: pointer;
}

.modal-header {
  display: flex;
  gap: 20px;
  align-items: center;
  margin-bottom: 20px;
}

.modal-text h2 {
  margin: 5px 0 0 0;
}

.modal-image {
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: 12px;
  border: 2px solid #1f2f3f;
}

.modal-type {
  text-transform: uppercase;
  letter-spacing: 2px;
  font-size: 0.8rem;
  opacity: 0.7;
  margin-bottom: 5px;
}

.modal-skills h3 {
  margin: 0 0 10px 0;
  font-family: 'Permanent Marker', cursive;
}

.skill-tabs {
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
}

.skill-tab {
  flex: 1;
  border: 1px solid #2c3e50;
  background: transparent;
  color: #cfd6e6;
  padding: 8px 12px;
  border-radius: 999px;
  cursor: pointer;
  font-weight: 600;
  transition: background 0.2s ease, color 0.2s ease, border-color 0.2s ease;
}

.skill-tab.active {
  background: #00b894;
  color: #050a14;
  border-color: #00b894;
}

.modal-skills ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.empty-skills {
  padding: 20px;
  text-align: center;
  color: #8a9bb0;
  border: 1px dashed #2c3e50;
  border-radius: 12px;
  font-style: italic;
}

.modal-skills li {
  background: #101827;
  border: 1px solid #1f2f3f;
  border-radius: 12px;
  padding: 12px 16px;
}

.skill-toggle {
  width: 100%;
  background: transparent;
  border: none;
  color: inherit;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  text-align: left;
  padding: 0;
  cursor: pointer;
}

.skill-toggle:focus-visible {
  outline: 2px solid #00b894;
  border-radius: 8px;
}

.chevron {
  font-size: 1.2rem;
  transition: transform 0.2s ease;
  color: #cfd6e6;
}

.chevron.open {
  transform: rotate(180deg);
}

.skill-pill {
  display: inline-block;
  font-weight: 700;
  color: #00b894;
  margin-bottom: 6px;
}

.modal-skills p {
  margin: 0;
  color: #cfd6e6;
  font-size: 0.9rem;
  line-height: 1.4;
}

.skill-preview-card {
  margin-top: 12px;
  border: 1px solid #2c3e50;
  border-radius: 12px;
  padding: 10px;
  background: #0b111a;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.4);
}

.skill-preview-card img {
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

@media (max-width: 700px) {
  .modal-header {
    flex-direction: column;
    align-items: flex-start;
  }
}

.footer {
  background: #111;
  padding: 20px;
  display: flex;
  justify-content: center;
}

.social-icons {
  display: flex;
  gap: 20px;
}

.icon {
  background: #333;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 10px;
}

.icon.discord,
.icon.roblox {
  width: 64px;
  height: 64px;
  padding: 1px;
  justify-content: center;
  border-radius: 20%;
}
.icon.discord { color: #fff; background: #23272a; }
.icon.roblox { color: white; background: #23272a; }

.social-icon-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  border-radius: 20%;
}

@media (max-width: 1024px) {
  .grid-container {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  .grid-container {
    grid-template-columns: 1fr;
  }
  .header-text h1 { font-size: 2.5rem; }
}
</style>
