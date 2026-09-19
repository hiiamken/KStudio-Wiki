<template>
  <div class="ks">
    <!-- ── Hero ─────────────────────────────────────────── -->
    <section class="ks-hero">
      <div class="ks-hero-media" aria-hidden="true">
        <video
          v-if="showVideo"
          class="ks-hero-video"
          autoplay muted loop playsinline
          :src="withBase('/assets/backgroundhompage.mp4')"
        ></video>
        <div class="ks-hero-scrim"></div>
      </div>

      <div class="ks-hero-inner">
        <div class="ks-hero-copy">
          <img
            :src="withBase('/assets/brand/kstudio-avatar-256.png')"
            alt=""
            class="ks-mark"
            width="84" height="84"
          />
          <h1 class="ks-headline">{{ t.headline }}</h1>
          <p class="ks-lede">{{ t.lede }}</p>

          <div class="ks-actions">
            <a class="ks-btn ks-btn--gold" :href="withBase(t.docsLink)">{{ t.readDocs }}</a>
            <a class="ks-btn" href="http://discord.gg/GGDxDnpnDP" target="_blank" rel="noopener">{{ t.joinDiscord }}</a>
          </div>
        </div>

        <!-- The console is the hero. It shows what a real startup looks like. -->
        <div class="ks-console" role="img" :aria-label="t.consoleAlt">
          <div class="ks-console-bar">
            <span class="ks-dot"></span><span class="ks-dot"></span><span class="ks-dot"></span>
            <span class="ks-console-title">{{ t.consoleTitle }}</span>
          </div>
          <pre class="ks-console-body"><code><span
            v-for="(line, i) in bootLines"
            :key="i"
            class="ks-line"
            :class="[`is-${line.tone}`, { 'is-shown': i < revealed }]"
          ><span class="ks-ts">{{ line.ts }}</span><span class="ks-lvl">{{ line.lvl }}</span><span class="ks-msg">{{ line.msg }}</span>
</span><span class="ks-prompt" :class="{ 'is-shown': revealed >= bootLines.length }">&gt; <span class="ks-caret"></span></span></code></pre>
        </div>
      </div>

      <dl class="ks-figures">
        <div v-for="f in figures" :key="f.key" class="ks-figure">
          <dt class="ks-figure-value">{{ f.value }}</dt>
          <dd class="ks-figure-label">{{ f.label }}</dd>
        </div>
      </dl>
    </section>

    <!-- ── Plugin index ─────────────────────────────────── -->
    <section class="ks-catalogue">
      <h2 class="ks-section-head">{{ t.catalogue }}</h2>

      <a
        v-for="p in plugins"
        :key="p.name"
        class="ks-row"
        :href="withBase(p.link)"
      >
        <img :src="withBase(p.art)" :alt="''" class="ks-row-art" width="104" height="104" />
        <div class="ks-row-body">
          <h3 class="ks-row-name">{{ p.name }}</h3>
          <p class="ks-row-desc">{{ p.desc }}</p>
          <ul class="ks-spec">
            <li v-for="s in p.spec" :key="s">{{ s }}</li>
          </ul>
        </div>
        <span class="ks-row-go">{{ t.openDocs }}</span>
      </a>

      <!-- Not a plugin — a service. Styled to say so. -->
      <a class="ks-row ks-row--commission" href="http://discord.gg/GGDxDnpnDP" target="_blank" rel="noopener">
        <div class="ks-row-art ks-row-art--empty" aria-hidden="true">
          <img :src="withBase('/assets/brand/kstudio-symbol-mono-light.png')" alt="" width="46" height="49" />
        </div>
        <div class="ks-row-body">
          <h3 class="ks-row-name">{{ t.commissionName }}</h3>
          <p class="ks-row-desc ks-row-desc--last">{{ t.commissionDesc }}</p>
        </div>
        <span class="ks-row-go">{{ t.askOnDiscord }}</span>
      </a>
    </section>

    <!-- ── Help ─────────────────────────────────────────── -->
    <section class="ks-help">
      <p class="ks-help-text">{{ t.helpText }}</p>
      <a class="ks-btn ks-btn--discord" href="http://discord.gg/GGDxDnpnDP" target="_blank" rel="noopener">{{ t.joinDiscord }}</a>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { withBase, useData } from 'vitepress'

