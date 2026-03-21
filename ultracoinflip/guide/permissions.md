# Permissions

## Permission List

| Permission | Description | Default |
|---|---|---|
| `ultracoinflip.use` | Use basic coinflip commands | `true` |
| `ultracoinflip.reload` | Reload plugin configuration | `op` |
| `ultracoinflip.admin` | Access admin commands and audit dashboard | `op` |
| `ultracoinflip.silent` | Disable global game announcements for this player | `false` |
| `ultracoinflip.bypass.tax` | Bypass tax — receive full winnings with no deduction | `false` |
| `ultracoinflip.bypass.bettinglimit` | Bypass daily/weekly betting limits | `false` |
| `ultracoinflip.house.use` | Use the "Play with Bot" feature | `true` |
| `ultracoinflip.house.bypass.limit` | Bypass the daily bot game count limit | `false` |
| `ultracoinflip.house.bypass.delay` | Bypass the cooldown between bot games | `false` |
| `ultracoinflip.settings.bypass` | Bypass all player-specific notification settings | `false` |

## Notes

- **Default `true`** — All players have this permission unless explicitly denied.
- **Default `op`** — Only server operators have this permission by default.
- **Default `false`** — Nobody has this permission unless explicitly granted.

::: tip LuckPerms example
```
/lp group vip permission set ultracoinflip.bypass.tax true
/lp group donator permission set ultracoinflip.bypass.bettinglimit true
```
:::
