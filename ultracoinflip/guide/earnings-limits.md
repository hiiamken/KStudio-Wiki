# Earnings & Loss Limits

Earnings & Loss Limits cap how much a player can **win, lose or bet in total** within a period, such as a day or a week. Caps are set per currency, and permission groups can get higher caps.

The feature is off by default. While it is off, nothing is recorded and nobody is blocked.

## Quick start

1. In `config.yml`, set `earnings-limit.enabled` to `true`.
2. Under `earnings-limit.per-currency`, set `enabled: true` on the limits you want and choose a `default` cap.
3. Run `/cf reload`.
4. Check the result in-game with `/cf limit me`.

## How it works

- When a coinflip ends, the result is saved for both players. [Bot games](/ultracoinflip/guide/bot-game) count too.
- Before a player **creates** a coinflip, **joins** one or starts a **bot game**, the plugin adds up their results for the current period in that currency. If any enabled cap is already reached, the game is refused, the player keeps their bet and sees:

  ```
  You have hit your earnings limit for this period. Use /cf limit me to check.
  ```

- Caps are per currency. A player who reaches their Vault cap can still play with PlayerPoints, unless PlayerPoints has its own cap.
- Cancelled, expired and refunded coinflips don't count.
- Results are kept in the plugin database, so usage survives restarts.

::: warning Checked before a game, not during it
A player just under a cap can still start one more game, and that game can take them past the cap. Limits never reduce a payout or stop a game that has already started. Coinflips the player already has open stay in the list and can still be joined.
:::

### How results are counted

Two players each bet 10,000. The pot is 20,000 and [tax](/ultracoinflip/guide/tax) is 10%, so the winner is paid 18,000.

| Limit | Winner | Loser |
|---|---|---|
| `max-win` | 8,000 | — |
| `max-loss` | — | 10,000 |
| `max-net-profit` | +8,000 | −10,000 |
| `max-volume` | 10,000 | 10,000 |

A win only counts the profit on top of the player's own bet, after tax. A loss counts the bet.

## Limit types

| Type | Counts |
|---|---|
| `max-win` | Total profit from games won |
| `max-loss` | Total amount lost |
| `max-net-profit` | Profit from wins minus losses, so losing games bring it back down |
| `max-volume` | Total amount bet in finished games, won or lost |

Each type is switched on separately for each currency. A player is blocked as soon as any enabled type reaches its cap.

## Periods

One `period` applies to every currency and every limit type:

| Value | Counts results from | Resets |
|---|---|---|
| `calendar-daily` | Today | Every day at 00:00 |
| `calendar-weekly` | This week | Every Monday at 00:00 |
| `calendar-monthly` | This month | On the 1st of each month at 00:00 |
| `rolling-24h` | The last 24 hours | No fixed time, each result stops counting 24 hours after it happened |
| `rolling-7d` | The last 7 days | No fixed time, each result stops counting 7 days after it happened |

Calendar periods reset in the timezone set by `reset-timezone`, such as `Asia/Ho_Chi_Minh`, `UTC` or `America/New_York`. Leave it empty to use the server's timezone. An unknown `period` falls back to `calendar-daily`, and an unknown timezone falls back to the server's.

::: tip
Changing `period` doesn't wipe anything. Results keep the time they happened, so after `/cf reload` the new period is worked out from the results already saved.
:::

## Configuration

Everything lives in `config.yml` under `earnings-limit`. The default file ships a `vault` block with all four limits turned off. This example caps Vault and PlayerPoints per day, with higher Vault caps for VIP and MVP players:

```yaml
earnings-limit:
  enabled: true
  period: calendar-daily
  reset-timezone: ""               # empty = server timezone

  threshold-warnings:
    enabled: true
    percentages: [50, 75, 90]
    sound: game.start              # an entry from sounds.yml

  per-currency:
    vault:
      max-win:
        enabled: true
        default: 1000000
        groups:
          ultracoinflip.limit.vip: 5000000
          ultracoinflip.limit.mvp: 10000000
      max-loss:
        enabled: true
        default: 500000
        groups:
          ultracoinflip.limit.vip: 2500000
      max-net-profit:
        enabled: false
        default: 800000
      max-volume:
        enabled: false
        default: 5000000
    playerpoints:
      max-loss:
        enabled: true
        default: 20000
```

