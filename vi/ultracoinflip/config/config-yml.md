# config.yml

File cấu hình chính tại `plugins/UltraCoinFlip/config.yml`.

## Cài đặt chung

```yaml
language: vi              # File ngôn ngữ (en, vi, fr, de, ru, zh_cn, zh_tw, es, ar, it, lt, pt, pl, tr, ko, ja)
debug: false              # Bật ghi log debug
default-currency: vault   # Tiền tệ mặc định hiển thị trong GUI
```

## Cơ sở dữ liệu

```yaml
database:
  type: sqlite            # sqlite hoặc mysql
  mysql:
    host: localhost
    port: 3306
    database: ultracoinflip
    username: root
    password: ""
    ssl: false
    pool-size: 10
```

## Cài đặt Coinflip

```yaml
coinflip:
  max-games-per-player: 1       # Số trò chơi tối đa cùng lúc mỗi người chơi
  heads-tails-selection: true   # Hiện màn hình chọn heads/tails trước khi tạo
  keep-on-disconnect: true      # Giữ game khi người tạo ngắt kết nối
```

## Thông báo

```yaml
notifications:
  title:
    enabled: true
  actionbar:
    enabled: true
  bossbar:
    enabled: true
    color: YELLOW
    duration: 5            # giây
```

## Định dạng số

```yaml
number-format:
  type: COMPACT            # COMPACT (K/M/B/T), COMMAS, hoặc FULL
```

## Bot (House)

```yaml
house:
  enabled: true
  name: "§6House"
  skin: default             # 'default', tên người chơi, hoặc texture Base64
  daily-limit: 0            # Số trận bot tối đa mỗi ngày (0 = không giới hạn)
  cooldown: 0               # Giây giữa các trận bot (0 = không giới hạn)
```

## Hoàn tiền

```yaml
refund:
  restore-delay: 2          # Giây sau khi đăng nhập trước khi khôi phục backup
```

## Giới hạn cược

```yaml
betting-limits:
  enabled: false
  reset: DAILY              # DAILY hoặc WEEKLY
```

## Discord Webhook

```yaml
discord:
  enabled: false
  webhook-url: ""
  game-finished:
    enabled: true
    min-amount: 0
  game-created:
    enabled: false
    min-amount: 0
```

## Phát hiện khai thác

```yaml
exploit-detection:
  enabled: true
  console-logging: true
  file-logging: true
  admin-notify: true
  admin-permission: "ultracoinflip.admin"
```

## Kiểm tra cập nhật

```yaml
update-checker:
  enabled: true
  notify-console: true
  notify-in-game: true
```

## Hiệu suất

```yaml
stats-batch:
  enabled: true              # Ghi database theo lô để tăng hiệu suất
  auto-flush-seconds: 5
  max-queue-size: 10
```
