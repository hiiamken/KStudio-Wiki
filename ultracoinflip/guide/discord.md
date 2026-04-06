# Discord Webhook

UltraCoinFlip can send game results and game creation notifications to a **Discord channel** automatically using webhooks.

## Setup

1. In Discord, go to your channel → **Edit Channel → Integrations → Webhooks → New Webhook**.
2. Copy the webhook URL.
3. Paste it in `config.yml`:

```yaml
discord:
  enabled: true
  webhook-url: "https://discord.com/api/webhooks/YOUR_WEBHOOK_URL"
```

::: tip Supported Discord URLs
All Discord URL variants are supported: `discord.com`, `canary.discord.com`, `ptb.discord.com`, and `discordapp.com`.
:::

## Game Result Webhook

Post a Discord embed whenever a coinflip game finishes:

```yaml
discord:
  game-finished:
    enabled: true
    min-amount: 10000      # only post games above this bet amount
    embed:
      color: "#FFD700"
      title: "Coinflip Result"
      description: "**%winner%** won against **%loser%**"
```

## Game Created Webhook

Post a notification whenever a player creates a new coinflip game:

```yaml
discord:
  game-created:
    enabled: true
    min-amount: 5000
    embed:
      color: "#3498db"
      title: "New Coinflip Game"
      description: "**%player%** created a %amount% %currency% coinflip!"
```

## PlaceholderAPI Support

All webhook messages support **PlaceholderAPI placeholders**. For example, you can show player ranks:

```yaml
description: "%luckperms_prefix% **%winner%** won %amount% %currency%!"
```

## What gets posted

Each game result message includes:
- Winner and loser names
- Currency and bet amount
- Winning side (Heads / Tails)
- Tax amount (if applicable)
- Timestamp

## Test Command

Verify your webhook is working without needing a live game:

```
/cf webhook test
```

This sends a test embed to your configured webhook URL. Requires `ultracoinflip.admin` permission.

## Filtering

Use `min-amount` to only post high-stakes games and avoid spam in your Discord channel.

::: warning
Never share your webhook URL publicly — anyone with it can post to your channel. Keep it in `config.yml` only.
:::
