# Security & Anti-Exploit

UltraCoinFlip includes a multi-layer security system to protect your server's economy from cheating and exploits.

## Protections included

### Disconnect refund exploit
The winner is picked before the flip animation begins and is locked in the moment it starts. Disconnecting or closing the menu after that can't get a bet back: the loser's bet stays lost and the winner is paid — right away if online, otherwise on their next join. This also holds with `cancel-game-on-disconnect: true` or `allow-close-during-animation: false`: those settings settle the flip early, but the locked result is paid out instead of refunding both players.

### Backup refund system
Every bet is saved to the database when it's placed — when a coinflip is created, and for both players when a flip starts. If the server crashes or a payout can't be delivered, the saved amount is paid when the player next joins. The backup is only cleared once the game has paid out or the bet has been returned. If the database can't start, the plugin disables itself so no bets are taken without a backup.

### Balance verification
After every withdraw and deposit, UltraCoinFlip checks that the player's balance actually changed by the expected amount. If a withdraw didn't take the money, the bet is refused. A deposit that doesn't show up is reported to the exploit log. Custom PlaceholderAPI currencies skip this check because they pay through console commands.

### Double-click / race condition protection
Players cannot join the same game twice or join multiple games simultaneously, and two players can't take the same game. The game leaves the list before the joiner's bet is withdrawn — if the withdraw fails, the game goes straight back. A player whose flip is still rolling can't create or join another game.

### Safe cancelling
`/cf delete` has a 3-second cooldown, a coinflip can only be refunded once, and cancelling is blocked while the plugin reloads or shuts down. If the refund can't be deposited, the coinflip goes back on the list instead of disappearing.

### Suspicious pattern detection
The exploit detector counts each type of event per player. Three or more of the same event within 30 seconds marks the player as suspicious and alerts online admins.

## Exploit Detection Log

When suspicious activity is detected, it's logged to `plugins/UltraCoinFlip/exploit-detection.log` and (optionally) shown to online admins.

Configure in `config.yml`:

```yaml
exploit-detection:
  enabled: true
  console-logging: true
  file-logging: true
  admin-notify: true
  admin-permission: "ultracoinflip.admin"
```

| Event | Severity |
|---|---|
| A withdraw reported success but the balance didn't go down | High |
| A player left after the flip's result was decided | High |
| A deposit reported success but the balance didn't go up | Medium |
| Two players tried to join the same game at once | Medium |
| A join was rolled back because the withdraw failed | Medium |
| Double-click join attempt | Low |
| Tried to join a game another player already took | Low |

- Each player gets at most one entry per event type every 5 seconds, so the console isn't spammed.
- Players with `admin-permission` are alerted for **High** events and for suspicious patterns.
- `enabled: false` only turns off the logging and alerts — the protections above always stay active.

## Disconnects, reloads and restarts

| Situation | What happens |
|---|---|
| Host leaves while their coinflip is waiting | The coinflip is removed and the bet returned on their next join. `refund-on-disconnect: true` refunds right away; `keep-coinflip-on-disconnect: true` keeps the coinflip listed instead. |
| A player leaves during a flip | The flip plays out and the result stands. A winner who is offline gets the winnings on their next join. |
| A player rejoins before their flip ends | Nothing is refunded — the flip pays out when it ends. |
| `/cf reload` during a flip | The flip is stopped and both players get their bet back (offline players on their next join). Waiting coinflips stay listed. |
| Server stops | Flips in progress are refunded to both players, and waiting coinflips are refunded to their hosts unless they're kept — see [Coinflip Expiry & Restarts](/ultracoinflip/guide/expiry). Online players are paid right away, offline players on their next join. |
| Server crashes | Saved bets are paid back on each player's next join (kept waiting coinflips are restored instead). |
| A payout or refund deposit fails | The amount is saved and paid on the player's next join. A failed cancel refund puts the coinflip back on the list instead. |

Related settings under `game-behavior:` in `config.yml`:

| Key | Default | Description |
|---|---|---|
| `keep-coinflip-on-disconnect` | `false` | Keep a waiting coinflip listed when its host leaves |
| `refund-on-disconnect` | `false` | Refund a leaving host's coinflip right away instead of on their next join |
| `refund-on-reconnect-after-shutdown` | `true` | When `refund-on-disconnect` is also `true`, holds every shutdown refund until the player's next join |
| `cancel-game-on-disconnect` | `false` | Settle a flip as soon as a player leaves instead of letting it play out — the locked result is still paid |
| `refund-restore-delay` | `40` | Ticks to wait after a player joins before paying saved refunds and winnings |

## Refund backup system

When a player joins, UltraCoinFlip pays out everything saved for them: bets from coinflips that were cancelled, expired or interrupted while they were offline, and winnings from flips that finished without them. It waits a short delay first, configured in `config.yml`:

```yaml
game-behavior:
  refund-restore-delay: 40   # ticks after join before processing refunds (20 ticks = 1 second)
```

Increase this value if your economy plugin takes a few seconds to load player data on join. A deposit that still fails is kept and tried again on the next join.

## Transaction Log

Coinflip cancel refunds are recorded in `plugins/UltraCoinFlip/transactions.log`: successful refunds, refunds rolled back because the deposit failed, and blocked attempts (cooldown, double refund, reload or shutdown in progress). The file is always written — this setting only decides whether entries are also printed to the console:

```yaml
transaction-logging:
  console: false
```
