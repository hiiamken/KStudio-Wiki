# File cấu hình tiền tệ

Mỗi loại tiền có file riêng trong `plugins/UltraCoinFlip/currencies/`.

## Danh sách file

| File | Tiền tệ |
|---|---|
| `vault.yml` | Vault (EssentialsX, CMI,...) |
| `playerpoints.yml` | PlayerPoints |
| `tokenmanager.yml` | TokenManager |
| `beasttokens.yml` | BeastTokens |
| `coinsengine.yml` | ExcellentEconomy / CoinsEngine |
| `customplaceholder.yml` | Custom PlaceholderAPI |

Thay đổi có hiệu lực sau khi chạy `/cf reload` hoặc restart server.

## Cấu hình tiền tệ tiêu chuẩn

Dùng cho Vault, PlayerPoints, TokenManager và BeastTokens. Giá trị mặc định mỗi file một khác — xem trang riêng của từng loại tiền.

```yaml
enabled: true

# Hiển thị
unit: "$"
display-name: "Money"
syntax-command: "money"            # từ khóa cho /cf create <keyword> <amount>

# Thông báo
broadcast-enabled: true
min-broadcast-amount: 100          # mức cược tối thiểu để thông báo lên chat

# Giới hạn cược
min-bid: 1
max-bid: -1                        # -1 = không giới hạn
min-reserve-balance: 0             # số dư tối thiểu người chơi phải giữ lại

# Làm tròn
round-to-integer: false            # cược và tiền thắng là số nguyên

# Thuế
tax-enabled: true
tax-rate: 0.1                      # thuế cố định 10%

# Thuế theo bậc (tùy chọn)
dynamic-tax-enabled: false
tax-rate-config:
  base-tax-rate: 0.1
  tiers:
    - min-amount: 0
      max-amount: 100
      tax-rate: 0.05
    - min-amount: 100
      max-amount: 1000
      tax-rate: 0.1
    - min-amount: 1000
      max-amount: -1
      tax-rate: 0.15

# Giới hạn thế giới & quyền
restrictions:
  enabled: false
  allowed-worlds: []               # để trống = mọi thế giới
  blocked-worlds: []               # ưu tiên hơn allowed-worlds
  required-permissions: []         # người chơi cần có ít nhất một quyền

# Ghi đè tin nhắn
messages:
  # winner: '&fYou won against &a<loser>&f! &8(&a+<amount><symbol>&8)'

# Lệnh sự kiện
event-commands:
  on-created:
    commands: []
  on-start:
    commands: []
  on-win:
    commands: []
  on-lose:
    commands: []
  on-cancelled:
    commands: []
```

## Giải thích thiết lập

| Thiết lập | Ghi chú |
|---|---|
| `enabled` | Chỉ `vault.yml` mặc định là `true`. |
| `unit` | Hiển thị cạnh số tiền trong tin nhắn, menu và Discord webhook. |
| `display-name` | Tên loại tiền hiển thị trong menu và tin nhắn. |
| `syntax-command` | Từ khóa người chơi gõ trong `/cf create`. Dùng một từ viết thường, không có dấu cách, dấu hai chấm hay dấu chấm, và mỗi loại tiền một từ khác nhau. |
| `broadcast-enabled` / `min-broadcast-amount` | Thông báo game mới và kết quả khi mức cược đạt ít nhất số này. Cần `broadcast.enabled: true` trong `config.yml`. Game với bot dùng `house.broadcast` trong `config.yml` thay cho mục này. |
| `min-bid` / `max-bid` | Mức cược nhỏ nhất và lớn nhất. Game với bot còn phải nằm trong `house.bet` của `config.yml`. |
| `min-reserve-balance` | Số dư người chơi phải còn lại sau khi cược. Được kiểm tra khi tạo game, tham gia game và chơi với bot. |
| `round-to-integer` | Mức cược được làm tròn xuống số nguyên, tiền thắng sau thuế được làm tròn về số nguyên gần nhất. PlayerPoints và TokenManager luôn làm vậy, bất kể thiết lập này. |
| `tax-enabled` / `tax-rate` / `dynamic-tax-enabled` / `tax-rate-config` | Xem [Hệ thống thuế](/vi/ultracoinflip/guide/tax). |

