# TokenManager

[TokenManager](https://www.spigotmc.org/resources/tokenmanager.8610/) là plugin token kinh tế được dùng rộng rãi trên các server Minecraft.

## Yêu cầu

- Cài plugin [TokenManager](https://www.spigotmc.org/resources/tokenmanager.8610/) vào server.

## Cách thiết lập

1. Thả `TokenManager.jar` vào thư mục `plugins/` rồi restart server.
2. Mở `plugins/UltraCoinFlip/currencies/tokenmanager.yml` và đặt `enabled: true` — loại tiền này tắt theo mặc định.
3. Chỉnh các thiết lập khác theo nhu cầu, sau đó chạy `/cf reload`.

## File cấu hình: `tokenmanager.yml`

```yaml
enabled: false                    # đặt true để dùng TokenManager
unit: "Tokens"
display-name: "Tokens"
syntax-command: "token"           # /cf create token 250
broadcast-enabled: true
min-broadcast-amount: 100
min-bid: 1
max-bid: -1
min-reserve-balance: 0
round-to-integer: true
tax-enabled: true
tax-rate: 0.1
dynamic-tax-enabled: false
```

File này còn có các mục `tax-rate-config`, `restrictions`, `messages` và `event-commands` — xem [File tiền tệ](/vi/ultracoinflip/config/currencies).

## Ghi chú

- TokenManager chỉ dùng số nguyên, nên mức cược được làm tròn xuống và tiền thắng được làm tròn về token gần nhất — kể cả khi `round-to-integer` đặt là `false`.
- Nếu loại tiền này được bật mà TokenManager chưa được cài, nó sẽ không được tải và console sẽ báo lỗi.
