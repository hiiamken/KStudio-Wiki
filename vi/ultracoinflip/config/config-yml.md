# config.yml

File cấu hình chính tại `plugins/UltraCoinFlip/config.yml`.

::: tip
Phần lớn thay đổi có hiệu lực sau khi chạy `/cf reload`. Riêng `command_aliases`, `database`, `performance`, `bedrock` và `bstats` cần khởi động lại server.
:::

## Cài đặt chung

```yaml
language: en              # File ngôn ngữ (en, vi, fr, nl, ru, zh_cn, zh_tw, es, de, ar, it, lt, pt, pl, tr, ko, ja)
default-currency: "auto"  # Tiền tệ dùng cho /cf create <amount> khi không ghi tiền tệ
command_aliases:          # Tên khác cho lệnh /coinflip
  - coinflip
  - cf
```

Tin nhắn được lấy từ `plugins/UltraCoinFlip/langs/messages_<language>.yml`.

`default-currency` nhận `auto` hoặc `syntax-command` của một tiền tệ, ví dụ `money`, `point` hay `coin`. Khi để `auto`, hoặc khi tiền tệ đã chọn bị tắt, plugin dùng tiền tệ đầu tiên đang bật theo thứ tự: Vault, PlayerPoints, TokenManager, BeastTokens, ExcellentEconomy / CoinsEngine, rồi đến các tiền tệ placeholder tùy chỉnh.

`command_aliases` thêm tên khác cho lệnh `/coinflip`, ví dụ `flip`. `coinflip` và `cf` luôn dùng được, kể cả khi bạn bỏ chúng khỏi danh sách. Tên chỉ được chứa chữ cái, chữ số và dấu gạch dưới.

## Cơ sở dữ liệu

```yaml
database:
  type: SQLITE                       # SQLITE hoặc MYSQL
  mysql:
    host: localhost
    port: 3306
    database: ultracoinflip          # Tự tạo nếu user MySQL có quyền
    username: root
    password: password
    ssl: false
    pool-size: 10                    # Số kết nối tối đa (10 cho server nhỏ, 20-30 cho server lớn)
    connection-timeout: 10000        # ms chờ một kết nối rảnh
    idle-timeout: 600000             # ms một kết nối không dùng được giữ mở
    max-lifetime: 1800000            # ms trước khi một kết nối được thay mới
    leak-detection-threshold: 60000  # ms trước khi báo một kết nối không được trả lại (0 = tắt)
```

`SQLITE` lưu mọi thứ trong `plugins/UltraCoinFlip/ultracoinflip.db`. `MYSQL` kết nối tới một máy chủ cơ sở dữ liệu, nên dùng cho server lớn hoặc hệ thống nhiều server.

## Hành vi trò chơi

```yaml
game-behavior:
  keep-coinflip-on-disconnect: false
  refund-on-disconnect: false
  refund-on-reconnect-after-shutdown: true
  refund-restore-delay: 40               # Tick (20 tick = 1 giây)
  cancel-game-on-disconnect: false
  allow-close-during-animation: true
  force-watch-animation: false
  persist-games-across-restart: false
  default-bet: 100
  game-expiry:
    enabled: false
    after-hours: 72
    check-interval-minutes: 10
  multiple-games:
    enabled: false
    default-limit: 1                     # -1 = không giới hạn
    permission-limits:
      - permission: ultracoinflip.multigame.2
        limit: 2
      - permission: ultracoinflip.multigame.5
        limit: 5
```

