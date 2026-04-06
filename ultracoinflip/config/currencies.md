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

## Standard Currency Config

Used by Vault, PlayerPoints, TokenManager, and BeastTokens:

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
round-to-integer: false            # round winnings to nearest whole number

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

The key (`coins`, `gems`) must exactly match the currency ID in ExcellentEconomy.

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
    syntax-command: 'orb'
    round-to-integer: false
    # ... same options as standard currencies
```

## Event Commands

Run console commands automatically when game events occur. Available placeholders:

| Placeholder | Description |
|---|---|
| `%player%` | The player involved in the event |
| `%opponent%` | The opposing player |
| `%winner%` | The winning player |
| `%loser%` | The losing player |
| `%amount%` | Bet amount |
| `%winnings_formatted%` | Formatted winning amount |
| `%currency%` | Currency display name |

**Example:**
```yaml
event-commands:
  on-win:
    commands:
      - "broadcast &6%winner% &7just won &e%winnings_formatted% %currency%&7!"
      - "give %winner% diamond 1"
  on-lose:
    commands:
      - "msg %loser% Better luck next time!"
```
