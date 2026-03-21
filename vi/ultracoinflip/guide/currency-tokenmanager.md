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
unit: "🔑"
display-name: "Tokens"
min-bid: 10
max-bid: 500000
tax:
  enabled: false
  tiers: []
```