::: warning Cách viết số tiền
`min-broadcast-amount`, `min-bid`, `max-bid`, `min-reserve-balance` và `min-amount` / `max-amount` của các bậc thuế nhận số thường hoặc số viết tắt như `10k` hay `1.5M`. Giá trị không đọc được, ví dụ `10,000`, sẽ bị bỏ qua và dùng giá trị mặc định — với `max-bid` nghĩa là không giới hạn.
:::

## ExcellentEconomy / CoinsEngine (`coinsengine.yml`)

File này dùng mục `currencies:`, trong đó mỗi khóa là một ID tiền tệ của ExcellentEconomy:

```yaml
currencies:
  coins:
    enabled: true
    unit: "Coins"
    display-name: "Coins"
    syntax-command: "coin"
    min-bid: 1
    max-bid: -1
    round-to-integer: false
    tax-enabled: true
    tax-rate: 0.1
    # ... cùng tùy chọn như tiền tệ tiêu chuẩn
```

Khóa (`coins`, `gems`) phải khớp chính xác với ID tiền tệ trong ExcellentEconomy. Xem [ExcellentEconomy / CoinsEngine](/vi/ultracoinflip/guide/currency-excellenteconomy).

## Custom PlaceholderAPI (`customplaceholder.yml`)

Xem [Custom PlaceholderAPI Currencies](/vi/ultracoinflip/guide/currency-customplaceholder) để biết chi tiết.

```yaml
currencies:
  orbs:
    enabled: true
    placeholder: '%yourplugin_orbs%'    # phải trả về số
    unit: 'Orbs'
    display-name: 'Orbs'
    give-command: 'orbs give {player} {amount}'
    remove-command: 'orbs remove {player} {amount}'
    set-command: ''                     # dùng thay remove-command nếu cần
    syntax-command: 'orb'
    round-to-integer: false
    # ... cùng tùy chọn như tiền tệ tiêu chuẩn
```

## Giới hạn sử dụng

Giới hạn loại tiền được dùng ở đâu và bởi ai:

```yaml
restrictions:
  enabled: true
  allowed-worlds: [world, world_nether]   # để trống = mọi thế giới
  blocked-worlds: [lobby]                 # ưu tiên hơn allowed-worlds
  required-permissions: [ultracoinflip.vip]   # cần có ít nhất một quyền
```

- Thế giới nằm trong cả hai danh sách sẽ bị chặn, và console sẽ cảnh báo bạn.
- Cả hai người chơi đều phải thỏa giới hạn. Game mà người chơi không tham gia được sẽ bị ẩn khỏi danh sách game của họ, và menu tạo game chỉ hiện những loại tiền họ được dùng.
- Một quyền có thể dùng chung cho nhiều loại tiền.

## Ghi đè tin nhắn

Mỗi loại tiền có thể thay tin nhắn kết quả game trong file ngôn ngữ, chỉ áp dụng cho loại tiền đó. Bỏ dấu `#` trước một khóa trong `messages:` rồi chỉnh sửa — khóa nào bạn không đặt sẽ vẫn dùng file ngôn ngữ.

| Khóa | Gửi khi | Placeholder |
|---|---|---|
| `winner` | Gửi người thắng trong game giữa người chơi | `<loser>`, `<amount>` (tiền thắng sau thuế), `<symbol>`, `<tax>`, `<tax_rate>` |
| `loser` | Gửi người thua trong game giữa người chơi | `<winner>`, `<amount>`, `<symbol>` |
| `broadcast-result` | Gửi toàn server khi game giữa người chơi kết thúc | `<winner>`, `<loser>`, `<amount>`, `<taxed_amount>`, `<symbol>` |
| `house-win` | Gửi người chơi thắng bot | `<amount>` (tiền thắng sau thuế), `<symbol>`, `<tax>` |
| `house-lose` | Gửi người chơi thua bot | `<amount>`, `<symbol>` |
| `house-broadcast-win` | Gửi toàn server khi người chơi thắng bot | `<player>`, `<amount>`, `<taxed_amount>`, `<symbol>` |
| `house-broadcast-lose` | Gửi toàn server khi người chơi thua bot | `<player>`, `<amount>`, `<taxed_amount>`, `<symbol>` |

`<symbol>` hiển thị `unit` của loại tiền. **Ví dụ** — ẩn phần thuế chỉ cho loại tiền này:

```yaml
messages:
  winner: '&fYou won against &a<loser>&f! &8(&a+<amount><symbol>&8)'
```

## Lệnh sự kiện

Chạy lệnh console tự động khi các sự kiện game xảy ra.

| Sự kiện | Chạy khi |
|---|---|
| `on-created` | Người chơi tạo game |
| `on-start` | Hoạt ảnh tung xu bắt đầu — chạy riêng cho từng người chơi |
| `on-win` | Người chơi thắng (`%player%` là người thắng) |
| `on-lose` | Người chơi thua (`%player%` là người thua) |
| `on-cancelled` | Người chơi hủy game đang chờ và được hoàn tiền cược, hoặc game đang chờ hết hạn khi chủ phòng đang online |

`on-start`, `on-win` và `on-lose` cũng chạy trong game với bot. Placeholder có sẵn:

| Placeholder | Mô tả |
|---|---|
| `%player%` | Người chơi mà lệnh đang chạy cho |
| `%opponent%` | Người chơi còn lại (trống trong game với bot, `on-created` và `on-cancelled`) |
| `%winner%` / `%loser%` | Người thắng / người thua (chỉ trong `on-win` và `on-lose`) |
| `%creator%` / `%challenger%` | Người tạo / người tham gia game |
| `%player_uuid%`, `%opponent_uuid%`, `%winner_uuid%`, `%loser_uuid%`, `%creator_uuid%`, `%challenger_uuid%` | UUID của các người chơi ở trên |
| `%amount_bet%` | Số tiền cược của mỗi người |
| `%total_pool%` | Tổng pot (tiền cược × 2) |
| `%winnings%` | Số tiền người thắng nhận sau thuế (chỉ trong `on-win` và `on-lose`) |
| `%tax%` / `%tax_percent%` | Tiền thuế / tỷ lệ thuế dạng số, ví dụ `10` (chỉ trong `on-win` và `on-lose`) |
| `%losses%` | Số tiền người thua bị mất |
| `%amount_bet_formatted%`, `%total_pool_formatted%`, `%winnings_formatted%`, `%tax_formatted%`, `%losses_formatted%` | Các số tiền trên, định dạng giống trong menu |
| `%currency%` / `%currency_id%` | Tên hiển thị / ID của loại tiền |
| `%game_id%` | ID game (chỉ trong `on-created` và `on-cancelled`) |
| `%head_type%` | Heads hoặc Tails (chỉ trong `on-created`, khi người chơi đã chọn mặt) |

Placeholder của PlaceholderAPI cũng dùng được và được tính theo `%player%`.

**Ví dụ:**
```yaml
event-commands:
  on-win:
    delay: 20                          # chờ 1 giây trước khi chạy các lệnh của sự kiện này
    commands:
      - "broadcast &6%winner% &7vừa thắng &e%winnings_formatted% %currency%&7!"
      - "[delay:40] give %winner% diamond 1"
  on-lose:
    commands:
      - "msg %loser% Chúc bạn may mắn lần sau!"
```

- `delay` (tính bằng tick, 20 = 1 giây) áp dụng cho mọi lệnh của sự kiện đó; thêm `[delay:TICKS]` trước một lệnh để lệnh đó chờ thêm.
- Thêm `enabled: false` dưới một sự kiện để tắt riêng sự kiện đó, hoặc ngay dưới `event-commands:` để tắt tất cả.

## Cập nhật plugin

Khi UltraCoinFlip cập nhật, thiết lập mới được thêm vào file tiền tệ và giá trị của bạn được giữ nguyên.

- **`vault.yml`, `playerpoints.yml`, `tokenmanager.yml`, `beasttokens.yml`** — khóa không có trong file mặc định sẽ bị xóa khi file được tải. Mọi thứ bạn thêm dưới `messages:` và `event-commands:` luôn được giữ lại.
- **`coinsengine.yml`, `customplaceholder.yml`** — mọi thứ dưới `currencies:` được giữ nguyên như bạn viết, nên các ID tiền tệ bạn tự thêm sẽ không mất. Thiết lập cơ bản bị thiếu sẽ được bổ sung giá trị mặc định (ví dụ `min-bid` hay `tax-rate` với tiền tệ ExcellentEconomy, `min-reserve-balance` và `round-to-integer` với tiền tệ tùy chỉnh).