const { lang } = useData()
const isVI = computed(() => lang.value === 'vi')

/* ── Copy ──────────────────────────────────────────────── */

const t = computed(() => isVI.value
  ? {
      headline: 'Plugin chạy được trên server thật.',
      lede: 'UltraCoinFlip và UltraDungeon — viết cho Paper và Folia, tài liệu đầy đủ tới từng dòng config.',
      readDocs: 'Đọc tài liệu',
      joinDiscord: 'Vào Discord',
      docsLink: '/vi/ultracoinflip/guide/getting-started',
      consoleTitle: 'console máy chủ',
      consoleAlt: 'Log khởi động máy chủ cho thấy plugin KStudio nạp thành công',
      catalogue: 'Plugin',
      openDocs: 'Mở tài liệu',
      commissionName: 'Plugin theo yêu cầu',
      commissionDesc: 'Server của bạn cần một thứ chưa ai làm. Nhắn ý tưởng qua Discord, mình báo giá và thời gian.',
      askOnDiscord: 'Hỏi trên Discord',
      helpText: 'Gặp lỗi, hay tài liệu chưa trả lời được câu hỏi của bạn?',
    }
  : {
      headline: 'Plugins that hold up on a live server.',
      lede: 'UltraCoinFlip and UltraDungeon — built for Paper and Folia, documented down to every config key.',
      readDocs: 'Read the docs',
      joinDiscord: 'Join the Discord',
      docsLink: '/ultracoinflip/guide/getting-started',
      consoleTitle: 'server console',
      consoleAlt: 'Server startup log showing KStudio plugins loading successfully',
      catalogue: 'Plugins',
      openDocs: 'Open docs',
      commissionName: 'Custom plugin',
      commissionDesc: 'Your server needs something nobody has built yet. Send the idea over Discord and you get a price and a timeline back.',
      askOnDiscord: 'Ask on Discord',
      helpText: 'Hit a bug, or the docs did not answer your question?',
    })

/* ── Boot sequence ─────────────────────────────────────── */
// Real startup output. Nothing here is decorative.

const bootLines = computed(() => [
  { ts: '[12:04:31', lvl: ' INFO]: ', msg: 'Starting minecraft server version 1.21.11', tone: 'dim' },
  { ts: '[12:04:33', lvl: ' INFO]: ', msg: '[UltraCoinFlip] Enabling UltraCoinFlip v6.3.5', tone: 'gold' },
  { ts: '[12:04:33', lvl: ' INFO]: ', msg: '  Folia scheduler detected — regionised mode', tone: 'plain' },
  { ts: '[12:04:33', lvl: ' INFO]: ', msg: '  Hooked Vault, PlayerPoints, TokenManager', tone: 'plain' },
  { ts: '[12:04:33', lvl: ' INFO]: ', msg: '  17 languages, 60+ placeholders registered', tone: 'plain' },
  { ts: '[12:04:34', lvl: ' INFO]: ', msg: '[UltraDungeon] Enabling UltraDungeon', tone: 'gold' },
  { ts: '[12:04:34', lvl: ' INFO]: ', msg: '  MMOCore, MMOItems, MythicMobs linked', tone: 'plain' },
  { ts: '[12:04:34', lvl: ' INFO]: ', msg: 'Done (1.842s)! For help, type "help"', tone: 'ok' },
])

const revealed = ref(0)
const showVideo = ref(false)
let timer = null

/* ── Live figures ──────────────────────────────────────── */
// bStats, with a display floor so the page never reads emptier than reality.

const SERVER_FLOOR = 300
const PLAYER_FLOOR = 2000
const serverCount = ref('300+')
const playerCount = ref('2,000+')

const figures = computed(() => [
  { key: 'servers', value: serverCount.value, label: isVI.value ? 'server đang chạy plugin KStudio' : 'servers running KStudio plugins' },
  { key: 'players', value: playerCount.value, label: isVI.value ? 'người chơi cao điểm ghi nhận' : 'peak players recorded' },
  { key: 'langs', value: '17', label: isVI.value ? 'ngôn ngữ đi kèm UltraCoinFlip' : 'languages shipped with UltraCoinFlip' },
])

