# ExcellentEconomy / CoinsEngine

ExcellentEconomy (tên mới của CoinsEngine) cung cấp hệ thống đa tiền tệ riêng.

## Bối cảnh

CoinsEngine đã được **đổi tên thành ExcellentEconomy** bởi developer. UltraCoinFlip hỗ trợ cả hai:

- **ExcellentEconomy** (mới) — được phát hiện và sử dụng tự động
- **CoinsEngine** (cũ) — vẫn hoạt động với cảnh báo migration trong console

Cả hai đều dùng chung **file `coinsengine.yml`** — không cần thay đổi gì khi chuyển đổi.

## Yêu cầu

Cài một trong hai:
- [ExcellentEconomy](https://github.com/nulli0n/ExcellentEconomy) *(khuyên dùng)*
- CoinsEngine (legacy, vẫn hoạt động)

## File cấu hình: `coinsengine.yml`

Mỗi tiền tệ định nghĩa trong ExcellentEconomy có một mục riêng:

```yaml
currencies:
  coins:
    enabled: true
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

Khóa (`coins`, `gems`) phải khớp chính xác với **ID tiền tệ** trong ExcellentEconomy.

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

## Migration từ CoinsEngine

1. Cài ExcellentEconomy và gỡ CoinsEngine.
2. Đảm bảo ID tiền tệ trong ExcellentEconomy khớp với key trong `coinsengine.yml`.
3. Restart — UltraCoinFlip sẽ tự động chuyển sang API mới.
