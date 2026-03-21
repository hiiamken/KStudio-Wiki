# MMOItems

## Overview

UltraDungeon integrates with [MMOItems](https://www.spigotmc.org/resources/mmoitems.39267/) to give custom MMOItems as dungeon completion rewards.

## Setup

1. Install MMOItems on your server
2. Start the server — UltraDungeon hooks automatically
3. Check console: `[UltraDungeon] MMOItems hooked successfully!`

## MMOItem Rewards

Configure in the room file:

```yaml
MMOItemRewards:
  reward_1:
    Type: SWORD          # MMOItems type (SWORD, BOW, ARMOR, etc.)
    Id: FLAME_BLADE      # MMOItems item ID
    Amount: 1
  reward_2:
    Type: CONSUMABLE
    Id: HEALING_POTION
    Amount: 3
```

### Finding Type and ID
- **Type** — Match MMOItems type names (check `/mi list`): `SWORD`, `BOW`, `ARMOR`, `CONSUMABLE`, etc.
- **Id** — The item ID you set when creating items in MMOItems
- Items are added to the player's inventory; overflow drops on the ground

## Language Keys

```yaml
Reward:
  MMOItem: "%prefix%&a[Reward] &fYou received &6%amount%x &e%item%&f!"
```

| Placeholder | Value |
|---|---|
| `%item%` | The MMOItems item ID |
| `%amount%` | Number of items given |
