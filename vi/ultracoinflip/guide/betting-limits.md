# Giới hạn cược

Giới hạn cược cho phép bạn giới hạn tổng số tiền người chơi có thể cược **mỗi ngày hoặc mỗi tuần**, theo từng loại tiền.

## Cấu hình

Giới hạn cược được cài đặt trong `config.yml`:

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

`limit` là tổng số tiền **tích lũy** mà người chơi có thể cược trong chu kỳ. Tính cả thắng và thua.

## Quyền bỏ qua

Người chơi có `ultracoinflip.bypass.bettinglimit` được miễn giới hạn cược.

::: tip
Đặt `limit: 0` để tắt giới hạn cho một loại tiền cụ thể mà không tắt toàn bộ hệ thống.
:::
