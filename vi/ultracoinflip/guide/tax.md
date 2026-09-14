# Hệ thống thuế

UltraCoinFlip có hệ thống thuế linh hoạt, trừ một phần trăm từ tiền thắng.

## Cách hoạt động

Khi người chơi thắng, thuế được trừ từ **tổng pot** trước khi thanh toán.

**Ví dụ:** Người chơi cược 10,000. Pot = 20,000. Thuế 10% → người thắng nhận 18,000.

- Người thắng không bao giờ nhận lại ít hơn tiền cược của chính mình, nên mọi mức thuế trên 50% đều trả giống như 50%. Chỉ mức `1.0` (100%) mới lấy hết pot.
- Tiền thắng được làm tròn đến 2 chữ số thập phân. Khi đặt `round-to-integer: true` trong file tiền tệ, tiền thắng được làm tròn thành số nguyên (và tiền cược của loại tiền đó được làm tròn xuống số nguyên).

## Cấu hình

Thuế được cấu hình **riêng cho từng loại tiền** trong file của loại tiền đó ở `plugins/UltraCoinFlip/currencies/` (ví dụ `vault.yml`, `playerpoints.yml`). Với `coinsengine.yml` và `customplaceholder.yml`, các key giống hệt được đặt bên trong mục của từng loại tiền.

### Thuế cố định

```yaml
tax-enabled: true
tax-rate: 0.1          # thuế cố định 10% trên mọi khoản thắng
```

Đặt `tax-enabled: false` để không thu thuế loại tiền đó.

### Thuế theo bậc (Dynamic)

Bật thuế theo bậc để cược lớn hơn bị đánh thuế nhiều hơn:

```yaml
tax-enabled: true
dynamic-tax-enabled: true
tax-rate-config:
  base-tax-rate: 0.1             # dùng khi không có bậc nào khớp
  tiers:
    - min-amount: 0
      max-amount: 100
      tax-rate: 0.05             # 5% cho cược dưới 100
    - min-amount: 100
      max-amount: 1000
      tax-rate: 0.10             # 10% cho cược từ 100 đến dưới 1,000
    - min-amount: 1000
      max-amount: -1             # -1 = không giới hạn trên
      tax-rate: 0.15             # 15% cho cược từ 1,000 trở lên
```

- Giá trị `tax-rate` là số thập phân (ví dụ `0.05` = 5%, `0.15` = 15%)
- Bậc được so với **số tiền cược** (số tiền một người chơi đặt), còn mức thuế khớp được áp dụng cho cả pot
- `min-amount` được tính, `max-amount` thì không — bậc `0`–`100` áp dụng cho cược dưới 100
- `max-amount: -1` nghĩa là không giới hạn trên
- Nếu các bậc chồng lên nhau, bậc khớp **cuối cùng** trong danh sách được dùng
- Nếu không có bậc nào khớp, `base-tax-rate` được dùng
- Khi bật thuế theo bậc, `base-tax-rate` và các bậc thay thế cho `tax-rate` cố định
- Mỗi loại tiền có thể có các bậc thuế riêng

## Bỏ qua thuế

Người chơi có quyền `ultracoinflip.bypass.tax` nhận toàn bộ tiền thắng không bị trừ thuế. Quyền này được kiểm tra trên người thắng và mặc định không ai có.

## Ván chơi với bot

Tiền thắng từ [Chơi với Bot](/vi/ultracoinflip/guide/bot-game) dùng chung cài đặt thuế của loại tiền. Đặt `house.tax.enabled: false` trong `config.yml` để trả tiền thắng từ bot mà không trừ thuế.

::: tip
Bạn có thể đặt thuế khác nhau cho từng loại tiền. Ví dụ: Vault 5% và PlayerPoints 10%.
:::