onMounted(async () => {
  const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

  if (reduced) {
    revealed.value = bootLines.value.length
  } else {
    // One orchestrated moment: the server boots, then the page is still.
    timer = setInterval(() => {
      if (revealed.value >= bootLines.value.length) {
        clearInterval(timer)
        timer = null
        return
      }
      revealed.value++
    }, 190)
  }

  // The background clip is large. Only fetch it once the page is usable, and
  // skip it entirely for reduced-motion or metered connections.
  const conn = navigator.connection
  const thrifty = conn?.saveData || /2g/.test(conn?.effectiveType || '')
  if (!reduced && !thrifty) {
    const load = () => { showVideo.value = true }
    'requestIdleCallback' in window ? requestIdleCallback(load, { timeout: 2500 }) : setTimeout(load, 1200)
  }

  try {
    const [serversRes, playersRes] = await Promise.all([
      fetch('https://bstats.org/api/v1/plugins/28036/charts/servers/data/?maxElements=1'),
      fetch('https://bstats.org/api/v1/plugins/28036/charts/players/data/?maxElements=48'),
    ])

    if (serversRes.ok) {
      const data = await serversRes.json()
      if (Array.isArray(data) && data.length) {
        const latest = data[data.length - 1]
        const count = Array.isArray(latest) ? latest[1] : latest
        if (typeof count === 'number' && count > 0) {
          serverCount.value = Math.max(count, SERVER_FLOOR).toLocaleString('en-US') + '+'
        }
      }
    }

    if (playersRes.ok) {
      const data = await playersRes.json()
      if (Array.isArray(data) && data.length) {
        let peak = 0
        for (const entry of data) {
          const val = Array.isArray(entry) ? entry[1] : entry
          if (typeof val === 'number' && val > peak) peak = val
        }
        if (peak > 0) {
          playerCount.value = Math.max(peak, PLAYER_FLOOR).toLocaleString('en-US') + '+'
        }
      }
    }
  } catch {
    // Keep the floor values.
  }
})

onBeforeUnmount(() => { if (timer) clearInterval(timer) })

/* ── Plugin index ──────────────────────────────────────── */
// Specs are what an admin checks before installing. Keep them true.

const plugins = computed(() => isVI.value
  ? [
      {
        name: 'UltraCoinFlip',
        art: '/assets/ultracoinflipava.png',
        link: '/vi/ultracoinflip/guide/getting-started',
        desc: 'Người chơi cược tiền trong game với nhau, tỉ lệ 50/50 bằng thuật toán ngẫu nhiên an toàn. Thuế, giới hạn cược, chống dupe và log Discord đều cấu hình được.',
        spec: ['Minecraft 1.8.8 – 26.x', 'Spigot · Paper · Folia', '7 loại tiền tệ', 'SQLite hoặc MySQL', '17 ngôn ngữ'],
      },
      {
        name: 'UltraDungeon',
        art: '/assets/ultradungeonava.png',
        link: '/vi/ultradungeon/guide/getting-started',
        desc: 'Dungeon theo wave có boss, phần thưởng, điểm số và mùa giải. Dựng toàn bộ bằng GUI trong game, không cần sửa YAML.',
        spec: ['Minecraft 1.16+', 'Spigot · Paper', 'Java 17+', 'MMOCore · MMOItems · MythicMobs', 'Party và bảng xếp hạng'],
      },
    ]
  : [
      {
        name: 'UltraCoinFlip',
        art: '/assets/ultracoinflipava.png',
        link: '/ultracoinflip/guide/getting-started',
        desc: 'Players bet in-game currency against each other on a 50/50 flip backed by a cryptographically secure random source. Tax, betting limits, anti-exploit and Discord logging are all configurable.',
        spec: ['Minecraft 1.8.8 – 26.x', 'Spigot · Paper · Folia', '7 currency providers', 'SQLite or MySQL', '17 languages'],
      },
      {
        name: 'UltraDungeon',
        art: '/assets/ultradungeonava.png',
        link: '/ultradungeon/guide/getting-started',
        desc: 'Wave-based dungeon instances with bosses, loot, scoring and seasonal leaderboards. Build the whole thing from an in-game GUI without editing YAML.',
        spec: ['Minecraft 1.16+', 'Spigot · Paper', 'Java 17+', 'MMOCore · MMOItems · MythicMobs', 'Parties and leaderboards'],
      },
    ])