| Key | Mô tả |
|---|---|
| `keep-coinflip-on-disconnect` | `true` giữ coinflip đang chờ trong danh sách khi chủ phòng offline. `false` xóa coinflip đó và hoàn tiền cho chủ phòng. |
| `refund-on-disconnect` | Thời điểm trả khoản hoàn tiền đó. `false` trả khi người chơi vào lại lần tới (khuyên dùng). `true` trả ngay, nhưng một số plugin economy không lưu được tiền cộng cho người chơi đang thoát. |
| `refund-on-reconnect-after-shutdown` | Khi server tắt, giữ mọi khoản hoàn tiền đến lúc người chơi vào lại thay vì trả ngay cho người đang online. Chỉ có tác dụng khi `refund-on-disconnect: true`. |
| `refund-restore-delay` | Thời gian chờ sau khi người chơi vào server rồi mới trả các khoản hoàn tiền đang chờ. Tăng lên nếu tiền hoàn bị ghi đè trong lúc plugin economy tải dữ liệu người chơi. |
| `cancel-game-on-disconnect` | Người chơi thoát giữa lúc đang tung. `false` để ván tung xong và kết quả chờ họ quay lại. `true` chốt ván ngay khi họ thoát: kết quả đã được quyết định từ lúc animation bắt đầu nên vẫn được trả, chỉ ván chưa bắt đầu tung mới được hoàn tiền. |
| `allow-close-during-animation` | `true` cho phép đóng menu tung đồng xu, ván vẫn chạy nền đến khi xong. `false` chốt ván ngay khi người chơi đóng menu và trả theo kết quả đã được quyết định. |
| `force-watch-animation` | Mở lại menu tung đồng xu khi người trong ván đóng nó giữa chừng, để họ xem kết quả. Cần `allow-close-during-animation: true`. |
| `persist-games-across-restart` | Giữ các coinflip đang chờ, gồm cả chế độ riêng tư và lời mời, qua lần khởi động lại server. Tiền cược của chủ phòng vẫn nằm trong game thay vì được hoàn lại. |
| `default-bet` | Số tiền mặc định khi mở menu tạo coinflip. `-1` bắt đầu từ `min-bid` của tiền tệ. Số tiền luôn nằm trong khoảng `min-bid` đến `max-bid` của tiền tệ. |
| `game-expiry` | Hủy các coinflip đang chờ không ai vào sau `after-hours` giờ và hoàn tiền cho chủ phòng (khi họ vào lại nếu đang offline). `check-interval-minutes` là tần suất kiểm tra; đổi giá trị này cần khởi động lại. |
| `multiple-games` | Cho phép một người chơi mở nhiều coinflip cùng lúc. Khi tắt, mỗi người chỉ mở được một. Người chơi nhận `default-limit`, hoặc giới hạn cao nhất trong `permission-limits` mà họ có quyền; `-1` là không giới hạn. |

Xem [Hết hạn coinflip](/vi/ultracoinflip/guide/expiry) để biết thêm về hết hạn và giữ game qua khởi động lại.

## Chọn Heads hoặc Tails

```yaml
heads-tails:
  enabled: false   # Người chơi chọn heads hoặc tails trước khi tạo coinflip
```

## Nhập số tiền

```yaml
input:
  method: CHAT     # CHAT hoặc ANVIL: cách người chơi nhập số tiền cược tùy chỉnh
```

`ANVIL` tự chuyển về nhập qua chat trên server không hỗ trợ ô nhập anvil. Khi bật menu dialog, thanh trượt `amount-input` được dùng thay thế.

## Menu Dialog & Bedrock

```yaml
dialog:
  enabled: false            # Màn hình dialog gốc trên server nền Paper 1.21.7+
  create-side: true         # Chọn heads hoặc tails (cần heads-tails.enabled)
  amount-input: true        # Thanh trượt chọn số tiền cược
  join-confirm: true        # Xác nhận trước khi vào coinflip của người khác
  house-confirm: true       # Xác nhận trước khi chơi với bot (cần heads-tails.enabled)
  currency-select: true     # Chọn tiền tệ từ danh sách
  amount:
    fallback-max: 1000000   # Giá trị tối đa của thanh trượt cho tiền tệ không có max-bid

bedrock:
  enabled: true             # Form Bedrock cho người chơi vào qua Geyser/Floodgate
```

Server không hiển thị được dialog sẽ giữ menu rương và anvil cổ điển. Form Bedrock cần cài Floodgate trên server. Xem [Menu](/vi/ultracoinflip/guide/menus).

## Thông báo

```yaml
titles:
  enabled: true           # Hiện title trên màn hình khi ván kết thúc
actionbar:
  enabled: false          # Tin nhắn action bar khi ván kết thúc
bossbar:
  enabled: false          # Boss bar khi ván kết thúc
  color: GREEN            # Thanh của người thắng: BLUE, GREEN, PINK, PURPLE, RED, WHITE, YELLOW
  color-lose: RED         # Thanh của người thua
  overlay: PROGRESS       # Kiểu thanh người thắng: PROGRESS, NOTCHED_6, NOTCHED_10, NOTCHED_12, NOTCHED_20
  overlay-lose: PROGRESS  # Kiểu thanh người thua
  progress: 1.0           # Độ đầy thanh người thắng, từ 0.0 (rỗng) đến 1.0 (đầy)
  progress-lose: 0.0      # Độ đầy thanh người thua
  duration: 5             # Số giây hiển thị (0 = không tự ẩn)
```

