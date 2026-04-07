# PlaceholderAPI

UltraCoinFlip provides **60+ placeholders** for use in scoreboards, holograms, chat plugins, and anywhere PlaceholderAPI is supported.

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
| `%coinflip_winrate_<currency>_formatted%` | Win rate for a currency with `%` symbol |

**Supported currencies:** `money`, `playerpoints`, `tokenmanager`, `beasttokens`, and custom placeholder currency IDs

## Profit Tracking

Replace `<currency>` with the currency ID. Short aliases are also available.

| Placeholder | Alias | Description |
|---|---|---|
| `%coinflip_profit_money%` | `%coinflip_profit_m%` | Total money won |
| `%coinflip_loss_money%` | `%coinflip_loss_m%` | Total money lost |
| `%coinflip_net_profit_money%` | `%coinflip_net_m%` | Net profit (won - lost) |
| `%coinflip_profit_money_formatted%` | `%coinflip_profit_m_formatted%` | Formatted profit (with commas) |
| `%coinflip_loss_money_formatted%` | `%coinflip_loss_m_formatted%` | Formatted losses (with commas) |
| `%coinflip_net_profit_money_formatted%` | `%coinflip_net_m_formatted%` | Formatted net profit (with commas) |

Same pattern applies for `playerpoints` (alias `pp`), `tokenmanager` (alias `tm`), and `beasttokens` (alias `bt`).

## Combined Statistics

| Placeholder | Description |
|---|---|
| `%coinflip_total_profit%` | Total profit across all tracked currencies |
| `%coinflip_total_loss%` | Total losses across all tracked currencies |
| `%coinflip_total_net%` | Total net profit across all tracked currencies |

## Player Ranking

Get a player's rank position in any leaderboard filter:

| Placeholder | Description |
|---|---|
| `%coinflip_position%` | Player's rank by wins |
| `%coinflip_position_wins%` | Player's rank by wins |
| `%coinflip_position_winstreak%` | Player's rank by winstreak |
| `%coinflip_position_losses%` | Player's rank by losses |
| `%coinflip_position_profit_<currency>%` | Player's rank by profit |
| `%coinflip_position_largest-win_<currency>%` | Player's rank by largest win |
| `%coinflip_position_worst-profit_<currency>%` | Player's rank by worst profit |

Returns the player's 1-based rank number, or the configured "not ranked" text (default: `N/A`).

## Leaderboard

Use these placeholders to display a top-players list.

```
%coinflip_top_<rank>_<filter>_<type>%
%coinflip_top_<rank>_<filter>_<currency>_<type>%
```

- `<rank>` — Position (1–15)
- `<filter>` — `wins`, `profit`, `largest-win`, `worst-profit`, `winstreak`, or `losses`
- `<currency>` — Required for profit/largest-win/worst-profit: `money`, `playerpoints`, `tokenmanager`, `beasttokens`
- `<type>` — `name`, `value`, or `value_formatted`

**Examples:**

| Placeholder | Returns |
|---|---|
| `%coinflip_top_1_wins_name%` | Name of #1 player by wins |
| `%coinflip_top_1_profit_money_value%` | #1 player's money profit |
| `%coinflip_top_3_winstreak_value%` | #3 player's winstreak |
| `%coinflip_top_5_largest-win_playerpoints_value_formatted%` | #5 largest PlayerPoints win (formatted) |
| `%coinflip_top_1_losses_name%` | Name of #1 player by total losses |

## Custom Currency Placeholders

For **CoinsEngine / ExcellentEconomy** currencies:

| Placeholder | Description |
|---|---|
| `%coinflip_coinsengine_<id>_unit%` | Currency unit (e.g. "Coins") |
| `%coinflip_coinsengine_<id>_display%` | Currency display name |

For **Custom PlaceholderAPI** currencies:

| Placeholder | Description |
|---|---|
| `%coinflip_placeholder_<id>_unit%` | Currency unit |
| `%coinflip_placeholder_<id>_display%` | Currency display name |
| `%coinflip_<id>_unit%` | Short format (same as above) |
| `%coinflip_<id>_display%` | Short format (same as above) |
| `%coinflip_winrate_<id>%` | Win rate for this currency |
| `%coinflip_winrate_<id>_formatted%` | Win rate with `%` symbol |
| `%coinflip_win_percentage_<id>%` | Win percentage (alias) |
| `%coinflip_win_percentage_<id>_formatted%` | Win percentage with `%` symbol (alias) |

::: warning Partial Statistics
Custom PlaceholderAPI currencies track **win rate** but do **not** track profit/loss. Profit, loss, and net profit placeholders for custom currencies will return `0`. Only built-in currencies (money, playerpoints, tokenmanager, beasttokens) have full profit/loss statistics tracking.
:::

::: tip
Install [PlaceholderAPI](https://www.spigotmc.org/resources/placeholderapi.6245/) on your server and UltraCoinFlip will register its expansion automatically on startup.
:::
