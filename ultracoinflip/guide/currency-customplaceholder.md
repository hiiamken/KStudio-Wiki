# Custom PlaceholderAPI Currencies

UltraCoinFlip supports **unlimited custom currencies** using PlaceholderAPI. Any plugin that provides a numeric balance placeholder can be used as a coinflip currency.

## Requirements

- [PlaceholderAPI](https://www.spigotmc.org/resources/placeholderapi.6245/) installed on your server
- A plugin that provides a **numeric** balance placeholder (e.g. `%plugin_balance%` → `1500`)

## How it works

Custom currencies use:
- A **PlaceholderAPI placeholder** to read the player's balance
- **Console commands** to give and remove currency

## Config File: `customplaceholder.yml`

You can define as many currencies as you need. Each currency has a unique ID:

```yaml
currencies:
  orbs:
    enabled: true
    placeholder: '%yourplugin_orbs%'        # MUST return a number
    unit: 'Orbs'
    display-name: 'Orbs'
    give-command: 'orbs give {player} {amount} -s'
    remove-command: 'orbs remove {player} {amount} -s'
    syntax-command: 'orb'                   # used in /cf create orb 500
    broadcast-enabled: true
    min-broadcast-amount: 100
    min-bid: 1
    max-bid: -1
    min-reserve-balance: 0
    round-to-integer: false
    tax-enabled: true
    tax-rate: 0.1
    dynamic-tax-enabled: false
    tax-rate-config:
      base-tax-rate: 0.1
      tiers:
        - min-amount: 0
          max-amount: 100
          tax-rate: 0.05
        - min-amount: 100
          max-amount: 1000
          tax-rate: 0.1
        - min-amount: 1000
          max-amount: -1
          tax-rate: 0.15
```

## Adding Multiple Currencies

Simply add more entries under the `currencies:` key:

```yaml
currencies:
  orbs:
    enabled: true
    placeholder: '%yourplugin_orbs%'
    # ... (full config)
  gems:
    enabled: true
    placeholder: '%yourplugin_gems%'
    # ... (full config)
  shards:
    enabled: true
    placeholder: '%yourplugin_shards%'
    round-to-integer: true    # useful for integer-only currencies
    # ... (full config)
```

## Placeholders

Custom currencies provide these PlaceholderAPI placeholders:

| Placeholder | Description |
|---|---|
| `%coinflip_placeholder_<id>_unit%` | Currency unit (e.g. "Orbs") |
| `%coinflip_placeholder_<id>_display%` | Currency display name |
| `%coinflip_<id>_unit%` | Short format |
| `%coinflip_<id>_display%` | Short format |

In GUI configs, use: `<placeholder_<id>_unit>` or `<placeholder_<id>_display>`

::: warning Statistics Not Tracked
Custom PlaceholderAPI currencies are **not** tracked in the statistics/leaderboard system. Profit, loss, and winrate placeholders for custom currencies will return `0`. Only built-in currencies (money, playerpoints, tokenmanager, beasttokens) have full statistics tracking.
:::

::: tip Round-to-Integer
If your custom currency only supports whole numbers (e.g. tokens, shards, pearls), enable `round-to-integer: true` to automatically round winnings. A win of `1.8 shards` becomes `2 shards`.
:::
