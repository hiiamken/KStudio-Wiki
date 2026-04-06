# BeastTokens

[BeastTokens](https://www.spigotmc.org/resources/beasttokens-custom-currency.20806/) is a custom token plugin, commonly used as a secondary currency on survival and prison servers.

## Requirements

- Install [BeastTokens](https://www.spigotmc.org/resources/beasttokens-custom-currency.20806/) on your server.

## Setup

1. Drop `BeastTokens.jar` into your `plugins/` folder.
2. Restart the server — UltraCoinFlip detects it automatically.
3. Edit `plugins/UltraCoinFlip/currencies/beasttokens.yml` as needed.

## Config File: `beasttokens.yml`

```yaml
enabled: true
unit: "Tokens"
display-name: "BeastTokens"
syntax-command: "beasttokens"     # /cf create beasttokens 100
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
