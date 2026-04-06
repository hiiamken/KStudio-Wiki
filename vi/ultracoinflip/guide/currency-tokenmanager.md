# TokenManager

[TokenManager](https://www.spigotmc.org/resources/tokenmanager.8610/) là plugin token kinh tế được dùng rộng rãi trên các server Minecraft.

## Yêu cầu

- Cài plugin [TokenManager](https://www.spigotmc.org/resources/tokenmanager.8610/) vào server.

## Cách thiết lập

1. Thả `TokenManager.jar` vào thư mục `plugins/`.
2. Restart server — UltraCoinFlip tự nhận diện.
3. Chỉnh `plugins/UltraCoinFlip/currencies/tokenmanager.yml` theo nhu cầu.

## File cấu hình: `tokenmanager.yml`

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
