# BeastTokens

[BeastTokens](https://www.spigotmc.org/resources/beasttokens-custom-currency.20806/) is a custom token currency plugin.

## Requirements

- [BeastTokens](https://www.spigotmc.org/resources/beasttokens-custom-currency.20806/) installed on your server.

## Setup

1. Install `BeastTokens.jar` in your `plugins/` folder.
2. Restart the server — UltraCoinFlip detects it automatically.
3. Edit `plugins/UltraCoinFlip/currencies/beasttokens.yml` to configure limits and display.

## Config file: `beasttokens.yml`

```yaml
enabled: true
unit: "🐾"
display-name: "Tokens"
min-bid: 10
max-bid: 500000
tax:
  enabled: false
  tiers: []
```
