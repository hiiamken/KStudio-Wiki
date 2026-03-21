# MMOItems

## Tổng quan

Tích hợp [MMOItems](https://www.spigotmc.org/resources/mmoitems.39267/) để thưởng MMOItems custom khi hoàn thành dungeon.

## Setup

1. Cài MMOItems trên server
2. Khởi động server — UltraDungeon tự hook
3. Console: `[UltraDungeon] MMOItems hooked successfully!`

## Cấu hình reward

```yaml
MMOItemRewards:
  reward_1:
    Type: SWORD          # Loại MMOItems (SWORD, BOW, ARMOR, v.v.)
    Id: FLAME_BLADE      # ID item trong MMOItems
    Amount: 1
  reward_2:
    Type: CONSUMABLE
    Id: HEALING_POTION
    Amount: 3
```

### Tìm Type và ID
- **Type** — Tên loại MMOItems (xem `/mi list`): `SWORD`, `BOW`, `ARMOR`, `CONSUMABLE`, v.v.
- **Id** — ID item bạn đặt khi tạo item trong MMOItems
- Item thêm vào inventory; tràn thì drop xuống đất

## Language Keys

```yaml
Reward:
  MMOItem: "%prefix%&aNhận &6%amount%x &e%item%&f!"
```

| Placeholder | Giá trị |
|---|---|
| `%item%` | ID item MMOItems |
| `%amount%` | Số lượng item |
