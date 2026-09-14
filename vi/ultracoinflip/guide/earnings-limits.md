# Giới hạn thắng thua

Giới hạn thắng thua đặt hạn mức cho **tổng số tiền một người chơi được thắng, thua hoặc cược** trong một chu kỳ, ví dụ một ngày hay một tuần. Hạn mức được đặt riêng cho từng loại tiền, và các nhóm quyền có thể được hạn mức cao hơn.

Tính năng này tắt theo mặc định. Khi tắt, plugin không ghi nhận gì và không chặn ai.

## Bắt đầu nhanh

1. Trong `config.yml`, đặt `earnings-limit.enabled` thành `true`.
2. Trong `earnings-limit.per-currency`, đặt `enabled: true` cho các giới hạn bạn muốn dùng và chọn hạn mức `default`.
3. Chạy `/cf reload`.
4. Vào game kiểm tra bằng `/cf limit me`.

## Cách hoạt động

- Khi một ván coinflip kết thúc, kết quả được lưu cho cả hai người chơi. [Ván với bot](/vi/ultracoinflip/guide/bot-game) cũng được tính.
- Trước khi người chơi **tạo** coinflip, **tham gia** một ván hoặc bắt đầu **ván với bot**, plugin cộng dồn kết quả của họ trong chu kỳ hiện tại với loại tiền đó. Nếu đã chạm bất kỳ hạn mức nào đang bật, ván bị từ chối, người chơi giữ nguyên tiền cược và nhận thông báo:

  ```
  Bạn đã chạm giới hạn earnings của period này. Dùng /cf limit me để xem chi tiết.
  ```

- Hạn mức tính riêng cho từng loại tiền. Người chơi đã chạm hạn mức Vault vẫn chơi được bằng PlayerPoints, trừ khi PlayerPoints cũng có hạn mức riêng.
- Coinflip bị hủy, hết hạn hoặc được hoàn tiền không được tính.
- Kết quả được lưu trong database của plugin, nên vẫn còn sau khi khởi động lại server.

::: warning Kiểm tra trước ván, không phải trong ván
Người chơi chỉ còn thiếu một chút là chạm hạn mức vẫn bắt đầu thêm được một ván, và ván đó có thể đẩy họ vượt hạn mức. Giới hạn không bao giờ cắt bớt tiền thưởng hay dừng một ván đã bắt đầu. Các coinflip người chơi đang mở vẫn nằm trong danh sách và người khác vẫn tham gia được.
:::

### Cách tính kết quả

Hai người chơi, mỗi người cược 10,000. Pot là 20,000 và [thuế](/vi/ultracoinflip/guide/tax) là 10%, nên người thắng nhận 18,000.

| Giới hạn | Người thắng | Người thua |
|---|---|---|
| `max-win` | 8,000 | — |
| `max-loss` | — | 10,000 |
| `max-net-profit` | +8,000 | −10,000 |
| `max-volume` | 10,000 | 10,000 |

Khi thắng, chỉ phần lãi ngoài tiền cược của chính người chơi (sau thuế) được tính. Khi thua, số tiền cược được tính.

## Các loại giới hạn

| Loại | Tính gì |
|---|---|
| `max-win` | Tổng tiền lãi từ các ván thắng |
| `max-loss` | Tổng tiền thua |
| `max-net-profit` | Tiền lãi từ ván thắng trừ đi tiền thua, nên các ván thua sẽ kéo con số này xuống |
| `max-volume` | Tổng tiền đã cược trong các ván đã kết thúc, dù thắng hay thua |

Mỗi loại được bật riêng cho từng loại tiền. Người chơi bị chặn ngay khi bất kỳ loại nào đang bật chạm hạn mức.

## Chu kỳ

Một giá trị `period` dùng chung cho mọi loại tiền và mọi loại giới hạn:

| Giá trị | Tính kết quả trong | Đặt lại |
|---|---|---|
| `calendar-daily` | Hôm nay | 00:00 mỗi ngày |
| `calendar-weekly` | Tuần này | 00:00 mỗi thứ Hai |
| `calendar-monthly` | Tháng này | 00:00 ngày 1 hằng tháng |
| `rolling-24h` | 24 giờ gần nhất | Không có giờ cố định, mỗi kết quả thôi được tính sau 24 giờ kể từ lúc diễn ra |
| `rolling-7d` | 7 ngày gần nhất | Không có giờ cố định, mỗi kết quả thôi được tính sau 7 ngày kể từ lúc diễn ra |

