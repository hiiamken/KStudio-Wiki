# Custom PlaceholderAPI Currencies

UltraCoinFlip hỗ trợ **không giới hạn tiền tệ tùy chỉnh** sử dụng PlaceholderAPI. Bất kỳ plugin nào cung cấp placeholder số dư dạng số đều có thể dùng làm tiền tệ coinflip.

## Yêu cầu

- [PlaceholderAPI](https://www.spigotmc.org/resources/placeholderapi.6245/) được cài trên server
- Một plugin cung cấp placeholder **trả về số** (ví dụ: `%plugin_balance%` → `1500`)

## Cách hoạt động

Tiền tệ tùy chỉnh sử dụng:
- **PlaceholderAPI placeholder** để đọc số dư người chơi
- **Lệnh console** để thêm và trừ tiền tệ

## File cấu hình: `customplaceholder.yml`

Bạn có thể định nghĩa bao nhiêu loại tiền tùy thích. Mỗi loại tiền có ID riêng:

```yaml
currencies:
  orbs:
    enabled: true
    placeholder: '%yourplugin_orbs%'        # PHẢI trả về số
    unit: 'Orbs'
    display-name: 'Orbs'
    give-command: 'orbs give {player} {amount} -s'
    remove-command: 'orbs remove {player} {amount} -s'
    syntax-command: 'orb'                   # dùng trong /cf create orb 500
    broadcast-enabled: true
    min-broadcast-amount: 100
    min-bid: 1
    max-bid: -1
    min-reserve-balance: 0
    round-to-integer: false
    tax-enabled: true
    tax-rate: 0.1
    dynamic-tax-enabled: false
```

## Thêm nhiều loại tiền

Thêm mục mới dưới `currencies:`:

```yaml
currencies:
  orbs:
    enabled: true
    placeholder: '%yourplugin_orbs%'
    # ... (cấu hình đầy đủ)
  gems:
    enabled: true
    placeholder: '%yourplugin_gems%'
    # ... (cấu hình đầy đủ)
  shards:
    enabled: true
    placeholder: '%yourplugin_shards%'
    round-to-integer: true    # hữu ích cho tiền tệ chỉ nhận số nguyên
    # ... (cấu hình đầy đủ)
```

## Placeholder

Tiền tệ tùy chỉnh cung cấp các PlaceholderAPI placeholder sau:

| Placeholder | Mô tả |
|---|---|
| `%coinflip_placeholder_<id>_unit%` | Đơn vị tiền tệ (ví dụ: "Orbs") |
| `%coinflip_placeholder_<id>_display%` | Tên hiển thị |
| `%coinflip_<id>_unit%` | Dạng ngắn |
| `%coinflip_<id>_display%` | Dạng ngắn |

Trong GUI config, dùng: `<placeholder_<id>_unit>` hoặc `<placeholder_<id>_display>`

::: warning Không theo dõi thống kê
Tiền tệ Custom PlaceholderAPI **không được** theo dõi trong hệ thống thống kê/bảng xếp hạng. Placeholder lợi nhuận, thua, tỷ lệ thắng sẽ trả về `0`. Chỉ tiền tệ tích hợp (money, playerpoints, tokenmanager, beasttokens) mới có thống kê đầy đủ.
:::

::: tip Làm tròn số nguyên
Nếu tiền tệ tùy chỉnh chỉ hỗ trợ số nguyên (ví dụ: tokens, shards, pearls), bật `round-to-integer: true` để tự động làm tròn. Tiền thắng `1.8 shards` sẽ thành `2 shards`.
:::
