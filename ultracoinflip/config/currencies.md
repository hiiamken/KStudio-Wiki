# Currency Config Files

Each currency type has its own config file under `plugins/UltraCoinFlip/currencies/`.

## File List

| File | Currency |
|---|---|
| `vault.yml` | Vault (EssentialsX, CMI, etc.) |
| `playerpoints.yml` | PlayerPoints |
| `tokenmanager.yml` | TokenManager |
| `beasttokens.yml` | BeastTokens |
| `coinsengine.yml` | ExcellentEconomy / CoinsEngine |
| `customplaceholder.yml` | Custom PlaceholderAPI currencies |

Changes take effect after `/cf reload` or a restart.

## Standard Currency Config

Used by Vault, PlayerPoints, TokenManager, and BeastTokens. Default values differ per file — see each currency's page.

```yaml
enabled: true

# Display
unit: "$"
display-name: "Money"
syntax-command: "money"            # keyword for /cf create <keyword> <amount>

# Broadcasting
broadcast-enabled: true
min-broadcast-amount: 100          # minimum bet to announce in chat

# Bet Limits
min-bid: 1
max-bid: -1                        # -1 = unlimited
min-reserve-balance: 0             # minimum balance player must keep

# Rounding
round-to-integer: false            # whole-number bets and winnings

# Tax
tax-enabled: true
tax-rate: 0.1                      # 10% flat rate

# Dynamic Tax (optional)
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

# World & Permission Restrictions
restrictions:
  enabled: false
  allowed-worlds: []               # empty = all worlds
  blocked-worlds: []               # takes priority over allowed
  required-permissions: []         # player needs at least one

# Message Overrides
messages:
  # winner: '&fYou won against &a<loser>&f! &8(&a+<amount><symbol>&8)'

# Event Commands
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

## Settings Explained

| Setting | Notes |
|---|---|
| `enabled` | Only `vault.yml` ships with `true`. |
| `unit` | Shown next to amounts in messages, menus and Discord webhooks. |
| `display-name` | Currency name shown in menus and messages. |
| `syntax-command` | Keyword players type in `/cf create`. Use one lowercase word without spaces, colons or dots, and a different one for every currency. |
| `broadcast-enabled` / `min-broadcast-amount` | Announces new games and results when the bet is at least this amount. Needs `broadcast.enabled: true` in `config.yml`. Bot games use `house.broadcast` in `config.yml` instead. |
| `min-bid` / `max-bid` | Smallest and largest bet. Bot games must also fit `house.bet` in `config.yml`. |
| `min-reserve-balance` | Balance a player must still have after betting. Checked when creating a game, joining one and playing the bot. |
| `round-to-integer` | Bets are rounded down to a whole number and winnings are rounded to the nearest whole number after tax. PlayerPoints and TokenManager always do this, whatever this setting says. |
| `tax-enabled` / `tax-rate` / `dynamic-tax-enabled` / `tax-rate-config` | See [Tax System](/ultracoinflip/guide/tax). |

::: warning Writing amounts
`min-broadcast-amount`, `min-bid`, `max-bid`, `min-reserve-balance` and the tax tier `min-amount` / `max-amount` take plain numbers or shorthand such as `10k` or `1.5M`. A value that can't be read, such as `10,000`, is ignored and the default is used instead — for `max-bid` that means no limit.
:::

## ExcellentEconomy / CoinsEngine (`coinsengine.yml`)

This file uses a `currencies:` map where each key is a currency ID from ExcellentEconomy:

```yaml
currencies:
  coins:
    enabled: true
    unit: "Coins"
    display-name: "Coins"
    syntax-command: "coin"
    min-bid: 1
    max-bid: -1
    round-to-integer: false
    tax-enabled: true
    tax-rate: 0.1
    # ... same options as standard currencies
```

The key (`coins`, `gems`) must exactly match the currency ID in ExcellentEconomy. See [ExcellentEconomy / CoinsEngine](/ultracoinflip/guide/currency-excellenteconomy).

## Custom PlaceholderAPI (`customplaceholder.yml`)

See [Custom PlaceholderAPI Currencies](/ultracoinflip/guide/currency-customplaceholder) for full documentation.

```yaml
currencies:
  orbs:
    enabled: true
    placeholder: '%yourplugin_orbs%'    # must return a number
    unit: 'Orbs'
    display-name: 'Orbs'
    give-command: 'orbs give {player} {amount}'
    remove-command: 'orbs remove {player} {amount}'
    set-command: ''                     # use instead of remove-command if needed
    syntax-command: 'orb'
    round-to-integer: false
    # ... same options as standard currencies
```

## Restrictions

Limit where and by whom a currency can be used:

```yaml
restrictions:
  enabled: true
  allowed-worlds: [world, world_nether]   # empty = all worlds
  blocked-worlds: [lobby]                 # takes priority over allowed-worlds
  required-permissions: [ultracoinflip.vip]   # player needs at least one
