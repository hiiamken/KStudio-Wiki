# Waves & Mobs

## Overview

Dungeons use a wave-based system. Each wave spawns groups of mobs that players must defeat. After all waves are cleared, the boss wave begins.

## Wave Editor

Access via the **Waves & Mobs** button in the setup wizard.

### Wave List
Shows all configured waves with mob count summaries. Click a wave to edit, or click **Add Wave** to create a new one.

### Wave Settings
Each wave contains:
- **Mob Groups** — One or more groups of mobs
- **Duration** — Time limit for the wave (default: 2 min)

### Mob Group Settings
Each mob group has:

| Setting | Description |
|---|---|
| **Mob Type** | Vanilla mob name or `mythic:MobName` for MythicMobs |
| **Amount** | Number of mobs to spawn |
| **Spawn Location** | Optional custom spawn point (default: random in border) |
| **Spawn Style** | `NORMAL` or `SPREAD` |

## Boss Wave

The boss wave is a special final wave. Configure it separately:

| Setting | Description |
|---|---|
| **Boss Type** | Mob type (supports MythicMobs with `mythic:` prefix) |
| **Boss Amount** | Number of bosses |
| **Spawn Location** | Boss spawn point |
| **Enrage Timer** | Optional: boss enrages after X seconds |
| **Phases** | Optional: minion spawns at HP thresholds |

## MythicMobs Support

Prefix any mob type with `mythic:` to use a MythicMobs mob:

```yaml
# In mob type selection:
mythic:SkeletonKing    # Spawns MythicMobs mob "SkeletonKing"
ZOMBIE                  # Spawns vanilla zombie
```

## Room Config Reference

Waves are stored in the room YAML file:

```yaml
Mob1:
  group_1:
    Type: ZOMBIE
    Amount: 5
    Time: 2          # minutes
    Location: ...    # optional
    SpawnStyle: NORMAL
  group_2:
    Type: mythic:CustomSkeleton
    Amount: 3

Boss:
  Type: mythic:DragonLord
  Amount: 1
  Time: 5
  Location: ...
```
