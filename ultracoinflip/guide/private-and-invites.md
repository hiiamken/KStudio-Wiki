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
| `/coinflip invite <player>` | Sends a clickable invite to that player (they must be online) |
| `/coinflip uninvite <player>` | Removes someone from your invite list and tells them if they're online |
| `/coinflip accept [id]` | Accept an invite and join that coinflip (id optional if you have one pending) |
| `/coinflip deny [id]` | Deny an invite — you're taken off the invite list and the host is told |
| `/coinflip private [on\|off]` | Toggle invite-only mode on your active coinflip (no argument switches it) |

- You need an active coinflip before you can invite anyone or make it private.
- Invites work on public coinflips too — the invite is simply a clickable way to join.
- Accepting runs the same checks as joining from the list: the invitee needs enough balance, must be within their limits, and the host has to be online.
- If you have more than one pending invite, add the id to `/cf accept` or `/cf deny`. The clickable buttons already include it.

## Create GUI Toggle

There's also a **Private** button in the Create GUI (slot 21 by default, next to the custom-amount anvil). Click it before pressing Create to start the game in private mode in one shot — no need to run `/cf private` after.

The button is set under `private-toggle` in `gui/create.yml` (`enabled`, `slot`, `material`, `material-private`, `glowing-when-private`). See [Menus](/ultracoinflip/guide/menus) for the menu files.

## Cooldown

`/cf invite` has a per-inviter cooldown (default 3 seconds) so one player can't flood another's chat. Configure it in `config.yml`:

```yaml
invite:
  enabled: true            # master toggle — set false to disable invite/private entirely
  cooldown-seconds: 3      # seconds between /cf invite calls per player (0 = no cooldown)
```

## Master Toggle

If your server wants pure public coinflip only, flip `invite.enabled: false` in `config.yml` and `/cf reload`. The five commands (`invite`, `uninvite`, `accept`, `deny`, `private`) reply that the invite system is disabled, and the Private button is hidden from the Create GUI.

## Persist Across Restart

By default a server restart cancels waiting coinflips and refunds their hosts, so the private flag and invite list are gone too. Turn on `game-behavior.persist-games-across-restart` to keep waiting coinflips — including their private flag and invite list — through a restart. See [Coinflip Expiry & Restarts](/ultracoinflip/guide/expiry) for the details.

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
`/cf invite` rejects the call with "That player is offline." The invitee must be online to receive the clickable chat message.

**What happens if the host disconnects?**
With default settings the game is removed from the list and the host gets their bet back on their next join (same flow as a regular coinflip). With `game-behavior.keep-coinflip-on-disconnect: true` the game stays in the list — anyone who tries to join is told the host is offline until they come back.

**Does the syntax usage hint (`Usage: /cf invite <player>`) translate to my server's language?**
Yes — every supported language ships a `syntax:` block that translates the `Usage:` prefix and each placeholder name. See `messages_<lang>.yml`.
