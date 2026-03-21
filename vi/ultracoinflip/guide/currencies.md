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

## Cách phát hiện tiền tệ

UltraCoinFlip **tự động phát hiện** plugin tiền tệ nào đang cài trên server khi khởi động. Chỉ những tiền tệ có plugin tương ứng mới được tải và hiển thị cho người chơi.

::: info ExcellentEconomy vs CoinsEngine
CoinsEngine đã được đổi tên thành **ExcellentEconomy**. UltraCoinFlip hỗ trợ cả hai:
- Nếu **ExcellentEconomy** được cài → dùng API mới tự động
- Nếu chỉ có **CoinsEngine** (phiên bản cũ) → dùng API legacy kèm cảnh báo trong console

Cả hai đều dùng chung file `coinsengine.yml` — không cần thay đổi gì.
:::

## Cài đặt per-currency

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
