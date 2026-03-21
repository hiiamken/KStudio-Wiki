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
| Custom (PlaceholderAPI) | `custom/` folder | PlaceholderAPI |

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

Each currency config file lets you set:

```yaml
enabled: true
unit: "$"
display-name: "Coins"
min-bid: 100
max-bid: 1000000
tax:
  enabled: true
  tiers: ...
world-restrictions:
  enabled: false
  ...
```

See [Currency Files](/ultracoinflip/config/currencies) for the full reference.
