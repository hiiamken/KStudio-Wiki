# PlayerPoints

[PlayerPoints](https://www.spigotmc.org/resources/playerpoints.80745/) is a popular points-based currency plugin, often used as a secondary economy on servers.

## Requirements

- Install [PlayerPoints](https://www.spigotmc.org/resources/playerpoints.80745/) on your server.

## Setup

1. Drop `PlayerPoints.jar` into your `plugins/` folder and restart the server.
2. Open `plugins/UltraCoinFlip/currencies/playerpoints.yml` and set `enabled: true` — this currency is off by default.
3. Adjust the other settings as needed, then run `/cf reload`.

## Config File: `playerpoints.yml`

```yaml
enabled: false                    # set to true to use PlayerPoints
unit: "Points"
display-name: "PlayerPoints"
syntax-command: "point"           # /cf create point 500
broadcast-enabled: true
min-broadcast-amount: 100
min-bid: 1
max-bid: -1
min-reserve-balance: 0
round-to-integer: true
tax-enabled: true
tax-rate: 0.1
dynamic-tax-enabled: false
```

The file also has `tax-rate-config`, `restrictions`, `messages` and `event-commands` sections — see [Currency Files](/ultracoinflip/config/currencies).

## Notes

- PlayerPoints only handles whole numbers, so bets are rounded down and winnings are rounded to the nearest point — even if `round-to-integer` is set to `false`.
- If this currency is enabled but PlayerPoints is not installed, it won't load and the console shows an error.
- `unit` can be any text or symbol.
