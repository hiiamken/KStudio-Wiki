# TokenManager

[TokenManager](https://www.spigotmc.org/resources/tokenmanager.8610/) is a widely-used token economy plugin.

## Requirements

- [TokenManager](https://www.spigotmc.org/resources/tokenmanager.8610/) installed on your server.

## Setup

1. Install `TokenManager.jar` in your `plugins/` folder.
2. Restart the server — UltraCoinFlip detects it automatically.
3. Edit `plugins/UltraCoinFlip/currencies/tokenmanager.yml` to configure limits and display.

## Config file: `tokenmanager.yml`

```yaml
enabled: true
unit: "🔑"
display-name: "Tokens"
min-bid: 10
max-bid: 500000
tax:
  enabled: false
  tiers: []
```
