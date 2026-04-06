# PlayerPoints

[PlayerPoints](https://www.spigotmc.org/resources/playerpoints.80745/) is a popular points-based currency plugin, often used as a secondary economy on servers.

## Requirements

- Install [PlayerPoints](https://www.spigotmc.org/resources/playerpoints.80745/) on your server.

## Setup

1. Drop `PlayerPoints.jar` into your `plugins/` folder.
2. Restart the server — UltraCoinFlip detects it automatically.
3. Edit `plugins/UltraCoinFlip/currencies/playerpoints.yml` as needed.

## Config File: `playerpoints.yml`

```yaml
enabled: true
unit: "⭐"
display-name: "Points"
syntax-command: "point"           # /cf create point 500
broadcast-enabled: true
min-broadcast-amount: 100
min-bid: 1
max-bid: -1
min-reserve-balance: 0
round-to-integer: false
tax-enabled: false
tax-rate: 0.1
dynamic-tax-enabled: false
```

## Notes

- If PlayerPoints is not installed, this currency is automatically disabled.
- `unit` supports any Unicode character, including emoji.
