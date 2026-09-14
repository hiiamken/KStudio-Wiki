# config.yml

The main configuration file located at `plugins/UltraCoinFlip/config.yml`.

::: tip
Most changes apply with `/cf reload`. Changes to `database`, `performance`, `bedrock` and `bstats` need a full server restart.
:::

## General Settings

```yaml
language: en              # Language file to use (en, vi, fr, nl, ru, zh_cn, zh_tw, es, de, ar, it, lt, pt, pl, tr, ko, ja)
default-currency: "auto"  # Currency used by /cf create <amount> when no currency is given
```

Messages are loaded from `plugins/UltraCoinFlip/langs/messages_<language>.yml`.

`default-currency` takes `auto` or a currency's `syntax-command`, such as `money`, `point` or `coin`. With `auto`, or when the chosen currency is disabled, the first enabled currency in this order is used: Vault, PlayerPoints, TokenManager, BeastTokens, ExcellentEconomy / CoinsEngine, then custom placeholder currencies.

## Database

```yaml
database:
  type: SQLITE                       # SQLITE or MYSQL
  mysql:
    host: localhost
    port: 3306
    database: ultracoinflip          # Created automatically if the MySQL user has permission
    username: root
    password: password
    ssl: false
    pool-size: 10                    # Max connections (10 for small servers, 20-30 for large ones)
    connection-timeout: 10000        # ms to wait for a free connection
    idle-timeout: 600000             # ms an unused connection stays open
    max-lifetime: 1800000            # ms before a connection is replaced
    leak-detection-threshold: 60000  # ms before a connection that is never given back gets reported (0 = off)
```

`SQLITE` keeps everything in `plugins/UltraCoinFlip/ultracoinflip.db`. `MYSQL` connects to a database server and is recommended for large servers or multi-server setups.

## Game Behavior

```yaml
game-behavior:
  keep-coinflip-on-disconnect: false
  refund-on-disconnect: false
  refund-on-reconnect-after-shutdown: true
  refund-restore-delay: 40               # Ticks (20 ticks = 1 second)
  cancel-game-on-disconnect: false
  allow-close-during-animation: true
  force-watch-animation: false
  persist-games-across-restart: false
  default-bet: 100
  game-expiry:
    enabled: false
    after-hours: 72
    check-interval-minutes: 10
  multiple-games:
    enabled: false
    default-limit: 1                     # -1 = unlimited
    permission-limits:
      - permission: ultracoinflip.multigame.2
        limit: 2
      - permission: ultracoinflip.multigame.5
        limit: 5
```

| Key | Description |
|---|---|
| `keep-coinflip-on-disconnect` | `true` keeps a waiting coinflip listed while its host is offline. `false` removes it and refunds the host. |
| `refund-on-disconnect` | When that refund is paid. `false` pays it on the player's next join (recommended). `true` pays it right away, but some economy plugins don't save money given to a player who is leaving. |
| `refund-on-reconnect-after-shutdown` | When the server stops, holds every refund until the player rejoins instead of paying online players right away. Only works together with `refund-on-disconnect: true`. |
| `refund-restore-delay` | How long to wait after a player joins before paying their pending refunds. Raise it if refunds get overwritten while your economy plugin loads player data. |
| `cancel-game-on-disconnect` | A player leaves mid-flip. `false` lets the flip finish and the result waits for them. `true` settles it as they leave: the result is fixed once the animation starts, so it is still paid out, and only a flip that hadn't started yet is refunded. |
| `allow-close-during-animation` | `true` lets players close the flip menu while the game finishes in the background. `false` settles the flip as soon as a player closes the menu and pays out the result that was already decided. |
| `force-watch-animation` | Reopens the flip menu when a player in the game closes it mid-flip, so they see the result. Needs `allow-close-during-animation: true`. |
| `persist-games-across-restart` | Keeps waiting coinflips, including private mode and invites, through a server restart. The host's bet stays in the game instead of being refunded. |
| `default-bet` | Amount the create menu starts on. `-1` starts on the currency's `min-bid`. The amount is always kept between the currency's `min-bid` and `max-bid`. |
| `game-expiry` | Cancels waiting coinflips nobody joined after `after-hours` hours and refunds the host (on their next join if they are offline). `check-interval-minutes` is how often the plugin checks; changing it needs a restart. |
| `multiple-games` | Lets players host more than one coinflip at once. When disabled, each player can host one. Players get `default-limit`, or the highest limit in `permission-limits` they have the permission for; `-1` means unlimited. |

