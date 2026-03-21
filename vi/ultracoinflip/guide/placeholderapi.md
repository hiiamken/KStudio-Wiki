# PlaceholderAPI

UltraCoinFlip cung cấp **40+ placeholder** để dùng trong scoreboard, hologram, plugin chat và bất kỳ nơi nào PlaceholderAPI được hỗ trợ.

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

## Theo dõi lợi nhuận

Thay `<currency>` bằng ID tiền tệ (ví dụ: `vault`, `playerpoints`, `coins`).

| Placeholder | Mô tả |
|---|---|
| `%coinflip_profit_<currency>%` | Tổng tiền thắng |
| `%coinflip_loss_<currency>%` | Tổng tiền thua |
| `%coinflip_net_profit_<currency>%` | Lợi nhuận ròng (thắng - thua) |
| `%coinflip_profit_<currency>_formatted%` | Lợi nhuận được định dạng |

## Bảng xếp hạng

```
%coinflip_top_<rank>_<filter>_<currency>_name%
%coinflip_top_<rank>_<filter>_<currency>_value%
%coinflip_top_<rank>_<filter>_<currency>_value_formatted%
```

- `<rank>` — Vị trí (1–15)
- `<filter>` — `wins`, `profit`, `largest-win`, `worst-profit`, hoặc `winstreak`
- `<currency>` — ID tiền tệ

**Ví dụ:** `%coinflip_top_1_wins_vault_name%` → tên người chơi #1 theo số thắng cho tiền Vault.
