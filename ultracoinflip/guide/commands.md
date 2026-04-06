# Commands

All commands use `/coinflip` or the alias `/cf`.

## Player Commands

| Command | Description |
|---|---|
| `/coinflip` | Open the coinflip game list |
| `/coinflip help` | Display all available commands |
| `/coinflip create` | Open the interactive create GUI (currency & amount selection) |
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
| `/cf webhook test` | Send a test message to your Discord webhook |

## Amount Shortcuts

UltraCoinFlip supports shorthand amount notation:

| Input | Equivalent |
|---|---|
| `1k` | 1,000 |
| `1.5m` | 1,500,000 |
| `2b` | 2,000,000,000 |
| `1t` | 1,000,000,000,000 |

**Example:** `/coinflip create money 500k` creates a game for 500,000 Vault coins.

::: tip
The `bot` keyword at the end of `/coinflip create` starts an instant game against the bot — no waiting for another player.
:::

## Currency Keywords

Each currency has a **syntax command** used in the create command. These are configured in each currency's config file (`syntax-command` key):

| Currency | Default Keyword | Example |
|---|---|---|
| Vault | `money` | `/cf create money 1000` |
| PlayerPoints | `point` | `/cf create point 500` |
| TokenManager | `token` | `/cf create token 250` |
| BeastTokens | `beasttokens` | `/cf create beasttokens 100` |
| CoinsEngine | `coin` | `/cf create coin 1000` |
| Custom (PlaceholderAPI) | *(configurable)* | `/cf create orb 500` |
