# Commands

All commands use `/coinflip` or the alias `/cf`. To add more names, list them under `command_aliases` in `config.yml` and restart the server. Names can only contain letters, digits and underscores.

## Player Commands

| Command | Description |
|---|---|
| `/coinflip` | Open the coinflip game list |
| `/coinflip help` | Display all available commands (admins also see the admin commands) |
| `/coinflip info` | Show the plugin version, server, database and detected economies |
| `/coinflip create` | Open the interactive create GUI (currency & amount selection) |
| `/coinflip create <amount>` | Create a new coinflip game with the default currency |
| `/coinflip create <currency> <amount>` | Create a new coinflip game |
| `/coinflip create <currency> <amount> bot` | Start a game against the server bot |
| `/coinflip delete` | Cancel your active coinflips and get your bet back |
| `/coinflip invite <player>` | Invite a specific player with clickable Accept/Deny in chat |
| `/coinflip uninvite <player>` | Remove a player from your invite list |
| `/coinflip accept [id]` | Accept a coinflip invite (id optional if you have one pending) |
| `/coinflip deny [id]` | Deny a coinflip invite |
| `/coinflip private [on\|off]` | Toggle invite-only mode on your coinflip |
| `/coinflip history` | View your personal game history |
| `/cf settings` | Open player notification settings |
| `/cf leaderboard` | View the top players leaderboard |
| `/cf stats` | View your own coinflip statistics |
| `/cf stats <player>` | View another player's statistics |
| `/cf limit` | List the earnings limit commands |
| `/cf limit me` | View your own earnings and loss limits |

## Admin Commands

| Command | Description |
|---|---|
| `/coinflip reload` | Reload all configuration files |
| `/cf audit` | Open the real-time admin monitoring dashboard |
| `/cf webhook test` | Send a test message to your Discord webhook |
| `/cf limit player <player>` | View another player's earnings and loss limits |
| `/cf limit reset <player>` | Reset a player's earnings limits for the current period |
| `/cf limit auto-tune <currency>` | Suggest max-win and max-loss caps from the last 30 days of games (`<currency>` is the key under `earnings-limit.per-currency`, e.g. `vault`; `money` also works for Vault) |

::: warning
Reloading while a flip is still animating ends that flip and gives the bets back (offline players get theirs on their next join). `/coinflip reload` is refused while refunds are still being processed.
:::

## Console

These commands also work from the server console: `coinflip help`, `coinflip info`, `coinflip reload`, `cf audit` (prints a text system report instead of the dashboard), `cf webhook test`, `cf limit`, `cf limit reset <player>` and `cf limit auto-tune <currency>`. Every other command has to be run in-game by a player.

## Subcommand Aliases

| Subcommand | Also works as |
|---|---|
| `delete` | `remove`, `cancel` |
| `leaderboard` | `lb`, `top` |
| `settings` | `toggle` |
| `stats` | `st` |
| `info` | `about`, `version` |
| `audit` | `status`, `admin` |

::: tip
Every command needs `ultracoinflip.use` plus its own permission node. See [Permissions](/ultracoinflip/guide/permissions).
:::

## Amount Shortcuts

UltraCoinFlip supports shorthand amount notation:

| Input | Equivalent |
|---|---|
| `1k` | 1,000 |
| `1.5m` | 1,500,000 |
| `2b` | 2,000,000,000 |
| `1t` | 1,000,000,000,000 |

**Example:** `/coinflip create money 500k` creates a game for 500,000 Vault coins.

Suffixes are not case-sensitive (`1K` and `1k` both work). Use a dot for decimals and no thousands separators — `1,000` is rejected.

::: tip Default Currency
Players can skip the currency keyword: `/cf create 500k` uses `default-currency` from `config.yml`. The default `auto` picks the first enabled currency in this order: money, PlayerPoints, TokenManager, BeastTokens, ExcellentEconomy, custom currencies.
:::

::: tip
The `bot` keyword at the end of `/coinflip create` starts an instant game against the bot — no waiting for another player. You can rename the keyword with `house.subcommand` in `config.yml`.
:::

## Currency Keywords

Each currency has a **syntax command** used in the create command. These are configured in each currency's config file (`syntax-command` key):

| Currency | Default Keyword | Example |
|---|---|---|
| Vault | `money` | `/cf create money 1000` |
| PlayerPoints | `point` | `/cf create point 500` |
| TokenManager | `token` | `/cf create token 250` |
| BeastTokens | `beasttokens` | `/cf create beasttokens 100` |
| ExcellentEconomy / CoinsEngine | `coin` | `/cf create coin 1000` |
| Custom (PlaceholderAPI) | *(configurable)* | `/cf create orb 500` |

A keyword only works while its currency is enabled — only Vault is enabled by default. ExcellentEconomy and custom currencies can also be picked with `coinsengine:<id>` / `placeholder:<id>`, or just the currency ID. Vault, PlayerPoints, TokenManager and BeastTokens also accept `money`, `playerpoints`, `tokenmanager` and `beasttokens`, unless a keyword or currency ID already uses that name.
