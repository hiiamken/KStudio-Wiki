# Cấu hình GUI

## File GUI Config

Nằm tại `plugins/UltraDungeon/gui/gui_config.yml`. Kiểm soát giao diện của tất cả GUI cho người chơi.

## File Wizard Config

Nằm tại `plugins/UltraDungeon/gui/wizard.yml`. Kiểm soát layout của wizard tạo dungeon.

### Vị trí Slot

```yaml
slots:
  # Row 2: Cài đặt cơ bản
  prefix: 10
  max-players: 12
  time-limit: 14
  info: 16
  # Row 3: Vị trí & Phí vào
  spawn: 19
  border: 21
  border-preview: 23
  entry-fee: 25
  # Row 4: Truy cập & Scaling
  ticket: 28
  permission: 30
  hp-scale: 32
  hp-detail: 34
  # Row 5: Waves, Rewards & Checkpoints
  waves: 37
  rewards: 39
  checkpoints: 41
  money-reward: 43
  status: 44
  # Row 6: Hành động
  cancel: 45
  create: 53
```

### Tuỳ chỉnh màu sắc

```yaml
colors:
  primary: "&6"      # Vàng gold — tiêu đề
  secondary: "&e"    # Vàng — giá trị
  success: "&a"      # Xanh lá — bật/OK
  error: "&c"        # Đỏ — lỗi/tắt
  info: "&b"         # Aqua — thông tin
  muted: "&7"        # Xám — mô tả
  white: "&f"        # Trắng — nhãn
```
