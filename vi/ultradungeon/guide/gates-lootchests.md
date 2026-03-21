# Gates & Loot Chests

## Gates

Gates là rào chắn ngăn người chơi tiến lên cho đến khi wave nhất định được clear.

### Cách hoạt động
1. Gate là vùng (hai góc block) hoạt động như tường
2. Gate mở khi wave được gán hoàn thành
3. Người chơi không thể đi qua gate đang đóng

### Setup
Cấu hình qua **Editor GUI** (không phải setup wizard):
1. Mở editor: `/dungeon edit <tên>` → Editor GUI
2. Click **Gates** → **Add Gate**
3. Click phải hai block góc của gate
4. Đặt wave trigger
5. Lưu

## Loot Chests

Loot chest là chest đặc biệt mở sau wave nhất định.

### Cách hoạt động
1. Chest đặt tại vị trí block cụ thể
2. Mở được sau khi wave trigger hoàn thành
3. Mỗi người chơi mở 1 lần mỗi run
4. Nội dung cấu hình theo từng chest