### Main settings

| Key | Default | Description |
|---|---|---|
| `enabled` | `false` | Turns the whole feature on or off |
| `period` | `calendar-daily` | When usage resets (see Periods above) |
| `reset-timezone` | `""` | Timezone for calendar resets. Empty = server timezone |
| `threshold-warnings.enabled` | `false` | Warn players as they get close to a cap |
| `threshold-warnings.percentages` | `[50, 75, 90]` | Percentages of a cap that trigger a warning |
| `threshold-warnings.sound` | `BLOCK_NOTE_BLOCK_BELL` | Sound played with a warning (see Threshold warnings below) |
| `auto-tune.multiplier` | `3.0` | `/cf limit auto-tune` suggests caps of this many times a typical day's wins or losses (see Auto-tune below) |

### Per-currency settings

Add a block under `per-currency` for each currency you want to limit, then a block inside it for each limit type:

| Key | Description |
|---|---|
| `enabled` | Turns this limit on for this currency |
| `default` | The cap for every player. `0` means no cap |
| `groups` | Higher caps for players with a permission (see below) |

A currency or limit type without a block has no cap.

### Currency IDs

Use these IDs under `per-currency`, in placeholders and with `/cf limit auto-tune`:

| Currency | ID |
|---|---|
| Vault | `vault` (`money` also works) |
| PlayerPoints | `playerpoints` |
| TokenManager | `tokenmanager` |
| BeastTokens | `beasttokens` |
| CoinsEngine / ExcellentEconomy | The currency ID from `coinsengine.yml`, e.g. `coins` |
| Custom PlaceholderAPI currency | The currency ID from `customplaceholder.yml`, e.g. `orbs` |

::: warning Vault's block is `vault`
Betting Limits call Vault `money`, so a `money` block under `per-currency` works for Vault too: any limit type you enable there applies to Vault unless the same type is enabled in the `vault` block.
:::

### Permission group caps

`groups` maps a permission node to a cap. A player gets the **highest** of `default` and every group cap they have the permission for.

```
/lp group vip permission set ultracoinflip.limit.vip true
```

- Any permission node works. `ultracoinflip.limit.vip` and `ultracoinflip.limit.mvp` are only examples, so feel free to use your own.
- A group cap lower than `default` does nothing, since the highest value wins.
- With `default: 0`, only players with a group permission are capped. Everyone else has no cap for that limit.
- There is no bypass permission. To exempt a group, give it a very high cap.
- Permissions can only be checked for online players, so `/cf limit player` and the placeholders show the `default` cap for offline players.

## Threshold warnings

With `threshold-warnings.enabled: true`, players get a chat warning as they get close to a cap:

```
You are at 75% of your max-loss limit (375000 / 500000). Use /cf limit me to check.
```

- Checked after every game the player finishes, for each enabled limit, while they are online.
- If one game jumps past several percentages, only the highest is sent. Going from 30% to 95% sends one warning for 90%, not three.
- An empty `percentages` list uses 50, 75 and 90.
- Add `100` to the list to also warn the moment a cap is reached.

`sound` takes an entry from `sounds.yml`, such as `game.start`, played with that entry's volume and pitch, or a Minecraft sound name such as `BLOCK_NOTE_BLOCK_BELL`. Leave `sound` empty for no sound.

## Auto-tune

Not sure which caps to pick? `/cf limit auto-tune <currency>` suggests `max-win` and `max-loss` values based on how your players actually play:

1. It reads the last 30 days of results for that currency.
2. For each player on each day they played, it adds up how much they won and how much they lost.
3. It takes the median of those daily totals and multiplies it by `auto-tune.multiplier` (3 by default).

```
Suggested caps for vault (multiplier=3.0, 42 buckets):
  max-win  1500000
  max-loss 900000
```

Each bucket is one player on one day. With fewer than 5, the command says there isn't enough activity yet.

