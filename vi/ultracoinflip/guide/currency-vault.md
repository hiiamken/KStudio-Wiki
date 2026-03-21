# Vault / EssentialsX

Vault là loại tiền mặc định của UltraCoinFlip, không cần cài thêm gì ngoài Vault và một plugin kinh tế.

## Yêu cầu

- Plugin [Vault](https://www.spigotmc.org/resources/vault.34315/)
- Một plugin kinh tế tương thích: **EssentialsX**, **CMI**, **AureliumSkills**, v.v.

## File cấu hình: `vault.yml`

```yaml
enabled: true
unit: "$"
display-name: "Money"
min-bid: 100
max-bid: 10000000
tax:
  enabled: false
  tiers: []
```

## Ghi chú

- Vault được bật mặc định, không cần thêm bước nào.
- `unit` là ký hiệu hiển thị trước số tiền (ví dụ: `$500`).
- `display-name` hiển thị trong GUI và chat.
- `min-bid` / `max-bid` giới hạn mức cược cho phép với loại tiền này.
