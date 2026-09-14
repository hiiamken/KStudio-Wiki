# Coinflip Riêng Tư & Mời

Mời một người chơi cụ thể vào coinflip của bạn thay vì để bất kỳ ai trong danh sách nhảy vào, và (tùy chọn) khóa game chỉ cho người được mời tham gia.

## Bắt đầu nhanh

1. Tạo coinflip như bình thường (GUI `/cf` hoặc `/cf create money 1000`).
2. Mời một người chơi cụ thể:
   ```
   /coinflip invite Steve
   ```
   Steve nhận tin nhắn chat có nút bấm `[Chấp Nhận]` và `[Từ Chối]`.
3. (Tùy chọn) khóa game chỉ cho người được mời:
   ```
   /coinflip private
   ```
   Người không được mời sẽ không thấy game trong danh sách và không thể tham gia.

## Lệnh

| Lệnh | Mô tả |
|---|---|
| `/coinflip invite <player>` | Gửi lời mời có nút bấm đến người chơi đó (họ phải đang online) |
| `/coinflip uninvite <player>` | Xóa người chơi khỏi danh sách mời và báo cho họ nếu họ đang online |
| `/coinflip accept [id]` | Chấp nhận lời mời và tham gia coinflip đó (không cần id nếu chỉ có một lời mời đang chờ) |
| `/coinflip deny [id]` | Từ chối lời mời — bạn bị xóa khỏi danh sách mời và chủ phòng được thông báo |
| `/coinflip private [on\|off]` | Bật/tắt chế độ chỉ cho người được mời trên coinflip đang mở (không ghi gì = đảo trạng thái) |

- Bạn cần có một coinflip đang mở thì mới mời người khác hoặc chuyển sang riêng tư được.
- Lời mời cũng dùng được với coinflip công khai — khi đó lời mời chỉ là nút bấm để tham gia nhanh.
- Chấp nhận lời mời được kiểm tra giống như tham gia từ danh sách: người được mời phải đủ tiền, còn trong giới hạn của mình, và chủ phòng phải đang online.
- Nếu bạn có nhiều lời mời đang chờ, hãy thêm id vào `/cf accept` hoặc `/cf deny`. Các nút bấm trong tin nhắn đã kèm sẵn id.

## Nút bật/tắt trong Create GUI

Có thêm nút **Private** trong Create GUI (slot 21 mặc định, cạnh nút nhập số tiền bằng anvil). Bấm nút này trước khi nhấn Create để tạo game ở chế độ riêng tư ngay — không cần chạy `/cf private` sau đó.

Nút này được cấu hình ở mục `private-toggle` trong `gui/create.yml` (`enabled`, `slot`, `material`, `material-private`, `glowing-when-private`). Xem [Menu](/vi/ultracoinflip/guide/menus) để biết thêm về các file menu.

## Cooldown

`/cf invite` có cooldown riêng cho từng người mời (mặc định 3 giây) để một người không spam chat người khác. Sửa trong `config.yml`:

```yaml
invite:
  enabled: true            # công tắc chính — đặt false để tắt hoàn toàn invite/private
  cooldown-seconds: 3      # số giây giữa các lần /cf invite của mỗi người chơi (0 = không cooldown)
```

## Công tắc chính

Nếu server bạn chỉ muốn coinflip công khai, đặt `invite.enabled: false` trong `config.yml` rồi `/cf reload`. 5 lệnh (`invite`, `uninvite`, `accept`, `deny`, `private`) sẽ báo hệ thống mời đã bị tắt, và nút Private bị ẩn khỏi Create GUI.

## Giữ qua restart

Mặc định khi restart server, các coinflip đang chờ bị hủy và chủ phòng được hoàn tiền, nên trạng thái riêng tư và danh sách mời cũng mất theo. Bật `game-behavior.persist-games-across-restart` để giữ coinflip đang chờ — kèm trạng thái riêng tư và danh sách mời — qua restart. Xem chi tiết tại [Hết hạn & Khởi động lại](/vi/ultracoinflip/guide/expiry).

## Quyền

| Quyền | Mô tả | Mặc định |
|---|---|---|
| `ultracoinflip.command.invite` | `/cf invite` và `/cf uninvite` | `true` |
| `ultracoinflip.command.accept` | `/cf accept` và `/cf deny` | `true` |
| `ultracoinflip.command.private` | `/cf private` | `true` |

Tất cả mặc định là true — người chơi nào cũng dùng được tính năng ngay mà không cần chỉnh LuckPerms.

## FAQ

**Prefix LuckPerms `&b` của chủ phòng có lộ vào Discord webhook không?**
Không — mã màu được xóa trước khi gửi lên Discord. Chat trong game vẫn hiển thị prefix có màu như bình thường.

**Nếu người được mời đang offline thì sao?**
`/cf invite` từ chối với tin nhắn "Người chơi đó đang offline." Người được mời phải online để nhận tin nhắn có nút bấm.

**Nếu chủ phòng thoát game thì sao?**
Với cài đặt mặc định, game bị xóa khỏi danh sách và chủ phòng được hoàn tiền khi vào lại (giống coinflip thường). Với `game-behavior.keep-coinflip-on-disconnect: true`, game vẫn nằm trong danh sách — ai muốn tham gia sẽ được báo chủ phòng đang offline cho đến khi họ quay lại.

**Gợi ý cú pháp (`Usage: /cf invite <player>`) có dịch theo ngôn ngữ server không?**
Có — mỗi ngôn ngữ được hỗ trợ đều có block `syntax:` dịch chữ `Usage:` và tên từng placeholder. Xem `messages_<lang>.yml`.
