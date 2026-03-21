---
layout: page
---

<script setup>
import { ref, onMounted } from 'vue'
import { withBase } from 'vitepress'

const typed = ref('')
const cursor = ref(true)
const done = ref(false)

onMounted(() => {
  const text = 'KStudio'
  let i = 0
  const typing = setInterval(() => {
    if (i < text.length) {
      typed.value += text[i++]
    } else {
      clearInterval(typing)
      done.value = true
    }
  }, 110)
  setInterval(() => { cursor.value = !cursor.value }, 530)
})
</script>

<div class="ks-page">

  <section class="ks-hero">
    <img :src="withBase('/kstudioavanew.png')" alt="KStudio" class="ks-logo" />
    <h1 class="ks-title">
      <span class="ks-typed">{{ typed }}</span><span class="ks-cursor" :style="{ opacity: cursor ? 1 : 0 }">|</span>
    </h1>
    <p class="ks-sub">Plugin Documentation</p>
    <p class="ks-tagline">We make Minecraft plugins that server owners actually want to use.</p>
    <div class="ks-cta">
      <a :href="withBase('/ultracoinflip/guide/getting-started')" class="ks-btn primary">UltraCoinFlip</a>
      <a :href="withBase('/ultradungeon/guide/getting-started')" class="ks-btn secondary">UltraDungeon</a>
    </div>
  </section>

  <section class="ks-plugins">
    <a :href="withBase('/ultracoinflip/guide/getting-started')" class="ks-card">
      <img :src="withBase('/ultracoinflipava.png')" alt="UltraCoinFlip" class="ks-card-img" />
      <div class="ks-card-body">
        <h3>UltraCoinFlip</h3>
        <p>Coinflip plugin with multi-currency support, anti-exploit protection, Discord logging, and Folia compatibility. Runs on Spigot, Paper and Folia from 1.8 to 1.21.</p>
        <span class="ks-card-link">View Docs →</span>
      </div>
    </a>
    <a :href="withBase('/ultradungeon/guide/getting-started')" class="ks-card">
      <img :src="withBase('/ultradungeonava.png')" alt="UltraDungeon" class="ks-card-img" />
      <div class="ks-card-body">
        <h3>UltraDungeon</h3>
        <p>Wave-based dungeon instances with custom bosses, loot, scoring, seasonal leaderboards, and party play. Built and configured entirely in-game.</p>
        <span class="ks-card-link">View Docs →</span>
      </div>
    </a>
  </section>

  <section class="ks-support">
    <p>Have a question or found a bug?</p>
    <a href="http://discord.gg/GGDxDnpnDP" target="_blank" class="ks-discord-btn">Join the Discord</a>
  </section>

</div>

<style>
@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@700;900&family=Inter:wght@400;500;600&display=swap');

.ks-page {
  max-width: 900px;
  margin: 0 auto;
  padding: 48px 24px 96px;
}

.ks-hero {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 56px 0 72px;
}

.ks-logo {
  width: 104px;
  height: 104px;
  border-radius: 22px;
  margin-bottom: 32px;
  box-shadow: 0 10px 36px rgba(0,0,0,0.16);
}

.ks-title {
  font-family: 'Cinzel', serif;
  font-size: 3.8rem;
  font-weight: 900;
  letter-spacing: 0.06em;
  line-height: 1.1;
  margin: 0 0 12px;
  background: linear-gradient(135deg, #c97c10 0%, #f5c842 45%, #e8a020 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.ks-cursor {
  display: inline-block;
  font-weight: 300;
  transition: opacity 0.15s;
  background: none;
  -webkit-text-fill-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
}

.ks-sub {
  font-family: 'Cinzel', serif;
  font-size: 0.95rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--vp-c-text-2);
  margin: 0 0 18px;
}

.ks-tagline {
  font-family: 'Inter', sans-serif;
  font-size: 1.1rem;
  color: var(--vp-c-text-2);
  max-width: 480px;
  line-height: 1.7;
  margin: 0 0 36px;
}

.ks-cta {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  justify-content: center;
}

.ks-btn {
  font-family: 'Inter', sans-serif;
  display: inline-block;
  padding: 11px 30px;
  border-radius: 8px;
  font-size: 0.95rem;
  font-weight: 600;
  text-decoration: none;
  transition: opacity 0.2s, transform 0.15s;
}
.ks-btn:hover { opacity: 0.82; transform: translateY(-1px); }
.ks-btn.primary { background: var(--vp-button-brand-bg); color: var(--vp-button-brand-text); }
.ks-btn.secondary { background: var(--vp-button-alt-bg); color: var(--vp-button-alt-text); }

.ks-plugins {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 18px;
  margin-bottom: 20px;
}

.ks-card {
  display: flex;
  gap: 18px;
  align-items: flex-start;
  padding: 24px;
  border-radius: 12px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  text-decoration: none;
  transition: border-color 0.2s, transform 0.2s, box-shadow 0.2s;
}
.ks-card:hover {
  border-color: var(--vp-c-brand-1);
  transform: translateY(-3px);
  box-shadow: 0 10px 28px rgba(0,0,0,0.09);
}

.ks-card-img {
  width: 60px;
  height: 60px;
  border-radius: 12px;
  flex-shrink: 0;
}

.ks-card-body { flex: 1; }
.ks-card-body h3 {
  font-family: 'Inter', sans-serif;
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
  margin: 0 0 8px;
}
.ks-card-body p {
  font-size: 0.875rem;
  color: var(--vp-c-text-2);
  line-height: 1.65;
  margin: 0 0 14px;
}
.ks-card-link {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--vp-c-brand-1);
}

.ks-support {
  text-align: center;
  padding: 44px 24px;
  margin-top: 20px;
  border-radius: 12px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
}
.ks-support p {
  font-family: 'Inter', sans-serif;
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
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 0.95rem;
  text-decoration: none;
  transition: opacity 0.2s;
}
.ks-discord-btn:hover { opacity: 0.85; }

@media (max-width: 640px) {
  .ks-title { font-size: 2.6rem; }
  .ks-plugins { grid-template-columns: 1fr; }
  .ks-card { flex-direction: column; }
}
</style>
