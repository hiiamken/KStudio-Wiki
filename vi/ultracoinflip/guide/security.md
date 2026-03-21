# Bảo mật & Chống gian lận

UltraCoinFlip có hệ thống bảo mật nhiều lớp để bảo vệ kinh tế server.

## Các lớp bảo vệ

### Dupe tiền bằng cách disconnect (đã vá từ 3.10.0)
Người chơi không thể thua xong log out rồi reconnect để lấy lại tiền. Kết quả ván được chốt ngay lập tức — không có khoảng trống nào để disconnect rồi vào lại lấy tiền.

### Backup tiền cược
Trước khi ván bắt đầu, tiền cược được lưu backup. Nếu server crash hoặc người chơi mất kết nối giữa chừng, tiền sẽ tự hoàn lại khi đăng nhập. Backup chỉ xóa sau khi ván kết thúc đúng cách.

### Kiểm tra số dư
Sau mỗi lần trừ hoặc cộng tiền, plugin kiểm tra lại xem số dư có đúng không. Nếu plugin economy lỗi mà không báo gì, plugin tự phát hiện và rollback.

### Chống double-click / race condition
Người chơi không thể vào cùng một ván hai lần hoặc chạy nhiều ván cùng lúc.

## Log phát hiện khai thác

Hoạt động đáng ngờ được ghi vào `plugins/UltraCoinFlip/exploit-detection.log`.

Cấu hình trong `config.yml`:

```yaml
exploit-detection:
  enabled: true
  console-logging: true
  file-logging: true
  admin-notify: true
  admin-permission: "ultracoinflip.admin"
```

## Hoàn tiền tự động khi mất kết nối

Cấu hình thời gian chờ trước khi restore trong `config.yml`:

```yaml
refund:
  restore-delay: 2   # giây sau khi vào game trước khi xử lý hoàn tiền
```

Tăng lên nếu plugin economy của server cần thêm thời gian để load dữ liệu người chơi.
