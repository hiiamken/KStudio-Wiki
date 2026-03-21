# Bảo mật & Chống gian lận

UltraCoinFlip có hệ thống bảo mật nhiều lớp để bảo vệ kinh tế server.

## Các lớp bảo vệ

### Khai thác hoàn tiền khi đăng xuất (sửa trong 3.10.0)
Người chơi không thể thoát sau khi thua và đăng nhập lại để nhận hoàn tiền gian lận. Trò chơi được xác nhận ngay khi có kết quả — trước khi bất kỳ handler ngắt kết nào có thể kích hoạt hoàn tiền.

### Hệ thống backup hoàn tiền
Tất cả cược được backup trước khi trò chơi bắt đầu. Nếu server crash hoặc người chơi ngắt kết nối giữa chừng, backup được dùng để hoàn tiền khi đăng nhập lại. Backup chỉ bị xóa sau khi trò chơi giải quyết thành công.

### Kiểm tra số dư
Sau mỗi rút tiền và nạp tiền, plugin xác minh số dư thay đổi đúng lượng kỳ vọng. Nếu plugin kinh tế thất bại âm thầm, plugin sẽ phát hiện và rollback.

### Bảo vệ double-click / race condition
Người chơi không thể tham gia cùng một trò chơi hai lần hoặc tham gia nhiều trò cùng lúc.

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

## Hệ thống hoàn tiền backup

Cấu hình độ trễ khôi phục trong `config.yml`:

```yaml
refund:
  restore-delay: 2   # giây sau khi đăng nhập trước khi xử lý hoàn tiền
```

Tăng giá trị này nếu plugin kinh tế của bạn cần vài giây để tải dữ liệu người chơi khi đăng nhập.
