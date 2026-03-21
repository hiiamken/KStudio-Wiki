# Getting Started

<div style="display:flex;align-items:center;gap:16px;margin-bottom:16px">
  <img src="/KStudio-Wiki/ultracoinflipava.png" alt="UltraCoinFlip" style="width:72px;height:72px;border-radius:12px"/>
  <div>
    <h2 style="margin:0">UltraCoinFlip</h2>
    <p style="margin:4px 0 8px">The most advanced coinflip plugin for Minecraft</p>
    <a href="https://www.spigotmc.org/resources/%E2%AD%90-ultracoinflip-1-8-x-1-21-11-folia-support.130124/" target="_blank" style="display:inline-block;background:#f87316;color:#fff;padding:5px 14px;border-radius:6px;font-size:0.85rem;font-weight:600;text-decoration:none;margin-right:8px">⬇ SpigotMC</a>
    <a href="https://modrinth.com/plugin/ultracoinflip" target="_blank" style="display:inline-block;background:#1bd96a;color:#fff;padding:5px 14px;border-radius:6px;font-size:0.85rem;font-weight:600;text-decoration:none">⬇ Modrinth</a>
  </div>
</div>

## What is UltraCoinFlip?

UltraCoinFlip is a premium Minecraft coinflip gambling plugin that lets players create and join games, betting their in-game currency against each other. Every flip uses a **cryptographically secure random algorithm** — provably fair, no server manipulation.

Ideal for **economy, survival, skyblock, factions, prison**, or any server looking to boost player engagement.

## Key Features

- **Multi-currency support** — Vault, PlayerPoints, TokenManager, BeastTokens, ExcellentEconomy, CoinsEngine, and PlaceholderAPI custom currencies
- **Database support** — SQLite (default) and MySQL with HikariCP connection pooling
- **Leaderboard system** — Top 15 players, filterable by wins / profit / largest win / winstreak
- **Play with Bot** — Players can flip against a server-controlled bot
- **Dynamic tax system** — Tier-based tax rates per currency
- **Betting limits** — Daily / weekly limits per player per currency
- **Discord webhook** — Post game results to a Discord channel
- **Fully customizable GUI** — Layout, items, colors, animations
- **Security system** — Anti-exploit protection, automatic refunds, backup system
- **Folia compatible** — Full support for Paper Folia server software
- **17 languages** — 🇬🇧 EN 🇻🇳 VI 🇫🇷 FR 🇩🇪 DE 🇷🇺 RU 🇨🇳 ZH 🇪🇸 ES 🇸🇦 AR 🇮🇹 IT and more

## Quick Start

1. Download `UltraCoinFlip.jar` and drop it into your `plugins/` folder
2. Install **Vault** and an economy plugin (EssentialsX, CMI, etc.)
3. Start the server — all config files generate automatically
4. Open the coinflip menu with `/coinflip`

::: tip
Run `/coinflip reload` after editing any config file to apply changes without a server restart.
:::

## Requirements

| Requirement | Version |
|---|---|
| Minecraft Server | 1.8.x – 1.21.x (Spigot / Paper / Folia) |
| Java | 8 or higher |
| Vault | Any recent version |
| Economy Plugin | EssentialsX, CMI, or any Vault-compatible economy |

## Optional Dependencies

| Plugin | Purpose |
|---|---|
| PlaceholderAPI | 40+ placeholders for scoreboards, holograms, etc. |
| PlayerPoints | Use points as coinflip currency |
| TokenManager | Use tokens as coinflip currency |
| BeastTokens | Use beast tokens as coinflip currency |
| ExcellentEconomy | Use ExcellentEconomy currencies (formerly CoinsEngine) |

## Server Stats

[![bStats](https://bstats.org/signatures/bukkit/UltraCoinFlip.svg)](https://bstats.org/plugin/bukkit/UltraCoinFlip)
