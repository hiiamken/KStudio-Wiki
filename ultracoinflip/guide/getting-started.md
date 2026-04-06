# Getting Started

<div style="display:flex;flex-direction:column;align-items:center;padding:20px 0 36px;width:100%">
  <img src="/assets/ultracoinflipava.png" alt="UltraCoinFlip" style="width:160px;height:160px;border-radius:22px;box-shadow:0 8px 28px rgba(0,0,0,0.18)"/>
  <h2 style="margin:20px 0 6px;font-size:1.8rem;font-weight:700">UltraCoinFlip</h2>
  <p style="margin:0 0 22px;color:var(--vp-c-text-2);font-size:1rem">The most advanced coinflip plugin for Minecraft</p>
  <div style="display:flex;gap:12px;flex-wrap:wrap;justify-content:center">
    <a href="https://www.spigotmc.org/resources/%E2%AD%90-ultracoinflip-1-8-x-1-21-11-folia-support.130124/" target="_blank" style="display:inline-block;background:#f97316;color:#fff;padding:11px 30px;border-radius:8px;font-size:0.95rem;font-weight:700;text-decoration:none">Download on SpigotMC</a>
    <a href="https://modrinth.com/plugin/ultracoinflip" target="_blank" style="display:inline-block;background:#18c45d;color:#fff;padding:11px 30px;border-radius:8px;font-size:0.95rem;font-weight:700;text-decoration:none">Download on Modrinth</a>
  </div>
</div>

## What is UltraCoinFlip?

UltraCoinFlip is a premium Minecraft coinflip gambling plugin that lets players create and join games, betting their in-game currency against each other. Every flip uses a **cryptographically secure random algorithm** — provably fair, no server manipulation.

Ideal for **economy, survival, skyblock, factions, prison**, or any server looking to boost player engagement.

## Key Features

- **Multi-currency support** — Vault, PlayerPoints, TokenManager, BeastTokens, ExcellentEconomy, CoinsEngine, and unlimited PlaceholderAPI custom currencies
- **Database support** — SQLite (default) and MySQL with HikariCP connection pooling
- **Leaderboard system** — Top 15 players, filterable by wins / profit / largest win / winstreak / losses
- **Play with Bot** — Players can flip against a server-controlled bot
- **Dynamic tax system** — Flat or tiered tax rates, configurable per currency
- **Betting limits** — Daily / weekly limits per player per currency
- **Discord webhook** — Post game results and game creation notifications with PlaceholderAPI support
- **Round-to-integer** — Option to round winnings for integer-only currencies (tokens, shards, etc.)
- **Event commands** — Run console commands on game create, start, win, lose, or cancel
- **Fully customizable GUI** — Layout, items, colors, 4 animation types (default, slot-machine, circular, vertical)
- **Currency restrictions** — Lock currencies to specific worlds or permissions
- **Security system** — Anti-exploit protection, automatic refunds, backup system
- **60+ PlaceholderAPI placeholders** — Stats, profit tracking, leaderboards, player ranking
- **Folia compatible** — Full support for Paper Folia server software
- **17 languages** — EN, VI, FR, DE, RU, ZH, ES, AR, IT, LT, PT, PL, TR, KO, JA and more

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
| PlaceholderAPI | 60+ placeholders for scoreboards, holograms, etc. |
| PlayerPoints | Use points as coinflip currency |
| TokenManager | Use tokens as coinflip currency |
| BeastTokens | Use beast tokens as coinflip currency |
| ExcellentEconomy | Use ExcellentEconomy currencies (formerly CoinsEngine) |

## Server Stats

[![bStats](https://bstats.org/signatures/bukkit/UltraCoinFlip.svg)](https://bstats.org/plugin/bukkit/UltraCoinFlip)
