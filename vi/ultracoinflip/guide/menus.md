# Menu & Icon

Mọi menu dạng rương của UltraCoinFlip đều được thiết lập trong các file ở `plugins/UltraCoinFlip/gui/`. Trên Minecraft 1.21.7+, một vài bước còn dùng được màn hình dialog gốc của game, và người chơi Bedrock nhận form dễ bấm trên điện thoại.

Chạy `/cf reload` sau khi sửa file menu.

## Các file menu

| File | Menu | Mở từ |
|---|---|---|
| `mainmenu.yml` | Danh sách coinflip (`list-gui`) và các ván hiển thị trong đó (`game-item`) | `/cf` |
| `create.yml` | Menu tạo ván (`create-gui`) | Nút Create, `/cf create` |
| `heads-tails.yml` | Chọn Heads hoặc Tails (`heads-tails-gui`) | Khi tạo ván, nếu `heads-tails.enabled` là `true` trong `config.yml` |
| `flipping.yml` | Hiệu ứng tung đồng xu (`coinflip-gui`) | Mọi ván khi bắt đầu |
| `history.yml` | Lịch sử ván (`history-gui`) và từng dòng lịch sử (`history-item`) | Nút History, `/cf history` |
| `leaderboard.yml` | Bảng xếp hạng (`leaderboard-gui`) | Nút Leaderboard, `/cf leaderboard` |
| `settings.yml` | Cài đặt người chơi (`settings-gui`) | Đầu thống kê của bạn trong danh sách coinflip, `/cf settings` |
| `stats.yml` | Thống kê người chơi (`stats-gui`) | `/cf stats [player]`, khi `stats.display-mode` là `GUI` trong `config.yml` |
| `audit.yml` | Bảng điều khiển cho admin (`audit-gui`) | `/cf audit` |

### Chữ trong menu nằm ở đâu

File menu chứa bố cục: kích thước, slot, material và các công tắc bật/tắt. Phần lớn tiêu đề, tên vật phẩm và lore nằm trong file ngôn ngữ `langs/messages_<lang>.yml`, dưới `gui.<tên file>` rồi đến đúng đường dẫn như trong file menu:

```yaml
# langs/messages_vi.yml
gui:
  mainmenu:              # gui/mainmenu.yml
    list-gui:
      create:            # nút list-gui.create
        title: '&6&lTạo CoinFlip'
        lore:
          - "&8&m━━━━━━━━━━━━━━━━"
          - "&7Click để tạo"
          - "&7ván coinflip mới"
          - "&8&m━━━━━━━━━━━━━━━━"
```

Hãy sửa file ứng với `language` đang đặt trong `config.yml`. Một vài key chữ vẫn nằm trong file menu, như `game-item.display-name` trong `mainmenu.yml` và `title` của các nút cộng/trừ trong `create.yml`. Nếu bạn thêm thẳng một key chữ vào file menu (ví dụ `title` dưới `list-gui.create`), giá trị đó sẽ được dùng thay cho file ngôn ngữ.

Chữ của dialog cũng nằm trong file ngôn ngữ đó, dưới `dialog:`.

## Tùy chọn vật phẩm

Các nút trong file menu dùng chung những key sau. Ví dụ nút Create trong `mainmenu.yml`:

```yaml
create:
  slot: 40
  enabled: true
  material: 'NETHER_STAR'
  glowing: false
  custom-model-data: 0
  item-model: ''
  bedrock-image: 'https://cdn.jsdelivr.net/gh/hiiamken/UltraCoinFlip-API@icons-v1/icons/create.png'
```

| Key | Tác dụng |
|---|---|
| `slot` | Vị trí trong menu, bắt đầu từ `0` ở góc trên bên trái |
| `enabled` | `false` để ẩn nút. Chỉ có tác dụng với các nút đã có key này trong file mặc định (xem Công tắc ẩn nút bên dưới) |
| `material` | Loại vật phẩm (xem Material bên dưới) |
| `glowing` | `true` để vật phẩm phát sáng như được phù phép |
| `custom-model-data` | Số custom model data cho resource pack (1.14+). `0` là tắt |
| `item-model` | ID item model dạng `namespace:path` (1.21.4+). Không ghi namespace thì dùng `minecraft:`. `''` là tắt, server cũ hơn sẽ bỏ qua |
| `bedrock-image` | Ảnh của nút này trong form Bedrock (xem Menu Bedrock bên dưới) |

