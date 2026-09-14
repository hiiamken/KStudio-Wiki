# PlayerPoints

[PlayerPoints](https://www.spigotmc.org/resources/playerpoints.80745/) là plugin điểm thưởng phổ biến, thường dùng làm tiền tệ phụ trên server.

## Yêu cầu

- Cài plugin [PlayerPoints](https://www.spigotmc.org/resources/playerpoints.80745/) vào server.

## Cách thiết lập

1. Thả `PlayerPoints.jar` vào thư mục `plugins/` rồi restart server.
2. Mở `plugins/UltraCoinFlip/currencies/playerpoints.yml` và đặt `enabled: true` — loại tiền này tắt theo mặc định.
3. Chỉnh các thiết lập khác theo nhu cầu, sau đó chạy `/cf reload`.

## File cấu hình: `playerpoints.yml`

```yaml
enabled: false                    # đặt true để dùng PlayerPoints
unit: "Points"
display-name: "PlayerPoints"
syntax-command: "point"           # /cf create point 500
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

- PlayerPoints chỉ dùng số nguyên, nên mức cược được làm tròn xuống và tiền thắng được làm tròn về điểm gần nhất — kể cả khi `round-to-integer` đặt là `false`.
- Nếu loại tiền này được bật mà PlayerPoints chưa được cài, nó sẽ không được tải và console sẽ báo lỗi.
- `unit` có thể là bất kỳ chữ hoặc ký hiệu nào.
