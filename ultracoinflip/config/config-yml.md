# config.yml

The main configuration file located at `plugins/UltraCoinFlip/config.yml`.

## General Settings

```yaml
language: en              # Language file to use (en, vi, fr, de, ru, zh, ...)
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
  animation-duration: 60        # Ticks (1s = 20 ticks) for the roll animation
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

## Tax

```yaml
tax:
  enabled: false            # Global tax toggle (also controlled per-currency)
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
  min-amount: 0             # Minimum bet amount to post
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
