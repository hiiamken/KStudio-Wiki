# GUI Configuration

## GUI Config File

Located at `plugins/UltraDungeon/gui/gui_config.yml`. Controls the appearance of all player-facing GUIs.

## Wizard Config

Located at `plugins/UltraDungeon/gui/wizard.yml`. Controls the dungeon setup wizard layout.

### Slot Positions

```yaml
slots:
  # Row 2: Basic settings
  prefix: 10
  max-players: 12
  time-limit: 14
  info: 16
  # Row 3: Locations & Entry Fee
  spawn: 19
  border: 21
  border-preview: 23
  entry-fee: 25
  # Row 4: Access & Scaling
  ticket: 28
  permission: 30
  hp-scale: 32
  hp-detail: 34
  # Row 5: Waves, Rewards & Checkpoints
  waves: 37
  rewards: 39
  checkpoints: 41
  money-reward: 43
  status: 44
  # Row 6: Actions
  cancel: 45
  create: 53
```

### Customizing Colors

```yaml
colors:
  primary: "&6"      # Gold — titles
  secondary: "&e"    # Yellow — values
  success: "&a"      # Green — enabled/ok
  error: "&c"        # Red — errors/disabled
  info: "&b"         # Aqua — info
  muted: "&7"        # Gray — descriptions
  white: "&f"        # White — labels
```

### Border Material

```yaml
border:
  material: BLACK_STAINED_GLASS_PANE
  name: " "
```

## Rewards GUI Config

Located at `plugins/UltraDungeon/gui/rewards.yml`. Controls the appearance of all reward-related GUIs.

### Sections

| Section | Description |
|---------|-------------|
| `rewards_menu` | Main rewards screen (27 slots) — Reward List, Min/Max Rewards, Guaranteed Order |
| `rewards_list` | Paginated reward entries (54 slots) — entries, navigation, Add button, chat flow messages |
| `reward_edit` | Edit a single reward (27 slots) — Change Rate, Change Amount, Details |
| `delete_confirm` | Shift+Click delete confirmation (9 slots) |

### Customizable Properties

Each item supports:
- `material` — Bukkit material name (e.g. `CHEST`, `ARROW`)
- `display_name` — Item name with color codes
- `lore` — List of lore lines with placeholders
- `slot` — Inventory slot position

### Placeholders

| Placeholder | Used in | Description |
|-------------|---------|-------------|
| `%total%` | Reward List button | Total reward count |
| `%guaranteed%` | Reward List button | Count of rate=100 rewards |
| `%random%` | Reward List button | Count of rate<100 rewards |
| `%value%` | Min/Max Rewards, Rate, Amount | Current value |
| `%rate%` | Entry lore | Reward's drop rate |
| `%share%` | Entry lore | Approximate drop chance % |
| `%name%` | Delete confirm | Reward display name |

### Chat Flow Messages

All chat messages during the "Add New Reward" flow are configurable under `rewards_list.chat_flow`. This includes type prompts, error messages, and success messages.

## Dungeon Room GUI

The dungeon selection GUI (`/dungeon list`) shows all available dungeons. Each dungeon is displayed as an item with lore showing:
- Status (available/in-progress/full)
- Player count
- Ticket cost (if enabled)
- Difficulty info

This GUI is configured in `gui_config.yml`.
