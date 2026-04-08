import { defineConfig } from 'vitepress'

// ── Shared sidebar definitions ──────────────────────────────────────
// Config pages share the same sidebar as guide pages so navigation
// stays consistent regardless of which section the reader is viewing.

const ultradungeonSidebar_en = [
  {
    text: 'Introduction',
    items: [
      { text: 'Getting Started', link: '/ultradungeon/guide/getting-started' },
      { text: 'Installation', link: '/ultradungeon/guide/installation' },
      { text: 'Commands', link: '/ultradungeon/guide/commands' },
      { text: 'Permissions', link: '/ultradungeon/guide/permissions' },
      { text: 'PlaceholderAPI', link: '/ultradungeon/guide/placeholderapi' },
    ],
  },
  {
    text: 'Dungeon Setup',
    items: [
      { text: 'Creating a Dungeon', link: '/ultradungeon/guide/creating-dungeon' },
      { text: 'Waves & Mobs', link: '/ultradungeon/guide/waves' },
      { text: 'Boss System', link: '/ultradungeon/guide/boss' },
      { text: 'Rewards', link: '/ultradungeon/guide/rewards' },
      { text: 'Checkpoints', link: '/ultradungeon/guide/checkpoints' },
      { text: 'Gates & Loot Chests', link: '/ultradungeon/guide/gates-lootchests' },
      { text: 'Difficulty', link: '/ultradungeon/guide/difficulty' },
    ],
  },
  {
    text: 'Features',
    items: [
      { text: 'Ticket System', link: '/ultradungeon/guide/tickets' },
      { text: 'Progression System', link: '/ultradungeon/guide/progression' },
      { text: 'Party System', link: '/ultradungeon/guide/party' },
      { text: 'Scoring & Leaderboard', link: '/ultradungeon/guide/scoring' },
      { text: 'Season System', link: '/ultradungeon/guide/seasons' },
    ],
  },
  {
    text: 'Integrations',
    items: [
      { text: 'Vault (Economy)', link: '/ultradungeon/guide/vault' },
      { text: 'MMOItems', link: '/ultradungeon/guide/mmoitems' },
      { text: 'MMOCore', link: '/ultradungeon/guide/mmocore' },
      { text: 'ItemsAdder / Oraxen', link: '/ultradungeon/guide/custom-items' },
    ],
  },
  {
    text: 'Configuration',
    items: [
      { text: 'config.yml', link: '/ultradungeon/config/config-yml' },
      { text: 'Room Files', link: '/ultradungeon/config/room-files' },
      { text: 'Language Files', link: '/ultradungeon/config/language' },
      { text: 'GUI Config', link: '/ultradungeon/config/gui' },
    ],
  },
]

const ultracoinflipSidebar_en = [
  {
    text: 'Introduction',
    items: [
      { text: 'Getting Started', link: '/ultracoinflip/guide/getting-started' },
      { text: 'Installation', link: '/ultracoinflip/guide/installation' },
      { text: 'Commands', link: '/ultracoinflip/guide/commands' },
      { text: 'Permissions', link: '/ultracoinflip/guide/permissions' },
      { text: 'PlaceholderAPI', link: '/ultracoinflip/guide/placeholderapi' },
    ],
  },
  {
    text: 'Currency Setup',
    items: [
      { text: 'Currency Overview', link: '/ultracoinflip/guide/currencies' },
      { text: 'Vault / EssentialsX', link: '/ultracoinflip/guide/currency-vault' },
      { text: 'PlayerPoints', link: '/ultracoinflip/guide/currency-playerpoints' },
      { text: 'ExcellentEconomy', link: '/ultracoinflip/guide/currency-excellenteconomy' },
      { text: 'BeastTokens', link: '/ultracoinflip/guide/currency-beasttokens' },
      { text: 'TokenManager', link: '/ultracoinflip/guide/currency-tokenmanager' },
      { text: 'Custom (PlaceholderAPI)', link: '/ultracoinflip/guide/currency-customplaceholder' },
    ],
  },
  {
    text: 'Features',
    items: [
      { text: 'Play with Bot', link: '/ultracoinflip/guide/bot-game' },
      { text: 'Tax System', link: '/ultracoinflip/guide/tax' },
      { text: 'Betting Limits', link: '/ultracoinflip/guide/betting-limits' },
      { text: 'Discord Webhook', link: '/ultracoinflip/guide/discord' },
      { text: 'Security & Anti-Exploit', link: '/ultracoinflip/guide/security' },
    ],
  },
  {
    text: 'Configuration',
    items: [
      { text: 'config.yml', link: '/ultracoinflip/config/config-yml' },
      { text: 'Currency Files', link: '/ultracoinflip/config/currencies' },
    ],
  },
]

