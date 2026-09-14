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

UltraCoinFlip is a premium Minecraft coinflip gambling plugin that lets players create and join games, betting their in-game currency against each other. Every flip uses a **cryptographically secure random algorithm** — a fair 50/50, no server manipulation.

Ideal for **economy, survival, skyblock, factions, prison**, or any server looking to boost player engagement.

## Key Features

- **[Multi-currency support](/ultracoinflip/guide/currencies)** — Vault, PlayerPoints, TokenManager, BeastTokens, ExcellentEconomy, CoinsEngine, and unlimited PlaceholderAPI custom currencies
- **Database support** — SQLite (default) and MySQL with HikariCP connection pooling
- **Leaderboard system** — Top players (16 by default), filterable by wins / profit / largest win / worst profit / winstreak
- **[Play with Bot](/ultracoinflip/guide/bot-game)** — Players can flip against a server-controlled bot
- **[Private coinflips & invites](/ultracoinflip/guide/private-and-invites)** — Invite-only games with clickable Accept/Deny invites in chat
- **Multiple coinflips per player** — Let players host several games at once, with higher limits per permission
- **Heads or tails** — Optionally let players pick a side before their game is created
- **[Dynamic tax system](/ultracoinflip/guide/tax)** — Flat or tiered tax rates, configurable per currency
- **[Betting limits](/ultracoinflip/guide/betting-limits)** — Daily / weekly limits per player per currency
- **[Earnings & loss limits](/ultracoinflip/guide/earnings-limits)** — Cap how much a player can win or lose per day, week, month or rolling window, with warnings and per-group caps
- **[Coinflip expiry](/ultracoinflip/guide/expiry)** — Refund waiting coinflips nobody joins after a set time, and keep waiting games across restarts
- **[Modern menus](/ultracoinflip/guide/menus)** — Pop-up dialog menus on Paper 1.21.7+, native Bedrock menus for Geyser/Floodgate players, HeadDatabase heads and item-model icons
- **[Discord webhook](/ultracoinflip/guide/discord)** — Post game results and game creation notifications with PlaceholderAPI support
- **Round-to-integer** — Option to round winnings for integer-only currencies (tokens, shards, etc.)
- **Event commands** — Run console commands on game create, start, win, lose, or cancel
- **Fully customizable GUI** — Layout, items, colors, 4 animation types (default, slot-machine, circular, vertical)
- **Personal settings** — Players choose which messages, titles, action bars, boss bars and sounds they receive
- **Currency restrictions** — Lock currencies to specific worlds or permissions
- **[Security system](/ultracoinflip/guide/security)** — Anti-exploit protection, automatic refunds, backup system
- **[60+ PlaceholderAPI placeholders](/ultracoinflip/guide/placeholderapi)** — Stats, profit tracking, leaderboards, player ranking, limits
- **[Developer API](/ultracoinflip/guide/developer-api)** — Events and methods other plugins can hook into
- **Folia compatible** — Full support for Paper Folia server software
- **17 languages** — EN, VI, FR, DE, NL, RU, ZH-CN, ZH-TW, ES, AR, IT, LT, PT-BR, PL, TR, KO, JA

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
| Minecraft Server | 1.8.8 – 26.x (Spigot / Paper / Folia) |
| Java | 8 or higher (whatever your server version needs) |
| Vault | Any recent version |
| Economy Plugin | EssentialsX, CMI, or any Vault-compatible economy (for the `money` currency) |

## Optional Dependencies

| Plugin | Purpose |
|---|---|
| PlaceholderAPI | 60+ placeholders for scoreboards, holograms, etc., and custom PlaceholderAPI currencies |
| PlayerPoints | Use points as coinflip currency |
| TokenManager | Use tokens as coinflip currency |
| BeastTokens | Use beast tokens as coinflip currency |
| ExcellentEconomy | Use ExcellentEconomy currencies (formerly CoinsEngine) |
| Floodgate | Native Bedrock menus for players joining through Geyser |
| HeadDatabase | Use HeadDatabase heads as menu icons |

## Server Stats

[![bStats](https://bstats.org/signatures/bukkit/UltraCoinFlip.svg)](https://bstats.org/plugin/bukkit/UltraCoinFlip)
