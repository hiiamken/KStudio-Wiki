# config.yml

The main configuration file for UltraDungeon. Located at `plugins/UltraDungeon/config.yml`.

## General Settings

```yaml
# Language: en, vi, ita
language: en

# Database: H2 (file-based) or MySQL
database:
  type: h2
  mysql:
    host: localhost
    port: 3306
    database: ultradungeon
    username: root
    password: ""
```

## Gameplay

```yaml
gameplay:
  # Ticket system master switch
  tickets:
    enabled: true
    ip-check: false        # Anti-alt IP check

  # Allow players to join an in-progress dungeon
  late-join:
    enabled: false
```

## Scoring

```yaml
scoring:
  base:
    victory: 100           # Points for winning
    defeat: -50            # Points for losing
    death: -10             # Points per death

  kill-bonus:
    per-kill: 2            # Points per mob kill
    boss-multiplier: 5     # Boss kill multiplier

  speed-bonus:
    thresholds:
      75: 2.0              # 75%+ time remaining → 2x
      50: 1.5
      25: 1.2

  no-death-bonus:
    multiplier: 1.5        # Multiplier if 0 deaths

  party-size-bonus:
    1: 2.0                 # Solo
    2: 1.5                 # Duo
    3: 1.2                 # Trio
    4: 1.0                 # Full

  streak:
    thresholds:
      3: 1.2               # 3 consecutive wins
      5: 1.5
      10: 2.0
```

## Boss

```yaml
boss:
  damage-scoring:
    enabled: true
    max-bonus: 50          # Max bonus points for top damager
```

## Season

```yaml
season:
  duration-days: 30
  rewards:
    1:                     # Rank 1
      - "give %player% diamond 64"
    2:
      - "give %player% diamond 32"
    3:
      - "give %player% diamond 16"
```

::: tip
After editing `config.yml`, run `/dungeon reload` to apply changes without restarting.
:::
