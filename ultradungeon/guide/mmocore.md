# MMOCore

## Overview

UltraDungeon integrates with [MMOCore](https://www.spigotmc.org/resources/mmocore.70575/) for two purposes:
1. **Progression requirements** — Require a specific MMOCore level or class to enter dungeons
2. **XP rewards** — Give MMOCore class experience on dungeon completion

## Setup

1. Install MMOCore on your server
2. Start the server — UltraDungeon hooks automatically
3. Check console: `[UltraDungeon] MMOCore hooked successfully!`

## Progression Requirements

### Level Requirement
Block players below a certain MMOCore level:

```yaml
Requirements:
  mmocore-level: 15
```

### Class Requirement
Require a specific MMOCore class:

```yaml
Requirements:
  mmocore-class: "Warrior"
```

Both can be combined:
```yaml
Requirements:
  mmocore-level: 10
  mmocore-class: "Mage"
```

## XP Rewards

Give class experience on dungeon completion:

```yaml
MMOCoreExpReward: 500.0
```

Class experience is given automatically when the dungeon is completed.

## Language Keys

```yaml
Progression:
  RequireMMOLevel: "%prefix%&c[Locked] &fYou need MMOCore level &6%required% &f(current: &e%current%&f)"
  RequireMMOClass: "%prefix%&c[Locked] &fYou need class &6%required% &f(current: &e%current%&f)"

Reward:
  MMOCoreExp: "%prefix%&a[Reward] &fYou received &b%amount% EXP&f!"
```

