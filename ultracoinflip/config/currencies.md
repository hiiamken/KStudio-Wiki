# Currency Config Files

Each currency type has its own config file under `plugins/UltraCoinFlip/currencies/`.

## File list

| File | Currency |
|---|---|
| `vault.yml` | Vault (EssentialsX, CMI, etc.) |
| `playerpoints.yml` | PlayerPoints |
| `tokenmanager.yml` | TokenManager |
| `beasttokens.yml` | BeastTokens |
| `coinsengine.yml` | ExcellentEconomy / CoinsEngine |

## Full config reference

```yaml
enabled: true

# Display
unit: "$"
display-name: "Money"

# Bet limits
min-bid: 100
max-bid: 10000000

# Tax (overrides global tax setting)
tax:
  enabled: false
  tiers:
    - min: 0
      max: 9999
      rate: 0
    - min: 10000
      max: 99999
      rate: 3
    - min: 100000
      max: -1
      rate: 5

# World restrictions
world-restrictions:
  enabled: false
  mode: whitelist       # whitelist or blacklist
  worlds:
    - world
    - world_nether

# Permission requirement (optional)
permission: ""          # Leave empty to allow all players
```

## ExcellentEconomy / CoinsEngine (`coinsengine.yml`)

This file uses a `currencies:` map where each key is a currency ID from ExcellentEconomy:

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

The key (`coins`, `gems`) must exactly match the currency ID in ExcellentEconomy.
