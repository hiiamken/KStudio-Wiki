# Vault / EssentialsX

Vault là loại tiền **mặc định và bắt buộc** của UltraCoinFlip, không cần cài thêm gì ngoài Vault và một plugin kinh tế.

## Yêu cầu

- Plugin [Vault](https://www.spigotmc.org/resources/vault.34315/)
- Một plugin kinh tế tương thích: **EssentialsX**, **CMI**, **AureliumSkills**, v.v.

## File cấu hình: `vault.yml`

```yaml
enabled: true
unit: "$"
display-name: "Money"
syntax-command: "money"          # /cf create money 1000
broadcast-enabled: true
min-broadcast-amount: 100
min-bid: 1
max-bid: -1                      # -1 = không giới hạn
min-reserve-balance: 0
round-to-integer: false
tax-enabled: false
tax-rate: 0.1
dynamic-tax-enabled: false
```

## Ghi chú

- Vault được bật mặc định, không cần thêm bước nào.
- `unit` là ký hiệu hiển thị trước số tiền (ví dụ: `$500`).
- `display-name` hiển thị trong GUI và chat.
- `syntax-command` là từ khóa dùng trong `/cf create money 1000`.
- `min-reserve-balance` đảm bảo người chơi luôn giữ lại ít nhất số dư này sau khi cược.
- `round-to-integer` làm tròn tiền thắng về số nguyên gần nhất.
