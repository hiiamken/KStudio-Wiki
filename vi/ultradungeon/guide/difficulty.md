# Hệ thống Độ khó

Hệ thống độ khó cho phép người chơi chọn mức thử thách trước khi vào dungeon. Mỗi mức áp dụng hệ số nhân cho chỉ số quái, loot và điểm.

## Cấu hình

Bật trong `config.yml`:

```yaml
difficulty:
  enabled: true
  show-selector: true
  tiers:
    NORMAL:
      display-name: "&aNormal"
      hp-multiplier: 1.0
      damage-multiplier: 1.0
      loot-multiplier: 1.0
      score-multiplier: 1.0
      icon: IRON_SWORD
      modifiers: []
    HARD:
      display-name: "&cHard"
      hp-multiplier: 1.5
      damage-multiplier: 1.3
      loot-multiplier: 1.5
      score-multiplier: 2.0
      icon: DIAMOND_SWORD
      modifiers: [FORTIFIED]
    NIGHTMARE:
      display-name: "&4Nightmare"
      hp-multiplier: 3.0
      damage-multiplier: 2.5
      loot-multiplier: 3.0
      score-multiplier: 4.0
      icon: NETHERITE_SWORD
      modifiers: [FORTIFIED, EXPLOSIVE]
```

## Cách hoạt động

1. Khi người chơi nhấn vào phòng dungeon (hoặc dùng `/dungeon join`), **GUI chọn độ khó** sẽ hiện ra
2. Người chơi chọn mức — độ khó sẽ bị khóa cho toàn bộ phiên chơi
3. Người chơi tiếp theo vào cùng phòng sẽ kế thừa độ khó đã chọn
4. Khi game reset, độ khó cũng reset theo

## Hệ số nhân

| Hệ số | Hiệu ứng |
|---|---|
| `hp-multiplier` | Nhân HP tối đa của quái (cộng dồn với scaling theo số người và wave) |
| `damage-multiplier` | Nhân sát thương quái gây cho người chơi |
| `loot-multiplier` | Nhân số lượt quay phần thưởng (min và max) |
| `score-multiplier` | Nhân điểm cuối cùng trong bảng tính điểm |

## Modifier

Modifier thêm cơ chế đặc biệt vào lượt chơi. Các modifier có sẵn:

| Modifier | Mô tả |
|---|---|
| `FORTIFIED` | Quái +50% HP |
| `RAGING` | Quái cuồng nộ khi dưới 30% HP |
| `EXPLOSIVE` | Quái nổ khi chết |
| `BOLSTERING` | Quái buff đồng minh gần đó |
| `VAMPIRIC` | Quái hồi máu khi đánh trúng |
| `SHIELDED` | Quái giảm sát thương nhận vào |
| `STORMING` | Sét đánh định kỳ |
| `THORNS` | Quái phản sát thương |

## Tùy chỉnh GUI

Chỉnh sửa `gui/difficulty.yml` để tùy chỉnh GUI chọn độ khó:

```yaml
menu:
  menu_title: "&8&lSelect Difficulty"
  size: 27
  tier_slots: [10, 12, 14, 16]
  tier_item:
    lore:
      - ""
      - "&7HP: &cx%hp_mult%"
      - "&7Damage: &cx%dmg_mult%"
      - "&7Loot: &ax%loot_mult%"
      - "&7Score: &6x%score_mult%"
      - ""
      - "&fModifiers:"
      - "%modifier_list%"
      - ""
      - "&aClick to select"
  no_modifiers: "&7  None"
```

## Hiển thị trong phòng Dungeon

Độ khó đã chọn được hiển thị trong lore phòng dungeon bằng placeholder `%difficulty%`.
