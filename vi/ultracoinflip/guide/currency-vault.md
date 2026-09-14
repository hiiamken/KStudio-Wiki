# Vault / EssentialsX

Vault là loại tiền **mặc định** của UltraCoinFlip và là loại duy nhất được bật sẵn. Không cần cài thêm gì ngoài Vault và một plugin kinh tế.

## Yêu cầu

- Plugin [Vault](https://www.spigotmc.org/resources/vault.34315/) — UltraCoinFlip không khởi động được nếu thiếu Vault, kể cả khi bạn tắt loại tiền này
- Một plugin kinh tế tương thích Vault: **EssentialsX**, **CMI**, v.v.

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
tax-enabled: true
tax-rate: 0.1
dynamic-tax-enabled: false
```

File này còn có các mục `tax-rate-config`, `restrictions`, `messages` và `event-commands` — xem [File tiền tệ](/vi/ultracoinflip/config/currencies).

## Ghi chú

- Vault được bật mặc định, không cần thêm bước nào. Đặt `enabled: false` nếu bạn chỉ muốn dùng các loại tiền khác.
- Nếu chưa có plugin kinh tế nào kết nối với Vault, console sẽ báo lỗi và người chơi không cược tiền được. Nếu plugin kinh tế kết nối với Vault sau khi UltraCoinFlip đã khởi động, loại tiền này sẽ tự được nhận.
- `unit` là ký hiệu hiển thị cạnh số tiền (mặc định đứng sau số, ví dụ: `500$`).
- `display-name` hiển thị trong GUI và chat.
- `syntax-command` là từ khóa dùng trong `/cf create money 1000`.
- `min-reserve-balance` đảm bảo người chơi luôn giữ lại ít nhất số dư này sau khi cược.
- `round-to-integer` làm tròn xuống mức cược và làm tròn tiền thắng về số nguyên gần nhất (hữu ích nếu plugin kinh tế của bạn không hỗ trợ số thập phân).