Các chu kỳ theo lịch được đặt lại theo múi giờ trong `reset-timezone`, ví dụ `Asia/Ho_Chi_Minh`, `UTC` hoặc `America/New_York`. Để trống thì dùng múi giờ của server. `period` không hợp lệ sẽ quay về `calendar-daily`, múi giờ không hợp lệ sẽ quay về múi giờ của server.

::: tip
Đổi `period` không xóa dữ liệu nào. Mỗi kết quả vẫn giữ thời điểm diễn ra, nên sau `/cf reload` chu kỳ mới được tính lại từ những kết quả đã lưu.
:::

## Cấu hình

Mọi thứ nằm trong `config.yml`, mục `earnings-limit`. File mặc định có sẵn một khối `vault` với cả bốn giới hạn đều tắt. Ví dụ dưới đây đặt hạn mức theo ngày cho Vault và PlayerPoints, kèm hạn mức Vault cao hơn cho người chơi VIP và MVP:

```yaml
earnings-limit:
  enabled: true
  period: calendar-daily
  reset-timezone: ""               # để trống = múi giờ server

  threshold-warnings:
    enabled: true
    percentages: [50, 75, 90]
    sound: game.start              # tên một mục trong sounds.yml

  per-currency:
    vault:
      max-win:
        enabled: true
        default: 1000000
        groups:
          ultracoinflip.limit.vip: 5000000
          ultracoinflip.limit.mvp: 10000000
      max-loss:
        enabled: true
        default: 500000
        groups:
          ultracoinflip.limit.vip: 2500000
      max-net-profit:
        enabled: false
        default: 800000
      max-volume:
        enabled: false
        default: 5000000
    playerpoints:
      max-loss:
        enabled: true
        default: 20000
```

### Cài đặt chính

| Key | Mặc định | Mô tả |
|---|---|---|
| `enabled` | `false` | Bật hoặc tắt toàn bộ tính năng |
| `period` | `calendar-daily` | Khi nào mức đã dùng được đặt lại (xem mục Chu kỳ ở trên) |
| `reset-timezone` | `""` | Múi giờ cho các chu kỳ theo lịch. Để trống = múi giờ server |
| `threshold-warnings.enabled` | `false` | Cảnh báo người chơi khi sắp chạm hạn mức |
| `threshold-warnings.percentages` | `[50, 75, 90]` | Các mốc phần trăm của hạn mức sẽ kích hoạt cảnh báo |
| `threshold-warnings.sound` | `BLOCK_NOTE_BLOCK_BELL` | Âm thanh phát kèm cảnh báo (xem mục Cảnh báo khi sắp chạm hạn mức bên dưới) |
| `auto-tune.multiplier` | `3.0` | `/cf limit auto-tune` gợi ý hạn mức bằng mức thắng hoặc thua của một ngày điển hình nhân với số này (xem mục Tự động gợi ý hạn mức bên dưới) |

### Cài đặt theo loại tiền

Thêm một khối trong `per-currency` cho mỗi loại tiền muốn giới hạn, rồi bên trong thêm một khối cho mỗi loại giới hạn:

| Key | Mô tả |
|---|---|
| `enabled` | Bật giới hạn này cho loại tiền này |
| `default` | Hạn mức cho mọi người chơi. `0` nghĩa là không giới hạn |
| `groups` | Hạn mức cao hơn cho người chơi có quyền (xem bên dưới) |

Loại tiền hoặc loại giới hạn không có khối cấu hình thì không bị giới hạn.

### ID loại tiền

Dùng các ID này trong `per-currency`, trong placeholder và với `/cf limit auto-tune`:

| Loại tiền | ID |
|---|---|
| Vault | `vault` (`money` cũng dùng được) |
| PlayerPoints | `playerpoints` |
| TokenManager | `tokenmanager` |
| BeastTokens | `beasttokens` |
| CoinsEngine / ExcellentEconomy | ID loại tiền trong `coinsengine.yml`, ví dụ `coins` |
| Loại tiền Custom PlaceholderAPI | ID loại tiền trong `customplaceholder.yml`, ví dụ `orbs` |

::: warning Khối của Vault là `vault`
Giới hạn cược gọi Vault là `money`, nên khối `money` trong `per-currency` cũng dùng được cho Vault: loại giới hạn nào bạn bật ở đó sẽ áp dụng cho Vault, trừ khi loại đó đã được bật trong khối `vault`.
:::

