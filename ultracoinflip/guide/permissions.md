# Permissions

## Core Permissions

| Permission | Description | Default |
|---|---|---|
| `ultracoinflip.use` | Use basic coinflip commands | `true` |
| `ultracoinflip.reload` | Reload plugin configuration | `op` |
| `ultracoinflip.admin` | Access admin commands and audit dashboard | `op` |
| `ultracoinflip.silent` | Disable global game announcements for this player | `false` |

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

When `max-games-per-player` is set in `config.yml`, you can grant higher limits per group:

| Permission | Description | Default |
|---|---|---|
| `ultracoinflip.multigame.<number>` | Allow `<number>` active coinflips at once | `false` |

**Example:** `ultracoinflip.multigame.5` allows up to 5 simultaneous games.

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

**Notification Settings:**

| Permission | Default |
|---|---|
| `ultracoinflip.settings.bypass.notification-title` | `false` |
| `ultracoinflip.settings.bypass.notification-actionbar` | `false` |
| `ultracoinflip.settings.bypass.notification-bossbar` | `false` |
| `ultracoinflip.settings.bypass.notification-sound` | `false` |

## Notes

- **Default `true`** — All players have this permission unless explicitly denied.
- **Default `op`** — Only server operators have this permission by default.
- **Default `false`** — Nobody has this permission unless explicitly granted.

::: tip LuckPerms example
```
/lp group vip permission set ultracoinflip.bypass.tax true
/lp group donator permission set ultracoinflip.bypass.bettinglimit true
/lp group mvp permission set ultracoinflip.multigame.3 true
```
:::
