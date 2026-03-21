# Hệ thống Boss

## Tổng quan

Mỗi dungeon có **boss wave** riêng kích hoạt sau khi clear tất cả wave thường. Hỗ trợ MythicMobs, damage tracking, enrage, và phase-based minion spawning.

## Cấu hình Boss

| Cài đặt | Mô tả |
|---|---|
| **Type** | Loại mob — vanilla hoặc `mythic:BossName` |
| **Amount** | Số lượng boss |
| **Spawn Location** | Vị trí spawn boss |
| **Enrage Timer** | Giây trước khi boss enrage (tùy chọn) |
| **Phases** | Spawn minion tại ngưỡng HP (tùy chọn) |

## Damage Scoring

Khi bật trong `config.yml`, người chơi nhận bonus điểm dựa trên damage:

```yaml
boss:
  damage-scoring:
    enabled: true
    max-bonus: 50
```

Công thức: `(damagePercent / 100) × maxBonus`

## Broadcast

Khi boss bị đánh bại, có thể gửi broadcast toàn server với placeholder:
`%boss%`, `%dungeon%`, `%players%`, `%top_damager%`, `%top_percent%`
