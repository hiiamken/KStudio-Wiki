# TokenManager

[TokenManager](https://www.spigotmc.org/resources/tokenmanager.8610/) is a widely used token economy plugin for Minecraft servers.

## Requirements

- Install [TokenManager](https://www.spigotmc.org/resources/tokenmanager.8610/) on your server.

## Setup

1. Drop `TokenManager.jar` into your `plugins/` folder.
2. Restart the server — UltraCoinFlip detects it automatically.
3. Edit `plugins/UltraCoinFlip/currencies/tokenmanager.yml` as needed.

## Config File: `tokenmanager.yml`

```yaml
enabled: true
unit: "Tokens"
display-name: "Tokens"
syntax-command: "token"           # /cf create token 250
broadcast-enabled: true
min-broadcast-amount: 100
min-bid: 1
max-bid: -1
min-reserve-balance: 0
round-to-integer: false
tax-enabled: false
tax-rate: 0.1
dynamic-tax-enabled: false
```
