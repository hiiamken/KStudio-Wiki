# Coinflip Riêng Tư & Mời

Mời một người chơi cụ thể vào coinflip của bạn thay vì để bất kỳ ai trong danh sách public nhảy vào, và (tùy chọn) khóa game chỉ cho người được mời.

## Bắt đầu nhanh

1. Tạo coinflip như bình thường (GUI `/cf` hoặc `/cf create money 1000`).
2. Mời một người chơi cụ thể:
   ```
   /coinflip invite Steve
   ```
   Steve nhận chat message với nút clickable `[Chấp Nhận]` và `[Từ Chối]`.
3. (Tùy chọn) khóa game chỉ cho người được mời:
   ```
   /coinflip private
   ```
   Người không được mời sẽ không thấy game trong list và không tham gia được.

## Lệnh

| Lệnh | Mô tả |
|---|---|
| `/coinflip invite <player>` | Gửi lời mời clickable đến người chơi đó |
| `/coinflip uninvite <player>` | Xóa người chơi khỏi danh sách mời |
| `/coinflip accept [id]` | Chấp nhận lời mời (id không bắt buộc nếu chỉ có 1 lời mời pending) |
| `/coinflip deny [id]` | Từ chối lời mời |
| `/coinflip private [on\|off]` | Bật/tắt chế độ private trên coinflip đang mở |

## Toggle ở Create GUI

Có thêm nút **Private** ở Create GUI (slot 21 mặc định, cạnh nút custom-amount anvil). Bấm nút này trước khi Create để tạo game ở chế độ private trong 1 lần click — không cần chạy `/cf private` sau đó.

## Cooldown

`/coinflip invite` có cooldown per-inviter (mặc định 3 giây) để chống 1 người spam chat người khác. Sửa trong `config.yml`:

```yaml
invite:
  enabled: true            # master toggle — set false để tắt hệ thống invite/private hoàn toàn
  cooldown-seconds: 3      # số giây giữa các lần /cf invite mỗi player
```

## Master Toggle

Nếu server bạn chỉ muốn pure public coinflip, set `invite.enabled: false` trong `config.yml` rồi `/cf reload`. 5 lệnh mới (`invite`, `uninvite`, `accept`, `deny`, `private`) sẽ trả về "feature disabled" và nút Private trong Create GUI bị ẩn.

## Giữ qua Restart (tùy chọn)

Mặc định restart server xóa hết game waiting đang chờ (bet của host được refund khi đăng nhập lại). Bật persistence để giữ private + invite state qua restart:

```yaml
game-behavior:
  persist-games-across-restart: false   # set true để giữ game qua restart
```

Khi bật:

- Game waiting (kèm flag private và invite list) mirror vào DB table riêng mỗi khi state đổi.
- Khi server khởi động, game được restore vào active list. Bet của host vẫn locked (không double refund).
- Host và invitee tiếp tục từ chỗ đã dừng sau restart.
- Game đang rolling (đang animation) vẫn được refund như cũ — chỉ waiting game được persist.

An toàn để toggle on/off bất kỳ lúc nào. Row orphan từ cycle toggle-off trước được ignore.

## Permissions

| Permission | Mô tả | Mặc định |
|---|---|---|
| `ultracoinflip.command.invite` | `/cf invite` và `/cf uninvite` | `true` |
| `ultracoinflip.command.accept` | `/cf accept` và `/cf deny` | `true` |
| `ultracoinflip.command.private` | `/cf private` | `true` |

Tất cả default true — out of the box player nào cũng dùng được tính năng mà không cần LuckPerms set gì.

## FAQ

**LuckPerms prefix `&b` của host có lộ vào Discord webhook không?**
Không — color codes được strip trước khi gửi Discord. Chat trong game vẫn hiện prefix có màu như bình thường.

**Nếu người được mời offline thì sao?**
`/cf invite` reject với message "người chơi đang offline". Invitee phải online để nhận chat message clickable.

**Nếu host disconnect thì sao?**
Với default settings game bị cancel và bet của host được refund khi rejoin (giống flow coinflip thường). Với `persist-games-across-restart: true` và `keep-coinflip-on-disconnect: true`, game vẫn còn — joiner gặp "host offline" cho đến khi host quay lại.

**Usage hint syntax (`Usage: /cf invite <player>`) có dịch theo ngôn ngữ server không?**
Có — mỗi ngôn ngữ supported đều có block `syntax:` dịch prefix `Usage:` và tên placeholder. Xem `messages_<lang>.yml`.
