# Custom PlaceholderAPI Currencies

UltraCoinFlip supports **unlimited custom currencies** using PlaceholderAPI. Any plugin that provides a numeric balance placeholder can be used as a coinflip currency.

## Requirements

- [PlaceholderAPI](https://www.spigotmc.org/resources/placeholderapi.6245/) installed on your server
- A plugin that provides a **numeric** balance placeholder (e.g. `%plugin_balance%` → `1500`)
- Console commands from that plugin to give currency and to take it (or set the balance)

## How it works

Custom currencies use:
- A **PlaceholderAPI placeholder** to read the player's balance
- **Console commands** to give and remove currency

In the commands, `{player}` is replaced with the player's name and `{amount}` with the amount. `{amount}` always uses a dot for decimals, with at most 2 decimal places and no trailing zeros (`500`, `28.5`), even if the server machine uses a comma for decimals.

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
    messages:
      # winner: '&fYou won against &a<loser>&f! &8(&a+<amount><symbol>&8)'
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

The default file ships with two example currencies, `orbs` and `gems`, both with `enabled: false`. Run `/cf reload` after editing. `messages` lets you override the win, lose and broadcast messages for this currency only — see [Currency Files](/ultracoinflip/config/currencies).

::: warning
A currency is skipped (with a console error) if `placeholder` or `give-command` is empty, or if both `remove-command` and `set-command` are empty. Commands without `{player}` or `{amount}` still load but print a console warning. Currency IDs can't contain spaces, colons or dots.
:::

## Withdraw Methods

You have two options for removing currency from players. Use **one** and leave the other empty:

| Option | When to use |
|---|---|
| `remove-command` | The plugin has a withdraw/take command (most plugins) |
| `set-command` | The plugin only has a set-balance command (e.g. DeluxeMobCoins) |

When using `set-command`, UltraCoinFlip reads the current balance, subtracts the bet, and sets the new value automatically. If both are filled in, `remove-command` is used.

Before taking a bet, UltraCoinFlip reads the balance placeholder and refuses the bet if the player doesn't have enough. Winnings are always paid with `give-command`.

## Reading the Balance

The placeholder should return a plain number, but UltraCoinFlip cleans up common formats:

- Color codes, spaces and commas are ignored, so `1,234,567.89` is read as `1234567.89`.
- Commas always count as thousands separators — `28,5` is read as `285`. Decimals must use a dot.
- Large numbers written like `1.2345678E7` are read correctly.
- Other characters are stripped, so `$1500` works — but shortened numbers don't: `1.5k` is read as `1.5`. Use a placeholder that returns the full number.
- If there is no number at all, the console shows a warning and the balance counts as `0`. Negative balances also count as `0`.

## When a Command Fails

- If a command doesn't exist, the console shows a warning. When taking a bet, the game isn't created or joined and the player gets an error. When paying out, the winnings are kept and paid automatically the next time the player joins.
- UltraCoinFlip only notices commands that don't exist. If a command runs but your currency plugin rejects it (for example because of wrong arguments), UltraCoinFlip can't tell — test your give and take commands from the console first.

::: warning Folia
On Folia servers the commands run a moment later, so UltraCoinFlip can't detect failed commands at all. Test them carefully before enabling the currency.
:::

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

Currencies you add here are kept when UltraCoinFlip updates. If an entry is missing `min-reserve-balance` or `round-to-integer`, it is added with the default value.

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

Run console commands when specific game events happen. Use placeholders such as `%player%`, `%opponent%`, `%winnings_formatted%` and `%currency%`:

```yaml
event-commands:
  on-created:
    commands: []
  on-start:
    commands: []
  on-win:
    commands:
      - 'broadcast %player% won %winnings_formatted% %currency%!'
  on-lose:
    commands: []
  on-cancelled:
    commands: []
```

See [Currency Files](/ultracoinflip/config/currencies) for the full placeholder list and delay options.

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
If your custom currency only supports whole numbers (e.g. tokens, shards, pearls), enable `round-to-integer: true`. Winnings are rounded to the nearest whole number — a win of `1.8 shards` becomes `2 shards` — and bets are rounded down, so `10.5` becomes `10`.
:::
