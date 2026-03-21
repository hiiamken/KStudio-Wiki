# Waves & Mobs

## Tổng quan

Dungeon sử dụng hệ thống wave-based. Mỗi wave spawn nhóm quái mà người chơi phải tiêu diệt. Sau tất cả wave, boss wave bắt đầu.

## Wave Editor

Truy cập qua nút **Waves & Mobs** trong setup wizard.

### Cài đặt Wave
Mỗi wave chứa:
- **Mob Groups** — Một hoặc nhiều nhóm quái
- **Duration** — Giới hạn thời gian wave (mặc định: 2 phút)

### Cài đặt Mob Group

| Cài đặt | Mô tả |
|---|---|
| **Mob Type** | Tên mob vanilla hoặc `mythic:MobName` cho MythicMobs |
| **Amount** | Số lượng mob spawn |
| **Spawn Location** | Vị trí spawn tùy chỉnh (mặc định: ngẫu nhiên trong border) |
| **Spawn Style** | `NORMAL` hoặc `SPREAD` |

## Boss Wave

Boss wave là wave cuối cùng đặc biệt:

| Cài đặt | Mô tả |
|---|---|
| **Boss Type** | Loại mob (hỗ trợ MythicMobs với prefix `mythic:`) |
| **Boss Amount** | Số lượng boss |
| **Spawn Location** | Vị trí spawn boss |
| **Enrage Timer** | Tùy chọn: boss enrage sau X giây |
| **Phases** | Tùy chọn: spawn minion tại ngưỡng HP |

## Hỗ trợ MythicMobs

Thêm prefix `mythic:` để dùng mob MythicMobs:

```yaml
mythic:SkeletonKing    # Spawn MythicMobs mob "SkeletonKing"
ZOMBIE                  # Spawn vanilla zombie
```
