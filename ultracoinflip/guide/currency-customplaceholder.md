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
    # Choose ONE: remove-command OR set-command (leave the other empty)
    remove-command: 'orbs remove {player} {amount} -s'
    set-command: ''                          # alternative for plugins without a withdraw command
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
    restrictions:
      enabled: false
      allowed-worlds: []
      blocked-worlds: []
      required-permissions: []
    event-commands:
      on-created:
        commands: []
      on-start:
        commands: []
      on-win:
        commands: []
      on-lose:
        commands: []
      on-cancelled:
        commands: []
```

## Withdraw Methods

You have two options for removing currency from players. Use **one** and leave the other empty:

| Option | When to use |
|---|---|
| `remove-command` | The plugin has a withdraw/take command (most plugins) |
| `set-command` | The plugin only has a set-balance command (e.g. DeluxeMobCoins) |

When using `set-command`, UltraCoinFlip reads the current balance, subtracts the bet, and sets the new value automatically.

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

## Restrictions

Each currency can optionally restrict usage by world or permission:

```yaml
restrictions:
  enabled: false
  allowed-worlds: []        # empty = all worlds allowed
  blocked-worlds: []        # takes priority over allowed-worlds
  required-permissions: []  # player needs at least one
```

## Event Commands

Run console commands when specific game events happen. Use `{player}`, `{opponent}`, `{amount}`, `{currency}` placeholders:

```yaml
event-commands:
  on-created:
    commands: []
  on-start:
    commands: []
  on-win:
    commands:
      - 'broadcast {player} won {amount} {currency}!'
  on-lose:
    commands: []
  on-cancelled:
    commands: []
```

## Placeholders

Custom currencies provide these PlaceholderAPI placeholders:

| Placeholder | Description |
|---|---|
| `%coinflip_placeholder_<id>_unit%` | Currency unit (e.g. "Orbs") |
| `%coinflip_placeholder_<id>_display%` | Currency display name |
| `%coinflip_<id>_unit%` | Short format |
| `%coinflip_<id>_display%` | Short format |
| `%coinflip_winrate_<id>%` | Win rate for this currency |
| `%coinflip_winrate_<id>_formatted%` | Win rate with `%` symbol |
| `%coinflip_win_percentage_<id>%` | Win percentage (alias) |
| `%coinflip_win_percentage_<id>_formatted%` | Win percentage with `%` symbol (alias) |

In GUI configs, use: `<placeholder_<id>_unit>` or `<placeholder_<id>_display>`

::: warning Partial Statistics
Custom PlaceholderAPI currencies track **win rate** but do **not** track profit/loss. Profit, loss, and net profit placeholders for custom currencies will return `0`. Only built-in currencies (money, playerpoints, tokenmanager, beasttokens) have full profit/loss statistics tracking.
:::

::: tip Round-to-Integer
If your custom currency only supports whole numbers (e.g. tokens, shards, pearls), enable `round-to-integer: true` to automatically round winnings. A win of `1.8 shards` becomes `2 shards`.
:::
