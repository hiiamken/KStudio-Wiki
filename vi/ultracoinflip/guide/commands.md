# Lệnh

Tất cả lệnh dùng `/coinflip` hoặc alias `/cf`. Muốn thêm tên lệnh khác, hãy liệt kê chúng trong `command_aliases` của `config.yml` rồi khởi động lại server. Tên chỉ được chứa chữ cái, chữ số và dấu gạch dưới.

## Lệnh người chơi

| Lệnh | Mô tả |
|---|---|
| `/coinflip` | Mở danh sách trò chơi coinflip |
| `/coinflip help` | Hiển thị tất cả lệnh (admin sẽ thấy thêm các lệnh admin) |
| `/coinflip info` | Xem phiên bản plugin, server, cơ sở dữ liệu và các plugin kinh tế đã nhận |
| `/coinflip create` | Mở GUI tạo trò chơi (chọn tiền tệ và số tiền) |
| `/coinflip create <amount>` | Tạo trò chơi coinflip mới bằng loại tiền mặc định |
| `/coinflip create <currency> <amount>` | Tạo trò chơi coinflip mới |
| `/coinflip create <currency> <amount> bot` | Chơi với bot máy chủ |
| `/coinflip delete` | Hủy các coinflip đang mở của bạn và nhận lại tiền cược |
| `/coinflip invite <player>` | Mời người chơi cụ thể với nút Chấp Nhận/Từ Chối clickable trong chat |
| `/coinflip uninvite <player>` | Xóa người chơi khỏi danh sách mời |
| `/coinflip accept [id]` | Chấp nhận lời mời coinflip (id không bắt buộc nếu chỉ có 1 lời mời) |
| `/coinflip deny [id]` | Từ chối lời mời coinflip |
| `/coinflip private [on\|off]` | Bật/tắt chế độ private (chỉ người được mời mới vào được) |
| `/coinflip history` | Xem lịch sử trò chơi |
| `/cf settings` | Mở cài đặt thông báo cá nhân |
| `/cf leaderboard` | Xem bảng xếp hạng người chơi |
| `/cf stats` | Xem thống kê coinflip của bạn |
| `/cf stats <player>` | Xem thống kê của người chơi khác |
| `/cf limit` | Liệt kê các lệnh giới hạn thắng/thua |
| `/cf limit me` | Xem giới hạn thắng/thua của bạn |

## Lệnh admin

| Lệnh | Mô tả |
|---|---|
| `/coinflip reload` | Reload tất cả file cấu hình |
| `/cf audit` | Mở bảng điều khiển admin theo thời gian thực |
| `/cf webhook test` | Gửi tin nhắn thử đến Discord webhook |
| `/cf limit player <player>` | Xem giới hạn thắng/thua của người chơi khác |
| `/cf limit reset <player>` | Đặt lại giới hạn thắng/thua của người chơi trong kỳ hiện tại |
| `/cf limit auto-tune <currency>` | Gợi ý mức max-win và max-loss dựa trên các trận trong 30 ngày qua (`<currency>` là key trong `earnings-limit.per-currency`, ví dụ `vault`; với Vault dùng `money` cũng được) |

::: warning
Reload khi một trận vẫn đang chạy animation sẽ kết thúc trận đó và trả lại tiền cược (người chơi offline sẽ nhận lại khi vào server lần tới). `/coinflip reload` sẽ bị từ chối khi việc hoàn tiền vẫn đang được xử lý.
:::

## Console

Các lệnh sau cũng chạy được từ console của server: `coinflip help`, `coinflip info`, `coinflip reload`, `cf audit` (in báo cáo hệ thống dạng chữ thay vì mở bảng điều khiển), `cf webhook test`, `cf limit`, `cf limit reset <player>` và `cf limit auto-tune <currency>`. Các lệnh còn lại phải do người chơi chạy trong game.

## Alias của subcommand

| Subcommand | Dùng được bằng |
|---|---|
| `delete` | `remove`, `cancel` |
| `leaderboard` | `lb`, `top` |
| `settings` | `toggle` |
| `stats` | `st` |
| `info` | `about`, `version` |
| `audit` | `status`, `admin` |

::: tip
Mọi lệnh đều cần quyền `ultracoinflip.use` cùng với node quyền riêng của lệnh đó. Xem [Quyền](/vi/ultracoinflip/guide/permissions).
:::

## Viết tắt số tiền

UltraCoinFlip hỗ trợ viết tắt số tiền:

| Nhập | Tương đương |
|---|---|
| `1k` | 1,000 |
| `1.5m` | 1,500,000 |
| `2b` | 2,000,000,000 |
| `1t` | 1,000,000,000,000 |

**Ví dụ:** `/coinflip create money 500k` tạo trò chơi với 500,000 tiền Vault.

Hậu tố không phân biệt chữ hoa/thường (`1K` và `1k` đều được). Dùng dấu chấm cho số thập phân và không dùng dấu phân cách hàng nghìn — `1,000` sẽ bị từ chối.

::: tip Tiền tệ mặc định
Người chơi có thể bỏ qua từ khóa tiền tệ: `/cf create 500k` sẽ dùng `default-currency` trong `config.yml`. Giá trị mặc định `auto` chọn loại tiền đầu tiên đang bật theo thứ tự: money, PlayerPoints, TokenManager, BeastTokens, ExcellentEconomy, tiền tệ tùy chỉnh.
:::

::: tip
Từ khóa `bot` ở cuối `/coinflip create` sẽ bắt đầu trò chơi ngay với bot — không cần chờ người chơi khác. Bạn có thể đổi từ khóa này bằng `house.subcommand` trong `config.yml`.
:::

## Từ khóa tiền tệ

Mỗi loại tiền có **từ khóa** riêng dùng trong lệnh tạo game. Cấu hình trong file tiền tệ (`syntax-command`):

| Tiền tệ | Từ khóa mặc định | Ví dụ |
|---|---|---|
| Vault | `money` | `/cf create money 1000` |
| PlayerPoints | `point` | `/cf create point 500` |
| TokenManager | `token` | `/cf create token 250` |
| BeastTokens | `beasttokens` | `/cf create beasttokens 100` |
| ExcellentEconomy / CoinsEngine | `coin` | `/cf create coin 1000` |
| Custom (PlaceholderAPI) | *(tùy chỉnh)* | `/cf create orb 500` |

Từ khóa chỉ hoạt động khi loại tiền đó đang bật — mặc định chỉ có Vault được bật. Tiền ExcellentEconomy và tiền tệ tùy chỉnh cũng có thể chọn bằng `coinsengine:<id>` / `placeholder:<id>`, hoặc chỉ cần ghi ID của loại tiền. Vault, PlayerPoints, TokenManager và BeastTokens cũng nhận `money`, `playerpoints`, `tokenmanager` và `beasttokens`, trừ khi một từ khóa hay ID tiền tệ đã dùng tên đó.
