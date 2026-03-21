# Discord Webhook

UltraCoinFlip can send game results to a **Discord channel** automatically using webhooks.

## Setup

1. In Discord, go to your channel → **Edit Channel → Integrations → Webhooks → New Webhook**.
2. Copy the webhook URL.
3. Paste it in `config.yml`:

```yaml
discord:
  enabled: true
  webhook-url: "https://discord.com/api/webhooks/YOUR_WEBHOOK_URL"
  send-on-win: true
  min-amount: 10000    # Only post games above this amount
  embed:
    color: "#FFD700"
    title: "💰 CoinFlip Result"
```

## What gets posted

Each message includes:
- Winner and loser names
- Currency and bet amount
- Winning side (Heads / Tails)
- Timestamp

## Filtering

Use `min-amount` to only post high-stakes games and avoid spam in your Discord channel.

::: warning
Never share your webhook URL publicly — anyone with it can post to your channel. Keep it in `config.yml` only.
:::
