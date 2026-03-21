# Commands

All commands use `/coinflip` or the alias `/cf`.

## Player Commands

| Command | Description |
|---|---|
| `/coinflip` | Open the coinflip game list |
| `/coinflip help` | Display all available commands |
| `/coinflip create <currency> <amount>` | Create a new coinflip game |
| `/coinflip create <currency> <amount> bot` | Start a game against the server bot |
| `/coinflip delete` | Cancel your active coinflip game |
| `/coinflip history` | View your personal game history |
| `/cf settings` | Open player notification settings |
| `/cf leaderboard` | View the top players leaderboard |

## Admin Commands

| Command | Description |
|---|---|
| `/coinflip reload` | Reload all configuration files |
| `/cf audit` | Open the real-time admin monitoring dashboard |

## Amount Shortcuts

UltraCoinFlip supports shorthand amount notation:

| Input | Equivalent |
|---|---|
| `1k` | 1,000 |
| `1.5m` | 1,500,000 |
| `2b` | 2,000,000,000 |
| `1t` | 1,000,000,000,000 |

**Example:** `/coinflip create vault 500k` creates a game for 500,000 Vault coins.

::: tip
The `bot` keyword at the end of `/coinflip create` starts an instant game against the bot — no waiting for another player.
:::
