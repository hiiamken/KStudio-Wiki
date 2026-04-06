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
unit: "Tokens"
display-name: "BeastTokens"
syntax-command: "beasttokens"     # /cf create beasttokens 100
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
