# Phần thưởng

## Tổng quan

UltraDungeon sử dụng **hệ thống phần thưởng hợp nhất**. Tất cả loại reward được quản lý tại một nơi duy nhất — không còn hệ thống riêng biệt "Default Rewards", "Card Flip" hay "Legacy".

Mỗi reward có **tỷ lệ rơi** (1–100):
- **Rate 100** = Bảo đảm (luôn được nhận nếu còn slot)
- **Rate 1–99** = Ngẫu nhiên (rate cao hơn = khả năng rơi cao hơn)

Khi người chơi hoàn thành dungeon, plugin roll ngẫu nhiên giữa **min rewards** và **max rewards** cho người đó.

## Loại phần thưởng

| Loại | Mô tả | Yêu cầu |
|------|-------|---------|
| `ITEM` | Item Minecraft bất kỳ (đầy đủ NBT/enchant/custom model data) | — |
| `COMMAND` | Lệnh console (hỗ trợ `%player%`) | — |
| `VAULT_MONEY` | Gửi tiền vào tài khoản | [Vault](/vi/guide/vault) |
| `MMOITEMS_ITEM` | Item MMOItems theo type + ID | [MMOItems](/vi/guide/mmoitems) |
| `MMOCORE_XP` | Cho XP class | [MMOCore](/vi/guide/mmocore) |
| `CUSTOM_ITEM` | Item từ ItemsAdder / Oraxen | ItemsAdder hoặc Oraxen |

## Cách nhận phần thưởng

Khi người chơi hoàn thành dungeon, đây là những gì xảy ra — từng bước một:

1. **Chọn số lượng**: Plugin chọn ngẫu nhiên một số giữa **Min Rewards** và **Max Rewards**. Đây là số phần thưởng người chơi được nhận. Ví dụ: nếu min = 2 và max = 5, người chơi có thể nhận 3 phần thưởng lần này.

2. **Phần thưởng bảo đảm được nhận trước**: Bất kỳ reward nào có rate = 100 đều là "bảo đảm" — luôn được ưu tiên nhận trước. Nếu người chơi có đủ slot thì nhận hết. Nếu không đủ slot, **Guaranteed Order** quyết định nhận cái nào (theo thứ tự trong list hoặc random).

3. **Slot còn lại nhận phần thưởng ngẫu nhiên**: Nếu vẫn còn slot trống, plugin chọn từ các reward còn lại (rate < 100). Rate cao hơn = cơ hội được chọn cao hơn. Mỗi reward chỉ được nhận 1 lần mỗi lượt chơi — không trùng lặp.

## Cấu hình (Room File)

```yaml
rewards:
  minRolls: 1
  maxRolls: 3
  pick100Mode: ORDER   # ORDER = ưu tiên đầu list, RANDOM = chọn random
  entries:
    - type: ITEM
      rate: 100
      amount: 1
    - type: COMMAND
      rate: 30
      command: "eco give %player% 1000"
    - type: VAULT_MONEY
      rate: 50
      amount: 2500
    - type: MMOITEMS_ITEM
      rate: 20
      amount: 1
      mmoType: SWORD
      id: FLAME_BLADE
    - type: MMOCORE_XP
      rate: 40
      amount: 120
```

## Thiết lập qua GUI (Khuyến nghị)

Tất cả reward được cấu hình qua nút **Dungeon Editor → Rewards**. Không cần sửa YAML thủ công.

### Rewards Menu
Màn hình chính:
- **Reward List** — xem & quản lý tất cả reward
- **Min Rewards** — số reward tối thiểu mỗi người mỗi lần clear
- **Max Rewards** — số reward tối đa mỗi người mỗi lần clear
- **Guaranteed Order** — cách ưu tiên reward bảo đảm khi nhiều hơn slot

### Rewards List
Danh sách phân trang tất cả reward:
- **Click** vào entry để sửa rate/amount
- **Shift+Click** vào entry để xoá (có xác nhận)
- **Add New Reward** — hướng dẫn từng bước qua chat

### Thêm reward mới (Chat Flow)
1. Click **+ Add New Reward**
2. Chọn loại: `item` | `command` | `vault` | `mmoitem` | `mmocore` | `customitem`
3. Làm theo hướng dẫn (cầm item + gõ `add`, nhập command, nhập số lượng, v.v.)
4. Nhập **tỷ lệ rơi** (1–100)
5. Xong — reward được thêm và bạn quay lại GUI

Gõ `cancel` bất kỳ lúc nào để huỷ.

### Sửa reward
Click vào reward để mở màn hình chỉnh sửa:
- **Change Drop Rate** — click để chỉnh, hoặc middle-click để nhập số chính xác
- **Change Amount** — click để chỉnh, hoặc middle-click để nhập số chính xác
- **Reward Details** — xem toàn bộ thông tin (loại, command, material, v.v.)

## File cấu hình GUI

Giao diện GUI (tiêu đề, material, lore, tin nhắn chat) có thể tuỳ chỉnh hoàn toàn trong `plugins/UltraDungeon/gui/rewards.yml`. Xem [GUI Config](/vi/config/gui) để biết chi tiết.
