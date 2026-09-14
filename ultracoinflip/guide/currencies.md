# Currency Overview

UltraCoinFlip supports multiple currency types simultaneously. Each currency type has its own config file under `plugins/UltraCoinFlip/currencies/`.

## Supported Currencies

| Currency | Config File | Requires Plugin | Enabled by default |
|---|---|---|---|
| Vault (EssentialsX, CMI, etc.) | `vault.yml` | Vault + economy plugin | Yes |
| PlayerPoints | `playerpoints.yml` | PlayerPoints | No |
| TokenManager | `tokenmanager.yml` | TokenManager | No |
| BeastTokens | `beasttokens.yml` | BeastTokens | No |
| ExcellentEconomy / CoinsEngine | `coinsengine.yml` | ExcellentEconomy or CoinsEngine | No |
| Custom (PlaceholderAPI) | `customplaceholder.yml` | PlaceholderAPI | No |

`coinsengine.yml` and `customplaceholder.yml` can hold as many currencies as you like, each with its own settings.

## How currencies are detected

UltraCoinFlip loads every currency that has `enabled: true` in its file when the server starts and whenever you run `/cf reload`. Only **Vault** is enabled out of the box. To use another currency, install its plugin, set `enabled: true` in its file and run `/cf reload`.

If a currency is enabled but its plugin is missing (or an ExcellentEconomy currency ID doesn't exist), players can't use that currency and the console lists the problem under **CURRENCY CONFIGURATION ERRORS DETECTED**. The same happens if you remove a currency plugin later — set `enabled: false` to clear the warning.

::: warning
If no currency is enabled at all, players can't create games and the console warns you at startup.
:::

::: info ExcellentEconomy vs CoinsEngine
CoinsEngine was renamed to **ExcellentEconomy**. UltraCoinFlip supports both:
- If **ExcellentEconomy** is installed → it is used automatically
- If only **CoinsEngine** is installed → it still works. Version 2.7.0 and newer is fully supported; older versions print a console warning asking you to update

Both use the same `coinsengine.yml` config file — no changes needed.
:::

## Choosing a currency in commands

Every currency has a `syntax-command` keyword that players type after `/cf create`:

| Command | What it does |
|---|---|
| `/cf create` | Opens the create menu, listing only the currencies the player is allowed to use |
| `/cf create <keyword> <amount>` | Creates a game with that currency, e.g. `/cf create money 1000` |
| `/cf create <amount>` | Uses `default-currency` from `config.yml` (`auto` picks the first enabled currency, starting with Vault) |
| `/cf create <keyword> <amount> bot` | Plays against the bot (the word `bot` can be changed in `config.yml`) |

Amounts can use `k`, `M`, `B` and `T`, e.g. `/cf create money 2.5M`. For ExcellentEconomy and custom currencies, players can also type the currency ID instead of the keyword. Vault, PlayerPoints, TokenManager and BeastTokens can also be picked with `money`, `playerpoints`, `tokenmanager` and `beasttokens`.

## Per-currency settings

Every currency config file supports these settings:

```yaml
enabled: true
unit: "$"
display-name: "Money"
syntax-command: "money"          # keyword used in /cf create <keyword> <amount>
broadcast-enabled: true          # announce games using this currency
min-broadcast-amount: 100        # minimum bet to trigger broadcast
min-bid: 1                       # minimum bet amount
max-bid: -1                      # maximum bet (-1 = unlimited)
min-reserve-balance: 0           # minimum balance player must keep after betting
round-to-integer: false          # whole-number bets and winnings
tax-enabled: true
tax-rate: 0.1                    # 10% flat tax rate
dynamic-tax-enabled: false       # enable tiered tax rates
```

Each currency also has its own `tax-rate-config` (tax tiers), `restrictions` (worlds and permissions), `messages` (message overrides) and `event-commands` (console commands on game events). In `coinsengine.yml` and `customplaceholder.yml` all of these sit under each currency ID.

See [Currency Files](/ultracoinflip/config/currencies) for the full reference.

## Offline players

Bets and payouts only go through while the player is online. If a winner is offline when their game pays out, or the payout fails, UltraCoinFlip keeps the winnings and pays them automatically the next time that player joins.

## Related settings

These per-currency features live in `config.yml`:

- Daily and weekly bet caps — [Betting Limits](/ultracoinflip/guide/betting-limits)
- Win and loss caps — [Earnings & Loss Limits](/ultracoinflip/guide/earnings-limits)
- How tax is calculated — [Tax System](/ultracoinflip/guide/tax)
- `default-currency`, the broadcast master switch and bot game limits — [config.yml](/ultracoinflip/config/config-yml)
