# Hệ thống thuế

UltraCoinFlip có **hệ thống thuế theo bậc** — khấu trừ phần trăm từ tiền thắng dựa trên mức cược.

## Cách hoạt động

Khi người chơi thắng, thuế được trừ khỏi **tổng pot** trước khi trả thưởng.

**Ví dụ:** Người chơi cược 10,000. Pot = 20,000. Thuế 5% → người thắng nhận 19,000.

## Cấu hình

Thuế được cấu hình trong từng file tiền tệ (ví dụ: `vault.yml`):

```yaml
tax:
  enabled: true
  tiers:
    - min: 0
      max: 9999
      rate: 0      # Không thuế dưới 10k
    - min: 10000
      max: 99999
      rate: 3      # 3% thuế 10k–99k
    - min: 100000
      max: 999999
      rate: 5      # 5% thuế 100k–999k
    - min: 1000000
      max: -1      # -1 = không giới hạn trên
      rate: 10     # 10% thuế 1M+
```

- `rate` là phần trăm (ví dụ: `5` = 5%)
- `max: -1` nghĩa là không có giới hạn trên

## Bỏ qua thuế

Người chơi có quyền `ultracoinflip.bypass.tax` sẽ nhận đủ tiền thắng, không bị trừ thuế.
