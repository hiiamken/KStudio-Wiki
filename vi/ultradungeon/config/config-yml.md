# config.yml

File cấu hình chính của UltraDungeon. Nằm tại `plugins/UltraDungeon/config.yml`.

## Cài đặt chung

```yaml
# Ngôn ngữ: en, vi, ita
language: vi

# Database: H2 (file) hoặc MySQL
database:
  type: h2
  mysql:
    host: localhost
    port: 3306
    database: ultradungeon
    username: root
    password: ""
```

## Gameplay

```yaml
gameplay:
  # Hệ thống ticket
  tickets:
    enabled: true
    ip-check: false        # Chống alt bằng IP

  # Cho phép vào dungeon đang chơi
  late-join:
    enabled: false
```

## Scoring

```yaml
scoring:
  base:
    victory: 100           # Điểm thắng
    defeat: -50            # Điểm thua
    death: -10             # Điểm mỗi lần chết

  kill-bonus:
    per-kill: 2            # Điểm mỗi kill
    boss-multiplier: 5     # Hệ số kill boss

  speed-bonus:
    thresholds:
      75: 2.0              # Còn 75%+ thời gian → 2x
      50: 1.5
      25: 1.2

  no-death-bonus:
    multiplier: 1.5        # Hệ số nếu 0 death

  party-size-bonus:
    1: 2.0                 # Solo
    2: 1.5
    3: 1.2
    4: 1.0

  streak:
    thresholds:
      3: 1.2               # 3 win liên tiếp
      5: 1.5
      10: 2.0
```

::: tip
Sau khi chỉnh `config.yml`, chạy `/dungeon reload` để áp dụng mà không cần restart server.
:::