See [Coinflip Expiry](/ultracoinflip/guide/expiry) for expiry and keeping games across restarts.

## Heads or Tails

```yaml
heads-tails:
  enabled: false   # Players choose heads or tails before creating a coinflip
```

## Amount Input

```yaml
input:
  method: CHAT     # CHAT or ANVIL: how players type a custom bet amount
```

`ANVIL` falls back to chat on servers where the anvil input isn't available. When dialog menus are on, the `amount-input` slider is used instead.

## Dialog & Bedrock Menus

```yaml
dialog:
  enabled: false            # Native dialog screens on Paper-based 1.21.7+ servers
  create-side: true         # Heads or tails choice (needs heads-tails.enabled)
  amount-input: true        # Bet amount slider
  join-confirm: true        # Confirm before joining someone's coinflip
  house-confirm: true       # Confirm before playing the bot (needs heads-tails.enabled)
  currency-select: true     # Pick the currency from a list
  amount:
    fallback-max: 1000000   # Slider maximum for currencies without a max-bid

bedrock:
  enabled: true             # Bedrock forms for players joining through Geyser/Floodgate
```

Servers that can't show dialogs keep the classic chest and anvil menus. Bedrock forms need Floodgate installed on the server. See [Menus](/ultracoinflip/guide/menus).

## Notifications

```yaml
titles:
  enabled: true           # Title on screen when a game ends
actionbar:
  enabled: false          # Action bar message when a game ends
bossbar:
  enabled: false          # Boss bar when a game ends
  color: GREEN            # Winner bar: BLUE, GREEN, PINK, PURPLE, RED, WHITE, YELLOW
  color-lose: RED         # Loser bar
  overlay: PROGRESS       # Winner bar style: PROGRESS, NOTCHED_6, NOTCHED_10, NOTCHED_12, NOTCHED_20
  overlay-lose: PROGRESS  # Loser bar style
  progress: 1.0           # Winner bar fill, from 0.0 (empty) to 1.0 (full)
  progress-lose: 0.0      # Loser bar fill
  duration: 5             # Seconds on screen (0 = not removed automatically)
```

The text for each one is in the language file under `titles`, `actionbar` and `bossbar`.

## Broadcasts

```yaml
broadcast:
  enabled: true    # Master switch for every coinflip broadcast
```

When `false`, nothing is announced to the server (new games, results and bot games), no matter what `broadcast-enabled` says in the currency files or `house.broadcast.enabled` says below.

## Number Formatting

```yaml
number-format:
  type: COMPACT                 # COMPACT (15k, 3.5M), COMMAS (3,500,000) or FULL (3500000)
  compact:
    k-threshold: 10000          # Amounts from here get "k"; smaller amounts use commas
    m-threshold: 1.0            # In millions: 1.0 = 1,000,000
    b-threshold: 1000.0         # In millions: 1000.0 = 1,000,000,000
    t-threshold: 1000000.0      # In millions: 1000000.0 = 1,000,000,000,000
  remove-trailing-zeros: true   # Show 1000 instead of 1000.00
  per-currency: {}              # Override per currency ID, e.g. gems: COMMAS
```

`per-currency` only applies to currencies that have an ID, meaning ExcellentEconomy / CoinsEngine and custom placeholder currencies. Vault, PlayerPoints, TokenManager and BeastTokens always use `type`.

## House Bot

