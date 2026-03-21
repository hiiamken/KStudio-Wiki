# PlayerPoints

[PlayerPoints](https://www.spigotmc.org/resources/playerpoints.80745/) is a popular points-based currency plugin.

## Requirements

- [PlayerPoints](https://www.spigotmc.org/resources/playerpoints.80745/) installed on your server.

## Setup

1. Install `PlayerPoints.jar` in your `plugins/` folder.
2. Restart the server — UltraCoinFlip detects it automatically.
3. Edit `plugins/UltraCoinFlip/currencies/playerpoints.yml` to configure limits and display.

## Config file: `playerpoints.yml`

```yaml
enabled: true
unit: "⭐"
display-name: "Points"
min-bid: 10
max-bid: 100000
tax:
  enabled: false
  tiers: []
```

## Notes

- If PlayerPoints is not installed, this currency is automatically disabled.
- You can use any Unicode symbol for `unit` (emoji, custom characters).
