# TokenManager

[TokenManager](https://www.spigotmc.org/resources/tokenmanager.8610/) is a widely used token economy plugin for Minecraft servers.

## Requirements

- Install [TokenManager](https://www.spigotmc.org/resources/tokenmanager.8610/) on your server.

## Setup

1. Drop `TokenManager.jar` into your `plugins/` folder and restart the server.
2. Open `plugins/UltraCoinFlip/currencies/tokenmanager.yml` and set `enabled: true` — this currency is off by default.
3. Adjust the other settings as needed, then run `/cf reload`.

## Config File: `tokenmanager.yml`

```yaml
enabled: false                    # set to true to use TokenManager
unit: "Tokens"
display-name: "Tokens"
syntax-command: "token"           # /cf create token 250
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

- TokenManager only handles whole numbers, so bets are rounded down and winnings are rounded to the nearest token — even if `round-to-integer` is set to `false`.
- If this currency is enabled but TokenManager is not installed, it won't load and the console shows an error.
