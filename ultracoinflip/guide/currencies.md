# Currency Overview

UltraCoinFlip supports multiple currency types simultaneously. Each currency type has its own config file under `plugins/UltraCoinFlip/currencies/`.

## Supported Currencies

| Currency | Config File | Requires Plugin |
|---|---|---|
| Vault (EssentialsX, CMI, etc.) | `vault.yml` | Vault + economy plugin |
| PlayerPoints | `playerpoints.yml` | PlayerPoints |
| TokenManager | `tokenmanager.yml` | TokenManager |
| BeastTokens | `beasttokens.yml` | BeastTokens |
| ExcellentEconomy / CoinsEngine | `coinsengine.yml` | ExcellentEconomy or CoinsEngine |
| Custom (PlaceholderAPI) | `customplaceholder.yml` | PlaceholderAPI |

## How currencies are detected

UltraCoinFlip **automatically detects** which currency plugins are installed on your server at startup. Only the currencies whose plugins are present will be loaded and shown to players.

If you remove a currency plugin, that currency is automatically disabled — no manual config changes needed.

::: info ExcellentEconomy vs CoinsEngine
CoinsEngine was renamed to **ExcellentEconomy**. UltraCoinFlip supports both:
- If **ExcellentEconomy** is installed → uses the new API automatically
- If only **CoinsEngine** (old version) is installed → uses the legacy API with a migration warning in console

Both use the same `coinsengine.yml` config file — no changes needed.
:::

## Per-currency settings

Every currency config file supports these settings:

```yaml
enabled: true
unit: "$"
display-name: "Money"
syntax-command: "money"          # keyword used in /cf create <keyword> <amount>
broadcast-enabled: true          # announce games using this currency
min-broadcast-amount: 100        # minimum bet to trigger broadcast
min-bid: 1                       # minimum bet amount
max-bid: -1                      # maximum bet (-1 = unlimited)
min-reserve-balance: 0           # minimum balance player must keep after betting
round-to-integer: false          # round winnings to nearest whole number
tax-enabled: true
tax-rate: 0.1                    # 10% flat tax rate
dynamic-tax-enabled: false       # enable tiered tax rates
```

See [Currency Files](/ultracoinflip/config/currencies) for the full reference.