::: tip
- Auto-tune only suggests values. Copy them into `config.yml` yourself, then run `/cf reload`.
- Results are only saved while `earnings-limit.enabled` is `true`. To gather data without blocking anyone, turn the feature on with every limit type still disabled, wait a few days, then run auto-tune.
- Suggestions come from daily totals, so they fit `calendar-daily` and `rolling-24h`. Raise them for weekly or monthly periods.
- Results cleared with `/cf limit reset` are left out.
:::

## Commands

| Command | Description | Permission |
|---|---|---|
| `/cf limit` | List the limit commands | `ultracoinflip.limit.me` |
| `/cf limit me` | Show your usage, caps and time until reset | `ultracoinflip.limit.me` |
| `/cf limit player <name>` | Show another player's usage and caps | `ultracoinflip.limit.staff` |
| `/cf limit reset <name>` | Clear a player's usage for the current period, in every currency | `ultracoinflip.admin.limit` |
| `/cf limit auto-tune <currency>` | Suggest caps from the last 30 days | `ultracoinflip.admin.limit` |

`/cf limit me` and `/cf limit player` are in-game only. `reset` and `auto-tune` also work from the console, and `reset` works on offline players.

Example `/cf limit me` output:

```
Your earnings limits:
- vault/max-win: 250000 / 1000000 (750000 left, resets in 13h25m)
- vault/max-loss: 120000 / 500000 (380000 left, resets in 13h25m)
```

Only enabled limits are listed. Rolling periods have no fixed reset time, so they show `0h0m`.

## Permissions

| Permission | Description | Default |
|---|---|---|
| `ultracoinflip.limit.me` | Use `/cf limit` and `/cf limit me` | `true` |
| `ultracoinflip.limit.staff` | Use `/cf limit player` | `op` |
| `ultracoinflip.admin.limit` | Use `/cf limit reset` and `/cf limit auto-tune` | `op` |

## Placeholders

Requires [PlaceholderAPI](/ultracoinflip/guide/placeholderapi). Replace `<currency>` with a currency ID from the table above.

| Placeholder | Returns |
|---|---|
| `%coinflip_winlimit_<currency>%` | The player's `max-win` cap |
| `%coinflip_winlimit_<currency>_used%` | Amount used this period |
| `%coinflip_winlimit_<currency>_remaining%` | Amount left before the cap, never below 0 |
| `%coinflip_winlimit_<currency>_percent%` | Percent of the cap used, a whole number from 0 to 100 |
| `%coinflip_winlimit_<currency>_reset%` | Seconds until the period resets |

For the other limit types, replace `winlimit` with `losslimit` (`max-loss`), `netprofitlimit` (`max-net-profit`) or `volumelimit` (`max-volume`).

**Example:** `%coinflip_losslimit_vault_remaining%` shows how much more the player can lose in Vault before reaching the cap.

- Amounts are plain numbers without separators, e.g. `750000`.
- Placeholders are empty when the feature is off or that limit isn't enabled for the currency.
- With a rolling period, `_reset` is always `0`.

## Messages

All texts are in `messages_<lang>.yml` under `command:`. Their keys start with `earnings-`, and the `/cf limit` help list is `limit-usage`.

## Compared with Betting Limits

[Betting Limits](/ultracoinflip/guide/betting-limits) is a separate feature, and the two can be used together.

| | Betting Limits | Earnings & Loss Limits |
|---|---|---|
| Caps | Total amount bet | Profit, losses, net profit or amount bet |
| Counted | When a bet is placed | When a game ends |
| Blocks | A bet that would go over the limit | New games once a cap is already reached |
| Periods | Daily and weekly | Daily, weekly, monthly, rolling 24 hours or rolling 7 days |
| Higher caps for groups | No | Yes, with permissions |
| Bypass permission | `ultracoinflip.bypass.bettinglimit` | None |
| Usage kept after a restart | No | Yes |
| Config section | `betting-limits` | `earnings-limit` |
| Vault ID | `money` | `vault` (`money` also works) |

In short, Betting Limits control how much players put in, while Earnings & Loss Limits control how far ahead or behind they can end up.
