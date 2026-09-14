# ExcellentEconomy / CoinsEngine

ExcellentEconomy (tên mới của CoinsEngine) cung cấp hệ thống đa tiền tệ riêng.

## Bối cảnh

CoinsEngine đã được **đổi tên thành ExcellentEconomy** bởi developer. UltraCoinFlip hỗ trợ cả hai:

- **ExcellentEconomy** (mới) — được phát hiện và sử dụng tự động
- **CoinsEngine** (cũ) — vẫn hoạt động. Bản 2.7.0 trở lên được hỗ trợ đầy đủ; bản cũ hơn sẽ hiện cảnh báo trong console nhắc bạn cập nhật

Cả hai đều dùng chung **file `coinsengine.yml`** — không cần thay đổi gì khi chuyển đổi.

## Yêu cầu

Cài một trong hai:
- [ExcellentEconomy](https://github.com/nulli0n/ExcellentEconomy) *(khuyên dùng)*
- CoinsEngine (legacy, vẫn hoạt động)

## File cấu hình: `coinsengine.yml`

Mỗi tiền tệ định nghĩa trong ExcellentEconomy có một mục riêng. File mặc định có sẵn một tiền tệ mẫu là `coins`, đang tắt:

```yaml
currencies:
  coins:
    enabled: false                 # đặt true để dùng
    unit: "Coins"
    display-name: "Coins"
    syntax-command: "coin"         # /cf create coin 1000
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

Khóa (`coins`, `gems`) phải khớp chính xác với **ID tiền tệ** trong ExcellentEconomy và không được chứa dấu cách, dấu hai chấm hay dấu chấm. Mỗi tiền tệ cũng có thể có `tax-rate-config`, `restrictions`, `messages` và `event-commands` riêng — xem [File tiền tệ](/vi/ultracoinflip/config/currencies).

Chỉnh xong thì chạy `/cf reload`. Người chơi có thể dùng từ khóa `syntax-command` hoặc chính ID tiền tệ, ví dụ `/cf create coins 1000`.

::: warning
Nếu một tiền tệ được bật nhưng ID của nó không tồn tại trong ExcellentEconomy, console sẽ báo lỗi và người chơi thử dùng tiền tệ đó sẽ nhận thông báo lỗi.
:::

## Thêm nhiều loại tiền

```yaml
currencies:
  coins:
    enabled: true
    unit: "Coins"
    display-name: "Coins"
    syntax-command: "coin"
    # ...
  gems:
    enabled: true
    unit: "Gems"
    display-name: "Gems"
    syntax-command: "gem"
    # ...
```

Các tiền tệ bạn thêm ở đây được giữ lại khi UltraCoinFlip cập nhật. Nếu một mục thiếu thiết lập cơ bản như `min-bid` hay `tax-rate`, chúng sẽ được thêm với giá trị mặc định.

## Placeholder

| Placeholder | Mô tả |
|---|---|
| `%coinflip_coinsengine_<id>_unit%` | Đơn vị tiền tệ |
| `%coinflip_coinsengine_<id>_display%` | Tên hiển thị |

Trong GUI config của danh sách game và lịch sử, dùng `<coinsengine_<id>_unit>` hoặc `<coinsengine_<id>_display>`.

## Migration từ CoinsEngine

1. Cài ExcellentEconomy và gỡ CoinsEngine.
2. Đảm bảo ID tiền tệ trong ExcellentEconomy khớp với key trong `coinsengine.yml`.
3. Restart — UltraCoinFlip sẽ tự động chuyển sang API mới.
