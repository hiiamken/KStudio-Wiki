# Boss System

## Overview

Each dungeon has a dedicated **boss wave** that triggers after all regular waves are cleared. The boss system supports MythicMobs, damage tracking, enrage mechanics, and phase-based minion spawning.

## Boss Configuration

| Setting | Description |
|---|---|
| **Type** | Mob type — vanilla or `mythic:BossName` |
| **Amount** | Number of bosses to spawn |
| **Spawn Location** | Where the boss spawns |
| **Enrage Timer** | Seconds before boss enrages (optional) |
| **Phases** | Minion spawns at HP thresholds (optional) |

## Phases

Phases allow minions to spawn when the boss reaches certain HP percentages:

```yaml
Boss:
  Type: mythic:DragonLord
  Amount: 1
  Location: ...
  Enrage:
    enabled: true
    timer: 120        # seconds
  Phases:
    phase_1:
      hp-percent: 75
      minion-type: SKELETON
      minion-amount: 3
    phase_2:
      hp-percent: 50
      minion-type: mythic:EliteSkeleton
      minion-amount: 5
    phase_3:
      hp-percent: 25
      minion-type: WITHER_SKELETON
      minion-amount: 4
```

## Damage Scoring

When enabled in `config.yml`, players earn bonus points based on their damage contribution:

```yaml
boss:
  damage-scoring:
    enabled: true
    max-bonus: 50    # max bonus points for top damager
```

Formula: `(damagePercent / 100) × maxBonus`

## Boss Bar

The boss HP bar is displayed using Adventure BossBar API. It shows:
- Boss name and HP percentage
- Phase indicator when phases are configured

## Broadcast Messages

When a boss is defeated, a server-wide broadcast can be sent. Available placeholders:

| Placeholder | Value |
|---|---|
| `%boss%` | Boss display name |
| `%dungeon%` | Dungeon name |
| `%players%` | Player list |
| `%player_count%` | Number of players |
| `%top_damager%` | Highest damage dealer |
| `%top_percent%` | Top damager's damage % |
| `%team%` | Team/party name |
