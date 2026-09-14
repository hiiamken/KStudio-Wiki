# Quyền

## Quyền cơ bản

| Quyền | Mô tả | Mặc định |
|---|---|---|
| `ultracoinflip.use` | Bắt buộc cho mọi lệnh `/cf`, được kiểm tra cùng với node quyền riêng của lệnh | `true` |
| `ultracoinflip.reload` | Reload cấu hình plugin | `op` |
| `ultracoinflip.admin` | Lệnh admin (`/cf audit`, `/cf webhook test`), phần lệnh admin trong `/cf help`, thông báo cập nhật và cảnh báo bảo mật. Bao gồm cả `ultracoinflip.reload` | `op` |
| `ultracoinflip.silent` | Tắt thông báo game toàn server cho người chơi này | `false` |

## Quyền theo từng subcommand

Mỗi subcommand `/cf` có node quyền riêng. Tất cả mặc định `true`, nên server cũ vẫn hoạt động bình thường — đặt thành `false` để ẩn lệnh đó khỏi một group.

| Quyền | Subcommand | Mặc định |
|---|---|---|
| `ultracoinflip.command.menu` | `/cf` (mở menu chính) | `true` |
| `ultracoinflip.command.create` | `/cf create` | `true` |
| `ultracoinflip.command.delete` | `/cf delete` | `true` |
| `ultracoinflip.command.history` | `/cf history` | `true` |
| `ultracoinflip.command.leaderboard` | `/cf leaderboard` | `true` |
| `ultracoinflip.command.settings` | `/cf settings` | `true` |
| `ultracoinflip.command.stats` | `/cf stats` | `true` |
| `ultracoinflip.command.help` | `/cf help` | `true` |
| `ultracoinflip.command.info` | `/cf info` | `true` |
| `ultracoinflip.command.invite` | `/cf invite` và `/cf uninvite` | `true` |
| `ultracoinflip.command.accept` | `/cf accept` và `/cf deny` | `true` |
| `ultracoinflip.command.private` | `/cf private` | `true` |

Các node này cũng khóa các nút tương ứng trong menu coinflip (Tạo, Lịch sử, Bảng xếp hạng, Cài đặt và hủy game của chính mình). Nút **Chơi với Bot** cần cả `ultracoinflip.command.create` lẫn `ultracoinflip.house.use`.

**Ví dụ** — ẩn leaderboard khỏi player thường:

```
/lp group default permission set ultracoinflip.command.leaderboard false
```

## Quyền thống kê

| Quyền | Mô tả | Mặc định |
|---|---|---|
| `ultracoinflip.stats.others` | Xem thống kê của người chơi khác bằng `/cf stats <player>` | `op` |

## Quyền giới hạn thắng/thua

| Quyền | Mô tả | Mặc định |
|---|---|---|
| `ultracoinflip.limit.me` | Xem giới hạn thắng/thua của bạn bằng `/cf limit me` | `true` |
| `ultracoinflip.limit.staff` | Xem giới hạn của người chơi khác bằng `/cf limit player <player>` | `op` |
| `ultracoinflip.admin.limit` | Đặt lại giới hạn và nhận gợi ý mức giới hạn (`/cf limit reset`, `/cf limit auto-tune`) | `op` |

Mức giới hạn cao hơn cho từng rank lấy từ các quyền bạn liệt kê trong `groups` của `earnings-limit.per-currency` (config mặc định dùng `ultracoinflip.limit.vip` và `ultracoinflip.limit.mvp`). Xem [Giới hạn thắng & thua](/vi/ultracoinflip/guide/earnings-limits).

## Quyền bỏ qua

| Quyền | Mô tả | Mặc định |
|---|---|---|
| `ultracoinflip.bypass.tax` | Bỏ qua thuế — nhận toàn bộ tiền thắng | `false` |
| `ultracoinflip.bypass.bettinglimit` | Bỏ qua giới hạn cược hàng ngày/tuần | `false` |

## Quyền Bot Game

| Quyền | Mô tả | Mặc định |
|---|---|---|
| `ultracoinflip.house.use` | Cho phép chơi với bot | `true` |
| `ultracoinflip.house.bypass.limit` | Bỏ qua giới hạn số trận bot mỗi ngày | `false` |
| `ultracoinflip.house.bypass.delay` | Bỏ qua thời gian chờ giữa các trận bot | `false` |