### Hạn mức theo nhóm quyền

`groups` gán mỗi node quyền với một hạn mức. Người chơi nhận hạn mức **cao nhất** giữa `default` và mọi hạn mức nhóm mà họ có quyền.

```
/lp group vip permission set ultracoinflip.limit.vip true
```

- Node quyền nào cũng dùng được. `ultracoinflip.limit.vip` và `ultracoinflip.limit.mvp` chỉ là ví dụ, bạn cứ dùng node của riêng mình.
- Hạn mức nhóm thấp hơn `default` không có tác dụng, vì giá trị cao nhất luôn được chọn.
- Với `default: 0`, chỉ người chơi có quyền nhóm mới bị giới hạn. Những người còn lại không có hạn mức cho giới hạn đó.
- Không có quyền bỏ qua (bypass). Muốn miễn cho một nhóm, hãy đặt cho nhóm đó hạn mức thật cao.
- Quyền chỉ kiểm tra được khi người chơi đang online, nên `/cf limit player` và placeholder hiển thị hạn mức `default` cho người chơi offline.

## Cảnh báo khi sắp chạm hạn mức

Khi `threshold-warnings.enabled: true`, người chơi nhận cảnh báo trong chat khi sắp chạm hạn mức:

```
Bạn đang ở 75% giới hạn max-loss (375000 / 500000). Dùng /cf limit me để xem.
```

- Được kiểm tra sau mỗi ván người chơi hoàn thành, với từng giới hạn đang bật, khi họ đang online.
- Nếu một ván vượt qua nhiều mốc cùng lúc, chỉ mốc cao nhất được gửi. Nhảy từ 30% lên 95% chỉ gửi một cảnh báo cho mốc 90%, không phải ba.
- Danh sách `percentages` để trống sẽ dùng 50, 75 và 90.
- Thêm `100` vào danh sách để cảnh báo ngay lúc chạm hạn mức.

`sound` nhận tên một mục trong `sounds.yml`, ví dụ `game.start`, phát với âm lượng và cao độ của mục đó, hoặc tên âm thanh Minecraft như `BLOCK_NOTE_BLOCK_BELL`. Để trống `sound` nếu không muốn có âm thanh.

## Tự động gợi ý hạn mức (auto-tune)

Chưa biết nên đặt hạn mức bao nhiêu? `/cf limit auto-tune <currency>` gợi ý giá trị `max-win` và `max-loss` dựa trên cách người chơi của bạn thực sự chơi:

1. Đọc kết quả 30 ngày gần nhất của loại tiền đó.
2. Với mỗi người chơi, trong mỗi ngày họ có chơi, cộng tổng tiền thắng và tổng tiền thua.
3. Lấy trung vị của các tổng theo ngày đó rồi nhân với `auto-tune.multiplier` (mặc định là 3).

```
Gợi ý cap cho vault (multiplier=3.0, 42 buckets):
  max-win  1500000
  max-loss 900000
```

Mỗi bucket là một người chơi trong một ngày. Nếu có ít hơn 5 bucket, lệnh sẽ báo chưa đủ dữ liệu.

::: tip
- Auto-tune chỉ gợi ý. Bạn tự chép giá trị vào `config.yml`, rồi chạy `/cf reload`.
- Kết quả chỉ được lưu khi `earnings-limit.enabled` là `true`. Muốn thu thập dữ liệu mà không chặn ai, hãy bật tính năng nhưng để mọi loại giới hạn đều tắt, đợi vài ngày rồi chạy auto-tune.
- Gợi ý dựa trên tổng theo ngày, nên hợp với `calendar-daily` và `rolling-24h`. Nếu dùng chu kỳ tuần hoặc tháng, hãy tăng các giá trị lên.
- Kết quả đã xóa bằng `/cf limit reset` không được tính.
:::

## Lệnh

| Lệnh | Mô tả | Quyền |
|---|---|---|
| `/cf limit` | Liệt kê các lệnh giới hạn | `ultracoinflip.limit.me` |
| `/cf limit me` | Xem mức đã dùng, hạn mức và thời gian còn lại đến lúc đặt lại của bạn | `ultracoinflip.limit.me` |
| `/cf limit player <name>` | Xem mức đã dùng và hạn mức của người chơi khác | `ultracoinflip.limit.staff` |
| `/cf limit reset <name>` | Xóa mức đã dùng của một người chơi trong chu kỳ hiện tại, ở mọi loại tiền | `ultracoinflip.admin.limit` |
| `/cf limit auto-tune <currency>` | Gợi ý hạn mức từ dữ liệu 30 ngày gần nhất | `ultracoinflip.admin.limit` |

