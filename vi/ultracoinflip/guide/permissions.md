# Quyền

## Danh sách quyền

| Quyền | Mô tả | Mặc định |
|---|---|---|
| `ultracoinflip.use` | Sử dụng lệnh coinflip cơ bản | `true` |
| `ultracoinflip.reload` | Reload cấu hình plugin | `op` |
| `ultracoinflip.admin` | Truy cập lệnh admin và bảng điều khiển | `op` |
| `ultracoinflip.silent` | Tắt thông báo trò chơi toàn cầu | `false` |
| `ultracoinflip.bypass.tax` | Bỏ qua thuế — nhận đủ tiền thắng | `false` |
| `ultracoinflip.bypass.bettinglimit` | Bỏ qua giới hạn cược ngày/tuần | `false` |
| `ultracoinflip.house.use` | Sử dụng tính năng chơi với Bot | `true` |
| `ultracoinflip.house.bypass.limit` | Bỏ qua giới hạn số trò chơi bot mỗi ngày | `false` |
| `ultracoinflip.house.bypass.delay` | Bỏ qua thời gian chờ giữa các trò bot | `false` |
| `ultracoinflip.settings.bypass` | Bỏ qua tất cả cài đặt thông báo cá nhân | `false` |

## Ghi chú

- **Mặc định `true`** — Tất cả người chơi đều có quyền này trừ khi bị từ chối.
- **Mặc định `op`** — Chỉ operator mới có quyền này.
- **Mặc định `false`** — Không ai có quyền này trừ khi được cấp rõ ràng.

::: tip Ví dụ LuckPerms
```
/lp group vip permission set ultracoinflip.bypass.tax true
/lp group donator permission set ultracoinflip.bypass.bettinglimit true
```
:::