Nội dung của từng loại nằm trong file ngôn ngữ, ở mục `titles`, `actionbar` và `bossbar`.

## Phát sóng

```yaml
broadcast:
  enabled: true    # Công tắc tổng cho mọi thông báo coinflip toàn server
```

Khi đặt `false`, không có gì được thông báo ra server (game mới, kết quả và ván với bot), bất kể `broadcast-enabled` trong các file tiền tệ hay `house.broadcast.enabled` bên dưới đặt thế nào.

## Định dạng số

```yaml
number-format:
  type: COMPACT                 # COMPACT (15k, 3.5M), COMMAS (3,500,000) hoặc FULL (3500000)
  compact:
    k-threshold: 10000          # Từ mức này dùng "k"; số nhỏ hơn dùng dấu phẩy
    m-threshold: 1.0            # Tính theo triệu: 1.0 = 1,000,000
    b-threshold: 1000.0         # Tính theo triệu: 1000.0 = 1,000,000,000
    t-threshold: 1000000.0      # Tính theo triệu: 1000000.0 = 1,000,000,000,000
  remove-trailing-zeros: true   # Hiện 1000 thay vì 1000.00
  per-currency: {}              # Ghi đè theo ID tiền tệ, ví dụ gems: COMMAS
```

`per-currency` chỉ áp dụng cho tiền tệ có ID, tức ExcellentEconomy / CoinsEngine và các tiền tệ placeholder tùy chỉnh. Vault, PlayerPoints, TokenManager và BeastTokens luôn theo `type`.

## Bot (House)

```yaml
house:
  enabled: true                 # Bật/tắt tính năng Chơi với Bot
  name: "YourServer"            # Tên bot trong tin nhắn và lịch sử
  subcommand: "bot"             # Từ dùng trong /cf create <currency> <amount> bot
  display:                      # Cách bot hiển thị trong menu
    material: "PLAYER_HEAD"     # 1.8-1.12 dùng "SKULL_ITEM:3"
    display-name: "&e&l{BOT}"   # {BOT} = tên bot
    # Texture đầu dạng Base64, dùng với PLAYER_HEAD (mặc định là đầu bot)
    texture: "eyJ0ZXh0dXJlcyI6eyJTS0lOIjp7InVybCI6Imh0dHA6Ly90ZXh0dXJlcy5taW5lY3JhZnQubmV0L3RleHR1cmUvYjQ4ZDU1YjMzZWQ2ZmViNjE0ZTJjYTVkNGY1MGJiMzdmMTYxYWRhMzU4MmZjZmM2ZTQwMjg4YzZmYjA2ZjFmIn19fQ=="
  limits:
    max-games-per-day: 50       # Số ván với bot mỗi người mỗi ngày (-1 = không giới hạn)
    delay-between-games: 10     # Số giây giữa các ván với bot (0 = không chờ)
  bet:
    min: "100"                  # Nhận số dạng 1k hoặc 10M
    max: "10M"                  # -1 = không giới hạn riêng cho bot (max-bid của tiền tệ vẫn áp dụng)
  tax:
    enabled: true               # false = ván với bot không bao giờ bị tính thuế
  history:
    enabled: true               # Lưu ván với bot vào /cf history
  notifications:
    enabled: true               # Gửi kết quả ván với bot lên Discord webhook
  broadcast:
    enabled: false              # Thông báo thắng/thua với bot ra toàn server
    min-amount: 100             # Chỉ khi tiền cược từ mức này trở lên
```

Với `tax.enabled: true`, ván với bot bị tính thuế như mọi ván khác của tiền tệ đó. `min-bid` và `max-bid` của tiền tệ cũng áp dụng cùng với `bet`. Xem [Chơi với Bot](/vi/ultracoinflip/guide/bot-game) và [Hệ thống thuế](/vi/ultracoinflip/guide/tax).

## Bảng xếp hạng

