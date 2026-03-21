# Checkpoints

## Overview

Checkpoints are respawn points placed throughout the dungeon. When a player dies, they respawn at the most recently activated checkpoint instead of the dungeon spawn.

## Trigger Types

| Trigger | Description |
|---|---|
| `AUTO` | Automatically activated when a specific wave/stage is reached |
| `INTERACT` | Activated when a player right-clicks the checkpoint location |
| `BOTH` | Activated by either stage completion or interaction |

## Checkpoint Settings

| Setting | Description |
|---|---|
| **Location** | The respawn position |
| **Trigger** | `AUTO`, `INTERACT`, or `BOTH` |
| **Trigger Stage** | Which wave number activates the checkpoint (for AUTO/BOTH) |
| **Interact Radius** | Detection radius in blocks (for INTERACT/BOTH, default: 1.5) |

## Setup via GUI

1. Open the dungeon wizard: `/dungeon edit <name>`
2. Click **Checkpoints** button
3. Click **Add Checkpoint**
4. Stand at the checkpoint location → `/dungeon set`
5. Configure trigger type, stage, and radius
6. Save

## Room Config Reference

```yaml
Checkpoints:
  cp_1:
    location:
      world: world
      x: 100.0
      y: 65.0
      z: 200.0
    trigger: AUTO
    trigger-stage: 3
  cp_2:
    location:
      world: world
      x: 120.0
      y: 65.0
      z: 220.0
    trigger: INTERACT
    interact-radius: 2.0
  cp_3:
    location:
      world: world
      x: 140.0
      y: 65.0
      z: 240.0
    trigger: BOTH
    trigger-stage: 7
    interact-radius: 1.5
```

::: tip
Use `AUTO` checkpoints for linear dungeons where progress follows wave order. Use `INTERACT` for open-layout dungeons where players explore freely.
:::
