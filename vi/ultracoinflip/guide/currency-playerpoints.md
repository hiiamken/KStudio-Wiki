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
min-bid: 10
max-bid: 100000
tax:
  enabled: false
  tiers: []
```

## Ghi chú

- Nếu PlayerPoints không được cài, loại tiền này tự động bị tắt.
- `unit` có thể dùng bất kỳ ký tự Unicode nào, kể cả emoji.
