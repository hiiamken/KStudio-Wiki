# ExcellentEconomy / CoinsEngine

ExcellentEconomy (the renamed version of CoinsEngine) provides multi-currency support via its own currency system.

## Background

CoinsEngine was **renamed to ExcellentEconomy** by its developer. UltraCoinFlip supports both:

- **ExcellentEconomy** (new) — automatically detected and used when installed
- **CoinsEngine** (legacy) — still supported with a migration warning in console

Both use the **same `coinsengine.yml` config file** — no changes needed when switching.

## Requirements

Install one of:
- [ExcellentEconomy](https://github.com/nulli0n/ExcellentEconomy) *(recommended)*
- CoinsEngine (legacy, still works)

## Config file: `coinsengine.yml`

Each currency defined in ExcellentEconomy gets its own entry:

```yaml
currencies:
  coins:
    enabled: true
    unit: "🪙"
    display-name: "Coins"
    min-bid: 100
    max-bid: 1000000
    tax:
      enabled: false
      tiers: []
  gems:
    enabled: true
    unit: "💎"
    display-name: "Gems"
    min-bid: 1
    max-bid: 10000
```

The key (e.g. `coins`, `gems`) must match the **currency ID** defined in ExcellentEconomy.

## Migration from CoinsEngine

If you were using CoinsEngine and are upgrading to ExcellentEconomy:

1. Install ExcellentEconomy and remove CoinsEngine.
2. Ensure your currency IDs in ExcellentEconomy match the keys in `coinsengine.yml`.
3. Restart — UltraCoinFlip will automatically switch to the new API.

::: tip
The console warning `[UltraCoinFlip] CoinsEngine detected — consider upgrading to ExcellentEconomy` only appears when the old CoinsEngine plugin is in use.
:::