```yaml
house:
  enabled: true                 # Turn Play with Bot on or off
  name: "YourServer"            # Bot name in messages and history
  subcommand: "bot"             # Word used in /cf create <currency> <amount> bot
  display:                      # How the bot looks in menus
    material: "PLAYER_HEAD"     # Use "SKULL_ITEM:3" on 1.8-1.12
    display-name: "&e&l{BOT}"   # {BOT} = bot name
    # Base64 head texture, used with PLAYER_HEAD (the default is a bot head)
    texture: "eyJ0ZXh0dXJlcyI6eyJTS0lOIjp7InVybCI6Imh0dHA6Ly90ZXh0dXJlcy5taW5lY3JhZnQubmV0L3RleHR1cmUvYjQ4ZDU1YjMzZWQ2ZmViNjE0ZTJjYTVkNGY1MGJiMzdmMTYxYWRhMzU4MmZjZmM2ZTQwMjg4YzZmYjA2ZjFmIn19fQ=="
  limits:
    max-games-per-day: 50       # Bot games per player per day (-1 = unlimited)
    delay-between-games: 10     # Seconds between bot games (0 = no delay)
  bet:
    min: "100"                  # Accepts amounts like 1k or 10M
    max: "10M"                  # -1 = no bot limit (the currency's max-bid still applies)
  tax:
    enabled: true               # false = bot games are never taxed
  history:
    enabled: true               # Save bot games to /cf history
  notifications:
    enabled: true               # Send bot game results to the Discord webhook
  broadcast:
    enabled: false              # Announce bot wins and losses to the server
    min-amount: 100             # Only for bets of at least this amount
```

With `tax.enabled: true`, bot games are taxed like any other game in that currency. The currency's `min-bid` and `max-bid` also apply on top of `bet`. See [Play with Bot](/ultracoinflip/guide/bot-game) and [Tax System](/ultracoinflip/guide/tax).

## Leaderboard

```yaml
leaderboard:
  filters:                         # Leaderboard types players can switch between
    wins: true
    profit: true
    largest-win: true
    worst-profit: true
    winstreak: true
  not-ranked-text: 'N/A'           # Shown when a player has no rank or a top slot is empty
  gui-cache-seconds: 180           # How long /cf leaderboard keeps its data before reloading
  placeholder-cache-seconds: 600   # How long %coinflip_top_*% and %coinflip_position_*% results are cached
  refresh-countdown-format:        # Format of %coinflip_leaderboard_refresh_in%
    hours: '<h>h<m>m'              # Used when 1 hour or more is left
    minutes: '<m>m<s>s'            # Used when under 1 hour is left
    seconds: '<s>s'                # Used when under 1 minute is left
```

Keep at least one filter enabled. Scoreboards and tab lists read placeholders many times per second, so keep `placeholder-cache-seconds` high. See [PlaceholderAPI](/ultracoinflip/guide/placeholderapi).

## Stats Display

```yaml
stats:
  display-mode: "GUI"   # GUI or CHAT: how /cf stats shows player statistics
```

## Betting Limits

```yaml
betting-limits:
  enabled: false
  currencies:
    money:                    # Vault
      daily-limit: 100000     # Max total bet per day (-1 = unlimited)
      weekly-limit: 500000    # Max total bet per week (-1 = unlimited)
    playerpoints:
      daily-limit: 50000
      weekly-limit: 200000
    tokenmanager:
      daily-limit: 10000
      weekly-limit: 50000
    beasttokens:
      daily-limit: 10000
      weekly-limit: 50000
    # coinsengine:            # ExcellentEconomy / CoinsEngine, one entry per currency ID
    #   gems:
    #     daily-limit: 1000
    #     weekly-limit: 5000
    # placeholder:            # Custom placeholder currencies, one entry per currency ID
    #   orbs:
    #     daily-limit: 500
    #     weekly-limit: 2000
```

Daily totals reset at midnight and weekly totals on Monday (server time). A currency with no entry here has no limit, and players with `ultracoinflip.bypass.bettinglimit` skip all limits. See [Betting Limits](/ultracoinflip/guide/betting-limits).

## Earnings & Loss Limits

Betting limits cap how much a player bets. Earnings limits cap how much they win or lose in total over a period.

```yaml
earnings-limit:
  enabled: false
  period: calendar-daily        # calendar-daily, calendar-weekly, calendar-monthly, rolling-24h or rolling-7d
  reset-timezone: ""            # Empty = server timezone, e.g. "UTC" or "Asia/Ho_Chi_Minh"
  threshold-warnings:
    enabled: false              # Warn players as they get close to a cap
    percentages: [50, 75, 90]
    sound: BLOCK_NOTE_BLOCK_BELL
  per-currency:
    vault:                      # vault, playerpoints, tokenmanager, beasttokens or a currency ID
      max-win:                  # Also available: max-loss, max-net-profit, max-volume
        enabled: false
        default: 1000000
        groups:                 # Permission: cap (the highest value the player qualifies for is used)
          ultracoinflip.limit.vip: 5000000
          ultracoinflip.limit.mvp: 10000000
```

