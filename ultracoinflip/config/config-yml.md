# config.yml

The main configuration file located at `plugins/UltraCoinFlip/config.yml`.

## General Settings

```yaml
language: en              # Language file to use (en, vi, fr, de, ru, zh_cn, zh_tw, es, ar, it, lt, pt, pl, tr, ko, ja)
debug: false              # Enable debug logging
default-currency: vault   # Currency shown by default in GUI
```

## Database

```yaml
database:
  type: sqlite            # sqlite or mysql
  mysql:
    host: localhost
    port: 3306
    database: ultracoinflip
    username: root
    password: ""
    ssl: false
    pool-size: 10
```

## Coinflip Settings

```yaml
coinflip:
  max-games-per-player: 1       # Max active games per player at once
  heads-tails-selection: true   # Show heads/tails selection screen before creating
  keep-on-disconnect: true      # Keep game active if creator disconnects
```

## Notifications

```yaml
notifications:
  title:
    enabled: true
  actionbar:
    enabled: true
  bossbar:
    enabled: true
    color: YELLOW
    duration: 5            # seconds
```

## Number Formatting

```yaml
number-format:
  type: COMPACT            # COMPACT (K/M/B/T), COMMAS, or FULL
```

## House Bot

```yaml
house:
  enabled: true
  name: "§6House"
  skin: default             # 'default', player name, or Base64 texture
  daily-limit: 0            # Max bot games per player per day (0 = unlimited)
  cooldown: 0               # Seconds between bot games (0 = no cooldown)
```

## Refund System

```yaml
refund:
  restore-delay: 2          # Seconds after player joins before restoring backups
```

## Betting Limits

```yaml
betting-limits:
  enabled: false
  reset: DAILY              # DAILY or WEEKLY
```

## Discord Webhook

```yaml
discord:
  enabled: false
  webhook-url: ""
  game-finished:
    enabled: true
    min-amount: 0
  game-created:
    enabled: false
    min-amount: 0
```

## Exploit Detection

```yaml
exploit-detection:
  enabled: true
  console-logging: true
  file-logging: true
  admin-notify: true
  admin-permission: "ultracoinflip.admin"
```

## Update Checker

```yaml
update-checker:
  enabled: true
  notify-console: true
  notify-in-game: true
```

## Performance

```yaml
stats-batch:
  enabled: true              # Batch database writes for better performance
  auto-flush-seconds: 5
  max-queue-size: 10
```
