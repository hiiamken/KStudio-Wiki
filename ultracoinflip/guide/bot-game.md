# Play with Bot

The **Play with Bot** feature lets players flip against a server-controlled bot instead of waiting for a real opponent.

## How it works

1. Player opens the coinflip menu and clicks **Play with Bot** (or uses the command).
2. The bot instantly accepts the game.
3. The flip runs immediately — no waiting room.
4. Win/loss is resolved the same as a normal coinflip.

## Command

```
/coinflip create <currency> <amount> bot
```

**Example:** `/coinflip create vault 5000 bot`

## Configuration

Bot game settings are in `config.yml` under the `house:` section:

```yaml
house:
  enabled: true
  name: "§6House Bot"
  skin: default  # Use 'default', a player name, or Base64 texture
  daily-limit: 10  # Max bot games per player per day (0 = unlimited)
  cooldown: 30     # Seconds between bot games per player (0 = none)
```

## Permissions

| Permission | Description |
|---|---|
| `ultracoinflip.house.use` | Allow player to play against the bot |
| `ultracoinflip.house.bypass.limit` | Bypass the daily bot game limit |
| `ultracoinflip.house.bypass.delay` | Bypass the cooldown between bot games |

::: warning
Bot games are resolved server-side using the same secure random algorithm as regular coinflips. The house has **no advantage** — it's a pure 50/50.
:::
