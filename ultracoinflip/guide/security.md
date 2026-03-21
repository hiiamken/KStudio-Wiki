# Security & Anti-Exploit

UltraCoinFlip includes a multi-layer security system to protect your server's economy from cheating and exploits.

## Protections included

### Reconnect refund exploit (fixed in 3.10.0)
Players cannot disconnect after losing a coinflip and reconnect to receive a fraudulent refund. Games are finalized immediately when the result is determined — before any disconnect handler can trigger a refund.

### Backup refund system
All bets are backed up before a game starts. If the server crashes or the player disconnects mid-game (before a result), the backup is used to refund them on rejoin. The backup is only deleted after the game resolves successfully.

### Balance verification
After every withdraw and deposit, UltraCoinFlip verifies the player's balance changed by the expected amount. If the economy plugin silently fails, the plugin detects it and rolls back.

### Double-click / race condition protection
Players cannot join the same game twice or join multiple games simultaneously. All game state changes are atomic.

### Rapid join detection
The exploit detector tracks repeated suspicious join attempts per player. High-frequency attempts are flagged and logged.

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

## Refund backup system

If a player disconnects mid-game, their bet is automatically refunded when they reconnect. Configure the restore delay in `config.yml`:

```yaml
refund:
  restore-delay: 2   # seconds after join before processing refund
```

Increase this value if your economy plugin takes a few seconds to load player data on join.
