# Hệ thống Season

## Tổng quan

Hệ thống season cung cấp **bảng xếp hạng giới hạn thời gian** với reward tự động cho top người chơi. Điểm all-time không bị ảnh hưởng — season chỉ theo dõi điểm riêng.

## Cách hoạt động

1. Season chạy trong thời gian định sẵn (ví dụ: 30 ngày hoặc giữa 2 ngày cụ thể)
2. Người chơi kiếm **season points** từ hoàn thành dungeon (cùng công thức tính điểm all-time)
3. Khi season kết thúc, **top người chơi nhận reward commands** tự động
4. **Season mới bắt đầu ngay** sau khi season cũ kết thúc
5. Season đầu tiên tự tạo khi plugin khởi động nếu chưa có

## Cấu hình

Nằm trong `config.yml` ở `scoring.season`.
Timezone được đặt toàn cục tại `general.timezone` (dùng chung cho ticket reset và tất cả tính năng thời gian).

```yaml
general:
  timezone: "UTC"               # Java TimeZone ID (ví dụ: Asia/Ho_Chi_Minh, America/New_York)

scoring:
  season:
    enabled: true
    start-date: ""                # Ngày bắt đầu (yyyy-MM-dd), để trống = tự động
    end-date: ""                  # Ngày kết thúc (yyyy-MM-dd), để trống = tự động
    duration-days: 30             # Khi dates trống (30 = hàng tháng, 7 = hàng tuần)
    rewards:
      1:
        commands:
          - "give %player% diamond 64"
          - "say %player% achieved #1 in the dungeon season!"
      2:
        commands:
          - "give %player% diamond 32"
      3:
        commands:
          - "give %player% diamond 16"
```

### Hai chế độ lên lịch

| Chế độ | Cách dùng | Khi season kết thúc |
|--------|-----------|---------------------|
| **Ngày cụ thể** | Đặt `start-date` và `end-date` (ví dụ: `2026-03-01` đến `2026-03-31`) | Season mới tạo tự động dùng `duration-days` từ ngày kết thúc |
| **Chỉ duration** | Để `start-date` và `end-date` trống | Plugin lấy hôm nay làm start, cộng `duration-days` cho end |

### Placeholder reward

| Placeholder | Mô tả |
|-------------|-------|
| `%player%` | Tên người chơi |
| `%rank%` | Thứ hạng |
| `%points%` | Điểm season |

## Xem thông tin Season

- `/dungeon top` → **Tab Season** (trang 2) hiện bảng xếp hạng season hiện tại
- Ngày bắt đầu/kết thúc được hiển thị
- Xếp hạng cập nhật real-time
- **Tab Personal Stats** (trang 3) hiện điểm season, số lần hoàn thành, và streak

## Database

| Bảng | Nội dung |
|------|----------|
| `season_points` | Điểm mỗi người chơi mỗi season |
| `season_info` | Metadata season (ID, ngày bắt đầu, ngày kết thúc, trạng thái) |

## Vòng đời Season

```
Plugin khởi động
  └─ Chưa có season? → Tạo season mới từ config
  └─ Season hiện tại hết hạn?
       └─ Phát reward cho top người chơi (console commands)
       └─ Kết thúc season hiện tại
       └─ Tạo season mới tự động
  └─ Season đang chạy → Không làm gì
```
