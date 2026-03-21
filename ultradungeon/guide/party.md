# Party System

## Overview

UltraDungeon includes a built-in party system that allows players to group up and enter dungeons together.

## Commands

| Command | Description |
|---|---|
| `/ud party create` | Create a new party (you become leader) |
| `/ud party invite <player>` | Invite a player |
| `/ud party accept <player>` | Accept a pending invite |
| `/ud party leave` | Leave the party |
| `/ud party kick <player>` | Kick a member (leader only) |
| `/ud party disband` | Disband the party (leader only) |
| `/ud party info` | View party information |

## How It Works

1. A player creates a party and becomes the **leader**
2. The leader invites other players
3. When the leader joins a dungeon, all online party members join too
4. Party size is limited by the dungeon's **Max Players** setting

## Party & Scoring

The **Party Size Bonus** in the scoring system rewards smaller groups:

```yaml
scoring:
  party-size-bonus:
    1: 2.0    # Solo: 2x multiplier
    2: 1.5    # Duo: 1.5x
    3: 1.2    # Trio: 1.2x
    4: 1.0    # Full: 1x (no bonus)
```
