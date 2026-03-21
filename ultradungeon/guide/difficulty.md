# Difficulty System

The difficulty system lets players choose a challenge tier before entering a dungeon. Each tier applies multipliers to mob stats, loot, and scoring.

## Configuration

Enable in `config.yml`:

```yaml
difficulty:
  enabled: true
  show-selector: true
  tiers:
    NORMAL:
      display-name: "&aNormal"
      hp-multiplier: 1.0
      damage-multiplier: 1.0
      loot-multiplier: 1.0
      score-multiplier: 1.0
      icon: IRON_SWORD
      modifiers: []
    HARD:
      display-name: "&cHard"
      hp-multiplier: 1.5
      damage-multiplier: 1.3
      loot-multiplier: 1.5
      score-multiplier: 2.0
      icon: DIAMOND_SWORD
      modifiers: [FORTIFIED]
    NIGHTMARE:
      display-name: "&4Nightmare"
      hp-multiplier: 3.0
      damage-multiplier: 2.5
      loot-multiplier: 3.0
      score-multiplier: 4.0
      icon: NETHERITE_SWORD
      modifiers: [FORTIFIED, EXPLOSIVE]
```

## How It Works

1. When a player clicks a dungeon room (or uses `/dungeon join`), a **difficulty selector GUI** appears
2. The player picks a tier — this locks the difficulty for the entire session
3. Subsequent players joining the same room inherit the chosen difficulty
4. When the game resets, the difficulty resets too

## Multipliers

| Multiplier | Effect |
|---|---|
| `hp-multiplier` | Scales mob max HP (stacks with player-count and wave scaling) |
| `damage-multiplier` | Scales damage dealt by dungeon mobs to players |
| `loot-multiplier` | Scales the number of reward rolls (min and max) |
| `score-multiplier` | Multiplies final score in the scoring breakdown |

## Modifiers

Modifiers add extra mechanics to the run. Available modifiers:

| Modifier | Description |
|---|---|
| `FORTIFIED` | Mobs +50% HP |
| `RAGING` | Mobs enrage below 30% HP |
| `EXPLOSIVE` | Mobs explode on death |
| `BOLSTERING` | Mobs buff nearby allies |
| `VAMPIRIC` | Mobs heal on hit |
| `SHIELDED` | Mobs have damage reduction |
| `STORMING` | Periodic lightning strikes |
| `THORNS` | Mobs reflect damage |

## GUI Customization

Edit `gui/difficulty.yml` to customize the selector GUI:

```yaml
menu:
  menu_title: "&8&lSelect Difficulty"
  size: 27
  tier_slots: [10, 12, 14, 16]
  tier_item:
    lore:
      - ""
      - "&7HP: &cx%hp_mult%"
      - "&7Damage: &cx%dmg_mult%"
      - "&7Loot: &ax%loot_mult%"
      - "&7Score: &6x%score_mult%"
      - ""
      - "&fModifiers:"
      - "%modifier_list%"
      - ""
      - "&aClick to select"
  no_modifiers: "&7  None"
```

## Dungeon Room Display

The selected difficulty is shown in the dungeon room lore using the `%difficulty%` placeholder.