const ultradungeonSidebar_vi = [
  {
    text: 'Giới thiệu',
    items: [
      { text: 'Bắt đầu', link: '/vi/ultradungeon/guide/getting-started' },
      { text: 'Cài đặt', link: '/vi/ultradungeon/guide/installation' },
      { text: 'Lệnh', link: '/vi/ultradungeon/guide/commands' },
      { text: 'Quyền', link: '/vi/ultradungeon/guide/permissions' },
      { text: 'PlaceholderAPI', link: '/vi/ultradungeon/guide/placeholderapi' },
    ],
  },
  {
    text: 'Thiết lập Dungeon',
    items: [
      { text: 'Tạo Dungeon', link: '/vi/ultradungeon/guide/creating-dungeon' },
      { text: 'Waves & Mobs', link: '/vi/ultradungeon/guide/waves' },
      { text: 'Hệ thống Boss', link: '/vi/ultradungeon/guide/boss' },
      { text: 'Phần thưởng', link: '/vi/ultradungeon/guide/rewards' },
      { text: 'Checkpoints', link: '/vi/ultradungeon/guide/checkpoints' },
      { text: 'Gates & Loot Chests', link: '/vi/ultradungeon/guide/gates-lootchests' },
      { text: 'Độ khó', link: '/vi/ultradungeon/guide/difficulty' },
    ],
  },
  {
    text: 'Tính năng',
    items: [
      { text: 'Hệ thống Ticket', link: '/vi/ultradungeon/guide/tickets' },
      { text: 'Hệ thống Progression', link: '/vi/ultradungeon/guide/progression' },
      { text: 'Hệ thống Party', link: '/vi/ultradungeon/guide/party' },
      { text: 'Điểm & Bảng xếp hạng', link: '/vi/ultradungeon/guide/scoring' },
      { text: 'Hệ thống Season', link: '/vi/ultradungeon/guide/seasons' },
    ],
  },
  {
    text: 'Tích hợp',
    items: [
      { text: 'Vault (Economy)', link: '/vi/ultradungeon/guide/vault' },
      { text: 'MMOItems', link: '/vi/ultradungeon/guide/mmoitems' },
      { text: 'MMOCore', link: '/vi/ultradungeon/guide/mmocore' },
      { text: 'ItemsAdder / Oraxen', link: '/vi/ultradungeon/guide/custom-items' },
    ],
  },
  {
    text: 'Cấu hình',
    items: [
      { text: 'config.yml', link: '/vi/ultradungeon/config/config-yml' },
      { text: 'Room Files', link: '/vi/ultradungeon/config/room-files' },
      { text: 'Language Files', link: '/vi/ultradungeon/config/language' },
      { text: 'GUI Config', link: '/vi/ultradungeon/config/gui' },
    ],
  },
]

