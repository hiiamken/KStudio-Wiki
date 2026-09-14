# Permissions

## Core Permissions

| Permission | Description | Default |
|---|---|---|
| `ultracoinflip.use` | Required for every `/cf` command, on top of the command's own node | `true` |
| `ultracoinflip.reload` | Reload plugin configuration | `op` |
| `ultracoinflip.admin` | Admin commands (`/cf audit`, `/cf webhook test`), the admin part of `/cf help`, update and security alerts. Also includes `ultracoinflip.reload` | `op` |
| `ultracoinflip.silent` | Disable global game announcements for this player | `false` |

## Per-Subcommand Permissions

Each `/cf` subcommand has its own permission node. All default to `true`, so existing servers keep working — set any to `false` to hide that command from a group.

| Permission | Subcommand | Default |
|---|---|---|
| `ultracoinflip.command.menu` | `/cf` (open the main menu) | `true` |
| `ultracoinflip.command.create` | `/cf create` | `true` |
| `ultracoinflip.command.delete` | `/cf delete` | `true` |
| `ultracoinflip.command.history` | `/cf history` | `true` |
| `ultracoinflip.command.leaderboard` | `/cf leaderboard` | `true` |
| `ultracoinflip.command.settings` | `/cf settings` | `true` |
| `ultracoinflip.command.stats` | `/cf stats` | `true` |
| `ultracoinflip.command.help` | `/cf help` | `true` |
| `ultracoinflip.command.info` | `/cf info` | `true` |
| `ultracoinflip.command.invite` | `/cf invite` and `/cf uninvite` | `true` |
| `ultracoinflip.command.accept` | `/cf accept` and `/cf deny` | `true` |
| `ultracoinflip.command.private` | `/cf private` | `true` |

The same nodes also lock the matching buttons in the coinflip menu (Create, History, Leaderboard, Settings, and cancelling your own game). The **Play with Bot** button needs both `ultracoinflip.command.create` and `ultracoinflip.house.use`.

**Example** — hide the leaderboard from regular players:

```
/lp group default permission set ultracoinflip.command.leaderboard false
```

## Stats Permissions

| Permission | Description | Default |
|---|---|---|
| `ultracoinflip.stats.others` | View other players' stats with `/cf stats <player>` | `op` |

## Earnings Limit Permissions

| Permission | Description | Default |
|---|---|---|
| `ultracoinflip.limit.me` | View your own earnings and loss limits with `/cf limit me` | `true` |
| `ultracoinflip.limit.staff` | View other players' limits with `/cf limit player <player>` | `op` |
| `ultracoinflip.admin.limit` | Reset limits and get cap suggestions (`/cf limit reset`, `/cf limit auto-tune`) | `op` |

Higher caps for ranks come from the permissions you list under `groups` in `earnings-limit.per-currency` (the default config uses `ultracoinflip.limit.vip` and `ultracoinflip.limit.mvp`). See [Earnings & Loss Limits](/ultracoinflip/guide/earnings-limits).

## Bypass Permissions

| Permission | Description | Default |
|---|---|---|
| `ultracoinflip.bypass.tax` | Bypass tax — receive full winnings with no deduction | `false` |
| `ultracoinflip.bypass.bettinglimit` | Bypass daily/weekly betting limits | `false` |

## Bot Game Permissions

| Permission | Description | Default |
|---|---|---|
| `ultracoinflip.house.use` | Use the "Play with Bot" feature | `true` |
| `ultracoinflip.house.bypass.limit` | Bypass the daily bot game count limit | `false` |
| `ultracoinflip.house.bypass.delay` | Bypass the cooldown between bot games | `false` |

## Multi-Game Permissions

When `game-behavior.multiple-games.enabled` is `true` in `config.yml`, players can host more than one coinflip at once. Everyone gets `default-limit`, and the permissions listed under `permission-limits` raise it — the highest limit a player has wins (`-1` = unlimited):

| Permission | Description | Default |
|---|---|---|
| `ultracoinflip.multigame.2` | Allow 2 active coinflips at once | `op` |
| `ultracoinflip.multigame.5` | Allow 5 active coinflips at once | `op` |

**Example:** add another tier to `permission-limits`, then grant `ultracoinflip.multigame.10` to a group:

```yaml
game-behavior:
  multiple-games:
    enabled: true
    default-limit: 1
    permission-limits:
      - permission: ultracoinflip.multigame.2
        limit: 2
      - permission: ultracoinflip.multigame.5
        limit: 5
      - permission: ultracoinflip.multigame.10
        limit: 10
```

Only the permissions in this list are checked — `ultracoinflip.multigame.3` does nothing unless you add it.

## Settings Bypass Permissions

The master bypass disables **all** player-specific notification settings:

| Permission | Description | Default |
|---|---|---|
| `ultracoinflip.settings.bypass` | Bypass ALL notification/message settings | `false` |

You can also bypass individual settings:

**Message Settings:**

| Permission | Default |
|---|---|
| `ultracoinflip.settings.bypass.message-game-created` | `false` |
| `ultracoinflip.settings.bypass.message-game-joined` | `false` |
| `ultracoinflip.settings.bypass.message-game-won` | `false` |
| `ultracoinflip.settings.bypass.message-game-lost` | `false` |
| `ultracoinflip.settings.bypass.message-game-cancelled` | `false` |
| `ultracoinflip.settings.bypass.message-broadcasts` | `false` |
| `ultracoinflip.settings.bypass.message-bot-game` | `false` |
| `ultracoinflip.settings.bypass.message-consecutive-wins` | `false` |
| `ultracoinflip.settings.bypass.message-error` | `false` |
| `ultracoinflip.settings.bypass.message-game-result-broadcast` | `false` |

**Notification Settings:**

| Permission | Default |
|---|---|
| `ultracoinflip.settings.bypass.notification-title` | `false` |
| `ultracoinflip.settings.bypass.notification-actionbar` | `false` |
| `ultracoinflip.settings.bypass.notification-bossbar` | `false` |
| `ultracoinflip.settings.bypass.notification-sound` | `false` |
| `ultracoinflip.settings.bypass.notification-game-start-sound` | `false` |
| `ultracoinflip.settings.bypass.notification-consecutive-win-sound` | `false` |
| `ultracoinflip.settings.bypass.notification-animation-sound` | `false` |

## Notes

- **Default `true`** — All players have this permission unless explicitly denied.
- **Default `op`** — Only server operators have this permission by default.
- **Default `false`** — Nobody has this permission unless explicitly granted.
- Permissions the plugin doesn't declare itself (such as `ultracoinflip.stats.others` and the multi-game tiers) default to `op`.
- Currency restrictions use whatever permissions you put in a currency's `restrictions.required-permissions` — a player needs at least one of them.

::: tip LuckPerms example
```
/lp group vip permission set ultracoinflip.bypass.tax true
/lp group donator permission set ultracoinflip.bypass.bettinglimit true
/lp group mvp permission set ultracoinflip.multigame.5 true
```
:::
