# Tổng quan tiền tệ

UltraCoinFlip hỗ trợ nhiều loại tiền tệ cùng lúc. Mỗi loại tiền có file cấu hình riêng trong `plugins/UltraCoinFlip/currencies/`.

## Tiền tệ được hỗ trợ

| Tiền tệ | File cấu hình | Plugin yêu cầu |
|---|---|---|
| Vault (EssentialsX, CMI,...) | `vault.yml` | Vault + plugin kinh tế |
| PlayerPoints | `playerpoints.yml` | PlayerPoints |
| TokenManager | `tokenmanager.yml` | TokenManager |
| BeastTokens | `beasttokens.yml` | BeastTokens |
| ExcellentEconomy / CoinsEngine | `coinsengine.yml` | ExcellentEconomy hoặc CoinsEngine |
| Custom (PlaceholderAPI) | `customplaceholder.yml` | PlaceholderAPI |

## Tự động nhận diện

Plugin tự nhận biết loại tiền nào đang được cài khi server khởi động. Loại tiền nào không có plugin tương ứng sẽ tự bị bỏ qua, không hiện cho người chơi.

::: info ExcellentEconomy vs CoinsEngine
CoinsEngine đã được đổi tên thành **ExcellentEconomy**. UltraCoinFlip hỗ trợ cả hai:
- Nếu **ExcellentEconomy** được cài → dùng API mới tự động
- Nếu chỉ có **CoinsEngine** (phiên bản cũ) → dùng API legacy kèm cảnh báo trong console

Cả hai đều dùng chung file `coinsengine.yml` — không cần thay đổi gì.
:::

## Cấu hình từng loại tiền

```yaml
enabled: true
unit: "$"
display-name: "Money"
syntax-command: "money"          # từ khóa cho /cf create <keyword> <amount>
broadcast-enabled: true          # thông báo game dùng loại tiền này
min-broadcast-amount: 100        # mức cược tối thiểu để thông báo
min-bid: 1                       # mức cược tối thiểu
max-bid: -1                      # mức cược tối đa (-1 = không giới hạn)
min-reserve-balance: 0           # số dư tối thiểu phải giữ lại
round-to-integer: false          # làm tròn tiền thắng về số nguyên
tax-enabled: true
tax-rate: 0.1                    # thuế 10%
dynamic-tax-enabled: false       # bật thuế theo bậc
```

Xem [File tiền tệ](/vi/ultracoinflip/config/currencies) để biết chi tiết đầy đủ.
