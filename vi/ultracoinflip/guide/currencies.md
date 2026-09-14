# Tổng quan tiền tệ

UltraCoinFlip hỗ trợ nhiều loại tiền tệ cùng lúc. Mỗi loại tiền có file cấu hình riêng trong `plugins/UltraCoinFlip/currencies/`.

## Tiền tệ được hỗ trợ

| Tiền tệ | File cấu hình | Plugin yêu cầu | Bật sẵn |
|---|---|---|---|
| Vault (EssentialsX, CMI,...) | `vault.yml` | Vault + plugin kinh tế | Có |
| PlayerPoints | `playerpoints.yml` | PlayerPoints | Không |
| TokenManager | `tokenmanager.yml` | TokenManager | Không |
| BeastTokens | `beasttokens.yml` | BeastTokens | Không |
| ExcellentEconomy / CoinsEngine | `coinsengine.yml` | ExcellentEconomy hoặc CoinsEngine | Không |
| Custom (PlaceholderAPI) | `customplaceholder.yml` | PlaceholderAPI | Không |

`coinsengine.yml` và `customplaceholder.yml` chứa được bao nhiêu loại tiền tùy thích, mỗi loại có thiết lập riêng.

## Cách nhận diện tiền tệ

UltraCoinFlip tải mọi loại tiền có `enabled: true` trong file của nó khi server khởi động và mỗi lần bạn chạy `/cf reload`. Mặc định chỉ có **Vault** được bật. Muốn dùng loại tiền khác, hãy cài plugin tương ứng, đặt `enabled: true` trong file của loại tiền đó rồi chạy `/cf reload`.

Nếu một loại tiền đã bật nhưng thiếu plugin (hoặc ID tiền tệ trong ExcellentEconomy không tồn tại), người chơi sẽ không dùng được loại tiền đó và console liệt kê lỗi bên dưới dòng **CURRENCY CONFIGURATION ERRORS DETECTED**. Nếu sau này bạn gỡ plugin tiền tệ thì cũng vậy — đặt `enabled: false` để tắt cảnh báo.

::: warning
Nếu không có loại tiền nào được bật, người chơi không thể tạo game và console sẽ cảnh báo khi khởi động.
:::

::: info ExcellentEconomy vs CoinsEngine
CoinsEngine đã được đổi tên thành **ExcellentEconomy**. UltraCoinFlip hỗ trợ cả hai:
- Nếu **ExcellentEconomy** được cài → tự động dùng ExcellentEconomy
- Nếu chỉ có **CoinsEngine** → vẫn hoạt động. Bản 2.7.0 trở lên được hỗ trợ đầy đủ; bản cũ hơn sẽ hiện cảnh báo trong console nhắc bạn cập nhật

Cả hai đều dùng chung file `coinsengine.yml` — không cần thay đổi gì.
:::

## Chọn loại tiền trong lệnh

Mỗi loại tiền có một từ khóa `syntax-command` để người chơi gõ sau `/cf create`:

| Lệnh | Tác dụng |
|---|---|
| `/cf create` | Mở menu tạo game, chỉ hiện những loại tiền người chơi được phép dùng |
| `/cf create <keyword> <amount>` | Tạo game với loại tiền đó, ví dụ `/cf create money 1000` |
| `/cf create <amount>` | Dùng `default-currency` trong `config.yml` (`auto` chọn loại tiền đầu tiên đang bật, bắt đầu từ Vault) |
| `/cf create <keyword> <amount> bot` | Chơi với bot (chữ `bot` đổi được trong `config.yml`) |

Số tiền có thể viết kèm `k`, `M`, `B` và `T`, ví dụ `/cf create money 2.5M`. Với tiền tệ ExcellentEconomy và tiền tệ tùy chỉnh, người chơi cũng có thể gõ ID tiền tệ thay cho từ khóa. Vault, PlayerPoints, TokenManager và BeastTokens cũng chọn được bằng `money`, `playerpoints`, `tokenmanager` và `beasttokens`.

## Cấu hình từng loại tiền

Mọi file cấu hình tiền tệ đều hỗ trợ các thiết lập sau:

```yaml
enabled: true
unit: "$"
display-name: "Money"
syntax-command: "money"          # từ khóa cho /cf create <keyword> <amount>
broadcast-enabled: true          # thông báo game dùng loại tiền này
min-broadcast-amount: 100        # mức cược tối thiểu để thông báo
min-bid: 1                       # mức cược tối thiểu
max-bid: -1                      # mức cược tối đa (-1 = không giới hạn)
min-reserve-balance: 0           # số dư tối thiểu phải giữ lại sau khi cược
round-to-integer: false          # cược và tiền thắng là số nguyên
tax-enabled: true
tax-rate: 0.1                    # thuế 10%
dynamic-tax-enabled: false       # bật thuế theo bậc
```

Mỗi loại tiền còn có `tax-rate-config` (các bậc thuế), `restrictions` (giới hạn thế giới và quyền), `messages` (ghi đè tin nhắn) và `event-commands` (lệnh console khi có sự kiện game). Trong `coinsengine.yml` và `customplaceholder.yml`, tất cả thiết lập này nằm dưới từng ID tiền tệ.

Xem [File tiền tệ](/vi/ultracoinflip/config/currencies) để biết chi tiết đầy đủ.

## Người chơi offline

Tiền cược chỉ bị trừ và tiền thưởng chỉ được cộng khi người chơi đang online. Nếu người thắng đã offline lúc game trả thưởng, hoặc việc trả thưởng bị lỗi, UltraCoinFlip sẽ giữ lại tiền thắng và tự động trả vào lần tới người đó vào server.

## Thiết lập liên quan

Các tính năng theo từng loại tiền dưới đây nằm trong `config.yml`:

- Giới hạn tổng cược theo ngày và theo tuần — [Giới hạn cược](/vi/ultracoinflip/guide/betting-limits)
- Giới hạn thắng và thua — [Giới hạn thắng & thua](/vi/ultracoinflip/guide/earnings-limits)
- Cách tính thuế — [Hệ thống thuế](/vi/ultracoinflip/guide/tax)
- `default-currency`, công tắc tổng cho thông báo và giới hạn khi chơi với bot — [config.yml](/vi/ultracoinflip/config/config-yml)
