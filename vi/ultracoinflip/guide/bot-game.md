# Chơi với Bot

Tính năng **Chơi với Bot** cho phép người chơi tung đồng xu với bot của server thay vì chờ đối thủ thật.

## Cách hoạt động

1. Người chơi mở menu coinflip, nhấn **Chơi với Bot**, chọn loại tiền và số tiền rồi xác nhận (hoặc dùng lệnh).
2. Tiền cược được trừ và bot chấp nhận ván đấu ngay lập tức.
3. Ván đấu bắt đầu ngay — không cần phòng chờ, và ván này không bao giờ xuất hiện trong danh sách coinflip.
4. Nếu người chơi thắng, họ nhận toàn bộ pot (gấp đôi tiền cược) sau khi trừ thuế. Nếu bot thắng, người chơi mất tiền cược.

Ván đấu với bot được tính vào thống kê của người chơi và được lưu vào `/coinflip history` khi `house.history.enabled` đang bật.

## Lệnh

```
/coinflip create <currency> <amount> bot
```

**Ví dụ:** `/coinflip create money 5000 bot`

Từ cuối cùng lấy từ `house.subcommand` — nếu bạn đổi, người chơi sẽ gõ từ mới thay cho `bot`.

## Cấu hình

Cài đặt bot nằm trong `config.yml` dưới mục `house:`:

```yaml
house:
  enabled: true
  name: "YourServer"           # Tên bot hiển thị trong tin nhắn và lịch sử
  subcommand: "bot"            # /coinflip create <currency> <amount> bot
  display:
    material: "PLAYER_HEAD"    # 1.8.8–1.12.2: "SKULL_ITEM:3"
    display-name: "&e&l{BOT}"  # {BOT} = tên bot
    texture: "<base64>"        # Texture đầu dạng Base64, dùng với PLAYER_HEAD
  limits:
    max-games-per-day: 50      # Số ván bot tối đa mỗi người chơi mỗi ngày (-1 = không giới hạn)
    delay-between-games: 10    # Số giây chờ giữa các ván bot của mỗi người chơi (0 = không chờ)
  bet:
    min: "100"                 # Cược tối thiểu (hỗ trợ 1k, 1M, ...)
    max: "10M"                 # Cược tối đa (-1 = bot không giới hạn)
  tax:
    enabled: true              # false = không thu thuế tiền thắng khi chơi với bot
  history:
    enabled: true              # Lưu ván bot vào /coinflip history
  notifications:
    enabled: true              # Gửi kết quả ván bot lên Discord webhook
  broadcast:
    enabled: false             # Thông báo cho cả server khi người chơi thắng hoặc thua bot
    min-amount: 100            # Chỉ thông báo khi tiền cược từ mức này trở lên
```

### Giới hạn và quy tắc

- Số ván trong ngày được đặt lại lúc nửa đêm (giờ server), còn thời gian chờ tính từ lúc bắt đầu ván bot gần nhất của người chơi. Cả hai chỉ lưu trong bộ nhớ, nên restart server sẽ đặt lại.
- `min-bid`, `max-bid` và `min-reserve-balance` của loại tiền vẫn áp dụng cùng với `house.bet`, giới hạn theo world và quyền của loại tiền cũng vậy.
- Ván bot được tính vào [giới hạn cược](/vi/ultracoinflip/guide/betting-limits) và [giới hạn thắng & thua](/vi/ultracoinflip/guide/earnings-limits).
- Người chơi không thể bắt đầu ván bot khi một ván khác của họ vẫn đang quay.
- Nếu người chơi thoát giữa ván, kết quả vẫn được tính — tiền thắng sẽ được trả khi họ vào lại. Nếu server tắt hoặc chạy `/cf reload` giữa ván, tiền cược được hoàn lại.

### Thuế

Khi `house.tax.enabled: true`, tiền thắng từ bot bị trừ thuế theo [cài đặt thuế](/vi/ultracoinflip/guide/tax) bình thường của loại tiền, và quyền `ultracoinflip.bypass.tax` vẫn có tác dụng. Đặt `false` để trả đủ tiền thắng khi chơi với bot.

### Thông báo toàn server

Khi `house.broadcast.enabled: true`, cả server sẽ thấy thông báo khi người chơi thắng hoặc thua bot. Công tắc chung `broadcast.enabled` cũng phải bật, và người chơi đã tắt thông báo kết quả trong cài đặt sẽ không thấy tin này.

Nội dung nằm ở `house.broadcast-win` và `house.broadcast-lose` trong file ngôn ngữ (placeholder `<player>`, `<amount>`, `<taxed_amount>`, `<symbol>`). Muốn đổi riêng cho một loại tiền, đặt `house-broadcast-win` / `house-broadcast-lose` trong mục `messages:` của file tiền tệ đó.

## Quyền

| Quyền | Mô tả | Mặc định |
|---|---|---|
| `ultracoinflip.house.use` | Cho phép chơi với bot | `true` |
| `ultracoinflip.house.bypass.limit` | Bỏ qua giới hạn số ván bot mỗi ngày | `false` |
| `ultracoinflip.house.bypass.delay` | Bỏ qua thời gian chờ giữa các ván bot | `false` |

Người chơi cũng cần quyền `ultracoinflip.command.create` để bắt đầu ván bot.

::: warning
Kết quả ván bot được quyết định trên server bằng cùng thuật toán ngẫu nhiên an toàn như coinflip thường. Không có cài đặt tỉ lệ thắng — mọi ván bot đều là 50/50. Lợi thế duy nhất của server là thuế thu từ tiền thắng.
:::
