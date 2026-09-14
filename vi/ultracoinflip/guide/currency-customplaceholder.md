# Custom PlaceholderAPI Currencies

UltraCoinFlip hỗ trợ **không giới hạn tiền tệ tùy chỉnh** sử dụng PlaceholderAPI. Bất kỳ plugin nào cung cấp placeholder số dư dạng số đều có thể dùng làm tiền tệ coinflip.

## Yêu cầu

- [PlaceholderAPI](https://www.spigotmc.org/resources/placeholderapi.6245/) được cài trên server
- Một plugin cung cấp placeholder **trả về số** (ví dụ: `%plugin_balance%` → `1500`)
- Plugin đó có lệnh console để cộng tiền và trừ tiền (hoặc đặt số dư)

## Cách hoạt động

Tiền tệ tùy chỉnh sử dụng:
- **PlaceholderAPI placeholder** để đọc số dư người chơi
- **Lệnh console** để thêm và trừ tiền tệ

Trong lệnh, `{player}` được thay bằng tên người chơi và `{amount}` bằng số tiền. `{amount}` luôn dùng dấu chấm cho phần thập phân, tối đa 2 chữ số thập phân và bỏ số 0 thừa ở cuối (`500`, `28.5`), kể cả khi máy chủ đặt dấu phẩy làm dấu thập phân.

## File cấu hình: `customplaceholder.yml`

Bạn có thể định nghĩa bao nhiêu loại tiền tùy thích. Mỗi loại tiền có ID riêng:

```yaml
currencies:
  orbs:
    enabled: true
    placeholder: '%yourplugin_orbs%'        # PHẢI trả về số
    unit: 'Orbs'
    display-name: 'Orbs'
    give-command: 'orbs give {player} {amount} -s'
    # Chọn MỘT: remove-command HOẶC set-command (để trống cái còn lại)
    remove-command: 'orbs remove {player} {amount} -s'
    set-command: ''                          # dùng cho plugin không có lệnh trừ tiền
    syntax-command: 'orb'                   # dùng trong /cf create orb 500
    broadcast-enabled: true
    min-broadcast-amount: 100
    min-bid: 1
    max-bid: -1
    min-reserve-balance: 0
    round-to-integer: false
    tax-enabled: true
    tax-rate: 0.1
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
    restrictions:
      enabled: false
      allowed-worlds: []
      blocked-worlds: []
      required-permissions: []
    messages:
      # winner: '&fYou won against &a<loser>&f! &8(&a+<amount><symbol>&8)'
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

File mặc định có sẵn hai tiền tệ mẫu là `orbs` và `gems`, cả hai đều `enabled: false`. Chỉnh xong thì chạy `/cf reload`. `messages` cho phép ghi đè tin nhắn thắng, thua và thông báo chỉ cho loại tiền này — xem [File tiền tệ](/vi/ultracoinflip/config/currencies).

::: warning
Tiền tệ sẽ bị bỏ qua (kèm lỗi trong console) nếu `placeholder` hoặc `give-command` để trống, hoặc cả `remove-command` lẫn `set-command` đều trống. Lệnh thiếu `{player}` hoặc `{amount}` vẫn được tải nhưng console sẽ cảnh báo. ID tiền tệ không được chứa dấu cách, dấu hai chấm hay dấu chấm.
:::

## Cách trừ tiền

Có hai cách để trừ tiền của người chơi. Dùng **một** cách và để trống cách còn lại:

| Tùy chọn | Khi nào dùng |
|---|---|
| `remove-command` | Plugin có lệnh trừ/lấy tiền (đa số plugin) |
| `set-command` | Plugin chỉ có lệnh đặt số dư (ví dụ DeluxeMobCoins) |

Khi dùng `set-command`, UltraCoinFlip đọc số dư hiện tại, trừ đi tiền cược rồi tự đặt số dư mới. Nếu điền cả hai, `remove-command` sẽ được dùng.

Trước khi trừ tiền cược, UltraCoinFlip đọc placeholder số dư và từ chối cược nếu người chơi không đủ tiền. Tiền thắng luôn được trả bằng `give-command`.

## Cách đọc số dư

Placeholder nên trả về một số thuần, nhưng UltraCoinFlip vẫn xử lý được các định dạng phổ biến:

- Mã màu, dấu cách và dấu phẩy được bỏ qua, nên `1,234,567.89` được đọc là `1234567.89`.
- Dấu phẩy luôn được coi là dấu phân cách hàng nghìn — `28,5` được đọc là `285`. Phần thập phân phải dùng dấu chấm.
- Số lớn dạng `1.2345678E7` được đọc đúng.
- Các ký tự khác bị loại bỏ, nên `$1500` vẫn đọc được — nhưng số viết tắt thì không: `1.5k` được đọc là `1.5`. Hãy dùng placeholder trả về số đầy đủ.
- Nếu không có số nào, console sẽ cảnh báo và số dư được tính là `0`. Số dư âm cũng được tính là `0`.

## Khi lệnh bị lỗi

- Nếu lệnh không tồn tại, console sẽ cảnh báo. Khi trừ tiền cược, game sẽ không được tạo hoặc tham gia và người chơi nhận thông báo lỗi. Khi trả thưởng, tiền thắng được giữ lại và tự động trả vào lần tới người chơi vào server.
- UltraCoinFlip chỉ phát hiện được lệnh không tồn tại. Nếu lệnh chạy nhưng plugin tiền tệ từ chối (ví dụ vì sai tham số), UltraCoinFlip không biết được — hãy thử lệnh cộng và trừ tiền trong console trước.

::: warning Folia
Trên server Folia, lệnh được chạy trễ một chút nên UltraCoinFlip hoàn toàn không phát hiện được lệnh lỗi. Hãy kiểm tra lệnh thật kỹ trước khi bật tiền tệ.
:::

## Thêm nhiều loại tiền

Thêm mục mới dưới `currencies:`:

```yaml
currencies:
  orbs:
    enabled: true
    placeholder: '%yourplugin_orbs%'
    # ... (cấu hình đầy đủ)
  gems:
    enabled: true
    placeholder: '%yourplugin_gems%'
    # ... (cấu hình đầy đủ)
  shards:
    enabled: true
    placeholder: '%yourplugin_shards%'
    round-to-integer: true    # hữu ích cho tiền tệ chỉ nhận số nguyên
    # ... (cấu hình đầy đủ)
```

Các tiền tệ bạn thêm ở đây được giữ lại khi UltraCoinFlip cập nhật. Nếu một mục thiếu `min-reserve-balance` hoặc `round-to-integer`, thiết lập đó sẽ được thêm với giá trị mặc định.

## Giới hạn sử dụng

Mỗi loại tiền có thể giới hạn theo thế giới hoặc quyền:

```yaml
restrictions:
  enabled: false
  allowed-worlds: []        # để trống = cho phép mọi thế giới
  blocked-worlds: []        # ưu tiên hơn allowed-worlds
  required-permissions: []  # người chơi cần có ít nhất một quyền
```

## Lệnh sự kiện

Chạy lệnh console khi các sự kiện game xảy ra. Dùng các placeholder như `%player%`, `%opponent%`, `%winnings_formatted%` và `%currency%`:

```yaml
event-commands:
  on-created:
    commands: []
  on-start:
    commands: []
  on-win:
    commands:
      - 'broadcast %player% won %winnings_formatted% %currency%!'
  on-lose:
    commands: []
  on-cancelled:
    commands: []
```

Xem [File tiền tệ](/vi/ultracoinflip/config/currencies) để có danh sách placeholder đầy đủ và cách đặt độ trễ.

## Placeholder

Tiền tệ tùy chỉnh cung cấp các PlaceholderAPI placeholder sau:

| Placeholder | Mô tả |
|---|---|
| `%coinflip_placeholder_<id>_unit%` | Đơn vị tiền tệ (ví dụ: "Orbs") |
| `%coinflip_placeholder_<id>_display%` | Tên hiển thị |
| `%coinflip_<id>_unit%` | Dạng ngắn |
| `%coinflip_<id>_display%` | Dạng ngắn |
| `%coinflip_winrate_<id>%` | Tỷ lệ thắng với loại tiền này |
| `%coinflip_winrate_<id>_formatted%` | Tỷ lệ thắng kèm ký hiệu `%` |
| `%coinflip_win_percentage_<id>%` | Phần trăm thắng (tên khác) |
| `%coinflip_win_percentage_<id>_formatted%` | Phần trăm thắng kèm ký hiệu `%` (tên khác) |

Trong GUI config, dùng: `<placeholder_<id>_unit>` hoặc `<placeholder_<id>_display>`

::: warning Thống kê không đầy đủ
Tiền tệ Custom PlaceholderAPI có theo dõi **tỷ lệ thắng** nhưng **không** theo dõi lời/lỗ. Placeholder lợi nhuận, lỗ và lợi nhuận ròng của tiền tệ tùy chỉnh sẽ trả về `0`. Chỉ tiền tệ tích hợp (money, playerpoints, tokenmanager, beasttokens) mới có thống kê lời/lỗ đầy đủ.
:::

::: tip Làm tròn số nguyên
Nếu tiền tệ tùy chỉnh chỉ hỗ trợ số nguyên (ví dụ: tokens, shards, pearls), bật `round-to-integer: true`. Tiền thắng được làm tròn về số nguyên gần nhất — thắng `1.8 shards` sẽ thành `2 shards` — và mức cược được làm tròn xuống, nên `10.5` thành `10`.
:::
