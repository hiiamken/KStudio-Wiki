# Play with Bot

The **Play with Bot** feature lets players flip against a server-controlled bot instead of waiting for a real opponent.

## How it works

1. Player opens the coinflip menu, clicks **Play with Bot**, picks a currency and amount, and confirms (or uses the command).
2. The bet is taken and the bot instantly accepts the game.
3. The flip runs immediately — no waiting room, and the game never shows up in the coinflip list.
4. If the player wins, they get the whole pot (twice their bet) minus tax. If the bot wins, the bet is lost.

Bot games count toward the player's stats and are saved to `/coinflip history` while `house.history.enabled` is on.

## Command

```
/coinflip create <currency> <amount> bot
```

**Example:** `/coinflip create money 5000 bot`

The last word comes from `house.subcommand` — change it and players type your word instead of `bot`.

## Configuration

Bot game settings are in `config.yml` under the `house:` section:

```yaml
house:
  enabled: true
  name: "YourServer"           # Bot name shown in messages and history
  subcommand: "bot"            # /coinflip create <currency> <amount> bot
  display:
    material: "PLAYER_HEAD"    # 1.8.8–1.12.2: "SKULL_ITEM:3"
    display-name: "&e&l{BOT}"  # {BOT} = the bot name
    texture: "<base64>"        # Base64 head texture, used with PLAYER_HEAD
  limits:
    max-games-per-day: 50      # Max bot games per player per day (-1 = unlimited)
    delay-between-games: 10    # Seconds between bot games per player (0 = none)
  bet:
    min: "100"                 # Minimum bet (accepts 1k, 1M, ...)
    max: "10M"                 # Maximum bet (-1 = no bot maximum)
  tax:
    enabled: true              # false = no tax on bot game winnings
  history:
    enabled: true              # Save bot games to /coinflip history
  notifications:
    enabled: true              # Post bot game results to the Discord webhook
  broadcast:
    enabled: false             # Announce bot wins and losses to the whole server
    min-amount: 100            # Only broadcast bets of at least this amount
```

### Limits and rules

- The daily game count resets at midnight (server time), and the delay counts from the start of the player's last bot game. Both are kept in memory, so a server restart resets them.
- The currency's own `min-bid`, `max-bid` and `min-reserve-balance` still apply on top of `house.bet`, and so do the currency's world and permission restrictions.
- Bot games count toward [betting limits](/ultracoinflip/guide/betting-limits) and [earnings & loss limits](/ultracoinflip/guide/earnings-limits).
- A player can't start a bot game while another flip of theirs is still rolling.
- If the player disconnects during the flip, the result still counts — winnings are paid on their next join. If the server stops or `/cf reload` runs mid-flip, the bet is refunded.

### Tax

With `house.tax.enabled: true`, bot game winnings are taxed with the currency's normal [tax settings](/ultracoinflip/guide/tax), and `ultracoinflip.bypass.tax` works as usual. Set it to `false` to pay bot game winnings in full.

### Broadcasts

With `house.broadcast.enabled: true`, the whole server sees a message when a player beats or loses to the bot. The master `broadcast.enabled` switch must also be on, and players who turned off result broadcasts in their settings don't see it.

The text is under `house.broadcast-win` and `house.broadcast-lose` in the language file (placeholders `<player>`, `<amount>`, `<taxed_amount>`, `<symbol>`). To change it for one currency only, set `house-broadcast-win` / `house-broadcast-lose` under `messages:` in that currency's file.

## Permissions

| Permission | Description | Default |
|---|---|---|
| `ultracoinflip.house.use` | Allow player to play against the bot | `true` |
| `ultracoinflip.house.bypass.limit` | Bypass the daily bot game limit | `false` |
| `ultracoinflip.house.bypass.delay` | Bypass the delay between bot games | `false` |

Players also need `ultracoinflip.command.create` to start a bot game.

::: warning
Bot games are resolved server-side using the same secure random algorithm as regular coinflips. There is no win-chance setting — every bot game is a pure 50/50. The only edge the house has is the tax taken from winnings.
:::