::: warning
Vault is called `vault` here but `money` under `betting-limits`.
:::

See [Earnings & Loss Limits](/ultracoinflip/guide/earnings-limits) for every limit type.

## Invites & Private Coinflips

```yaml
invite:
  enabled: true           # /cf invite, uninvite, accept, deny and private, plus the Private button in the create menu
  cooldown-seconds: 3     # Seconds between /cf invite uses per player (0 = no cooldown)
```

With `enabled: false`, every coinflip is public. See [Private Coinflips & Invites](/ultracoinflip/guide/private-and-invites).

## Discord Webhook

```yaml
discord:
  webhook:
    enabled: false
    url: "https://discord.com/api/webhooks/YOUR_WEBHOOK_ID/YOUR_WEBHOOK_TOKEN"
    username: "UltraCoinFlip"     # Empty = Discord's default name
    avatar: ""                    # Image URL, empty = Discord's default avatar
    min-amount: 0                 # Only post coinflips with a bet of at least this amount
  message:                        # Game result post
    content: ""                   # Plain text sent with the embed
    embed:
      enabled: true
      title: "Coin Flip Result"
      description: ""
      color:                      # Embed color as RGB
        r: 255
        g: 165
        b: 0
      thumbnail: ""
      fields:
        - name: "Winner"
          value: "**%winner%**"
          inline: true
        # Loser, Bet Amount and Winnings follow the same format
      footer:
        text: "UltraCoinFlip"
        icon: ""
      timestamp: true
  game-created:
    enabled: false                # Also post new coinflips (needs webhook.enabled)
    message:
      content: ""
      embed:                      # Same options as the result embed, titled "New Coin Flip Created"
        enabled: true
```

Result posts can use `%winner%`, `%loser%`, `%amount%`, `%taxed_amount%`, `%currency%` and `%symbol%`. New game posts can use `%player%`, `%amount%`, `%currency%` and `%symbol%`. PlaceholderAPI placeholders work in both. Send a test post with `/cf webhook test`. See [Discord Webhook](/ultracoinflip/guide/discord).

## Exploit Detection

```yaml
exploit-detection:
  enabled: true
  console-logging: true                    # Console warnings (rate-limited)
  file-logging: true                       # Writes plugins/UltraCoinFlip/exploit-detection.log
  admin-notify: true                       # In-game alerts for serious or repeated attempts
  admin-permission: 'ultracoinflip.admin'  # Who receives the alerts
```

See [Security & Anti-Exploit](/ultracoinflip/guide/security).

## Transaction Logging

```yaml
transaction-logging:
  console: false   # Also print refund transactions to the console
```

Refunds are always written to `plugins/UltraCoinFlip/transactions.log`; this setting only adds console output.

## Update Checker

```yaml
update-checker:
  enabled: true                            # Check for a new version on startup
  notify-console: true                     # Show update notices in the console
  notify-in-game: true                     # Tell staff in-game when they join
  notify-permission: 'ultracoinflip.admin' # Who sees in-game notices (ops always do)
```

## bStats

```yaml
bstats:
  enabled: true    # Share anonymous usage statistics
```

## Performance

```yaml
performance:
  batch-stats-save:
    enabled: true  # Group stats database writes (every 5 seconds or every 10 queued saves)
```

## Debug

```yaml
debug:
  enabled: false
  level: INFO                  # VERBOSE, INFO, WARNING or ERROR
  stack-trace: false           # Include stack traces when errors occur
  file-logging: false          # Save logs to plugins/UltraCoinFlip/debug-logs/
  performance-tracking: false  # Measure how long operations take
  categories:                  # Turn single areas on or off
    general: true
    config: true
    database: true
    currency: true
    game: true
    gui: true
    discord: true
    command: true
    performance: true
    event: true
    refund: true
```

## Config Version

::: warning
Don't change `config-version` at the bottom of the file. The plugin uses it to add new settings to your `config.yml` after an update while keeping the values you set.
:::
