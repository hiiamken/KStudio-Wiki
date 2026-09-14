# Hết hạn & Khởi động lại

Hai cài đặt tùy chọn trong `config.yml` quyết định một coinflip đang chờ được mở bao lâu: hết hạn sẽ hủy coinflip không ai tham gia, còn lưu giữ sẽ giữ coinflip đang chờ qua lần restart server. Cả hai đều tắt theo mặc định.

## Coinflip hết hạn

Khi bật hết hạn, coinflip đang chờ mà không ai tham gia sẽ bị hủy sau một số giờ nhất định và chủ phòng được nhận lại tiền cược.

```yaml
game-behavior:
  game-expiry:
    enabled: false
    after-hours: 72              # coinflip đang chờ được mở tối đa bao lâu
    check-interval-minutes: 10   # plugin kiểm tra coinflip hết hạn bao lâu một lần
```

| Key | Mặc định | Mô tả |
|---|---|---|
| `enabled` | `false` | Bật hoặc tắt tính năng hết hạn |
| `after-hours` | `72` | Số giờ coinflip đang chờ được mở trước khi bị hủy (số giờ nguyên, tối thiểu 1) |
| `check-interval-minutes` | `10` | Plugin kiểm tra coinflip hết hạn bao lâu một lần (tối thiểu 1) |

- Thời gian được tính từ lúc coinflip được tạo, nên vẫn tiếp tục tính qua các lần restart.
- Việc kiểm tra chạy mỗi `check-interval-minutes`, nên coinflip có thể mở lâu hơn `after-hours` tối đa một chu kỳ kiểm tra.
- Chỉ coinflip đang chờ mới hết hạn. Ván đang quay không bao giờ bị động tới.
- Nếu chủ phòng đang online, tiền cược được trả ngay kèm tin nhắn `game.expired` ("Coinflip của bạn đã hết hạn vì không có ai tham gia").
- Nếu chủ phòng offline, hoặc cộng tiền thất bại, tiền cược được trả khi họ vào lại.
- [Lệnh sự kiện](/vi/ultracoinflip/config/currencies) `on-cancelled` của loại tiền sẽ chạy khi coinflip hết hạn trong lúc chủ phòng đang online. Lệnh này không chạy nếu chủ phòng offline.

::: tip
`enabled` và `after-hours` có hiệu lực sau `/cf reload`. Đổi `check-interval-minutes` cần restart server.
:::

## Giữ coinflip qua restart

```yaml
game-behavior:
  persist-games-across-restart: false
```

### Khi tắt (mặc định)

Khi server tắt, mọi coinflip đang chờ bị hủy và hoàn tiền. Chủ phòng đang online nhận lại tiền ngay, chủ phòng offline nhận khi vào lại.

Nếu cả `refund-on-disconnect` và `refund-on-reconnect-after-shutdown` đều là `true`, mọi khoản hoàn tiền lúc tắt server sẽ đợi đến khi người chơi vào lại.

### Khi bật

- Coinflip đang chờ được lưu vào database, kèm lựa chọn heads/tails của chủ phòng, trạng thái riêng tư và danh sách mời.
- Khi server khởi động, chúng được đưa lại vào danh sách coinflip. Tiền cược của chủ phòng vẫn nằm trong coinflip — không hoàn tiền khi tắt server, nên không bị hoàn tiền hai lần.
- Cho đến khi chủ phòng online trở lại, ai muốn tham gia sẽ được báo chủ phòng đang offline.
- Chủ phòng vẫn có thể hủy coinflip sau khi restart để lấy lại tiền cược.
- An toàn khi bật hoặc tắt bất kỳ lúc nào. Coinflip không được khôi phục — ví dụ coinflip tạo lúc cài đặt đang tắt — sẽ được hoàn tiền cho chủ phòng khi họ vào lại.

::: tip
Hãy bật `game-expiry` cùng với tính năng lưu giữ. Nếu không có hết hạn, coinflip bị bỏ quên sẽ giữ tiền cược của chủ phòng cho đến khi họ tự hủy.
:::

### Ván đang quay

Ván đang quay không bao giờ được giữ qua restart. Cả hai người chơi được hoàn tiền cược: người online nhận ngay, người offline nhận khi vào lại. Khi bật lưu giữ, các khoản hoàn tiền này luôn đợi đến khi từng người chơi vào lại.

Nếu server crash thay vì tắt bình thường, tiền cược đã lưu trong database được trả lại khi mỗi người chơi vào lại, còn coinflip đang chờ được giữ lại vẫn được khôi phục như thường.

Để biết điều gì xảy ra khi người chơi thoát game hoặc plugin reload, xem [Bảo mật & Chống gian lận](/vi/ultracoinflip/guide/security).
