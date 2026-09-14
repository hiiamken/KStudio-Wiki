# Coinflip Expiry & Restarts

Two optional settings in `config.yml` decide how long a waiting coinflip can stay open: expiry cancels coinflips nobody joins, and persistence keeps waiting coinflips through a server restart. Both are off by default.

## Coinflip Expiry

With expiry on, a waiting coinflip that nobody has joined is cancelled after a set number of hours and the host gets their bet back.

```yaml
game-behavior:
  game-expiry:
    enabled: false
    after-hours: 72              # how long a waiting coinflip may stay open
    check-interval-minutes: 10   # how often the plugin looks for expired coinflips
```

| Key | Default | Description |
|---|---|---|
| `enabled` | `false` | Turns expiry on or off |
| `after-hours` | `72` | Hours a waiting coinflip may stay open before it's cancelled (whole hours, minimum 1) |
| `check-interval-minutes` | `10` | How often the plugin checks for expired coinflips (minimum 1) |

- Age is counted from when the coinflip was created, so it keeps counting across restarts.
- The check runs every `check-interval-minutes`, so a coinflip can stay open up to one interval past `after-hours`.
- Only waiting coinflips expire. A flip that is already rolling is never touched.
- If the host is online, the bet is returned right away with the `game.expired` message ("Your coinflip expired because nobody joined").
- If the host is offline, or the deposit fails, the bet is returned on their next join.

::: tip
`enabled` and `after-hours` take effect after `/cf reload`. A new `check-interval-minutes` needs a server restart.
:::

## Keeping Coinflips Across Restarts

```yaml
game-behavior:
  persist-games-across-restart: false
```

### When off (default)

On server stop, every waiting coinflip is cancelled and refunded. Online hosts get their bet back straight away, offline hosts on their next join.

If `refund-on-disconnect` and `refund-on-reconnect-after-shutdown` are both `true`, every shutdown refund waits until the player's next join instead.

### When on

- Waiting coinflips are saved to the database, together with the host's heads/tails choice, the private flag and the invite list.
- When the server starts, they're put back in the coinflip list. The host's bet stays locked in the coinflip — nothing is refunded on shutdown, so there's no double refund.
- Until the host is back online, anyone who tries to join is told the host is offline.
- Hosts can still cancel the coinflip after the restart to get their bet back.
- Safe to switch on or off at any time. A coinflip that isn't restored — for example one created while the setting was off — is refunded to its host on their next join.

::: tip
Turn on `game-expiry` together with persistence. Without an expiry, a forgotten coinflip keeps its host's bet locked until they cancel it.
:::

### Flips in progress

A flip that is already rolling is never kept through a restart. Both players get their bet back: online players right away, offline players on their next join. With persistence on, these refunds always wait until each player's next join.

If the server crashes instead of stopping cleanly, bets saved in the database are paid back on each player's next join, and kept waiting coinflips are restored as usual.

For what happens when players disconnect or the plugin reloads, see [Security & Anti-Exploit](/ultracoinflip/guide/security).