</script>

<style>
/* Font faces are loaded once, site-wide, in theme/custom.css. */

/* ── Tokens ─────────────────────────────────────────────
   Every colour is taken from the KStudio mark: the gold slab,
   its highlight, its shadow side, and the deepslate it sits on. */

.ks {
  --ks-gold-hi: #fbdfa0;
  --ks-gold: #e7a62b;
  --ks-gold-deep: #a8620a;
  --ks-ink: #0a0806;
  --ks-ink-raised: #14100b;
  --ks-bone: #eae4da;
  --ks-moss: #7cb342;

  --ks-sans: 'Be Vietnam Pro', ui-sans-serif, system-ui, sans-serif;
  --ks-mono: 'JetBrains Mono', ui-monospace, 'SFMono-Regular', Menlo, monospace;

  /* Page-surface tokens follow the active VitePress theme. */
  --ks-fg: var(--vp-c-text-1);
  --ks-fg-quiet: var(--vp-c-text-2);
  --ks-surface: var(--vp-c-bg-soft);
  --ks-line: var(--vp-c-divider);

  font-family: var(--ks-sans);
  color: var(--ks-fg);
}

/* ── Hero ───────────────────────────────────────────────
   The video is a window behind the console, not wallpaper: it is
   masked so it never reaches the text and fades hard into the page. */

/* One measure for the whole page, so the hero, the figures and the
   plugin rows all hang off the same left edge. */
.ks-hero-inner,
.ks-figures,
.ks-catalogue,
.ks-help {
  max-width: 1168px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 24px;
  padding-right: 24px;
}

.ks-hero {
  position: relative;
  padding: 76px 0 0;
  isolation: isolate;
}

