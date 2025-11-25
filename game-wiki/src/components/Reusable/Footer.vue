<template>
  <footer class="footer">
    <div class="social-icons">
      <div class="icon discord">
        <img :src="discordIcon" alt="Discord" class="social-icon-img" />
      </div>
      <div class="icon roblox">
        <img :src="robloxIcon" alt="Roblox" class="social-icon-img"/>
      </div>
    </div>
  </footer>
</template>

<script setup>
import discordIcon from '@/assets/img/discord.png';
import robloxIcon from '@/assets/img/roblox.png';
</script>

<style scoped>
.footer {
  background: radial-gradient(circle at top left, #2c3e50 0%, #050a14 40%, #000000 100%);
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
</style>
