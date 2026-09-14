# Discord Webhook

UltraCoinFlip can send game results and game creation notifications to a **Discord channel** automatically using webhooks.

## Setup

1. In Discord, go to your channel → **Edit Channel → Integrations → Webhooks → New Webhook**.
2. Copy the webhook URL.
3. Paste it in `config.yml`:

```yaml
discord:
  webhook:
    enabled: true
    url: "https://discord.com/api/webhooks/YOUR_WEBHOOK_ID/YOUR_WEBHOOK_TOKEN"
    username: "UltraCoinFlip"   # leave empty for Discord's default name
    avatar: ""                  # image URL, leave empty for Discord's default avatar
    min-amount: 0               # only post games with a bet of at least this amount
```

::: tip Supported Discord URLs
All Discord URL variants are supported: `discord.com`, `canary.discord.com`, `ptb.discord.com`, and `discordapp.com`.
:::

## Game Result Webhook

Post a Discord embed whenever a coinflip game finishes. Results are sent while `discord.webhook.enabled` is `true`, using the message under `discord.message`:

```yaml
discord:
  message:
    content: ""                 # plain text above the embed (empty = embed only)
    embed:
      enabled: true
      title: "Coin Flip Result"
      description: ""
      color:                    # embed border colour (RGB)
        r: 255
        g: 165
        b: 0
      thumbnail: ""             # image URL (optional)
      fields:
        - name: "Winner"
          value: "**%winner%**"
          inline: true
        - name: "Loser"
          value: "%loser%"
          inline: true
        - name: "Bet Amount"
          value: "%amount% %symbol%"
          inline: true
        - name: "Winnings"
          value: "**%taxed_amount% %symbol%**"
          inline: false
      footer:
        text: "UltraCoinFlip"
        icon: ""
      timestamp: true
```

| Placeholder | Description |
|---|---|
| `%winner%` | Name of the winner |
| `%loser%` | Name of the loser |
| `%amount%` | Bet amount (before tax) |
| `%taxed_amount%` | Amount the winner received (after tax) |
| `%currency%` | Currency display name |
| `%symbol%` | Currency symbol |

Bot games are posted too while `house.notifications.enabled` is `true` (the default). The bot's name is used for `%winner%` or `%loser%`, and `%taxed_amount%` is `0` when the bot wins.

## Game Created Webhook

Post a notification whenever a player creates a new coinflip game. It's off by default, uses the same webhook URL, name, avatar and `min-amount`, and only sends while `discord.webhook.enabled` is `true`:

```yaml
discord:
  game-created:
    enabled: true
    message:
      content: ""
      embed:
        enabled: true
        title: "New Coin Flip Created"
        description: ""
        color:
          r: 100
          g: 200
          b: 255
        thumbnail: ""
        fields:
          - name: "Player"
            value: "**%player%**"
            inline: true
          - name: "Amount"
            value: "%amount% %symbol%"
            inline: true
        footer:
          text: "UltraCoinFlip"
          icon: ""
        timestamp: true
```

Available placeholders: `%player%`, `%amount%`, `%currency%`, `%symbol%`. Bot games don't send this notification.

## PlaceholderAPI Support

Webhook text (content, title, description, fields and footer) supports **PlaceholderAPI placeholders**. In result messages they're filled in for the winner, in game created messages for the player who created the game. For example, you can show player ranks:

```yaml
description: "%luckperms_prefix% **%winner%** won %taxed_amount% %symbol%!"
```

Minecraft colour codes (`&b`, hex colours and MiniMessage tags) are removed before sending, so prefixes show as plain text in Discord.

## What gets posted

With the default embed, each game result message includes:
- Winner and loser names
- Bet amount and currency symbol
- Winnings after tax
- Timestamp

## Test Command

Verify your webhook is working without needing a live game:

```
/cf webhook test
```

This checks that the webhook is enabled and the URL is valid, sends a fixed test embed to it, and tells you in chat whether it worked. Requires `ultracoinflip.admin` permission and also works from the console.

## Filtering

Use `discord.webhook.min-amount` to only post high-stakes games and avoid spam in your Discord channel. It applies to both result and game created messages.

::: warning
Never share your webhook URL publicly — anyone with it can post to your channel. Keep it in `config.yml` only.
:::
