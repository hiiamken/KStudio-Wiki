# config.yml

File cấu hình chính tại `plugins/UltraCoinFlip/config.yml`.

## Cài đặt chung

```yaml
language: vi              # File ngôn ngữ (en, vi, fr, de, ru, zh, ...)
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
  animation-duration: 60        # Ticks cho animation tung đồng xu (20 ticks = 1 giây)
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
