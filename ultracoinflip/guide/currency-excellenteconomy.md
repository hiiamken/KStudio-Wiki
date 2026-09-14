# ExcellentEconomy / CoinsEngine

ExcellentEconomy (formerly CoinsEngine) provides a multi-currency economy system.

## Background

CoinsEngine was **renamed to ExcellentEconomy** by the developer. UltraCoinFlip supports both:

- **ExcellentEconomy** (new) — detected and used automatically
- **CoinsEngine** (legacy) — still works. Version 2.7.0 and newer is fully supported; older versions print a console warning asking you to update

Both use the same **`coinsengine.yml`** config file — no changes needed when transitioning.

## Requirements

Install one of:
- [ExcellentEconomy](https://github.com/nulli0n/ExcellentEconomy) *(recommended)*
- CoinsEngine (legacy, still supported)

## Config File: `coinsengine.yml`

Each currency defined in ExcellentEconomy gets its own entry. The default file ships with one example currency, `coins`, turned off:

```yaml
currencies:
  coins:
    enabled: false                 # set to true to use it
    unit: "Coins"
    display-name: "Coins"
    syntax-command: "coin"         # /cf create coin 1000
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

The key (`coins`, `gems`, etc.) must **exactly match** the currency ID in ExcellentEconomy and can't contain spaces, colons or dots. Each currency can also have its own `tax-rate-config`, `restrictions`, `messages` and `event-commands` — see [Currency Files](/ultracoinflip/config/currencies).

After editing, run `/cf reload`. Players can use the `syntax-command` keyword or the currency ID itself, e.g. `/cf create coins 1000`.

::: warning
If a currency is enabled but its ID doesn't exist in ExcellentEconomy, the console shows an error and players who try to use it get an error message.
:::

## Adding Multiple Currencies

```yaml
currencies:
  coins:
    enabled: true
    unit: "Coins"
    display-name: "Coins"
    syntax-command: "coin"
    # ...
  gems:
    enabled: true
    unit: "Gems"
    display-name: "Gems"
    syntax-command: "gem"
    # ...
```

Currencies you add here are kept when UltraCoinFlip updates. If an entry is missing basic settings such as `min-bid` or `tax-rate`, they are added with default values.

## Placeholders

| Placeholder | Description |
|---|---|
| `%coinflip_coinsengine_<id>_unit%` | Currency unit |
| `%coinflip_coinsengine_<id>_display%` | Currency display name |

In the game list and history GUI configs, use `<coinsengine_<id>_unit>` or `<coinsengine_<id>_display>`.

## Migration from CoinsEngine

1. Install ExcellentEconomy and remove CoinsEngine.
2. Ensure currency IDs in ExcellentEconomy match the keys in `coinsengine.yml`.
3. Restart — UltraCoinFlip automatically switches to the new API.
