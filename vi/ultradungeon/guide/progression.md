# Hệ thống Progression

## Tổng quan

Hệ thống progression cho phép khoá dungeon đằng sau yêu cầu.

## Loại yêu cầu

| Loại | Mô tả |
|---|---|
| `completed-dungeons` | Phải hoàn thành dungeon khác |
| `min-completions` | Phải hoàn thành dungeon X lần |
| `min-level` | Cần level tối thiểu (permission-based) |
| `permission` | Cần permission node cụ thể |
| `mmocore-level` | Cần MMOCore level (cần MMOCore) |
| `mmocore-class` | Cần MMOCore class (cần MMOCore) |

## Ví dụ config

```yaml
Requirements:
  completed-dungeons:
    - "tutorial_dungeon"
  min-completions:
    tutorial_dungeon: 3
  min-level: 5
  mmocore-level: 10
  mmocore-class: "Warrior"
```
