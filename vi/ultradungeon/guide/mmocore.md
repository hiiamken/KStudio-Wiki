# MMOCore

## Tổng quan

Tích hợp [MMOCore](https://www.spigotmc.org/resources/mmocore.70575/) cho:
1. **Yêu cầu progression** — Cần MMOCore level hoặc class để vào dungeon
2. **XP reward** — Thưởng class EXP khi hoàn thành

## Setup

1. Cài MMOCore trên server
2. Khởi động server — UltraDungeon tự hook
3. Console: `[UltraDungeon] MMOCore hooked successfully!`

## Yêu cầu Progression

```yaml
Requirements:
  mmocore-level: 15
  mmocore-class: "Warrior"
```

Có thể kết hợp cả hai:
```yaml
Requirements:
  mmocore-level: 10
  mmocore-class: "Mage"
```

## XP Reward

Thưởng class experience khi hoàn thành dungeon:

```yaml
MMOCoreExpReward: 500.0
```

Class experience được tự động cấp khi dungeon hoàn thành.

## Language Keys

```yaml
Progression:
  RequireMMOLevel: "%prefix%&cBạn cần MMOCore level &6%required% &f(hiện tại: &e%current%&f)"
  RequireMMOClass: "%prefix%&cBạn cần class &6%required% &f(hiện tại: &e%current%&f)"

Reward:
  MMOCoreExp: "%prefix%&a+&b%amount% EXP&f!"
```
