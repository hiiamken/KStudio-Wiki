# BeastTokens

[BeastTokens](https://www.spigotmc.org/resources/beasttokens-custom-currency.20806/) là plugin token tùy chỉnh, hay được dùng làm tiền tệ thứ hai trên server survival/prison.

## Yêu cầu

- Cài plugin [BeastTokens](https://www.spigotmc.org/resources/beasttokens-custom-currency.20806/) vào server.

## Cách thiết lập

1. Thả `BeastTokens.jar` vào thư mục `plugins/`.
2. Restart server — UltraCoinFlip tự nhận diện.
3. Chỉnh `plugins/UltraCoinFlip/currencies/beasttokens.yml` theo nhu cầu.

## File cấu hình: `beasttokens.yml`

```yaml
enabled: true
unit: "🐾"
display-name: "Tokens"
min-bid: 10
max-bid: 500000
tax:
  enabled: false
  tiers: []
```
