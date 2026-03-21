# Permissions

## Player Permissions

| Permission | Description | Default |
|---|---|---|
| `ultradungeon.play` | Join and play dungeons | `true` |
| `ultradungeon.list` | Open dungeon list GUI | `true` |
| `ultradungeon.top` | View leaderboard | `true` |
| `ultradungeon.party` | Use party commands | `true` |

## Admin Permissions

| Permission | Description | Default |
|---|---|---|
| `ultradungeon.admin` | All admin commands | `op` |
| `ultradungeon.create` | Create dungeons | `op` |
| `ultradungeon.edit` | Edit dungeons | `op` |
| `ultradungeon.delete` | Delete dungeons | `op` |
| `ultradungeon.reload` | Reload config | `op` |
| `ultradungeon.validate` | Run validation | `op` |
| `ultradungeon.ticket.manage` | Manage tickets | `op` |
| `ultradungeon.point.manage` | Manage points | `op` |

## Ticket Permissions

| Permission | Description |
|---|---|
| `ultradungeon.ticket.<number>` | Sets daily ticket limit (highest wins) |
| `ultradungeon.ticket.unlimited` | Bypass ticket limit |

## Access Permissions

Per-dungeon access can be restricted using custom permission nodes configured in the dungeon setup wizard. Example:

```
ultradungeon.access.mydungeon
```

Players without this permission cannot join the dungeon (when Permission Gate is enabled).
