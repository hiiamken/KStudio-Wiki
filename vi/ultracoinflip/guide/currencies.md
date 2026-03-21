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
display-name: "Xu"
min-bid: 100
max-bid: 1000000
tax:
  enabled: true
  tiers: ...
world-restrictions:
  enabled: false
```
