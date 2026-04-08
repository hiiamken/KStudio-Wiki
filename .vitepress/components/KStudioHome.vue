<template>
  <div class="ks-page">
    <!-- Video background -->
    <div class="ks-bg-video-wrap">
      <video class="ks-bg-video" autoplay muted loop playsinline preload="auto">
        <source :src="withBase('/assets/backgroundhompage.mp4')" type="video/mp4" />
      </video>
    </div>
    <div class="ks-bg-overlay"></div>

    <div class="ks-inner">
      <!-- Hero -->
      <section class="ks-hero-content">
        <img :src="withBase('/assets/kstudioavanew.png')" alt="KStudio" class="ks-logo" />
        <h1 class="ks-title">
          <span>{{ typed }}</span><span class="ks-cursor" :style="{ opacity: cursorVisible ? 1 : 0 }">|</span>
        </h1>
        <p class="ks-sub">{{ isVI ? 'Tài liệu Plugin' : 'Plugin Documentation' }}</p>
        <p class="ks-tagline">{{ isVI ? 'Plugin Minecraft được làm kỹ để dùng được thực sự, không phải để cho có.' : 'We make Minecraft plugins that server owners actually want to use.' }}</p>
      </section>

      <!-- Stats banner -->
      <section class="ks-stats">
        <div class="ks-stat" v-for="stat in stats" :key="stat.label">
          <span class="ks-stat-value">{{ stat.value }}</span>
          <span class="ks-stat-label">{{ isVI ? stat.labelVI : stat.label }}</span>
        </div>
      </section>

      <!-- Plugin cards -->
      <section class="ks-plugins">
        <a v-for="plugin in plugins" :key="plugin.name"
           :href="plugin.external ? plugin.link : withBase(plugin.link)"
           :target="plugin.external ? '_blank' : undefined"
           class="ks-card">
          <img v-if="plugin.img" :src="withBase(plugin.img)" :alt="plugin.name" class="ks-card-img" />
          <div v-else class="ks-card-icon">{{ plugin.icon }}</div>
          <h3>{{ plugin.name }}</h3>
          <p>{{ isVI ? plugin.descVI : plugin.descEN }}</p>
          <span class="ks-card-link">{{ isVI ? plugin.linkTextVI : plugin.linkTextEN }}</span>
        </a>
      </section>

      <!-- Community -->
      <section class="ks-support">
        <p>{{ isVI ? 'Có câu hỏi hay gặp lỗi?' : 'Have a question or found a bug?' }}</p>
        <a href="http://discord.gg/GGDxDnpnDP" target="_blank" class="ks-discord-btn">{{ isVI ? 'Tham gia Discord' : 'Join the Discord' }}</a>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { withBase, useData } from 'vitepress'

const { lang } = useData()
const isVI = computed(() => lang.value === 'vi')

const typed = ref('')
const cursorVisible = ref(true)

// Live stats — updated from bStats API on mount, falls back to static values
const serverCount = ref('200+')
const playerCount = ref('1,800+')

onMounted(async () => {
  // Typing animation
  const text = 'KStudio'
  const startTyping = () => {
    typed.value = ''
    let i = 0
    const interval = setInterval(() => {
      if (i < text.length) {
        typed.value += text[i++]
      } else {
        clearInterval(interval)
        setTimeout(startTyping, 2000)
      }
    }, 110)
  }
  startTyping()
  setInterval(() => { cursorVisible.value = !cursorVisible.value }, 530)

  // Fetch live bStats data
  try {
    const [serversRes, playersRes] = await Promise.all([
      fetch('https://bstats.org/api/v1/plugins/28036/charts/servers/data/?maxElements=1'),
      fetch('https://bstats.org/api/v1/plugins/28036/charts/players/data/?maxElements=48'),
    ])
    if (serversRes.ok) {
      const serversData = await serversRes.json()
      if (Array.isArray(serversData) && serversData.length > 0) {
        const latest = serversData[serversData.length - 1]
        const count = Array.isArray(latest) ? latest[1] : latest
        if (typeof count === 'number' && count > 0) {
          serverCount.value = count.toLocaleString() + '+'
        }
      }
    }
    if (playersRes.ok) {
      const playersData = await playersRes.json()
      if (Array.isArray(playersData) && playersData.length > 0) {
        // Find peak across recent entries
        let peak = 0
        for (const entry of playersData) {
          const val = Array.isArray(entry) ? entry[1] : entry
          if (typeof val === 'number' && val > peak) peak = val
        }
        if (peak > 0) {
          playerCount.value = peak.toLocaleString() + '+'
        }
      }
    }
  } catch (e) {
    // Silent fallback to static values
  }
})

