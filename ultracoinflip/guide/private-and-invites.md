# Private Coinflips & Invites

Invite a specific player to your coinflip instead of letting anyone in the list grab it, and (optionally) lock the game so only invited players can join.

## Quick Start

1. Create a coinflip as normal (`/cf` GUI or `/cf create money 1000`).
2. Invite a specific player:
   ```
   /coinflip invite Steve
   ```
   Steve gets a chat message with clickable `[Accept]` and `[Deny]` buttons.
3. (Optional) lock the game so only invitees can join:
   ```
   /coinflip private
   ```
   Non-invited players no longer see your game in the list and can't join it.

## Commands

| Command | Description |
|---|---|
| `/coinflip invite <player>` | Sends a clickable invite to that player |
| `/coinflip uninvite <player>` | Removes someone from your invite list |
| `/coinflip accept [id]` | Accept an invite (id optional if you have one pending) |
| `/coinflip deny [id]` | Deny an invite |
| `/coinflip private [on\|off]` | Toggle invite-only mode on your active coinflip |

## Create GUI Toggle

There's also a **Private** button in the Create GUI (slot 21 by default, next to the custom-amount anvil). Click it before pressing Create to start the game in private mode in one shot — no need to run `/cf private` after.

## Cooldown

`/cf invite` has a per-inviter cooldown (default 3 seconds) so one player can't flood another's chat. Configure it in `config.yml`:

```yaml
invite:
  enabled: true            # master toggle — set false to disable invite/private entirely
  cooldown-seconds: 3      # seconds between /cf invite calls per player
```

## Master Toggle

If your server wants pure public coinflip only, flip `invite.enabled: false` in `config.yml` and `/cf reload`. The five new commands (`invite`, `uninvite`, `accept`, `deny`, `private`) return a "feature disabled" message and the Private GUI button is hidden.

## Persist Across Restart (opt-in)

By default a server restart wipes active waiting games (host's bet is refunded on rejoin). Enable persistence to keep private + invite state alive through a full restart:

```yaml
game-behavior:
  persist-games-across-restart: false   # set true to keep games alive
```

When on:

- The waiting game (with its private flag and invite list) is mirrored to a separate database table on every state change.
- On startup the game is restored into the active list. The host's bet stays locked (no double refund).
- Hosts and invitees pick up where they left off after the restart.
- Rolling games (already mid-animation) are still refunded as today — only waiting games persist.

Safe to toggle on/off at any time. Orphan rows from a prior toggle-off cycle are ignored.

## Permissions

| Permission | Description | Default |
|---|---|---|
| `ultracoinflip.command.invite` | `/cf invite` and `/cf uninvite` | `true` |
| `ultracoinflip.command.accept` | `/cf accept` and `/cf deny` | `true` |
| `ultracoinflip.command.private` | `/cf private` | `true` |

All default true — out of the box every player can use the feature without LuckPerms touching anything.

## FAQ

**Does the host's `&b` LuckPerms prefix leak into the Discord webhook?**
No — color codes get stripped before the message is sent to Discord. In-game chat still shows the prefix coloured exactly like before.

**What happens if the invited player is offline?**
`/cf invite` rejects the call with "that player is offline". The invitee must be online to receive the clickable chat message.

**What happens if the host disconnects?**
With default settings the game is cancelled and the host's bet refunded on rejoin (same flow as a regular coinflip). With `persist-games-across-restart: true` and `keep-coinflip-on-disconnect: true`, the game survives — joiners get "host offline" until the host comes back.

**Does the syntax usage hint (`Usage: /cf invite <player>`) translate to my server's language?**
Yes — every supported language ships a `syntax:` block that translates the `Usage:` prefix and each placeholder name. See `messages_<lang>.yml`.
