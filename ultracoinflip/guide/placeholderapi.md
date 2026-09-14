# PlaceholderAPI

UltraCoinFlip provides **60+ placeholders** for use in scoreboards, holograms, chat plugins, and anywhere PlaceholderAPI is supported.

::: tip
Install [PlaceholderAPI](https://www.spigotmc.org/resources/placeholderapi.6245/) on your server and UltraCoinFlip will register its expansion automatically on startup.
:::

## Basic Statistics

| Placeholder | Alias | Description |
|---|---|---|
| `%coinflip_wins%` | — | Total wins |
| `%coinflip_losses%` | `%coinflip_defeats%` | Total losses |
| `%coinflip_total_games%` | `%coinflip_games%` | Total games played |
| `%coinflip_winstreak%` | — | Current winstreak |

These statistics, along with the win rate and profit placeholders below, include games against the bot.

## Win Rate

| Placeholder | Description |
|---|---|
| `%coinflip_winrate%` | Overall win percentage (number only, e.g. `66.67`) |
| `%coinflip_winrate_formatted%` | Win percentage with `%` symbol |
| `%coinflip_winrate_<currency>%` | Win rate for a specific currency |
| `%coinflip_winrate_<currency>_formatted%` | Win rate for a currency with `%` symbol |

**Supported currencies:** `money`, `playerpoints`, `tokenmanager`, `beasttokens`, and custom placeholder currency IDs. CoinsEngine / ExcellentEconomy currencies have no win rate placeholder.

`win_percentage` works in place of `winrate` in all of these, e.g. `%coinflip_win_percentage_money_formatted%`.

## Profit Tracking

Replace `<currency>` with the currency ID. Short aliases are also available.

| Placeholder | Alias | Description |
|---|---|---|
| `%coinflip_profit_money%` | `%coinflip_profit_m%` | Total money won (after tax) |
| `%coinflip_loss_money%` | `%coinflip_loss_m%` | Total money lost |
| `%coinflip_net_profit_money%` | `%coinflip_net_m%` | Net profit (won - lost) |
| `%coinflip_profit_money_formatted%` | `%coinflip_profit_m_formatted%` | Formatted profit |
| `%coinflip_loss_money_formatted%` | `%coinflip_loss_m_formatted%` | Formatted losses |
| `%coinflip_net_profit_money_formatted%` | `%coinflip_net_m_formatted%` | Formatted net profit |

Same pattern applies for `playerpoints` (alias `pp`), `tokenmanager` (alias `tm`), and `beasttokens` (alias `bt`).

Plain values are raw numbers with up to two decimals (e.g. `1500000`). `_formatted` values follow `number-format.type` in [config.yml](/ultracoinflip/config/config-yml): compact by default (`9,500`, `25k`, `1.5M`), or `COMMAS` (`1,500,000`) and `FULL` (`1500000`).

## Combined Statistics

| Placeholder | Description |
|---|---|
| `%coinflip_total_profit%` | Total profit across all tracked currencies |
| `%coinflip_total_loss%` | Total losses across all tracked currencies |
| `%coinflip_total_net%` | Total net profit across all tracked currencies |

These add up the raw numbers from money, PlayerPoints, TokenManager and BeastTokens. CoinsEngine and custom currencies are not included.

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
| `%coinflip_position_worst-profit_<currency>%` | Player's rank by biggest single loss |

Returns the player's 1-based rank number, or the configured "not ranked" text (default: `N/A`). Players who aren't on that board yet (for example, no wins) get the "not ranked" text too.

`<currency>` takes the same values as the [leaderboard](#leaderboard) placeholders. Leave out `_<currency>` on `profit`, `largest-win` and `worst-profit` to rank by money, e.g. `%coinflip_position_profit%`.

You can add a period keyword too, e.g. `%coinflip_position_wins_monthly%` for this month's win rank. See [Time Periods](#time-periods) below.

## Leaderboard

Use these placeholders to display a top-players list.

```
%coinflip_top_<rank>_<filter>_<type>%
%coinflip_top_<rank>_<filter>_<currency>_<type>%
%coinflip_top_<rank>_<filter>_<period>_<currency>_<type>%
```

- `<rank>` — Position, starting at 1 (each board holds up to 10,000 players)
- `<filter>` — `wins`, `profit`, `largest-win`, `worst-profit`, `winstreak`, or `losses`
- `<period>` — Optional: `daily`, `weekly`, `monthly`, `yearly`. Omit for all-time. Goes right after the filter.
- `<currency>` — Required for profit/largest-win/worst-profit: `money`, `playerpoints`, `tokenmanager`, `beasttokens`, or a CoinsEngine / custom currency ID (also accepted as `coinsengine_<id>` or `placeholder_<id>`)
- `<type>` — `name`, `value`, or `value_formatted`

| Filter | Ranks players by | Currency |
|---|---|---|
| `wins` | Most wins | Not needed (all currencies) |
| `losses` | Most losses | Not needed (all currencies) |
| `winstreak` | Highest current winstreak | Not needed |
| `profit` | Highest net profit | Required |
| `largest-win` | Biggest single win | Required |
| `worst-profit` | Biggest single loss | Required |

`largest_win` and `worst_profit` (with underscores) work too, in both leaderboard and ranking placeholders.

On all-time boards, games against the bot count toward `wins`, `losses`, `winstreak`, and `profit` for money, PlayerPoints, TokenManager and BeastTokens. All other boards count player-vs-player games only.

If a slot is empty, `name` shows the "not ranked" text (default `N/A`) and `value` shows `0`.

**Examples:**

| Placeholder | Returns |
|---|---|
| `%coinflip_top_1_wins_name%` | Name of #1 player by wins |
| `%coinflip_top_1_profit_money_value%` | #1 player's money profit |
| `%coinflip_top_3_winstreak_value%` | #3 player's winstreak |
| `%coinflip_top_5_largest-win_playerpoints_value_formatted%` | #5 largest PlayerPoints win (formatted) |
| `%coinflip_top_1_losses_name%` | Name of #1 player by total losses |
| `%coinflip_top_2_profit_coins_name%` | Name of #2 player by profit in the CoinsEngine currency `coins` |
| `%coinflip_top_1_worst-profit_orbs_value%` | Biggest single loss in the custom currency `orbs` |

::: tip
Leaderboard placeholders read a CoinsEngine or custom currency ID up to the next underscore, so an ID like `gold_coins` won't work here. Use IDs without underscores for currencies you want on leaderboards.
:::

### Time Periods

Add a period keyword right after the filter to rank by **daily**, **weekly**, **monthly**, or **yearly** results instead of all-time. Leave it out for the all-time board.

| Placeholder | Returns |
|---|---|
| `%coinflip_top_1_wins_monthly_name%` | Top wins **this month** |
| `%coinflip_top_1_wins_monthly_value%` | That player's win count this month |
| `%coinflip_top_1_wins_daily_name%` | Top wins **today** |
| `%coinflip_top_1_profit_monthly_money_value%` | Top money profit this month |

- Weeks start on **Monday**, months/years on the 1st, in the server's local time.
- Timed boards count **player-vs-player** games only (bot games are excluded).
- Timed `profit` boards count a win the same way as the all-time board: only what the player won on top of their bet for money, PlayerPoints, TokenManager and BeastTokens, and the full payout for CoinsEngine and custom currencies.
- `winstreak` has no period — it is always the current streak.
- `alltime` or `total` can be used as the keyword to ask for the all-time board explicitly.

### Leaderboard Settings

The leaderboard and ranking placeholders share these settings in `config.yml`:

```yaml
leaderboard:
  # Shown for empty leaderboard slots and players without a rank
  not-ranked-text: 'N/A'
  # How long leaderboard and ranking results are cached (seconds)
  placeholder-cache-seconds: 600
```

Each board (filter + currency + period) is cached separately and shared by all players. Scoreboards and tab lists can request these placeholders many times per second, so keep the cache long: lower values give fresher boards but query the database more often.

### Refresh Countdown

| Placeholder | Description |
|---|---|
| `%coinflip_leaderboard_refresh_in%` | Live countdown to the next leaderboard cache refresh (e.g. `2m20s`) |

The countdown reads the soonest-to-expire cache entry and ticks down in real time — perfect as a footer line on a hologram leaderboard. Before any board has been cached, it shows the full cache time (`10m0s` by default).

```yaml
# Format is configurable in config.yml under leaderboard.refresh-countdown-format
leaderboard:
  refresh-countdown-format:
    hours: '<h>h<m>m'    # used when 1+ hour remains
    minutes: '<m>m<s>s'  # used when under 1 hour
    seconds: '<s>s'      # used when under 1 minute
```

**Hologram example (DecentHolograms):**

```
&6&lTOP WINS
&71. %coinflip_top_1_wins_name% — %coinflip_top_1_wins_value%
&72. %coinflip_top_2_wins_name% — %coinflip_top_2_wins_value%
&73. %coinflip_top_3_wins_name% — %coinflip_top_3_wins_value%
&8Next refresh: &e%coinflip_leaderboard_refresh_in%
```

## Earnings Limits

Show a player's progress toward their [earnings & loss limits](/ultracoinflip/guide/earnings-limits).

| Placeholder | Returns |
|---|---|
| `%coinflip_winlimit_<currency>%` | The player's max-win cap |
| `%coinflip_winlimit_<currency>_used%` | Amount already counted toward the cap in the current period |
| `%coinflip_winlimit_<currency>_remaining%` | Amount left before the cap is reached (never below `0`) |
| `%coinflip_winlimit_<currency>_percent%` | Share of the cap used, as a whole number from `0` to `100` |
| `%coinflip_winlimit_<currency>_reset%` | Seconds until the limit period resets |

Swap `winlimit` for another limit type. The suffixes work the same way:

| Prefix | Limit in `config.yml` |
|---|---|
| `winlimit` | `max-win` |
| `losslimit` | `max-loss` |
| `netprofitlimit` | `max-net-profit` |
| `volumelimit` | `max-volume` |

- `<currency>` is the currency's key under `earnings-limit.per-currency`: `vault` for Vault money (`money` works too), `playerpoints`, `tokenmanager`, `beasttokens`, or a CoinsEngine / custom currency ID.
- Amounts are plain numbers: whole amounts have no decimals, anything else shows two (e.g. `2500.50`).
- The placeholders are blank when `earnings-limit.enabled` is `false` or that limit isn't enabled for the currency.
- With a `rolling-24h` or `rolling-7d` period there is no fixed reset time, so `_reset` always shows `0`.

**Scoreboard example:**

```
&7Won today: &a%coinflip_winlimit_vault_used% &7/ &a%coinflip_winlimit_vault%
&7Left to win: &e%coinflip_winlimit_vault_remaining%
&7Resets in: &f%coinflip_winlimit_vault_reset%s
```

::: tip
Limit placeholders read live totals from the database every time they are parsed, so avoid refreshing them every tick on busy servers.
:::

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
| `%coinflip_winrate_<id>%` | Win rate for this currency (always two decimals, e.g. `50.00`) |
| `%coinflip_winrate_<id>_formatted%` | Win rate with `%` symbol |
| `%coinflip_win_percentage_<id>%` | Win percentage (alias) |
| `%coinflip_win_percentage_<id>_formatted%` | Win percentage with `%` symbol (alias) |

The long forms `%coinflip_winrate_placeholder_<id>%` and `%coinflip_placeholder_<id>_winrate%` (and their `_formatted` versions) work too.

Both currency types can also be used in the [leaderboard](#leaderboard), [player ranking](#player-ranking) and [earnings limit](#earnings-limits) placeholders.

::: warning Partial Statistics
CoinsEngine / ExcellentEconomy and custom PlaceholderAPI currencies do **not** track per-player profit/loss. Profit, loss, and net profit placeholders for these currencies (e.g. `%coinflip_profit_orbs%`) always return `0`, and they are left out of the combined totals. Only built-in currencies (money, playerpoints, tokenmanager, beasttokens) have full profit/loss statistics tracking. Custom PlaceholderAPI currencies do track **win rate**, and leaderboard and ranking placeholders still work for both types.
:::

## How Values Are Shown

| Situation | Result |
|---|---|
| Misspelled placeholder, or a currency that isn't enabled | PlaceholderAPI leaves the text unchanged |
| No player to parse for (e.g. a hologram that parses without a viewer) | Blank — only `%coinflip_leaderboard_refresh_in%` still works |
| Empty leaderboard slot | `name` shows the "not ranked" text, `value` shows `0` |
| Player isn't on the board | Ranking placeholders show the "not ranked" text |
| Leaderboard entry without a known name | `Unknown` |
| Earnings limit turned off | Blank |

## Examples

**Scoreboard:**

```
&6&lCOINFLIP
&7Wins: &a%coinflip_wins%
&7Losses: &c%coinflip_losses%
&7Win rate: &e%coinflip_winrate_formatted%
&7Streak: &b%coinflip_winstreak%
&7Net profit: &a%coinflip_net_m_formatted%
&7Rank: &f%coinflip_position_wins%
```

**Monthly profit hologram:**

```
&6&lTOP PROFIT THIS MONTH
&71. &f%coinflip_top_1_profit_monthly_money_name% &8- &a%coinflip_top_1_profit_monthly_money_value_formatted%
&72. &f%coinflip_top_2_profit_monthly_money_name% &8- &a%coinflip_top_2_profit_monthly_money_value_formatted%
&73. &f%coinflip_top_3_profit_monthly_money_name% &8- &a%coinflip_top_3_profit_monthly_money_value_formatted%
&7Your rank: &e%coinflip_position_profit_monthly_money%
&8Next refresh: &e%coinflip_leaderboard_refresh_in%
```

## Actor Prefix/Suffix in Messages

When writing broadcast or win/lose messages in your language file, `%luckperms_prefix%` resolves against the **viewer** (the player receiving the message), not the actual winner/loser/creator. That means a win broadcast would show each viewer's own prefix instead of the winner's.

To fix that, UltraCoinFlip pre-resolves LuckPerms prefix/suffix for each actor and exposes them as MiniMessage placeholders:

| Placeholder | Available in | Resolves to |
|---|---|---|
| `<player_prefix>`, `<player_suffix>` | `command.broadcast-created`, `house.broadcast-win`, `house.broadcast-lose` | Creator's LuckPerms prefix/suffix (in `house` broadcasts, the player who played the bot) |
| `<winner_prefix>`, `<winner_suffix>` | `game.loser`, `game.broadcast-result` | Winner's LuckPerms prefix/suffix |
| `<loser_prefix>`, `<loser_suffix>` | `game.winner`, `game.broadcast-result` | Loser's LuckPerms prefix/suffix |
| `<opponent_prefix>`, `<opponent_suffix>` | `game.consecutive-win` | Opponent's LuckPerms prefix/suffix |

These are read from `%luckperms_prefix%` and `%luckperms_suffix%`, so PlaceholderAPI's LuckPerms expansion must be installed (`/papi ecloud download LuckPerms`). Without it they are blank.

**Example** — showing each player's prefix correctly in a win broadcast:

```yaml
game:
  broadcast-result: '&fPlayer <winner_prefix>&a<winner> &fwon against <loser_prefix>&c<loser> &fin coinflip!'
```

Standard PAPI placeholders like `%vault_eco_balance%` or `%server_online%` still resolve per-viewer as normal.