const stats = computed(() => [
  { value: serverCount.value, label: 'Active Servers', labelVI: 'Server đang dùng' },
  { value: playerCount.value, label: 'Peak Players', labelVI: 'Người chơi cao điểm' },
  { value: '17', label: 'Languages', labelVI: 'Ngôn ngữ' },
  { value: '1.8 – 26.x', label: 'MC Versions', labelVI: 'Phiên bản MC' },
])

// Plugin registry — add new plugins here
const plugins = computed(() => {
  const vi = isVI.value
  return [
    {
      name: 'UltraCoinFlip',
      img: '/assets/ultracoinflipava.png',
      link: vi ? '/vi/ultracoinflip/guide/getting-started' : '/ultracoinflip/guide/getting-started',
      descEN: 'Coinflip plugin with multi-currency support, anti-exploit protection, Discord logging, and Folia compatibility.',
      descVI: 'Plugin coinflip hỗ trợ nhiều loại tiền tệ, chống dupe, ghi log Discord, tương thích Folia.',
      linkTextEN: 'View Docs →',
      linkTextVI: 'Xem tài liệu →',
    },
    {
      name: 'UltraDungeon',
      img: '/assets/ultradungeonava.png',
      link: vi ? '/vi/ultradungeon/guide/getting-started' : '/ultradungeon/guide/getting-started',
      descEN: 'Wave-based dungeon instances with custom bosses, loot, scoring, seasonal leaderboards, and party play.',
      descVI: 'Dungeon theo wave với boss, phần thưởng, mùa giải và party. Thiết lập hoàn toàn trong game.',
      linkTextEN: 'View Docs →',
      linkTextVI: 'Xem tài liệu →',
    },
    {
      name: 'Custom Plugin',
      icon: '✦',
      link: 'http://discord.gg/GGDxDnpnDP',
      external: true,
      descEN: 'Need something tailor-made for your server? We take custom plugin commissions. Reach out on Discord.',
      descVI: 'Cần plugin theo yêu cầu riêng cho server? Nhận làm custom plugin. Liên hệ qua Discord.',
      linkTextEN: 'Contact on Discord →',
      linkTextVI: 'Liên hệ qua Discord →',
    },
  ]
})
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

/* ── Page container ─────────────────────────────────────── */

.ks-page {
  position: relative;
  width: 100%;
  min-height: 100vh;
  overflow: hidden;
  font-family: 'Plus Jakarta Sans', sans-serif;
}

/* ── Video background ───────────────────────────────────── */

.ks-bg-video-wrap {
  position: absolute;
  inset: 0;
  z-index: 0;
  overflow: hidden;
}

.ks-bg-video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: blur(6px);
  opacity: 0.35;
  transform: scale(1.04);
  transition: opacity 0.8s ease;
}

.ks-bg-overlay {
  position: absolute;
  inset: 0;
  background: var(--vp-c-bg);
  opacity: 0.55;
  z-index: 1;
}

/* ── Inner container ────────────────────────────────────── */

.ks-inner {
  position: relative;
  z-index: 2;
  max-width: 960px;
  margin: 0 auto;
  padding: 48px 24px 96px;
}

/* ── Hero section ───────────────────────────────────────── */

.ks-hero-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 56px 0 40px;
}

.ks-logo {
  width: 140px;
  height: 140px;
  border-radius: 28px;
  margin-bottom: 28px;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.22);
  object-fit: contain;
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

/* ── Stats banner ───────────────────────────────────────── */

.ks-stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1px;
  margin: 0 0 28px;
  border-radius: 14px;
  overflow: hidden;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-divider);
}

.ks-stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 12px;
  background: var(--vp-c-bg-soft);
}

.ks-stat-value {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--vp-c-brand-1);
  letter-spacing: -0.01em;
}

.ks-stat-label {
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--vp-c-text-3);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-top: 4px;
}

/* ── Plugin cards ───────────────────────────────────────── */

.ks-plugins {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 16px;
  margin: 0 0 20px;
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
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
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

/* ── Community / support section ────────────────────────── */

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

.ks-discord-btn:hover {
  opacity: 0.85;
}

/* ── Responsive ─────────────────────────────────────────── */

@media (max-width: 720px) {
  .ks-title { font-size: 2.8rem; }
  .ks-plugins { grid-template-columns: 1fr; }
  .ks-stats { grid-template-columns: repeat(2, 1fr); }
  .ks-logo { width: 110px; height: 110px; }
}

@media (max-width: 480px) {
  .ks-title { font-size: 2.2rem; }
  .ks-logo { width: 90px; height: 90px; border-radius: 20px; }
  .ks-stats { grid-template-columns: repeat(2, 1fr); }
  .ks-stat-value { font-size: 1.2rem; }
}
</style>
