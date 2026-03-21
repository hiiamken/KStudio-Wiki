# Getting Started

## What is UltraDungeon?

UltraDungeon is a premium Minecraft dungeon plugin that lets you create **wave-based dungeon instances** with bosses, rewards, scoring, and progression — all configurable through an intuitive in-game GUI.

## Key Features

- **Wave-Based Combat** — Unlimited mob waves + boss wave per dungeon
- **GUI Setup Wizard** — Create dungeons without touching YAML files
- **Reward System** — Items, commands, Vault money, MMOItems, MMOCore XP
- **Scoring Engine** — Kill bonus, speed bonus, streaks, leaderboards
- **Progression** — Unlock requirements, level gates, MMOCore class/level
- **Party System** — Built-in party for group play
- **Ticket System** — Daily entry limits with permissions
- **Season System** — Seasonal leaderboards with auto-rewards
- **Integrations** — Vault, MMOItems, MMOCore, ItemsAdder, Oraxen, PlaceholderAPI, MythicMobs

## Quick Start

1. Drop `UltraDungeon.jar` into your `plugins/` folder
2. Start the server — config files generate automatically
3. Run `/dungeon create <name>` to open the setup wizard
4. Configure waves, spawn, border, and rewards in the GUI
5. Click **Create** — your dungeon is live!

::: tip
Use `/dungeon validate <name>` to auto-check your dungeon config for missing or invalid settings.
:::

## Requirements

| Requirement | Version |
|---|---|
| Minecraft Server | 1.16+ (Spigot/Paper) |
| Java | 17+ |

## Optional Dependencies

| Plugin | Purpose |
|---|---|
| Vault | Economy (entry fees, money rewards) |
| MMOItems | Custom item rewards |
| MMOCore | Level/class progression requirements, XP rewards |
| PlaceholderAPI | Placeholders for other plugins |
| MythicMobs | Custom mob spawning in waves |
