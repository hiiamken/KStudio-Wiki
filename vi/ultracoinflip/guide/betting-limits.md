# Giới hạn cược

Giới hạn cược cho phép bạn giới hạn tổng số tiền người chơi có thể cược **mỗi ngày và mỗi tuần**, theo từng loại tiền.

## Cấu hình

Giới hạn cược được cài đặt trong `config.yml`:

```yaml
betting-limits:
  enabled: false
  currencies:
    money:                     # Vault
      daily-limit: 100000      # Tổng cược tối đa mỗi ngày (-1 = không giới hạn)
      weekly-limit: 500000     # Tổng cược tối đa mỗi tuần (-1 = không giới hạn)
    playerpoints:
      daily-limit: 50000
      weekly-limit: 200000
    tokenmanager:
      daily-limit: 10000
      weekly-limit: 50000
    beasttokens:
      daily-limit: 10000
      weekly-limit: 50000
    coinsengine:               # ExcellentEconomy / CoinsEngine — mỗi ID tiền tệ một mục
      gems:
        daily-limit: 1000
        weekly-limit: 5000
    placeholder:               # Tiền tệ PlaceholderAPI tùy chỉnh — mỗi ID tiền tệ một mục
      orbs:
        daily-limit: 500
        weekly-limit: 2000
```

Hai mục `coinsengine` và `placeholder` ở trên chỉ là ví dụ — trong `config.yml` mặc định chúng đang được comment. Xóa mục của một loại tiền để loại tiền đó không bị giới hạn.

## Cách hoạt động

- Giới hạn là tổng số tiền **tích lũy** tối đa mà người chơi được cược trong chu kỳ. Mọi lần cược đều được tính, bất kể thắng hay thua: coinflip họ tạo, coinflip họ tham gia và ván chơi với bot.
- Một lần cược bị từ chối nếu làm người chơi vượt giới hạn ngày hoặc tuần. Tin nhắn hiển thị mức giới hạn, số đã cược và số còn lại.
- Tổng theo ngày được đặt lại lúc nửa đêm, tổng theo tuần vào thứ Hai (giờ server).
- Coinflip bị hủy hoặc được hoàn tiền sau đó vẫn được tính vào tổng.
- Tổng chỉ lưu trong bộ nhớ, nên restart server sẽ đặt lại. `/cf reload` thì không.

## Quyền bỏ qua

Người chơi có `ultracoinflip.bypass.bettinglimit` được miễn giới hạn cược, và các lần cược của họ không bị tính. Mặc định không ai có quyền này.

::: tip
Đặt `daily-limit` hoặc `weekly-limit` thành `-1` để tắt riêng giới hạn đó cho một loại tiền mà không tắt toàn bộ hệ thống.
:::

::: tip Giới hạn cược khác giới hạn thắng & thua
Giới hạn cược giới hạn số tiền người chơi **đặt cược**. Để giới hạn số tiền người chơi có thể **thắng hoặc thua** trong một khoảng thời gian, dùng [Giới hạn thắng & thua](/vi/ultracoinflip/guide/earnings-limits).
:::
