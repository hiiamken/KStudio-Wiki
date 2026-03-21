# Betting Limits

Betting limits allow you to cap how much a player can bet **per day or per week**, per currency.

## Configuration

Betting limits are set in `config.yml`:

```yaml
betting-limits:
  enabled: true
  reset: DAILY       # DAILY or WEEKLY
  currencies:
    vault:
      limit: 1000000   # Max total bet per day
    playerpoints:
      limit: 50000
```

The `limit` is the maximum **cumulative** bet a player can place within the reset period. It counts both wins and losses.

## Bypass permission

Players with `ultracoinflip.bypass.bettinglimit` are exempt from betting limits.

::: tip
Set `limit: 0` to disable the limit for a specific currency without disabling the system globally.
:::
