# Quyền

## Quyền cơ bản

| Quyền | Mô tả | Mặc định |
|---|---|---|
| `ultracoinflip.use` | Sử dụng lệnh coinflip cơ bản | `true` |
| `ultracoinflip.reload` | Reload cấu hình plugin | `op` |
| `ultracoinflip.admin` | Truy cập lệnh admin và bảng audit | `op` |
| `ultracoinflip.silent` | Tắt thông báo game toàn server cho người chơi này | `false` |

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

Khi `max-games-per-player` được cài trong `config.yml`, bạn có thể cấp giới hạn cao hơn cho từng nhóm:

| Quyền | Mô tả | Mặc định |
|---|---|---|
| `ultracoinflip.multigame.<number>` | Cho phép `<number>` game cùng lúc | `false` |

**Ví dụ:** `ultracoinflip.multigame.5` cho phép tối đa 5 game đồng thời.

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

**Thông báo:**

| Quyền | Mặc định |
|---|---|
| `ultracoinflip.settings.bypass.notification-title` | `false` |
| `ultracoinflip.settings.bypass.notification-actionbar` | `false` |
| `ultracoinflip.settings.bypass.notification-bossbar` | `false` |
| `ultracoinflip.settings.bypass.notification-sound` | `false` |

## Ghi chú

- **Mặc định `true`** — Tất cả người chơi đều có quyền này trừ khi bị từ chối.
- **Mặc định `op`** — Chỉ operator mới có quyền này.
- **Mặc định `false`** — Không ai có quyền này trừ khi được cấp.

::: tip Ví dụ LuckPerms
```
/lp group vip permission set ultracoinflip.bypass.tax true
/lp group donator permission set ultracoinflip.bypass.bettinglimit true
/lp group mvp permission set ultracoinflip.multigame.3 true
```
:::
