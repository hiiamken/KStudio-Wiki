# Betting Limits

Betting limits allow you to cap how much a player can bet **per day and per week**, per currency.

## Configuration

Betting limits are set in `config.yml`:

```yaml
betting-limits:
  enabled: false
  currencies:
    money:                     # Vault
      daily-limit: 100000      # Max total bet per day (-1 = unlimited)
      weekly-limit: 500000     # Max total bet per week (-1 = unlimited)
    playerpoints:
      daily-limit: 50000
      weekly-limit: 200000
    tokenmanager:
      daily-limit: 10000
      weekly-limit: 50000
    beasttokens:
      daily-limit: 10000
      weekly-limit: 50000
    coinsengine:               # ExcellentEconomy / CoinsEngine — one entry per currency ID
      gems:
        daily-limit: 1000
        weekly-limit: 5000
    placeholder:               # Custom PlaceholderAPI currencies — one entry per currency ID
      orbs:
        daily-limit: 500
        weekly-limit: 2000
```

The `coinsengine` and `placeholder` entries above are examples — they're commented out in the default `config.yml`. Remove a currency's section to have no limits for that currency.

## How it works

- The limit is the maximum **cumulative** amount a player can bet within the period. It counts every bet regardless of the result: coinflips they create, coinflips they join, and bot games.
- A bet is refused if it would take the player over their daily or weekly limit. The message shows the limit, how much they've already bet and how much is left.
- Daily totals reset at midnight and weekly totals on Monday (server time).
- A coinflip that is cancelled or refunded afterwards still counts toward the total.
- Totals are kept in memory, so a server restart resets them. `/cf reload` does not.

## Bypass permission

Players with `ultracoinflip.bypass.bettinglimit` are exempt from betting limits, and their bets aren't counted. Nobody has it by default.

::: tip
Set `daily-limit` or `weekly-limit` to `-1` to turn off just that limit for a currency without disabling the system globally.
:::

::: tip Betting limits vs earnings limits
Betting limits cap how much a player **bets**. To cap how much a player can **win or lose** over a period, use [Earnings & Loss Limits](/ultracoinflip/guide/earnings-limits).
:::
