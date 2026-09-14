# PlaceholderAPI

UltraCoinFlip cung cấp **60+ placeholder** để dùng trong scoreboard, hologram, plugin chat và bất kỳ nơi nào PlaceholderAPI được hỗ trợ.

::: tip
Cài [PlaceholderAPI](https://www.spigotmc.org/resources/placeholderapi.6245/) và UltraCoinFlip sẽ tự đăng ký expansion khi khởi động.
:::

## Thống kê cơ bản

| Placeholder | Tên khác | Mô tả |
|---|---|---|
| `%coinflip_wins%` | — | Tổng số trận thắng |
| `%coinflip_losses%` | `%coinflip_defeats%` | Tổng số trận thua |
| `%coinflip_total_games%` | `%coinflip_games%` | Tổng số trận đã chơi |
| `%coinflip_winstreak%` | — | Chuỗi thắng hiện tại |

Các thống kê này, cùng với placeholder tỷ lệ thắng và lợi nhuận bên dưới, đều tính cả các trận chơi với bot.

## Tỷ lệ thắng

| Placeholder | Mô tả |
|---|---|
| `%coinflip_winrate%` | Tỷ lệ thắng tổng (chỉ số, vd `66.67`) |
| `%coinflip_winrate_formatted%` | Tỷ lệ thắng với ký hiệu `%` |
| `%coinflip_winrate_<currency>%` | Tỷ lệ thắng theo loại tiền |
| `%coinflip_winrate_<currency>_formatted%` | Tỷ lệ thắng theo loại tiền có `%` |

**Loại tiền hỗ trợ:** `money`, `playerpoints`, `tokenmanager`, `beasttokens` và ID của tiền tệ Custom PlaceholderAPI. Tiền tệ CoinsEngine / ExcellentEconomy không có placeholder tỷ lệ thắng.

Có thể dùng `win_percentage` thay cho `winrate` trong tất cả các placeholder trên, ví dụ `%coinflip_win_percentage_money_formatted%`.

## Theo dõi lợi nhuận

Thay `<currency>` bằng ID tiền tệ. Có thể dùng viết tắt.

| Placeholder | Viết tắt | Mô tả |
|---|---|---|
| `%coinflip_profit_money%` | `%coinflip_profit_m%` | Tổng tiền thắng (sau thuế) |
| `%coinflip_loss_money%` | `%coinflip_loss_m%` | Tổng tiền thua |
| `%coinflip_net_profit_money%` | `%coinflip_net_m%` | Lợi nhuận ròng (thắng - thua) |
| `%coinflip_profit_money_formatted%` | `%coinflip_profit_m_formatted%` | Lợi nhuận được định dạng |
| `%coinflip_loss_money_formatted%` | `%coinflip_loss_m_formatted%` | Tiền thua được định dạng |
| `%coinflip_net_profit_money_formatted%` | `%coinflip_net_m_formatted%` | Lợi nhuận ròng được định dạng |

Tương tự cho `playerpoints` (viết tắt `pp`), `tokenmanager` (`tm`), `beasttokens` (`bt`).

Giá trị thường là số thô, tối đa hai chữ số thập phân (vd `1500000`). Giá trị `_formatted` theo `number-format.type` trong [config.yml](/vi/ultracoinflip/config/config-yml): mặc định là dạng rút gọn (`9,500`, `25k`, `1.5M`), hoặc `COMMAS` (`1,500,000`) và `FULL` (`1500000`).

## Thống kê tổng hợp

| Placeholder | Mô tả |
|---|---|
| `%coinflip_total_profit%` | Tổng lợi nhuận của tất cả loại tiền được theo dõi |
| `%coinflip_total_loss%` | Tổng thua của tất cả loại tiền được theo dõi |
| `%coinflip_total_net%` | Lợi nhuận ròng tổng hợp của tất cả loại tiền được theo dõi |

Các placeholder này cộng dồn số thô của money, PlayerPoints, TokenManager và BeastTokens. Tiền tệ CoinsEngine và tiền tệ tùy chỉnh không được tính.

## Xếp hạng người chơi

Lấy thứ hạng của người chơi theo bất kỳ bộ lọc bảng xếp hạng nào:

| Placeholder | Mô tả |
|---|---|
| `%coinflip_position%` | Thứ hạng theo số thắng |
| `%coinflip_position_wins%` | Thứ hạng theo số thắng |
| `%coinflip_position_winstreak%` | Thứ hạng theo chuỗi thắng |
| `%coinflip_position_losses%` | Thứ hạng theo số thua |
| `%coinflip_position_profit_<currency>%` | Thứ hạng theo lợi nhuận |
| `%coinflip_position_largest-win_<currency>%` | Thứ hạng theo trận thắng lớn nhất |
| `%coinflip_position_worst-profit_<currency>%` | Thứ hạng theo trận thua lớn nhất |

Trả về số thứ hạng (bắt đầu từ 1) hoặc chữ "chưa xếp hạng" đã cấu hình (mặc định: `N/A`). Người chơi chưa có mặt trên bảng đó (ví dụ chưa thắng trận nào) cũng nhận chữ "chưa xếp hạng".

`<currency>` nhận các giá trị giống placeholder [bảng xếp hạng](#bang-xep-hang). Bỏ `_<currency>` ở `profit`, `largest-win` và `worst-profit` để xếp hạng theo money, ví dụ `%coinflip_position_profit%`.

Có thể thêm mốc thời gian, ví dụ `%coinflip_position_wins_monthly%` để lấy thứ hạng thắng trong tháng này. Xem [Theo mốc thời gian](#theo-moc-thoi-gian) bên dưới.

## Bảng xếp hạng

Dùng các placeholder này để hiển thị danh sách top người chơi.

```
%coinflip_top_<rank>_<filter>_<type>%
%coinflip_top_<rank>_<filter>_<currency>_<type>%
%coinflip_top_<rank>_<filter>_<period>_<currency>_<type>%
```

- `<rank>` — Vị trí, bắt đầu từ 1 (mỗi bảng chứa tối đa 10.000 người chơi)
- `<filter>` — `wins`, `profit`, `largest-win`, `worst-profit`, `winstreak`, hoặc `losses`
- `<period>` — Tùy chọn: `daily`, `weekly`, `monthly`, `yearly`. Bỏ trống = toàn thời gian. Đặt ngay sau filter.
- `<currency>` — Bắt buộc cho profit/largest-win/worst-profit: `money`, `playerpoints`, `tokenmanager`, `beasttokens`, hoặc ID tiền tệ CoinsEngine / tùy chỉnh (cũng có thể viết `coinsengine_<id>` hoặc `placeholder_<id>`)
- `<type>` — `name`, `value`, hoặc `value_formatted`

| Filter | Xếp hạng theo | Loại tiền |
|---|---|---|
| `wins` | Nhiều trận thắng nhất | Không cần (mọi loại tiền) |
| `losses` | Nhiều trận thua nhất | Không cần (mọi loại tiền) |
| `winstreak` | Chuỗi thắng hiện tại cao nhất | Không cần |
| `profit` | Lợi nhuận ròng cao nhất | Bắt buộc |
| `largest-win` | Trận thắng lớn nhất | Bắt buộc |
| `worst-profit` | Trận thua lớn nhất | Bắt buộc |

Viết `largest_win` và `worst_profit` (dùng dấu gạch dưới) cũng được, cho cả placeholder bảng xếp hạng lẫn xếp hạng người chơi.

Trên bảng toàn thời gian, trận chơi với bot được tính vào `wins`, `losses`, `winstreak` và `profit` của money, PlayerPoints, TokenManager, BeastTokens. Các bảng còn lại chỉ tính trận người đấu người.

Nếu vị trí đó còn trống, `name` hiện chữ "chưa xếp hạng" (mặc định `N/A`) và `value` hiện `0`.

**Ví dụ:**

| Placeholder | Trả về |
|---|---|
| `%coinflip_top_1_wins_name%` | Tên người chơi #1 theo số thắng |
| `%coinflip_top_1_profit_money_value%` | Lợi nhuận money của người chơi #1 |
| `%coinflip_top_3_winstreak_value%` | Chuỗi thắng của người chơi #3 |
| `%coinflip_top_5_largest-win_playerpoints_value_formatted%` | Trận thắng PlayerPoints lớn thứ 5 (đã định dạng) |
| `%coinflip_top_1_losses_name%` | Tên người chơi #1 theo tổng số thua |
| `%coinflip_top_2_profit_coins_name%` | Tên người chơi #2 theo lợi nhuận bằng tiền CoinsEngine `coins` |
| `%coinflip_top_1_worst-profit_orbs_value%` | Trận thua lớn nhất bằng tiền tùy chỉnh `orbs` |

::: tip
Placeholder bảng xếp hạng đọc ID tiền CoinsEngine hoặc tiền tùy chỉnh đến dấu gạch dưới tiếp theo, nên ID như `gold_coins` sẽ không dùng được ở đây. Hãy đặt ID không có dấu gạch dưới cho loại tiền bạn muốn đưa lên bảng xếp hạng.
:::

### Theo mốc thời gian

Thêm từ khóa mốc thời gian ngay sau filter để xếp hạng theo **ngày**, **tuần**, **tháng** hoặc **năm** thay vì toàn thời gian. Bỏ trống thì lấy bảng toàn thời gian.

| Placeholder | Trả về |
|---|---|
| `%coinflip_top_1_wins_monthly_name%` | Top thắng **trong tháng này** |
| `%coinflip_top_1_wins_monthly_value%` | Số thắng trong tháng của người đó |
| `%coinflip_top_1_wins_daily_name%` | Top thắng **hôm nay** |
| `%coinflip_top_1_profit_monthly_money_value%` | Top lợi nhuận money trong tháng |

- Tuần bắt đầu từ **thứ Hai**, tháng/năm từ ngày 1, theo giờ máy chủ.
- Bảng theo mốc chỉ tính ván **người đấu người** (không tính ván với bot).
- `winstreak` không có mốc thời gian — luôn là chuỗi thắng hiện tại.
- Có thể dùng từ khóa `alltime` hoặc `total` để chỉ rõ bảng toàn thời gian.

### Cài đặt bảng xếp hạng

Placeholder bảng xếp hạng và xếp hạng người chơi dùng chung các cài đặt này trong `config.yml`:

```yaml
leaderboard:
  # Hiện ở vị trí trống trên bảng và với người chơi chưa có hạng
  not-ranked-text: 'N/A'
  # Thời gian cache kết quả bảng xếp hạng và thứ hạng (giây)
  placeholder-cache-seconds: 600
```

Mỗi bảng (filter + loại tiền + mốc thời gian) được cache riêng và dùng chung cho mọi người chơi. Scoreboard và tab list có thể gọi các placeholder này rất nhiều lần mỗi giây, nên hãy để cache lâu: giá trị thấp cho bảng mới hơn nhưng truy vấn database nhiều hơn.

### Đếm ngược lần refresh

| Placeholder | Mô tả |
|---|---|
| `%coinflip_leaderboard_refresh_in%` | Đếm ngược tới lần cache leaderboard refresh tiếp theo (vd `2m20s`) |

Placeholder này đọc cache entry sớm hết hạn nhất và đếm ngược real-time — rất hợp để làm dòng cuối trên hologram leaderboard. Khi chưa có bảng nào được cache, nó hiện đủ thời gian cache (mặc định `10m0s`).

```yaml
# Format có thể tùy chỉnh ở config.yml mục leaderboard.refresh-countdown-format
leaderboard:
  refresh-countdown-format:
    hours: '<h>h<m>m'    # dùng khi còn 1+ giờ
    minutes: '<m>m<s>s'  # dùng khi dưới 1 giờ
    seconds: '<s>s'      # dùng khi dưới 1 phút
```

**Ví dụ hologram (DecentHolograms):**

```
&6&lTOP WINS
&71. %coinflip_top_1_wins_name% — %coinflip_top_1_wins_value%
&72. %coinflip_top_2_wins_name% — %coinflip_top_2_wins_value%
&73. %coinflip_top_3_wins_name% — %coinflip_top_3_wins_value%
&8Lần refresh tới: &e%coinflip_leaderboard_refresh_in%
```

## Giới hạn thắng/thua

Hiển thị tiến độ của người chơi so với [giới hạn thắng & thua](/vi/ultracoinflip/guide/earnings-limits).

| Placeholder | Trả về |
|---|---|
| `%coinflip_winlimit_<currency>%` | Mức trần max-win của người chơi |
| `%coinflip_winlimit_<currency>_used%` | Số đã tính vào mức trần trong chu kỳ hiện tại |
| `%coinflip_winlimit_<currency>_remaining%` | Số còn lại trước khi chạm mức trần (không bao giờ dưới `0`) |
| `%coinflip_winlimit_<currency>_percent%` | Phần trăm mức trần đã dùng, số nguyên từ `0` đến `100` |
| `%coinflip_winlimit_<currency>_reset%` | Số giây đến khi chu kỳ giới hạn được reset |

Đổi `winlimit` sang loại giới hạn khác. Các hậu tố hoạt động giống hệt:

| Tiền tố | Giới hạn trong `config.yml` |
|---|---|
| `winlimit` | `max-win` |
| `losslimit` | `max-loss` |
| `netprofitlimit` | `max-net-profit` |
| `volumelimit` | `max-volume` |

- `<currency>` là key của loại tiền trong `earnings-limit.per-currency`: `vault` cho tiền Vault (không phải `money`), `playerpoints`, `tokenmanager`, `beasttokens`, hoặc ID tiền tệ CoinsEngine / tùy chỉnh.
- Số tiền hiện dạng số thường: số tròn không có phần thập phân, số lẻ hiện hai chữ số thập phân (vd `2500.50`).
- Placeholder để trống khi `earnings-limit.enabled` là `false` hoặc giới hạn đó chưa bật cho loại tiền.
- Với chu kỳ `rolling-24h` hoặc `rolling-7d` không có thời điểm reset cố định, nên `_reset` luôn hiện `0`.

**Ví dụ scoreboard:**

```
&7Đã thắng hôm nay: &a%coinflip_winlimit_vault_used% &7/ &a%coinflip_winlimit_vault%
&7Còn được thắng: &e%coinflip_winlimit_vault_remaining%
&7Reset sau: &f%coinflip_winlimit_vault_reset%s
```

::: tip
Placeholder giới hạn đọc số liệu trực tiếp từ database mỗi lần được parse, nên tránh cập nhật chúng mỗi tick trên server đông người.
:::

## Placeholder tiền tệ tùy chỉnh

Cho **CoinsEngine / ExcellentEconomy**:

| Placeholder | Mô tả |
|---|---|
| `%coinflip_coinsengine_<id>_unit%` | Đơn vị tiền tệ (vd "Coins") |
| `%coinflip_coinsengine_<id>_display%` | Tên hiển thị |

Cho **Custom PlaceholderAPI**:

| Placeholder | Mô tả |
|---|---|
| `%coinflip_placeholder_<id>_unit%` | Đơn vị tiền tệ |
| `%coinflip_placeholder_<id>_display%` | Tên hiển thị |
| `%coinflip_<id>_unit%` | Dạng ngắn (giống trên) |
| `%coinflip_<id>_display%` | Dạng ngắn (giống trên) |
| `%coinflip_winrate_<id>%` | Tỷ lệ thắng của loại tiền này (luôn có hai chữ số thập phân, vd `50.00`) |
| `%coinflip_winrate_<id>_formatted%` | Tỷ lệ thắng có ký hiệu `%` |
| `%coinflip_win_percentage_<id>%` | Tỷ lệ thắng (tên khác) |
| `%coinflip_win_percentage_<id>_formatted%` | Tỷ lệ thắng có ký hiệu `%` (tên khác) |

Dạng dài `%coinflip_winrate_placeholder_<id>%` (và bản `_formatted`) cũng dùng được.

Cả hai loại tiền này cũng dùng được trong placeholder [bảng xếp hạng](#bang-xep-hang), [xếp hạng người chơi](#xep-hang-nguoi-choi) và [giới hạn thắng/thua](#gioi-han-thang-thua).

::: warning Thống kê không đầy đủ
Tiền tệ CoinsEngine / ExcellentEconomy và Custom PlaceholderAPI **không** theo dõi lợi nhuận/thua của từng người chơi. Placeholder lợi nhuận, thua và lợi nhuận ròng của các loại tiền này (vd `%coinflip_profit_orbs%`) luôn trả về `0` và không được cộng vào thống kê tổng hợp. Chỉ tiền tệ tích hợp (money, playerpoints, tokenmanager, beasttokens) mới có đầy đủ thống kê lợi nhuận/thua. Tiền tệ Custom PlaceholderAPI vẫn theo dõi **tỷ lệ thắng**, và placeholder bảng xếp hạng, xếp hạng người chơi vẫn hoạt động với cả hai loại.
:::

## Cách hiển thị giá trị

| Trường hợp | Kết quả |
|---|---|
| Gõ sai placeholder, hoặc loại tiền chưa được bật | PlaceholderAPI giữ nguyên chữ gốc |
| Không có người chơi để parse (vd hologram parse mà không có người xem) | Để trống — chỉ `%coinflip_leaderboard_refresh_in%` vẫn hoạt động |
| Vị trí trống trên bảng xếp hạng | `name` hiện chữ "chưa xếp hạng", `value` hiện `0` |
| Người chơi không có trên bảng | Placeholder xếp hạng hiện chữ "chưa xếp hạng" |
| Mục trên bảng không rõ tên người chơi | `Unknown` |
| Giới hạn thắng/thua đang tắt | Để trống |

## Ví dụ

**Scoreboard:**

```
&6&lCOINFLIP
&7Thắng: &a%coinflip_wins%
&7Thua: &c%coinflip_losses%
&7Tỷ lệ thắng: &e%coinflip_winrate_formatted%
&7Chuỗi thắng: &b%coinflip_winstreak%
&7Lợi nhuận ròng: &a%coinflip_net_m_formatted%
&7Hạng: &f%coinflip_position_wins%
```

**Hologram lợi nhuận tháng:**

```
&6&lTOP LỢI NHUẬN THÁNG NÀY
&71. &f%coinflip_top_1_profit_monthly_money_name% &8- &a%coinflip_top_1_profit_monthly_money_value_formatted%
&72. &f%coinflip_top_2_profit_monthly_money_name% &8- &a%coinflip_top_2_profit_monthly_money_value_formatted%
&73. &f%coinflip_top_3_profit_monthly_money_name% &8- &a%coinflip_top_3_profit_monthly_money_value_formatted%
&7Hạng của bạn: &e%coinflip_position_profit_monthly_money%
&8Lần refresh tới: &e%coinflip_leaderboard_refresh_in%
```

## Prefix/Suffix của người chơi trong tin nhắn

Khi viết tin nhắn broadcast hoặc tin nhắn thắng/thua trong file ngôn ngữ, `%luckperms_prefix%` được lấy theo **người xem** (người nhận tin nhắn), không phải người thắng/người thua/người tạo trận. Nghĩa là broadcast kết quả sẽ hiện prefix của chính từng người xem thay vì prefix của người thắng.

Để khắc phục, UltraCoinFlip lấy sẵn prefix/suffix LuckPerms của từng người liên quan và cung cấp dưới dạng placeholder MiniMessage:

| Placeholder | Dùng trong | Lấy từ |
|---|---|---|
| `<player_prefix>`, `<player_suffix>` | `command.broadcast-created`, `house.broadcast-win`, `house.broadcast-lose` | Prefix/suffix LuckPerms của người tạo trận (trong broadcast `house` là người chơi với bot) |
| `<winner_prefix>`, `<winner_suffix>` | `game.loser`, `game.broadcast-result` | Prefix/suffix LuckPerms của người thắng |
| `<loser_prefix>`, `<loser_suffix>` | `game.winner`, `game.broadcast-result` | Prefix/suffix LuckPerms của người thua |
| `<opponent_prefix>`, `<opponent_suffix>` | `game.consecutive-win` | Prefix/suffix LuckPerms của đối thủ |

Các placeholder này đọc từ `%luckperms_prefix%` và `%luckperms_suffix%`, nên cần cài expansion LuckPerms của PlaceholderAPI (`/papi ecloud download LuckPerms`). Nếu không có, chúng sẽ để trống.

**Ví dụ** — hiện đúng prefix của từng người trong broadcast kết quả:

```yaml
game:
  broadcast-result: '&fNgười chơi <winner_prefix>&a<winner> &fđã thắng <loser_prefix>&c<loser> &ftrong coinflip!'
```

Các placeholder PAPI thông thường như `%vault_eco_balance%` hoặc `%server_online%` vẫn được parse theo từng người xem như bình thường.