### Material

- Dùng tên material của Bukkit như `NETHER_STAR`, `BLACK_STAINED_GLASS_PANE` hoặc `PLAYER_HEAD`.
- Trên server 1.8–1.12, thêm data value sau dấu hai chấm khi vật phẩm cũ cần, ví dụ `STAINED_GLASS_PANE:15` là kính đen, `SKULL_ITEM:3` là đầu người chơi. File mặc định có ghi tên cũ trong comment cạnh các material đã đổi tên.
- Nếu material không tồn tại trên phiên bản server của bạn, console sẽ cảnh báo khi tải menu. Với một số vật phẩm, ví dụ filler, plugin còn tự ghi một material dùng được vào lại file.

### Tên và lore

- Dòng lore trống hoặc chỉ có mã màu, như `""` hay `"&7"`, sẽ hiện thành một dòng trống. Dùng nó để tạo khoảng cách.
- `display-name` là `''` hoặc `' '` thì vật phẩm không hiện tên. Filler mặc định dùng cách này.

### Đầu từ HeadDatabase

Khi đã cài plugin HeadDatabase, `material: 'hdb-<id>'` sẽ dùng một chiếc đầu trong database của nó:

```yaml
filler:
  material: 'hdb-1234'
```

Cách này dùng được cho mọi vật phẩm trong các file menu, kể cả hiệu ứng tung đồng xu. Với material `hdb-`, các thiết lập skin như `player-head` sẽ bị bỏ qua. Đầu người thắng, người thua và đầu bot hiện ở kết quả ván tung vẫn giữ skin như bình thường. Đầu trơn hiện ra khi chưa cài HeadDatabase, HeadDatabase đang tải, hoặc ID không tồn tại.

### Đầu người chơi

Vật phẩm có `material: 'PLAYER_HEAD'` chọn được skin để hiển thị:

```yaml
game-item:
  material: 'PLAYER_HEAD'
  player-head:
    type: 'Host'      # Host, Base64 hoặc Default
    texture: ''       # giá trị texture Base64, dùng khi type là Base64
```

| `type` | Hiển thị | Dùng cho |
|---|---|---|
| `Host` | Người tạo ván | `game-item` |
| `Opponent` | Người chơi còn lại trong ván đó, hoặc đầu bot với ván chơi với bot | `history-item` |
| `Winner` | Người thắng ván đó | `history-item` |
| `Player` | Người đang xem menu | `list-gui.stats`, `history-gui.stats` và các nút khác |
| `Base64` | Skin trong `texture`, ví dụ giá trị copy từ minecraft-heads.com | Mọi loại đầu |
| `Default` | Đầu trơn | Mọi loại đầu |

- Ở các nút khác, `type: 'Player'` kèm tên người chơi trong `texture` sẽ hiện đầu của người đó.
- Các nút chuyển trang trong `mainmenu.yml` dùng một key `base64-texture` duy nhất thay cho mục `player-head`.
- Nút Play with Bot lấy material từ `house.display.material` trong `config.yml`. Texture đầu của nút lấy từ `list-gui.house.player-head`.

## Filler

Mọi menu trừ hiệu ứng tung đồng xu đều có `filler` để lấp các slot trống:

```yaml
filler:
  enabled: true
  material: 'BLACK_STAINED_GLASS_PANE'
  display-name: ' '
  glowing: false
  custom-model-data: 0
  item-model: ''
  slots: ["0-3", "5-9", "17-18", "26-27", "35-38", "42-44"]
```

- `enabled: false` để bỏ filler.
- `slots` nhận từng slot lẻ và khoảng như `"0-8"`. `slots: []` thì không đặt filler nào. Nếu xóa hẳn key `slots`, menu dùng bố cục có sẵn của plugin.
- Filler không bao giờ che các nút.
- File mặc định của bảng xếp hạng không có `slots`, nên filler lấp mọi slot trống cho đến khi bạn thêm danh sách. Filler của menu audit luôn lấp mọi slot trống.
- Hiệu ứng tung đồng xu dùng `layout.border-item` trong `flipping.yml` thay cho filler.