```yaml
leaderboard:
  filters:                         # Các loại bảng xếp hạng người chơi có thể chuyển qua lại
    wins: true
    profit: true
    largest-win: true
    worst-profit: true
    winstreak: true
  not-ranked-text: 'N/A'           # Hiện khi người chơi chưa có hạng hoặc vị trí top còn trống
  gui-cache-seconds: 180           # Thời gian /cf leaderboard giữ dữ liệu trước khi tải lại
  placeholder-cache-seconds: 600   # Thời gian lưu cache kết quả %coinflip_top_*% và %coinflip_position_*%
  refresh-countdown-format:        # Định dạng của %coinflip_leaderboard_refresh_in%
    hours: '<h>h<m>m'              # Dùng khi còn từ 1 giờ trở lên
    minutes: '<m>m<s>s'            # Dùng khi còn dưới 1 giờ
    seconds: '<s>s'                # Dùng khi còn dưới 1 phút
```

Giữ ít nhất một bộ lọc được bật. Scoreboard và tab list đọc placeholder rất nhiều lần mỗi giây, nên hãy để `placeholder-cache-seconds` ở mức cao. Xem [PlaceholderAPI](/vi/ultracoinflip/guide/placeholderapi).

## Hiển thị thống kê

```yaml
stats:
  display-mode: "GUI"   # GUI hoặc CHAT: cách /cf stats hiển thị thống kê người chơi
```

## Giới hạn cược

```yaml
betting-limits:
  enabled: false
  currencies:
    money:                    # Vault
      daily-limit: 100000     # Tổng cược tối đa mỗi ngày (-1 = không giới hạn)
      weekly-limit: 500000    # Tổng cược tối đa mỗi tuần (-1 = không giới hạn)
    playerpoints:
      daily-limit: 50000
      weekly-limit: 200000
    tokenmanager:
      daily-limit: 10000
      weekly-limit: 50000
    beasttokens:
      daily-limit: 10000
      weekly-limit: 50000
    # coinsengine:            # ExcellentEconomy / CoinsEngine, mỗi ID tiền tệ một mục
    #   gems:
    #     daily-limit: 1000
    #     weekly-limit: 5000
    # placeholder:            # Tiền tệ placeholder tùy chỉnh, mỗi ID tiền tệ một mục
    #   orbs:
    #     daily-limit: 500
    #     weekly-limit: 2000
```

Tổng theo ngày được đặt lại lúc nửa đêm, tổng theo tuần vào thứ Hai (theo giờ server). Tiền tệ không có mục ở đây thì không bị giới hạn, và người chơi có quyền `ultracoinflip.bypass.bettinglimit` bỏ qua mọi giới hạn. Xem [Giới hạn cược](/vi/ultracoinflip/guide/betting-limits).

## Giới hạn thắng & thua

Giới hạn cược khống chế số tiền người chơi đặt cược. Giới hạn thắng & thua khống chế tổng số tiền họ thắng hoặc thua trong một khoảng thời gian.

```yaml
earnings-limit:
  enabled: false
  period: calendar-daily        # calendar-daily, calendar-weekly, calendar-monthly, rolling-24h hoặc rolling-7d
  reset-timezone: ""            # Để trống = múi giờ server, ví dụ "UTC" hoặc "Asia/Ho_Chi_Minh"
  threshold-warnings:
    enabled: false              # Cảnh báo khi người chơi sắp chạm mức giới hạn
    percentages: [50, 75, 90]
    sound: BLOCK_NOTE_BLOCK_BELL
  auto-tune:
    multiplier: 3.0             # /cf limit auto-tune gợi ý hạn mức bằng một ngày điển hình nhân với số này
  per-currency:
    vault:                      # vault, playerpoints, tokenmanager, beasttokens hoặc một ID tiền tệ
      max-win:                  # Ngoài ra còn có: max-loss, max-net-profit, max-volume
        enabled: false
        default: 1000000
        groups:                 # Quyền: mức giới hạn (dùng mức cao nhất người chơi đạt được)
          ultracoinflip.limit.vip: 5000000
          ultracoinflip.limit.mvp: 10000000
```

::: warning
Ở đây Vault có tên là `vault`, còn trong `betting-limits` là `money`. Khối `money` ở đây cũng dùng được cho Vault: loại giới hạn nào được bật trong đó sẽ áp dụng, trừ khi khối `vault` đã bật cùng loại.
:::

Xem [Giới hạn thắng & thua](/vi/ultracoinflip/guide/earnings-limits) để biết mọi loại giới hạn.

## Lời mời & Coinflip riêng tư

```yaml
invite:
  enabled: true           # /cf invite, uninvite, accept, deny và private, cùng nút Private trong menu tạo coinflip
  cooldown-seconds: 3     # Số giây giữa các lần dùng /cf invite của mỗi người (0 = không cooldown)
```