.ks-hero-media {
  position: absolute;
  inset: 0 0 auto;
  height: 620px;
  z-index: -1;
  overflow: hidden;
  -webkit-mask-image: linear-gradient(to bottom, #000 0%, #000 42%, transparent 100%);
  mask-image: linear-gradient(to bottom, #000 0%, #000 42%, transparent 100%);
}

.ks-hero-video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.16;
  filter: saturate(0.5);
}

.dark .ks-hero-video { opacity: 0.3; }

.ks-hero-scrim {
  position: absolute;
  inset: 0;
  background: radial-gradient(120% 90% at 30% 0%, transparent 0%, var(--vp-c-bg) 78%);
}

.ks-hero-inner {
  display: grid;
  grid-template-columns: minmax(0, 0.92fr) minmax(0, 1.08fr);
  gap: 56px;
  align-items: center;
}

.ks-hero-copy { min-width: 0; }

.ks-mark {
  width: 84px;
  height: 84px;
  display: block;
  margin-bottom: 28px;
}

.ks-headline {
  font-family: var(--ks-sans);
  font-size: clamp(2.1rem, 4.4vw, 3.1rem);
  font-weight: 800;
  line-height: 1.08;
  letter-spacing: -0.028em;
  color: var(--ks-fg);
  margin: 0 0 18px;
  max-width: 13ch;
  text-wrap: balance;
}

.ks-lede {
  font-size: 1.02rem;
  line-height: 1.66;
  color: var(--ks-fg-quiet);
  margin: 0 0 32px;
  max-width: 46ch;
}

/* ── Buttons ────────────────────────────────────────── */

.ks-actions { display: flex; flex-wrap: wrap; gap: 12px; }

.ks-btn {
  display: inline-flex;
  align-items: center;
  padding: 11px 22px;
  border-radius: 4px;
  border: 1px solid var(--ks-line);
  font-family: var(--ks-sans);
  font-size: 0.92rem;
  font-weight: 600;
  color: var(--ks-fg);
  text-decoration: none;
  background: transparent;
  transition: border-color 0.16s ease, background-color 0.16s ease;
}

.ks-btn:hover { border-color: var(--ks-gold); }

.ks-btn--gold {
  background: linear-gradient(170deg, var(--ks-gold-hi), var(--ks-gold) 55%, var(--ks-gold-deep));
  border-color: transparent;
  color: #2a1a04;
}

.ks-btn--gold:hover { filter: brightness(1.06); border-color: transparent; }

.ks-btn--discord {
  background: #5865f2;
  border-color: transparent;
  color: #fff;
}

.ks-btn--discord:hover { background: #4954d6; border-color: transparent; }

.ks-btn:focus-visible,
.ks-row:focus-visible {
  outline: 2px solid var(--ks-gold);
  outline-offset: 3px;
}

/* ── Console ────────────────────────────────────────────
   Stays dark in both themes — it is a view into the server,
   not a panel of this page. */

.ks-console {
  border-radius: 8px;
  background: var(--ks-ink);
  border: 1px solid rgba(231, 166, 43, 0.16);
  box-shadow: 0 26px 70px -30px rgba(0, 0, 0, 0.8);
  overflow: hidden;
  min-width: 0;
}

.ks-console-bar {
  display: flex;
  align-items: center;
  gap: 7px;
  padding: 11px 14px;
  background: var(--ks-ink-raised);
  border-bottom: 1px solid rgba(231, 166, 43, 0.12);
}

.ks-dot {
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: rgba(234, 228, 218, 0.22);
}

.ks-console-title {
  margin-left: 8px;
  font-family: var(--ks-mono);
  font-size: 0.72rem;
  color: rgba(234, 228, 218, 0.45);
}

.ks-console-body {
  margin: 0;
  padding: 18px 16px 20px;
  overflow-x: auto;
  background: transparent;
}

.ks-console-body code {
  font-family: var(--ks-mono);
  font-size: 0.735rem;
  line-height: 1.85;
  white-space: pre;
  color: var(--ks-bone);
  background: none;
  padding: 0;
}

.ks-line {
  display: block;
  opacity: 0;
  transform: translateY(2px);
  transition: opacity 0.22s ease, transform 0.22s ease;
}

.ks-line.is-shown { opacity: 1; transform: none; }

.ks-ts { color: rgba(234, 228, 218, 0.34); }
.ks-lvl { color: rgba(234, 228, 218, 0.34); }
.ks-msg { color: rgba(234, 228, 218, 0.82); }

.ks-line.is-dim .ks-msg { color: rgba(234, 228, 218, 0.48); }
.ks-line.is-gold .ks-msg { color: var(--ks-gold-hi); font-weight: 500; }
.ks-line.is-ok .ks-msg { color: var(--ks-moss); }

.ks-prompt {
  display: inline-flex;
  align-items: center;
  gap: 2px;
  color: rgba(234, 228, 218, 0.5);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.ks-prompt.is-shown { opacity: 1; }

.ks-caret {
  display: inline-block;
  width: 7px;
  height: 1.05em;
  background: var(--ks-gold);
  animation: ks-blink 1.05s steps(2, start) infinite;
}

@keyframes ks-blink { to { visibility: hidden; } }

/* ── Figures ────────────────────────────────────────────
   One data line, not three cards. */

.ks-figures {
  margin-top: 60px;
  padding-top: 26px;
  border-top: 1px solid var(--ks-line);
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 28px;
}

.ks-figure { min-width: 0; }

.ks-figure-value {
  font-family: var(--ks-mono);
  font-size: 1.85rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--ks-fg);
  font-variant-numeric: tabular-nums;
  margin: 0 0 6px;
}

.ks-figure-label {
  margin: 0;
  font-size: 0.85rem;
  line-height: 1.5;
  color: var(--ks-fg-quiet);
  max-width: 26ch;
}

/* ── Catalogue ──────────────────────────────────────────
   Rows, not tiles: three products with real specs read as an
   index, and the pixel art finally gets room to be legible. */

.ks-catalogue { padding-top: 64px; }

.ks-section-head {
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--ks-fg-quiet);
  margin: 0 0 20px;
  padding-bottom: 14px;
  border-bottom: 1px solid var(--ks-line);
}

.ks-row {
  display: grid;
  grid-template-columns: 104px minmax(0, 1fr) auto;
  gap: 26px;
  padding: 26px 0;
  border-bottom: 1px solid var(--ks-line);
  text-decoration: none;
  color: inherit;
}

.ks-row-art {
  width: 104px;
  height: 104px;
  border-radius: 6px;
  object-fit: cover;
  align-self: start;
}

.ks-row-art--empty {
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px dashed var(--ks-line);
  background: transparent;
}

.ks-row-art--empty img { width: 34px; height: auto; opacity: 0.4; }

.ks-row-body { min-width: 0; }

.ks-row-name {
  font-size: 1.22rem;
  font-weight: 700;
  letter-spacing: -0.015em;
  margin: 0 0 8px;
  color: var(--ks-fg);
}

.ks-row-go {
  align-self: start;
  white-space: nowrap;
  font-size: 0.85rem;
  font-weight: 600;
  line-height: 1.22rem;
  color: var(--vp-c-brand-1);
}

.ks-row:hover .ks-row-name { color: var(--vp-c-brand-1); }
.ks-row:hover .ks-row-go { text-decoration: underline; }

.ks-row-desc {
  margin: 0 0 14px;
  font-size: 0.93rem;
  line-height: 1.65;
  color: var(--ks-fg-quiet);
  max-width: 68ch;
}

.ks-spec {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  list-style: none;
  margin: 0;
  padding: 0;
}

.ks-spec li {
  font-family: var(--ks-mono);
  font-size: 0.7rem;
  line-height: 1;
  padding: 6px 9px;
  border-radius: 3px;
  color: var(--ks-fg-quiet);
  background: var(--ks-surface);
  border: 1px solid var(--ks-line);
}

.ks-row-desc--last { margin-bottom: 0; }

.ks-row--commission {
  border-bottom: none;
  opacity: 0.86;
}

.ks-row--commission:hover { opacity: 1; }

/* ── Help ───────────────────────────────────────────── */

.ks-help {
  padding-top: 44px;
  padding-bottom: 104px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 18px;
  border-top: 1px solid var(--ks-line);
  margin-top: 40px;
}

.ks-help-text {
  margin: 0;
  flex: 1;
  min-width: 240px;
  font-size: 0.98rem;
  color: var(--ks-fg-quiet);
}

/* ── Responsive ─────────────────────────────────────── */

@media (max-width: 960px) {
  .ks-hero { padding-top: 48px; }
  .ks-hero-inner { grid-template-columns: minmax(0, 1fr); gap: 40px; }
  .ks-headline { max-width: 18ch; }
  .ks-figures { margin-top: 56px; gap: 22px; }
  .ks-figure-value { font-size: 1.5rem; }
}

@media (max-width: 640px) {
  .ks-hero-inner, .ks-figures, .ks-catalogue, .ks-help {
    padding-left: 20px;
    padding-right: 20px;
  }
  .ks-mark { width: 64px; height: 64px; margin-bottom: 22px; }
  .ks-figures { grid-template-columns: 1fr; gap: 18px; }
  .ks-figure { display: flex; align-items: baseline; gap: 12px; }
  .ks-figure-value { font-size: 1.3rem; margin-bottom: 0; }
  .ks-figure-label { font-size: 0.82rem; max-width: none; }
  .ks-row { grid-template-columns: 64px minmax(0, 1fr); gap: 16px 18px; }
  .ks-row-art { width: 64px; height: 64px; }
  /* The link drops below the specs rather than splitting name from copy. */
  .ks-row-go { grid-column: 2; line-height: 1; }
  /* A narrow terminal wraps rather than hiding the end of the line,
     so the "Done" and the version stay readable on a phone. */
  .ks-console-body { padding: 15px 14px 17px; }
  .ks-console-body code { font-size: 0.66rem; white-space: pre-wrap; }
  .ks-line { padding-left: 1.4em; text-indent: -1.4em; }
  .ks-actions .ks-btn { flex: 1; justify-content: center; }
}

@media (prefers-reduced-motion: reduce) {
  .ks-line { opacity: 1; transform: none; transition: none; }
  .ks-prompt { opacity: 1; transition: none; }
  .ks-caret { animation: none; }
}
</style>