### Filler phụ

Thêm vật phẩm trang trí bằng các mục tên `filler2`, `filler3`,... đặt cạnh `filler`. Chúng dùng cùng các key: `enabled`, `material`, `slots`, `display-name`, `lore`, `glowing`, `custom-model-data` và `item-model`.

Filler phụ không bao giờ đè lên slot đã có vật phẩm, kể cả filler chính. Hãy bỏ các slot đó khỏi `filler` chính trước:

```yaml
list-gui:
  filler:
    slots: ["1-3", "5-7", "9", "17-18", "26-27", "35", "37-38", "42-43"]
  filler2:
    material: 'ORANGE_STAINED_GLASS_PANE'
    display-name: ' '
    slots: ["0", "8", "36", "44"]
```

Filler phụ dùng được trong mọi file menu trừ `flipping.yml`.

## Công tắc ẩn nút

Đặt các key sau thành `false` để ẩn nút. Form Bedrock cũng làm theo các công tắc này ở những nút mà form có.

| File | Key | Ẩn |
|---|---|---|
| Mọi file trừ `flipping.yml` | `<menu>.filler.enabled` | Filler |
| `mainmenu.yml` | `list-gui.leaderboard.enabled` | Nút Leaderboard |
| `mainmenu.yml` | `list-gui.history.enabled` | Nút History |
| `mainmenu.yml` | `list-gui.create.enabled` | Nút Create |
| `mainmenu.yml` | `list-gui.filter.enabled` | Nút lọc |
| `mainmenu.yml` | `list-gui.house.enabled` | Nút Play with Bot. Nút này cũng bị ẩn khi `house.enabled` là `false` trong `config.yml` |
| `create.yml` | `create-gui.decrease.enabled` / `create-gui.increase.enabled` | Toàn bộ nút trừ / toàn bộ nút cộng |
| `create.yml` | `create-gui.decrease.buttons.<n>.enabled` / `create-gui.increase.buttons.<n>.enabled` | Một nút cộng/trừ |
| `create.yml` | `create-gui.private-toggle.enabled` | Nút Private. Nút này cũng bị ẩn khi `invite.enabled` là `false` trong `config.yml` |
| `create.yml` | `create-gui.back.enabled` | Nút quay lại |
| `history.yml` | `history-gui.back.enabled` | Nút quay lại |
| `leaderboard.yml` | `leaderboard-gui.filter.enabled` | Nút đổi bộ lọc |
| `leaderboard.yml` | `leaderboard-gui.currency.enabled` | Nút đổi loại tiền |
| `leaderboard.yml` | `leaderboard-gui.back.enabled` | Nút quay lại |
| `settings.yml` | `settings-gui.back.enabled` | Nút quay lại |
| `settings.yml` | `settings-gui.settings.<setting>.enabled` | Nút bật/tắt của cài đặt đó |
| `stats.yml` | `stats-gui.back.enabled` | Nút quay lại |
| `flipping.yml` | `coinflip-gui.layout.player-slots.default.arrow-enabled` | Mũi tên trong hiệu ứng mặc định |

## Menu tạo ván

### Số tiền ban đầu

Menu tạo ván mở ra với số tiền đặt trong `config.yml`:

```yaml
game-behavior:
  default-bet: 100      # -1 = bắt đầu từ min-bid của loại tiền
```

Số tiền luôn nằm giữa `min-bid` và `max-bid` của loại tiền đang chọn, bất kể `default-bet` là bao nhiêu. Xem [Currency Files](/vi/ultracoinflip/config/currencies).

### Nút cộng/trừ có sẵn

Các nút − và + thay đổi tiền cược theo một mức cố định:

```yaml
create-gui:
  decrease:
    enabled: true
    material: 'RED_STAINED_GLASS_PANE'
    title: '&c&l-<amount>'
    glowing: false
    custom-model-data: 0
    item-model: ''
    buttons:
      1:
        slot: 9
        amount: 500
      2:
        slot: 10
        amount: 1000
        enabled: false       # chỉ ẩn nút này
```

