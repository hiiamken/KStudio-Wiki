# PlaceholderAPI

UltraCoinFlip provides **40+ placeholders** for use in scoreboards, holograms, chat plugins, and anywhere PlaceholderAPI is supported.

## Basic Statistics

| Placeholder | Description |
|---|---|
| `%coinflip_wins%` | Total wins |
| `%coinflip_losses%` | Total losses |
| `%coinflip_total_games%` | Total games played |
| `%coinflip_winstreak%` | Current winstreak |

## Win Rate

| Placeholder | Description |
|---|---|
| `%coinflip_winrate%` | Overall win percentage (number only) |
| `%coinflip_winrate_formatted%` | Win percentage with `%` symbol |
| `%coinflip_winrate_<currency>%` | Win rate for a specific currency |

## Profit Tracking

Replace `<currency>` with the currency ID (e.g. `vault`, `playerpoints`, `coins`).

| Placeholder | Description |
|---|---|
| `%coinflip_profit_<currency>%` | Total amount won |
| `%coinflip_loss_<currency>%` | Total amount lost |
| `%coinflip_net_profit_<currency>%` | Net profit (won minus lost) |
| `%coinflip_profit_<currency>_formatted%` | Formatted total profit |

## Leaderboard

Use these placeholders to display a top-players list.

```
%coinflip_top_<rank>_<filter>_<currency>_name%
%coinflip_top_<rank>_<filter>_<currency>_value%
%coinflip_top_<rank>_<filter>_<currency>_value_formatted%
```

- `<rank>` — Position (1–15)
- `<filter>` — `wins`, `profit`, `largest-win`, `worst-profit`, or `winstreak`
- `<currency>` — Currency ID

**Example:** `%coinflip_top_1_wins_vault_name%` → name of the #1 player by wins for Vault currency.

::: tip
Install [PlaceholderAPI](https://www.spigotmc.org/resources/placeholderapi.6245/) on your server and UltraCoinFlip will register its expansion automatically on startup.
:::