Với `enabled: false`, mọi coinflip đều công khai. Xem [Coinflip Riêng Tư & Mời](/vi/ultracoinflip/guide/private-and-invites).

## Discord Webhook

```yaml
discord:
  webhook:
    enabled: false
    url: "https://discord.com/api/webhooks/YOUR_WEBHOOK_ID/YOUR_WEBHOOK_TOKEN"
    username: "UltraCoinFlip"     # Để trống = tên mặc định của Discord
    avatar: ""                    # Link ảnh, để trống = avatar mặc định của Discord
    min-amount: 0                 # Chỉ đăng coinflip có tiền cược từ mức này trở lên
  message:                        # Bài đăng kết quả
    content: ""                   # Văn bản thường gửi kèm embed
    embed:
      enabled: true
      title: "Coin Flip Result"
      description: ""
      color:                      # Màu embed dạng RGB
        r: 255
        g: 165
        b: 0
      thumbnail: ""
      fields:
        - name: "Winner"
          value: "**%winner%**"
          inline: true
        # Loser, Bet Amount và Winnings có cùng dạng
      footer:
        text: "UltraCoinFlip"
        icon: ""
      timestamp: true
  game-created:
    enabled: false                # Đăng thêm coinflip mới tạo (cần webhook.enabled)
    message:
      content: ""
      embed:                      # Tùy chọn giống embed kết quả, tiêu đề "New Coin Flip Created"
        enabled: true
```

Bài kết quả dùng được `%winner%`, `%loser%`, `%amount%`, `%taxed_amount%`, `%currency%` và `%symbol%`. Bài game mới dùng được `%player%`, `%amount%`, `%currency%` và `%symbol%`. Cả hai đều hỗ trợ placeholder của PlaceholderAPI. Gửi bài thử bằng `/cf webhook test`. Xem [Discord Webhook](/vi/ultracoinflip/guide/discord).

## Phát hiện khai thác

```yaml
exploit-detection:
  enabled: true
  console-logging: true                    # Cảnh báo trong console (có giới hạn tần suất)
  file-logging: true                       # Ghi vào plugins/UltraCoinFlip/exploit-detection.log
  admin-notify: true                       # Báo trong game khi có hành vi nghiêm trọng hoặc lặp lại
  admin-permission: 'ultracoinflip.admin'  # Quyền nhận cảnh báo
```

Xem [Bảo mật & Chống gian lận](/vi/ultracoinflip/guide/security).

## Ghi log giao dịch

```yaml
transaction-logging:
  console: false   # In thêm các giao dịch hoàn tiền ra console
```

Mọi khoản hoàn tiền luôn được ghi vào `plugins/UltraCoinFlip/transactions.log`; cài đặt này chỉ bật thêm việc in ra console.

## Kiểm tra cập nhật

```yaml
update-checker:
  enabled: true                            # Kiểm tra phiên bản mới khi khởi động
  notify-console: true                     # Hiện thông báo cập nhật trong console
  notify-in-game: true                     # Báo cho staff trong game khi họ vào server
  notify-permission: 'ultracoinflip.admin' # Quyền xem thông báo trong game (OP luôn thấy)
```

## bStats

```yaml
bstats:
  enabled: true    # Gửi thống kê sử dụng ẩn danh
```

## Hiệu suất

```yaml
performance:
  batch-stats-save:
    enabled: true  # Gộp các lần ghi thống kê vào database (mỗi 5 giây hoặc khi đủ 10 lượt lưu)
```

## Debug

```yaml
debug:
  enabled: false
  level: INFO                  # VERBOSE, INFO, WARNING hoặc ERROR
  stack-trace: false           # Kèm stack trace khi có lỗi
  file-logging: false          # Lưu log vào plugins/UltraCoinFlip/debug-logs/
  performance-tracking: false  # Đo thời gian xử lý các thao tác
  categories:                  # Bật/tắt riêng từng nhóm
    general: true
    config: true
    database: true
    currency: true
    game: true
    gui: true
    discord: true
    command: true
    performance: true
    event: true
    refund: true
```

## Phiên bản config

::: warning
Đừng sửa `config-version` ở cuối file. Plugin dùng số này để tự thêm cài đặt mới vào `config.yml` sau khi cập nhật mà vẫn giữ các giá trị bạn đã đặt.
:::