- `decrease` trừ số tiền khỏi tiền cược, còn `increase` cộng thêm.
- Mỗi nút cần một `slot` và một `amount` lớn hơn 0. Đánh số các nút 1, 2, 3,... và thêm bao nhiêu nút tùy thích.
- `<amount>` trong `title` hiển thị mức tiền của nút. Lore nằm trong file ngôn ngữ, dưới `gui.create.create-gui.decrease.lore` và `gui.create.create-gui.increase.lore`.
- Mỗi nút có thể đặt riêng `material`, `title`, `lore`, `glowing`, `custom-model-data` và `item-model`. Key nào không đặt sẽ lấy từ mục `decrease` hoặc `increase`.
- `enabled: false` ở `decrease` hoặc `increase` ẩn cả nhóm, lúc đó người chơi chỉ đặt tiền cược bằng nút nhập số tiền. Đặt ở một nút thì chỉ ẩn nút đó. Khi filler đang bật, filler sẽ lấp vào slot trống.
- Nút + không bao giờ vượt quá `max-bid` của loại tiền. Bấm − mà làm tiền cược xuống dưới `min-bid` thì tiền cược về 0.

### Các nút khác trong menu tạo ván

| Nút | Ghi chú |
|---|---|
| `currency` | Chuột trái chọn loại tiền tiếp theo, chuột phải chọn loại trước đó |
| `custom-amount` | Người chơi gõ số tiền như `2500` hoặc `1.5M`. `input.method` trong `config.yml` chọn `CHAT` hoặc `ANVIL`. Trên Folia, hoặc khi anvil không mở được, plugin dùng chat |
| `create` | Dùng `material` khi tạo được ván, `material-insufficient` khi người chơi không đủ tiền cược và `material-disabled` khi không có loại tiền nào dùng được |
| `private-toggle` | Dùng `material` khi ván công khai và `material-private` khi ván riêng tư. `glowing-when-private` làm nút phát sáng khi riêng tư. Xem [Coinflip Riêng Tư & Mời](/vi/ultracoinflip/guide/private-and-invites) |
| `back` | Quay về danh sách coinflip |

## Menu dialog (1.21.7+)

Trên server chạy Paper (hoặc bản dựa trên Paper) từ 1.21.7 trở lên, một số bước có thể dùng màn hình dialog gốc của Minecraft thay cho menu rương. Dialog tắt theo mặc định:

```yaml
dialog:
  enabled: false          # công tắc chính
  create-side: true
  amount-input: true
  join-confirm: true
  house-confirm: true
  currency-select: true
  amount:
    fallback-max: 1000000
```

| Key | Dialog | Khi tắt dialog |
|---|---|---|
| `create-side` | Chọn Heads hoặc Tails | Menu rương chọn Heads/Tails |
| `amount-input` | Thanh trượt cho nút nhập số tiền | Nhập qua chat hoặc anvil |
| `join-confirm` | Màn hình xác nhận sau khi bấm vào một ván trong danh sách | Người chơi vào ván ngay |
| `house-confirm` | Màn hình xác nhận trước khi chơi với bot | Menu rương chọn Heads/Tails |
| `currency-select` | Danh sách loại tiền khi bấm nút đổi loại tiền | Mỗi lần bấm chuyển sang loại tiền kế tiếp |

- `create-side` và `house-confirm` chỉ có tác dụng khi `heads-tails.enabled` là `true`. Nếu không, sẽ không có bước chọn và ván bắt đầu thẳng từ menu tạo ván.
- Thanh trượt chạy từ `min-bid` của loại tiền (tối thiểu 1) đến `max-bid`. Với loại tiền có `max-bid: -1`, `amount.fallback-max` là mức cao nhất của thanh trượt. Thanh trượt chỉ chọn số nguyên.
- Danh sách coinflip, menu tạo ván, lịch sử, bảng xếp hạng, cài đặt, thống kê và hiệu ứng tung đồng xu vẫn là menu rương.
- Trên server cũ hơn hoặc không phải Paper, các thiết lập `dialog` không có tác dụng. Plugin kiểm tra server có hỗ trợ không lúc khởi động. `enabled` và các công tắc còn lại đổi được bằng `/cf reload`.
- Nếu không hiện được dialog, console cảnh báo một lần và người chơi nhận menu rương thay thế. Dialog xác nhận vào ván bị lỗi thì người chơi vào ván luôn.
- Người chơi Bedrock đang dùng form Bedrock sẽ thấy form thay cho các dialog này.