## Quyền Multi-Game

Khi `game-behavior.multiple-games.enabled` là `true` trong `config.yml`, người chơi có thể mở nhiều coinflip cùng lúc. Mọi người đều có mức `default-limit`, còn các quyền trong `permission-limits` sẽ nâng mức đó lên — người chơi được dùng mức cao nhất mà họ có (`-1` = không giới hạn):

| Quyền | Mô tả | Mặc định |
|---|---|---|
| `ultracoinflip.multigame.2` | Cho phép 2 coinflip cùng lúc | `op` |
| `ultracoinflip.multigame.5` | Cho phép 5 coinflip cùng lúc | `op` |

**Ví dụ:** thêm một bậc mới vào `permission-limits`, rồi cấp `ultracoinflip.multigame.10` cho một group:

```yaml
game-behavior:
  multiple-games:
    enabled: true
    default-limit: 1
    permission-limits:
      - permission: ultracoinflip.multigame.2
        limit: 2
      - permission: ultracoinflip.multigame.5
        limit: 5
      - permission: ultracoinflip.multigame.10
        limit: 10
```

Chỉ các quyền có trong danh sách này mới được kiểm tra — `ultracoinflip.multigame.3` sẽ không có tác dụng nếu bạn chưa thêm nó vào.

## Quyền bỏ qua cài đặt

Quyền tổng bỏ qua **tất cả** cài đặt thông báo:

| Quyền | Mô tả | Mặc định |
|---|---|---|
| `ultracoinflip.settings.bypass` | Bỏ qua TẤT CẢ cài đặt thông báo | `false` |

Bạn cũng có thể bỏ qua từng cài đặt riêng:

**Tin nhắn:**

| Quyền | Mặc định |
|---|---|
| `ultracoinflip.settings.bypass.message-game-created` | `false` |
| `ultracoinflip.settings.bypass.message-game-joined` | `false` |
| `ultracoinflip.settings.bypass.message-game-won` | `false` |
| `ultracoinflip.settings.bypass.message-game-lost` | `false` |
| `ultracoinflip.settings.bypass.message-game-cancelled` | `false` |
| `ultracoinflip.settings.bypass.message-broadcasts` | `false` |
| `ultracoinflip.settings.bypass.message-bot-game` | `false` |
| `ultracoinflip.settings.bypass.message-consecutive-wins` | `false` |
| `ultracoinflip.settings.bypass.message-error` | `false` |
| `ultracoinflip.settings.bypass.message-game-result-broadcast` | `false` |

**Thông báo:**

| Quyền | Mặc định |
|---|---|
| `ultracoinflip.settings.bypass.notification-title` | `false` |
| `ultracoinflip.settings.bypass.notification-actionbar` | `false` |
| `ultracoinflip.settings.bypass.notification-bossbar` | `false` |
| `ultracoinflip.settings.bypass.notification-sound` | `false` |
| `ultracoinflip.settings.bypass.notification-game-start-sound` | `false` |
| `ultracoinflip.settings.bypass.notification-consecutive-win-sound` | `false` |
| `ultracoinflip.settings.bypass.notification-animation-sound` | `false` |

## Ghi chú

- **Mặc định `true`** — Tất cả người chơi đều có quyền này trừ khi bị từ chối.
- **Mặc định `op`** — Chỉ operator mới có quyền này.
- **Mặc định `false`** — Không ai có quyền này trừ khi được cấp.
- Các quyền mà plugin không tự khai báo (như `ultracoinflip.stats.others` và các bậc multi-game) mặc định là `op`.
- Giới hạn tiền tệ dùng các quyền bạn đặt trong `restrictions.required-permissions` của từng loại tiền — người chơi chỉ cần có ít nhất một quyền trong đó.

::: tip Ví dụ LuckPerms
```
/lp group vip permission set ultracoinflip.bypass.tax true
/lp group donator permission set ultracoinflip.bypass.bettinglimit true
/lp group mvp permission set ultracoinflip.multigame.5 true
```
:::
