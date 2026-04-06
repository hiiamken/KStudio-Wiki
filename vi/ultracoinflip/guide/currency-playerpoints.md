# PlayerPoints

[PlayerPoints](https://www.spigotmc.org/resources/playerpoints.80745/) là plugin điểm thưởng phổ biến, thường dùng làm tiền tệ phụ trên server.

## Yêu cầu

- Cài plugin [PlayerPoints](https://www.spigotmc.org/resources/playerpoints.80745/) vào server.

## Cách thiết lập

1. Thả `PlayerPoints.jar` vào thư mục `plugins/`.
2. Restart server — UltraCoinFlip tự nhận diện plugin.
3. Chỉnh `plugins/UltraCoinFlip/currencies/playerpoints.yml` theo nhu cầu.

## File cấu hình: `playerpoints.yml`

```yaml
enabled: true
unit: "⭐"
display-name: "Points"
syntax-command: "point"           # /cf create point 500
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

## Ghi chú

- Nếu PlayerPoints không được cài, loại tiền này tự động bị tắt.
- `unit` có thể dùng bất kỳ ký tự Unicode nào, kể cả emoji.