## Menu Bedrock

Người chơi vào server qua Geyser và Floodgate nhận form Bedrock gốc thay cho menu rương. Tính năng này bật sẵn:

```yaml
bedrock:
  enabled: true
```

- UltraCoinFlip tìm **Floodgate** trên chính server của nó, không tìm Geyser:
  - Geyser chạy trên proxy BungeeCord hoặc Velocity: cài thêm Floodgate trên server backend đang chạy UltraCoinFlip.
  - Geyser là plugin trên cùng server: server đó cũng phải cài Floodgate.
- Không có Floodgate thì người chơi Bedrock dùng menu rương bình thường.
- `bedrock.enabled` chỉ được đọc lúc khởi động, nên hãy khởi động lại server sau khi đổi. Chỉ đặt `false` khi form gây lỗi, lúc đó người chơi Bedrock dùng menu rương.

| Menu | Form Bedrock |
|---|---|
| Danh sách coinflip | Mỗi ván một nút, cùng các nút Create, Play with Bot, Leaderboard, History, Settings và chuyển trang. Bấm vào ván của chính mình để hủy ván (cần `ultracoinflip.command.delete`) |
| Menu tạo ván | Danh sách chọn loại tiền, thanh trượt số tiền (ô nhập chữ khi loại tiền không có `max-bid`) và nút gạt Private khi hệ thống mời và nút Private đang bật |
| Heads hoặc Tails | Hai nút Heads và Tails, hoặc Play và Cancel với ván chơi với bot |
| Cài đặt | Mỗi cài đặt một nút gạt |
| Lịch sử | Thống kê của bạn và mỗi ván một nút, kèm nút chuyển trang và quay lại |
| Bảng xếp hạng | Bảng xếp hạng dạng chữ, kèm nút đổi bộ lọc, đổi loại tiền và quay lại |
| Audit | Nội dung bảng điều khiển kèm nút đóng |

Menu thống kê và hiệu ứng tung đồng xu vẫn là menu rương. Nếu không dựng được form, người chơi nhận menu rương.

Form dùng cùng phần chữ với menu rương trong file ngôn ngữ, cộng thêm vài key `dialog.*`, ví dụ nhãn loại tiền và số tiền trong form tạo ván.

### Ảnh cho nút

Nút trong form có thể hiện ảnh. Đặt bằng `bedrock-image` cạnh nút trong file menu:

```yaml
list-gui:
  create:
    bedrock-image: 'https://example.com/icons/create.png'
```

- Giá trị là một đường link web (`http://` hoặc `https://`). Giá trị khác được gửi dưới dạng đường dẫn bên trong resource pack của Bedrock.
- `bedrock-image: ''` để bỏ ảnh.
- Nếu không có key này, plugin dùng icon có sẵn.
- File mặc định đã đặt key này cho các nút create, bot, leaderboard, history và chuyển trang của danh sách coinflip, cho `game-item`, cho nút quay lại, nút chuyển trang và `history-item` của lịch sử, cho nút đổi bộ lọc, đổi loại tiền và quay lại của bảng xếp hạng, và cho nút đóng của audit (`audit-gui.items.close`).
- Nút Settings trong form danh sách coinflip đọc `settings-gui.bedrock-image` trong `settings.yml`. File mặc định không có key này, hãy tự thêm nếu muốn đổi icon.

::: tip
Icon có sẵn được lưu tại `https://cdn.jsdelivr.net/gh/hiiamken/UltraCoinFlip-API@icons-v1/icons/`. Mỗi ảnh khác nhau là một lần tải riêng trên thiết bị của người chơi, nên hãy dùng lại cùng một ảnh cho các nút giống nhau.
:::
