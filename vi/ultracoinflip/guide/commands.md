# Lệnh

Tất cả lệnh dùng `/coinflip` hoặc alias `/cf`.

## Lệnh người chơi

| Lệnh | Mô tả |
|---|---|
| `/coinflip` | Mở danh sách trò chơi coinflip |
| `/coinflip help` | Hiển thị tất cả lệnh |
| `/coinflip create` | Mở GUI tạo trò chơi (chọn tiền tệ và số tiền) |
| `/coinflip create <currency> <amount>` | Tạo trò chơi coinflip mới |
| `/coinflip create <currency> <amount> bot` | Chơi với bot máy chủ |
| `/coinflip delete` | Hủy trò chơi đang mở của bạn |
| `/coinflip history` | Xem lịch sử trò chơi |
| `/cf settings` | Mở cài đặt thông báo cá nhân |
| `/cf leaderboard` | Xem bảng xếp hạng người chơi |

## Lệnh admin

| Lệnh | Mô tả |
|---|---|
| `/coinflip reload` | Reload tất cả file cấu hình |
| `/cf audit` | Mở bảng điều khiển admin theo thời gian thực |
| `/cf webhook test` | Gửi tin nhắn thử đến Discord webhook |

## Viết tắt số tiền

| Nhập | Tương đương |
|---|---|
| `1k` | 1,000 |
| `1.5m` | 1,500,000 |
| `2b` | 2,000,000,000 |
| `1t` | 1,000,000,000,000 |

**Ví dụ:** `/coinflip create money 500k` tạo trò chơi với 500,000 tiền Vault.

::: tip
Từ khóa `bot` ở cuối `/coinflip create` sẽ bắt đầu trò chơi ngay với bot — không cần chờ người chơi khác.
:::

## Từ khóa tiền tệ

Mỗi loại tiền có **từ khóa** riêng dùng trong lệnh tạo game. Cấu hình trong file tiền tệ (`syntax-command`):

| Tiền tệ | Từ khóa mặc định | Ví dụ |
|---|---|---|
| Vault | `money` | `/cf create money 1000` |
| PlayerPoints | `point` | `/cf create point 500` |
| TokenManager | `token` | `/cf create token 250` |
| BeastTokens | `beasttokens` | `/cf create beasttokens 100` |
| CoinsEngine | `coin` | `/cf create coin 1000` |
| Custom (PlaceholderAPI) | *(tùy chỉnh)* | `/cf create orb 500` |
