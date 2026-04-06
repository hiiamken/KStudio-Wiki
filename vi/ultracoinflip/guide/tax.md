# Hệ thống thuế

UltraCoinFlip có hệ thống thuế linh hoạt, trừ một phần trăm từ tiền thắng.

## Cách hoạt động

Khi người chơi thắng, thuế được trừ từ **tổng pot** trước khi thanh toán.

**Ví dụ:** Người chơi cược 10,000. Pot = 20,000. Thuế 10% → người thắng nhận 18,000.

## Cấu hình

Thuế được cấu hình **riêng cho từng loại tiền** trong file tiền tệ (ví dụ `vault.yml`, `playerpoints.yml`):

### Thuế cố định

```yaml
tax-enabled: true
tax-rate: 0.1          # thuế cố định 10%
```

### Thuế theo bậc (Dynamic)

Bật thuế theo bậc để cược lớn hơn bị đánh thuế nhiều hơn:

```yaml
tax-enabled: true
tax-rate: 0.1                    # tỷ lệ dự phòng nếu không tier nào khớp
dynamic-tax-enabled: true
tax-rate-config:
  base-tax-rate: 0.1
  tiers:
    - min-amount: 0
      max-amount: 100
      tax-rate: 0.05             # 5% cho cược 0–100
    - min-amount: 100
      max-amount: 1000
      tax-rate: 0.10             # 10% cho cược 100–1,000
    - min-amount: 1000
      max-amount: -1             # -1 = không giới hạn trên
      tax-rate: 0.15             # 15% cho cược 1,000+
```

- Giá trị `tax-rate` là số thập phân (ví dụ `0.05` = 5%, `0.15` = 15%)
- `max-amount: -1` nghĩa là không giới hạn trên
- Tier được kiểm tra từ trên xuống — tier khớp đầu tiên được dùng
- Mỗi loại tiền có thể có tier thuế riêng

## Bỏ qua thuế

Người chơi có quyền `ultracoinflip.bypass.tax` nhận toàn bộ tiền thắng không bị trừ thuế.

::: tip
Bạn có thể đặt thuế khác nhau cho từng loại tiền. Ví dụ: Vault 5% và PlayerPoints 10%.
:::
