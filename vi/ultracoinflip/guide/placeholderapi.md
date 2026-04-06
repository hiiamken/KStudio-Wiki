# PlaceholderAPI

UltraCoinFlip cung cấp **60+ placeholder** để dùng trong scoreboard, hologram, plugin chat và bất kỳ nơi nào PlaceholderAPI được hỗ trợ.

## Thống kê cơ bản

| Placeholder | Mô tả |
|---|---|
| `%coinflip_wins%` | Tổng số trận thắng |
| `%coinflip_losses%` | Tổng số trận thua |
| `%coinflip_total_games%` | Tổng số trận đã chơi |
| `%coinflip_winstreak%` | Chuỗi thắng hiện tại |

## Tỷ lệ thắng

| Placeholder | Mô tả |
|---|---|
| `%coinflip_winrate%` | Tỷ lệ thắng tổng (chỉ số) |
| `%coinflip_winrate_formatted%` | Tỷ lệ thắng với ký hiệu `%` |
| `%coinflip_winrate_<currency>%` | Tỷ lệ thắng theo loại tiền |
| `%coinflip_winrate_<currency>_formatted%` | Tỷ lệ thắng theo loại tiền có `%` |

**Loại tiền hỗ trợ:** `money`, `playerpoints`, `tokenmanager`, `beasttokens`

## Theo dõi lợi nhuận

Thay `<currency>` bằng ID tiền tệ. Có thể dùng viết tắt.

| Placeholder | Viết tắt | Mô tả |
|---|---|---|
| `%coinflip_profit_money%` | `%coinflip_profit_m%` | Tổng tiền thắng |
| `%coinflip_loss_money%` | `%coinflip_loss_m%` | Tổng tiền thua |
| `%coinflip_net_profit_money%` | `%coinflip_net_m%` | Lợi nhuận ròng |
| `%coinflip_profit_money_formatted%` | `%coinflip_profit_m_formatted%` | Lợi nhuận được định dạng |
| `%coinflip_loss_money_formatted%` | `%coinflip_loss_m_formatted%` | Thua được định dạng |
| `%coinflip_net_profit_money_formatted%` | `%coinflip_net_m_formatted%` | Lợi nhuận ròng được định dạng |

Tương tự cho `playerpoints` (viết tắt `pp`), `tokenmanager` (`tm`), `beasttokens` (`bt`).

## Thống kê tổng hợp

| Placeholder | Mô tả |
|---|---|
| `%coinflip_total_profit%` | Tổng lợi nhuận tất cả loại tiền |
| `%coinflip_total_loss%` | Tổng thua tất cả loại tiền |
| `%coinflip_total_net%` | Lợi nhuận ròng tổng hợp |

## Xếp hạng người chơi

| Placeholder | Mô tả |
|---|---|
| `%coinflip_position%` | Thứ hạng theo số thắng |
| `%coinflip_position_wins%` | Thứ hạng theo số thắng |
| `%coinflip_position_winstreak%` | Thứ hạng theo chuỗi thắng |
| `%coinflip_position_losses%` | Thứ hạng theo số thua |
| `%coinflip_position_profit_<currency>%` | Thứ hạng theo lợi nhuận |
| `%coinflip_position_largest-win_<currency>%` | Thứ hạng theo thắng lớn nhất |

Trả về số thứ hạng (bắt đầu từ 1) hoặc `N/A` nếu chưa xếp hạng.

## Bảng xếp hạng

```
%coinflip_top_<rank>_<filter>_<type>%
%coinflip_top_<rank>_<filter>_<currency>_<type>%
```

- `<rank>` — Vị trí (1–15)
- `<filter>` — `wins`, `profit`, `largest-win`, `worst-profit`, `winstreak`, hoặc `losses`
- `<currency>` — Bắt buộc cho profit/largest-win/worst-profit: `money`, `playerpoints`, `tokenmanager`, `beasttokens`
- `<type>` — `name`, `value`, hoặc `value_formatted`

**Ví dụ:** `%coinflip_top_1_wins_name%` → tên người chơi #1 theo số thắng.

## Placeholder tiền tệ tùy chỉnh

Cho **CoinsEngine / ExcellentEconomy**:

| Placeholder | Mô tả |
|---|---|
| `%coinflip_coinsengine_<id>_unit%` | Đơn vị tiền tệ |
| `%coinflip_coinsengine_<id>_display%` | Tên hiển thị |

Cho **Custom PlaceholderAPI**:

| Placeholder | Mô tả |
|---|---|
| `%coinflip_placeholder_<id>_unit%` | Đơn vị tiền tệ |
| `%coinflip_placeholder_<id>_display%` | Tên hiển thị |
| `%coinflip_<id>_unit%` | Dạng ngắn |
| `%coinflip_<id>_display%` | Dạng ngắn |

::: warning
Tiền tệ Custom PlaceholderAPI **không được theo dõi** trong thống kê. Placeholder lợi nhuận/thua sẽ trả về `0`. Chỉ tiền tệ tích hợp (money, playerpoints, tokenmanager, beasttokens) mới có thống kê.
:::

::: tip
Cài [PlaceholderAPI](https://www.spigotmc.org/resources/placeholderapi.6245/) và UltraCoinFlip sẽ tự đăng ký expansion khi khởi động.
:::
