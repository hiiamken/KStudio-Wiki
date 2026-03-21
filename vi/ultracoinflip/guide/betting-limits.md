# Giới hạn cược

Giới hạn cược cho phép giới hạn tổng tiền người chơi có thể đặt **mỗi ngày hoặc mỗi tuần**, theo từng loại tiền.

## Cấu hình

Giới hạn cược được đặt trong `config.yml`:

```yaml
betting-limits:
  enabled: true
  reset: DAILY       # DAILY hoặc WEEKLY
  currencies:
    vault:
      limit: 1000000   # Tổng cược tối đa mỗi ngày
    playerpoints:
      limit: 50000
```

`limit` là tổng **tích lũy** tiền cược tối đa trong chu kỳ reset. Tính cả thắng lẫn thua.

## Quyền bỏ qua

Người chơi có quyền `ultracoinflip.bypass.bettinglimit` không bị giới hạn.

::: tip
Đặt `limit: 0` để tắt giới hạn cho một loại tiền cụ thể mà không tắt toàn bộ hệ thống.
:::
