# BeastTokens

[BeastTokens](https://www.spigotmc.org/resources/beasttokens-custom-currency.20806/) là plugin token tùy chỉnh, hay được dùng làm tiền tệ thứ hai trên server survival/prison.

## Yêu cầu

- Cài plugin [BeastTokens](https://www.spigotmc.org/resources/beasttokens-custom-currency.20806/) vào server. Không cần tải thêm file API riêng.

## Cách thiết lập

1. Thả `BeastTokens.jar` vào thư mục `plugins/` rồi restart server.
2. Mở `plugins/UltraCoinFlip/currencies/beasttokens.yml` và đặt `enabled: true` — loại tiền này tắt theo mặc định.
3. Chỉnh các thiết lập khác theo nhu cầu, sau đó chạy `/cf reload`.

## File cấu hình: `beasttokens.yml`

```yaml
enabled: false                    # đặt true để dùng BeastTokens
unit: "Tokens"
display-name: "BeastTokens"
syntax-command: "beasttokens"     # /cf create beasttokens 100
broadcast-enabled: true
min-broadcast-amount: 100
min-bid: 1
max-bid: -1
min-reserve-balance: 0
round-to-integer: false
tax-enabled: true
tax-rate: 0.1
dynamic-tax-enabled: false
```

File này còn có các mục `tax-rate-config`, `restrictions`, `messages` và `event-commands` — xem [File tiền tệ](/vi/ultracoinflip/config/currencies).

## Ghi chú

- Số tiền BeastTokens không bị ép về số nguyên. Đặt `round-to-integer: true` nếu bạn muốn mức cược và tiền thắng là số nguyên.
- Nếu loại tiền này được bật mà BeastTokens chưa được cài, nó sẽ không được tải và console sẽ báo lỗi.