```

- A world listed in both lists is blocked, and the console warns you about it.
- Both players must pass the restrictions. Games a player can't join are hidden from their game list, and the create menu only shows currencies they can use.
- The same permission can be used for several currencies.

## Message Overrides

Each currency can replace the game result messages from your language file, for that currency only. Uncomment a key under `messages:` and edit it — keys you leave out keep using the language file.

| Key | Sent when | Placeholders |
|---|---|---|
| `winner` | To the winner of a player game | `<loser>`, `<amount>` (winnings after tax), `<symbol>`, `<tax>`, `<tax_rate>` |
| `loser` | To the loser of a player game | `<winner>`, `<amount>`, `<symbol>` |
| `broadcast-result` | To everyone when a player game ends | `<winner>`, `<loser>`, `<amount>`, `<taxed_amount>`, `<symbol>` |
| `house-win` | To a player who beats the bot | `<amount>` (winnings after tax), `<symbol>`, `<tax>` |
| `house-lose` | To a player who loses to the bot | `<amount>`, `<symbol>` |
| `house-broadcast-win` | To everyone when a player beats the bot | `<player>`, `<amount>`, `<taxed_amount>`, `<symbol>` |
| `house-broadcast-lose` | To everyone when a player loses to the bot | `<player>`, `<amount>`, `<taxed_amount>`, `<symbol>` |

`<symbol>` shows the currency's `unit`. **Example** — hide the tax text for this currency only:

```yaml
messages:
  winner: '&fYou won against &a<loser>&f! &8(&a+<amount><symbol>&8)'
```

## Event Commands

Run console commands automatically when game events occur.

| Event | Runs when |
|---|---|
| `on-created` | A player creates a game |
| `on-start` | The flip animation starts — once for each player |
| `on-win` | A player wins (`%player%` is the winner) |
| `on-lose` | A player loses (`%player%` is the loser) |
| `on-cancelled` | A player cancels a waiting game and gets the bet back, or a waiting game expires while its host is online |

`on-start`, `on-win` and `on-lose` also run for games against the bot. Available placeholders:

| Placeholder | Description |
|---|---|
| `%player%` | The player this command runs for |
| `%opponent%` | The other player (empty in bot games, `on-created` and `on-cancelled`) |
| `%winner%` / `%loser%` | The winning / losing player (`on-win` and `on-lose` only) |
| `%creator%` / `%challenger%` | The player who created / joined the game |
| `%player_uuid%`, `%opponent_uuid%`, `%winner_uuid%`, `%loser_uuid%`, `%creator_uuid%`, `%challenger_uuid%` | UUIDs of the players above |
| `%amount_bet%` | Bet amount per player |
| `%total_pool%` | Total pot (bet × 2) |
| `%winnings%` | Amount the winner receives after tax (`on-win` and `on-lose` only) |
| `%tax%` / `%tax_percent%` | Tax amount / tax rate as a number, e.g. `10` (`on-win` and `on-lose` only) |
| `%losses%` | Amount the loser lost |
| `%amount_bet_formatted%`, `%total_pool_formatted%`, `%winnings_formatted%`, `%tax_formatted%`, `%losses_formatted%` | The same amounts, formatted like in menus |
| `%currency%` / `%currency_id%` | Currency display name / currency ID |
| `%game_id%` | Game ID (`on-created` and `on-cancelled` only) |
| `%head_type%` | Heads or Tails (`on-created` only, when the player picked a side) |

PlaceholderAPI placeholders also work and are filled in for `%player%`.

**Example:**
```yaml
event-commands:
  on-win:
    delay: 20                          # wait 1 second before this event's commands
    commands:
      - "broadcast &6%winner% &7just won &e%winnings_formatted% %currency%&7!"
      - "[delay:40] give %winner% diamond 1"
  on-lose:
    commands:
      - "msg %loser% Better luck next time!"
```

- `delay` (in ticks, 20 = 1 second) applies to every command of that event; `[delay:TICKS]` in front of a command adds extra delay to that command.
- Add `enabled: false` under an event to turn off just that event, or directly under `event-commands:` to turn off all of them.

## Plugin Updates

When UltraCoinFlip updates, new settings are added to your currency files and your values are kept.

- **`vault.yml`, `playerpoints.yml`, `tokenmanager.yml`, `beasttokens.yml`** — keys that don't exist in the default file are removed when the file loads. Anything you add under `messages:` and `event-commands:` is always kept.
- **`coinsengine.yml`, `customplaceholder.yml`** — everything under `currencies:` is left as you wrote it, so your own currency IDs are safe. Missing basic settings are filled in with defaults (such as `min-bid` or `tax-rate` for ExcellentEconomy currencies, and `min-reserve-balance` and `round-to-integer` for custom currencies).
