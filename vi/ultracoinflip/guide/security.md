# Bảo mật & Chống gian lận

UltraCoinFlip có hệ thống bảo mật nhiều lớp để bảo vệ kinh tế server khỏi gian lận và khai thác.

## Các biện pháp bảo vệ

### Khai thác hoàn tiền khi ngắt kết nối (đã sửa từ 3.10.0)
Người chơi không thể ngắt kết nối sau khi thua coinflip rồi kết nối lại để nhận hoàn tiền gian lận. Game được hoàn tất ngay khi kết quả được xác định.

### Hệ thống backup hoàn tiền
Tất cả cược được backup trước khi game bắt đầu. Nếu server crash hoặc người chơi ngắt kết nối giữa game (trước khi có kết quả), backup được dùng để hoàn tiền khi họ vào lại.

### Xác minh số dư
Sau mỗi lần trừ và cộng tiền, UltraCoinFlip xác minh số dư người chơi thay đổi đúng số lượng mong đợi. Nếu plugin kinh tế thất bại ngầm, plugin phát hiện và rollback.

### Chống nhấn đúp / race condition
Người chơi không thể tham gia cùng một game hai lần hoặc tham gia nhiều game cùng lúc.

### Phát hiện tham gia nhanh
Hệ thống phát hiện theo dõi các lần tham gia đáng ngờ liên tục. Tần suất cao được ghi log.

## Log phát hiện khai thác

Khi phát hiện hoạt động đáng ngờ, nó được ghi vào `plugins/UltraCoinFlip/exploit-detection.log` và (tùy chọn) hiển thị cho admin online.

Cấu hình trong `config.yml`:

```yaml
exploit-detection:
  enabled: true
  console-logging: true
  file-logging: true
  admin-notify: true
  admin-permission: "ultracoinflip.admin"
```

## Hệ thống backup hoàn tiền

Nếu người chơi ngắt kết nối giữa game, cược của họ được tự động hoàn khi vào lại. Cấu hình delay trong `config.yml`:

```yaml
refund:
  restore-delay: 2   # giây sau khi vào trước khi xử lý hoàn tiền
```

Tăng giá trị này nếu plugin kinh tế cần vài giây để load dữ liệu người chơi khi vào.