`/cf limit me` và `/cf limit player` chỉ dùng được trong game. `reset` và `auto-tune` chạy được cả từ console, và `reset` dùng được với người chơi offline.

Ví dụ kết quả của `/cf limit me`:

```
Giới hạn earnings của bạn:
- vault/max-win: 250000 / 1000000 (còn 750000, reset sau 13h25m)
- vault/max-loss: 120000 / 500000 (còn 380000, reset sau 13h25m)
```

Chỉ các giới hạn đang bật mới được liệt kê. Chu kỳ rolling không có giờ đặt lại cố định nên hiển thị `0h0m`.

## Quyền

| Quyền | Mô tả | Mặc định |
|---|---|---|
| `ultracoinflip.limit.me` | Dùng `/cf limit` và `/cf limit me` | `true` |
| `ultracoinflip.limit.staff` | Dùng `/cf limit player` | `op` |
| `ultracoinflip.admin.limit` | Dùng `/cf limit reset` và `/cf limit auto-tune` | `op` |

## Placeholder

Cần [PlaceholderAPI](/vi/ultracoinflip/guide/placeholderapi). Thay `<currency>` bằng ID loại tiền ở bảng phía trên.

| Placeholder | Trả về |
|---|---|
| `%coinflip_winlimit_<currency>%` | Hạn mức `max-win` của người chơi |
| `%coinflip_winlimit_<currency>_used%` | Mức đã dùng trong chu kỳ này |
| `%coinflip_winlimit_<currency>_remaining%` | Phần còn lại trước khi chạm hạn mức, không bao giờ nhỏ hơn 0 |
| `%coinflip_winlimit_<currency>_percent%` | Phần trăm hạn mức đã dùng, là số nguyên từ 0 đến 100 |
| `%coinflip_winlimit_<currency>_reset%` | Số giây còn lại đến khi chu kỳ đặt lại |

Với các loại giới hạn khác, thay `winlimit` bằng `losslimit` (`max-loss`), `netprofitlimit` (`max-net-profit`) hoặc `volumelimit` (`max-volume`).

**Ví dụ:** `%coinflip_losslimit_vault_remaining%` cho biết người chơi còn thua được bao nhiêu Vault trước khi chạm hạn mức.

- Số tiền hiển thị dạng số thường, không có dấu phân cách, ví dụ `750000`.
- Placeholder trả về rỗng khi tính năng đang tắt hoặc giới hạn đó chưa được bật cho loại tiền.
- Với chu kỳ rolling, `_reset` luôn là `0`.

## Tin nhắn

Toàn bộ nội dung tin nhắn nằm trong `messages_<lang>.yml`, mục `command:`. Các key bắt đầu bằng `earnings-`, còn danh sách trợ giúp của `/cf limit` là `limit-usage`.

## So với Giới hạn cược

[Giới hạn cược](/vi/ultracoinflip/guide/betting-limits) là một tính năng riêng, và có thể dùng song song với Giới hạn thắng thua.

| | Giới hạn cược | Giới hạn thắng thua |
|---|---|---|
| Giới hạn | Tổng tiền cược | Tiền lãi, tiền thua, lãi ròng hoặc tiền cược |
| Thời điểm tính | Khi đặt cược | Khi ván kết thúc |
| Chặn | Lượt cược sẽ vượt giới hạn | Ván mới khi đã chạm hạn mức |
| Chu kỳ | Theo ngày và theo tuần | Ngày, tuần, tháng, 24 giờ trượt hoặc 7 ngày trượt |
| Hạn mức cao hơn cho nhóm | Không | Có, qua quyền |
| Quyền bỏ qua | `ultracoinflip.bypass.bettinglimit` | Không có |
| Giữ mức đã dùng sau khi khởi động lại | Không | Có |
| Mục cấu hình | `betting-limits` | `earnings-limit` |
| ID của Vault | `money` | `vault` (`money` cũng dùng được) |

Nói ngắn gọn, Giới hạn cược kiểm soát người chơi bỏ vào bao nhiêu, còn Giới hạn thắng thua kiểm soát họ có thể lời hoặc lỗ tối đa bao nhiêu.
