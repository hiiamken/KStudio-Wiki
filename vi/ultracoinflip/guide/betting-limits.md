# Giới hạn cược

Có thể giới hạn tổng tiền mỗi người có thể cược **mỗi ngày hoặc mỗi tuần**, riêng cho từng loại tiền.

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

`limit` là số tiền cược cộng dồn tối đa trong một kỳ reset — tính cả ván thắng lẫn thua.

## Quyền bỏ qua

Người chơi có quyền `ultracoinflip.bypass.bettinglimit` sẽ không bị ảnh hưởng bởi giới hạn này.

::: tip
Đặt `limit: 0` để bỏ giới hạn riêng cho một loại tiền mà không tắt cả hệ thống.
:::
