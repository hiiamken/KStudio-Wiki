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
    unit: "🪙"
    display-name: "Xu"
    min-bid: 100
    max-bid: 1000000
  gems:
    enabled: true
    unit: "💎"
    display-name: "Gem"
    min-bid: 1
    max-bid: 10000
```

Khóa (`coins`, `gems`) phải khớp chính xác với **ID tiền tệ** trong ExcellentEconomy.

## Migration từ CoinsEngine

1. Cài ExcellentEconomy và gỡ CoinsEngine.
2. Đảm bảo ID tiền tệ trong ExcellentEconomy khớp với key trong `coinsengine.yml`.
3. Restart — UltraCoinFlip sẽ tự động chuyển sang API mới.
