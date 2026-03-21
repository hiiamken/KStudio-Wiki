---
layout: page
---

<script setup>
import { ref, onMounted } from 'vue'
import { withBase } from 'vitepress'

const typed = ref('')
const cursor = ref(true)

onMounted(() => {
  const text = 'KStudio'
  const startTyping = () => {
    typed.value = ''
    let i = 0
    const interval = setInterval(() => {
      if (i < text.length) {
        typed.value += text[i++]
      } else {
        clearInterval(interval)
        setTimeout(startTyping, 5000)
      }
    }, 110)
  }
  startTyping()
  setInterval(() => { cursor.value = !cursor.value }, 530)
})
</script>

<div class="ks-page">

  <section class="ks-hero">
    <div class="ks-bg-anim"></div>
    <div class="ks-bg-overlay"></div>
    <div class="ks-hero-content">
      <img :src="withBase('/assets/kstudioavanew.png')" alt="KStudio" class="ks-logo" />
      <h1 class="ks-title">
        <span>{{ typed }}</span><span class="ks-cursor" :style="{ opacity: cursor ? 1 : 0 }">|</span>
      </h1>
      <p class="ks-sub">Plugin Documentation</p>
      <p class="ks-tagline">We make Minecraft plugins that server owners actually want to use.</p>
    </div>
  </section>

  <section class="ks-plugins">
    <a :href="withBase('/ultracoinflip/guide/getting-started')" class="ks-card">
      <img :src="withBase('/assets/ultracoinflipava.png')" alt="UltraCoinFlip" class="ks-card-img" />
      <h3>UltraCoinFlip</h3>
      <p>Coinflip plugin with multi-currency support, anti-exploit protection, Discord logging, and Folia compatibility. Runs on Spigot, Paper and Folia from 1.8 to 1.21.</p>
      <span class="ks-card-link">View Docs →</span>
    </a>
    <a :href="withBase('/ultradungeon/guide/getting-started')" class="ks-card">
      <img :src="withBase('/assets/ultradungeonava.png')" alt="UltraDungeon" class="ks-card-img" />
      <h3>UltraDungeon</h3>
      <p>Wave-based dungeon instances with custom bosses, loot, scoring, seasonal leaderboards, and party play. Built and configured entirely in-game.</p>
      <span class="ks-card-link">View Docs →</span>
    </a>
    <a href="http://discord.gg/GGDxDnpnDP" target="_blank" class="ks-card ks-card-custom">
      <div class="ks-card-icon">✦</div>
      <h3>Custom Plugin</h3>
      <p>Need something tailor-made for your server? We take custom plugin commissions. Reach out on Discord for pricing and details.</p>
      <span class="ks-card-link">Contact on Discord →</span>
    </a>
  </section>

  <section class="ks-support">
    <p>Have a question or found a bug?</p>
    <a href="http://discord.gg/GGDxDnpnDP" target="_blank" class="ks-discord-btn">Join the Discord</a>
  </section>

</div>

<style>
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

.ks-page {
  max-width: 960px;
  margin: 0 auto;
  padding: 0 24px 96px;
  font-family: 'Plus Jakarta Sans', sans-serif;
}

.ks-hero {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 500px;
  margin: 0 -24px;
  overflow: hidden;
}

.ks-bg-anim {
  position: absolute;
  inset: 0;
  background: linear-gradient(-45deg, rgba(201,124,16,0.18), rgba(245,200,66,0.1), rgba(88,101,242,0.08), rgba(201,124,16,0.14));
  background-size: 400% 400%;
  animation: ks-grad 10s ease infinite;
  z-index: 0;
}
@keyframes ks-grad {
  0%   { background-position: 0% 50%; }
  50%  { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.ks-bg-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    var(--vp-c-bg) 0%,
    transparent 18%,
    transparent 75%,
    var(--vp-c-bg) 100%
  );
  z-index: 1;
}

.ks-hero-content {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 56px 24px 64px;
}

.ks-logo {
  width: 100px;
  height: 100px;
  border-radius: 22px;
  margin-bottom: 28px;
  box-shadow: 0 12px 40px rgba(0,0,0,0.22);
}

.ks-title {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 4rem;
  font-weight: 800;
  letter-spacing: -0.02em;
  line-height: 1.05;
  margin: 0 0 10px;
  background: linear-gradient(135deg, #c97c10 0%, #f5c842 45%, #e8a020 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.ks-cursor {
  display: inline-block;
  font-weight: 300;
  transition: opacity 0.1s;
  -webkit-text-fill-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
}

.ks-sub {
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--vp-c-text-2);
  margin: 0 0 16px;
}

.ks-tagline {
  font-size: 1.05rem;
  font-weight: 400;
  color: var(--vp-c-text-2);
  max-width: 440px;
  line-height: 1.7;
  margin: 0;
}

.ks-plugins {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 16px;
  margin: 40px 0 20px;
}

.ks-card {
  display: flex;
  flex-direction: column;
  padding: 24px;
  border-radius: 14px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  text-decoration: none;
  transition: border-color 0.2s, transform 0.2s, box-shadow 0.2s;
}
.ks-card:hover {
  border-color: var(--vp-c-brand-1);
  transform: translateY(-3px);
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
}

.ks-card-img {
  width: 54px;
  height: 54px;
  border-radius: 12px;
  margin-bottom: 16px;
  flex-shrink: 0;
}

.ks-card-icon {
  width: 54px;
  height: 54px;
  border-radius: 12px;
  margin-bottom: 16px;
  background: linear-gradient(135deg, #c97c10, #f5c842);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.4rem;
  color: #fff;
  flex-shrink: 0;
}

.ks-card h3 {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 1rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
  margin: 0 0 8px;
}

.ks-card p {
  font-size: 0.845rem;
  color: var(--vp-c-text-2);
  line-height: 1.65;
  margin: 0 0 16px;
  flex: 1;
}

.ks-card-link {
  font-size: 0.845rem;
  font-weight: 600;
  color: var(--vp-c-brand-1);
  margin-top: auto;
}

.ks-support {
  text-align: center;
  padding: 44px 24px;
  margin-top: 4px;
  border-radius: 14px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
}
.ks-support p {
  font-size: 1rem;
  color: var(--vp-c-text-2);
  margin: 0 0 18px;
}
.ks-discord-btn {
  display: inline-block;
  padding: 11px 28px;
  border-radius: 8px;
  background: #5865f2;
  color: #fff !important;
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-weight: 600;
  font-size: 0.95rem;
  text-decoration: none;
  transition: opacity 0.2s;
}
.ks-discord-btn:hover { opacity: 0.85; }

@media (max-width: 720px) {
  .ks-title { font-size: 2.8rem; }
  .ks-plugins { grid-template-columns: 1fr; }
}
@media (max-width: 480px) {
  .ks-title { font-size: 2.2rem; }
}
</style>
