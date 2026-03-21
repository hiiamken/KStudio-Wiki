# Rewards

## Overview

UltraDungeon uses a **unified reward system**. All reward types are managed in one place — no separate "Default Rewards", "Card Flip", or "Legacy" systems.

Each reward has a **drop rate** (1–100):
- **Rate 100** = Guaranteed (always given if reward slots are available)
- **Rate 1–99** = Random chance (higher rate = more likely to drop)

When a player clears a dungeon, the plugin rolls between **min rewards** and **max rewards** for that player.

## Reward Types

| Type | Description | Requires |
|------|-------------|----------|
| `ITEM` | Any Minecraft item (full NBT/enchants/custom model data) | — |
| `COMMAND` | Console command (supports `%player%`) | — |
| `VAULT_MONEY` | Deposit money | [Vault](./vault) |
| `MMOITEMS_ITEM` | MMOItems item by type + ID | [MMOItems](./mmoitems) |
| `MMOCORE_XP` | Give class XP | [MMOCore](./mmocore) |
| `CUSTOM_ITEM` | ItemsAdder / Oraxen item by ID | ItemsAdder or Oraxen |

## How Rewards Are Given

When a player finishes the dungeon, here's what happens — step by step:

1. **Pick a number**: The plugin picks a random number between **Min Rewards** and **Max Rewards**. This is how many rewards the player gets. For example, if min = 2 and max = 5, the player might get 3 rewards this time.

2. **Give guaranteed rewards first**: Any reward with rate = 100 is "guaranteed" — it always tries to be given first. If the player has enough reward slots, they get all of them. If not, the **Guaranteed Order** setting decides which ones they get (either the ones at the top of the list, or random ones).

3. **Fill the rest with random rewards**: If there are still reward slots left, the plugin picks from the remaining rewards (rate < 100). Higher rate = higher chance to be picked. Each reward can only be given once per run — no duplicates.

## Config Format (Room File)

```yaml
rewards:
  minRolls: 1
  maxRolls: 3
  pick100Mode: ORDER   # ORDER = top of list first, RANDOM = random pick
  entries:
    - type: ITEM
      rate: 100
      amount: 1
    - type: COMMAND
      rate: 30
      command: "eco give %player% 1000"
    - type: VAULT_MONEY
      rate: 50
      amount: 2500
    - type: MMOITEMS_ITEM
      rate: 20
      amount: 1
      mmoType: SWORD
      id: FLAME_BLADE
    - type: MMOCORE_XP
      rate: 40
      amount: 120
```

## GUI Setup (Recommended)

All rewards are configured through the **Dungeon Editor → Rewards** button. No need to edit YAML manually.

### Rewards Menu
The main rewards screen shows:
- **Reward List** — view and manage all rewards
- **Min Rewards** — minimum rewards per player per clear
- **Max Rewards** — maximum rewards per player per clear
- **Guaranteed Order** — how guaranteed rewards are prioritized when there are more than the player can receive

### Rewards List
A paginated list of all rewards. From here you can:
- **Click** an entry to edit its rate/amount
- **Shift+Click** an entry to delete it (with confirmation)
- **Add New Reward** — guided step-by-step in chat

### Add New Reward (Chat Flow)
1. Click **+ Add New Reward**
2. Choose type: `item` | `command` | `vault` | `mmoitem` | `mmocore` | `customitem`
3. Follow the prompts (hold item + type `add`, enter command, enter amount, etc.)
4. Enter the **drop rate** (1–100)
5. Done — the reward is added and you're back in the GUI

Type `cancel` at any step to go back.

### Edit Reward
Click any reward to open the edit screen:
- **Change Drop Rate** — click to adjust, or middle-click to type exact value
- **Change Amount** — click to adjust, or middle-click to type exact value
- **Reward Details** — view all info (type, command, item material, etc.)

## GUI Config File

The GUI appearance (titles, materials, lore, chat messages) is fully customizable in `plugins/UltraDungeon/gui/rewards.yml`. See [GUI Config](../config/gui) for details.
