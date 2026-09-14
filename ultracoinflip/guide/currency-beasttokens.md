# BeastTokens

[BeastTokens](https://www.spigotmc.org/resources/beasttokens-custom-currency.20806/) is a custom token plugin, commonly used as a secondary currency on survival and prison servers.

## Requirements

- Install [BeastTokens](https://www.spigotmc.org/resources/beasttokens-custom-currency.20806/) on your server. No separate API download is needed.

## Setup

1. Drop `BeastTokens.jar` into your `plugins/` folder and restart the server.
2. Open `plugins/UltraCoinFlip/currencies/beasttokens.yml` and set `enabled: true` — this currency is off by default.
3. Adjust the other settings as needed, then run `/cf reload`.

## Config File: `beasttokens.yml`

```yaml
enabled: false                    # set to true to use BeastTokens
unit: "Tokens"
display-name: "BeastTokens"
syntax-command: "beasttokens"     # /cf create beasttokens 100
broadcast-enabled: true
min-broadcast-amount: 100
min-bid: 1
max-bid: -1
min-reserve-balance: 0
round-to-integer: false
tax-enabled: true
tax-rate: 0.1
dynamic-tax-enabled: false
```

The file also has `tax-rate-config`, `restrictions`, `messages` and `event-commands` sections — see [Currency Files](/ultracoinflip/config/currencies).

## Notes

- BeastTokens amounts aren't forced to whole numbers. Set `round-to-integer: true` if you want whole-number bets and winnings.
- If this currency is enabled but BeastTokens is not installed, it won't load and the console shows an error.
