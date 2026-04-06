# ExcellentEconomy / CoinsEngine

ExcellentEconomy (formerly CoinsEngine) provides a multi-currency economy system.

## Background

CoinsEngine was **renamed to ExcellentEconomy** by the developer. UltraCoinFlip supports both:

- **ExcellentEconomy** (new) — detected and used automatically
- **CoinsEngine** (legacy) — still works with a migration warning in console

Both use the same **`coinsengine.yml`** config file — no changes needed when transitioning.

## Requirements

Install one of:
- [ExcellentEconomy](https://github.com/nulli0n/ExcellentEconomy) *(recommended)*
- CoinsEngine (legacy, still supported)

## Config File: `coinsengine.yml`

Each currency defined in ExcellentEconomy gets its own entry:

```yaml
currencies:
  coins:
    enabled: true
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

The key (`coins`, `gems`, etc.) must **exactly match** the currency ID in ExcellentEconomy.

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

## Migration from CoinsEngine

1. Install ExcellentEconomy and remove CoinsEngine.
2. Ensure currency IDs in ExcellentEconomy match the keys in `coinsengine.yml`.
3. Restart — UltraCoinFlip automatically switches to the new API.
