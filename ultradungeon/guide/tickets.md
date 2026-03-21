# Ticket System

## Overview

The ticket system limits how many times a player can enter dungeons per day. Each entry costs tickets, which reset daily.

## Configuration

### Global Toggle
In `config.yml`:
```yaml
gameplay:
  tickets:
    enabled: true    # Master switch for entire ticket system
```

### Per-Dungeon Toggle
In each room file (`room/<dungeon>.yml`):
```yaml
Access:
  TicketEnabled: true
  TicketCost: 1        # Tickets consumed per entry
```

## How It Works

1. Players receive daily tickets based on their permission
2. Entering a dungeon deducts `TicketCost` tickets
3. Tickets reset at midnight (server time)
4. Bonus tickets are **temporary** — they also reset daily

## Permissions

| Permission | Description |
|---|---|
| `ultradungeon.ticket.<number>` | Sets daily ticket limit (highest value wins) |
| `ultradungeon.ticket.unlimited` | Bypass ticket limit entirely |

Example: A player with `ultradungeon.ticket.5` gets 5 tickets per day.

## Admin Commands

```
/dungeon ticket give <player> <dungeon> <amount>
/dungeon ticket take <player> <dungeon> <amount>
/dungeon ticket set <player> <dungeon> <amount>
/dungeon ticket reset <player> <dungeon>
```

These commands manage **bonus tickets** (temporary, reset daily). Supports offline players.

## Anti-Alt System

Optional IP-based check to prevent alt accounts from bypassing daily limits:

```yaml
gameplay:
  tickets:
    ip-check: true
```