const ultracoinflipSidebar_vi = [
  {
    text: 'Giới thiệu',
    items: [
      { text: 'Bắt đầu', link: '/vi/ultracoinflip/guide/getting-started' },
      { text: 'Cài đặt', link: '/vi/ultracoinflip/guide/installation' },
      { text: 'Lệnh', link: '/vi/ultracoinflip/guide/commands' },
      { text: 'Quyền', link: '/vi/ultracoinflip/guide/permissions' },
      { text: 'PlaceholderAPI', link: '/vi/ultracoinflip/guide/placeholderapi' },
    ],
  },
  {
    text: 'Cài đặt tiền tệ',
    items: [
      { text: 'Tổng quan tiền tệ', link: '/vi/ultracoinflip/guide/currencies' },
      { text: 'Vault / EssentialsX', link: '/vi/ultracoinflip/guide/currency-vault' },
      { text: 'PlayerPoints', link: '/vi/ultracoinflip/guide/currency-playerpoints' },
      { text: 'ExcellentEconomy', link: '/vi/ultracoinflip/guide/currency-excellenteconomy' },
      { text: 'BeastTokens', link: '/vi/ultracoinflip/guide/currency-beasttokens' },
      { text: 'TokenManager', link: '/vi/ultracoinflip/guide/currency-tokenmanager' },
      { text: 'Custom (PlaceholderAPI)', link: '/vi/ultracoinflip/guide/currency-customplaceholder' },
    ],
  },
  {
    text: 'Tính năng',
    items: [
      { text: 'Chơi với Bot', link: '/vi/ultracoinflip/guide/bot-game' },
      { text: 'Hệ thống thuế', link: '/vi/ultracoinflip/guide/tax' },
      { text: 'Giới hạn cược', link: '/vi/ultracoinflip/guide/betting-limits' },
      { text: 'Discord Webhook', link: '/vi/ultracoinflip/guide/discord' },
      { text: 'Bảo mật & Chống gian lận', link: '/vi/ultracoinflip/guide/security' },
    ],
  },
  {
    text: 'Cấu hình',
    items: [
      { text: 'config.yml', link: '/vi/ultracoinflip/config/config-yml' },
      { text: 'Currency Files', link: '/vi/ultracoinflip/config/currencies' },
    ],
  },
]

// ── VitePress config ────────────────────────────────────────────────

export default defineConfig({
  title: 'KStudio Docs',
  description: 'Official documentation for KStudio Minecraft plugins',
  base: '/KStudio-Wiki/',
  ignoreDeadLinks: true,

  head: [
    ['link', { rel: 'icon', href: '/KStudio-Wiki/favicon.ico' }],
  ],

  locales: {
    root: {
      label: 'English',
      lang: 'en',
      themeConfig: {
        nav: [
          { text: 'Home', link: '/' },
          {
            text: 'Plugins',
            items: [
              { text: 'UltraCoinFlip', link: '/ultracoinflip/guide/getting-started' },
              { text: 'UltraDungeon', link: '/ultradungeon/guide/getting-started' },
            ],
          },
        ],
        sidebar: {
          '/ultradungeon/guide/': ultradungeonSidebar_en,
          '/ultradungeon/config/': ultradungeonSidebar_en,
          '/ultracoinflip/guide/': ultracoinflipSidebar_en,
          '/ultracoinflip/config/': ultracoinflipSidebar_en,
        },
      },
    },

    vi: {
      label: 'Tiếng Việt',
      lang: 'vi',
      link: '/vi/',
      themeConfig: {
        nav: [
          { text: 'Trang chủ', link: '/vi/' },
          {
            text: 'Plugins',
            items: [
              { text: 'UltraCoinFlip', link: '/vi/ultracoinflip/guide/getting-started' },
              { text: 'UltraDungeon', link: '/vi/ultradungeon/guide/getting-started' },
            ],
          },
        ],
        sidebar: {
          '/vi/ultradungeon/guide/': ultradungeonSidebar_vi,
          '/vi/ultradungeon/config/': ultradungeonSidebar_vi,
          '/vi/ultracoinflip/guide/': ultracoinflipSidebar_vi,
          '/vi/ultracoinflip/config/': ultracoinflipSidebar_vi,
        },
        outline: { label: 'Mục lục' },
        docFooter: { prev: 'Trang trước', next: 'Trang tiếp' },
        darkModeSwitchLabel: 'Giao diện',
        sidebarMenuLabel: 'Menu',
        returnToTopLabel: 'Về đầu trang',
      },
    },
  },

  themeConfig: {
    logo: '/assets/kstudioavanew.png',
    siteTitle: 'KStudio',

    socialLinks: [
      { icon: 'github', link: 'https://github.com/hiiamken' },
      { icon: 'discord', link: 'http://discord.gg/GGDxDnpnDP' },
    ],

    search: {
      provider: 'local',
    },

    footer: {
      message: 'KStudio Plugin Documentation',
      copyright: '© 2026 KStudio — MineKeo',
    },

    outline: { level: [2, 3] },
  },
})
