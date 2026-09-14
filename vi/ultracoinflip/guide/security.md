# Bảo mật & Chống gian lận

UltraCoinFlip có hệ thống bảo mật nhiều lớp để bảo vệ kinh tế server khỏi gian lận và khai thác.

## Các biện pháp bảo vệ

### Khai thác hoàn tiền khi ngắt kết nối
Người thắng được chọn trước khi hiệu ứng tung đồng xu bắt đầu và kết quả bị khóa ngay khi hiệu ứng chạy. Sau thời điểm đó, thoát game hay đóng menu đều không lấy lại được tiền cược: người thua vẫn mất tiền, người thắng được trả tiền — ngay lập tức nếu đang online, nếu không thì khi vào lại. Điều này vẫn đúng khi đặt `cancel-game-on-disconnect: true` hoặc `allow-close-during-animation: false`: các cài đặt đó chốt ván sớm, nhưng kết quả đã khóa vẫn được trả thay vì hoàn tiền cho cả hai.

### Hệ thống backup hoàn tiền
Mọi khoản cược được lưu vào database ngay khi đặt — khi tạo coinflip, và cho cả hai người chơi khi ván bắt đầu quay. Nếu server crash hoặc không trả được tiền, số tiền đã lưu sẽ được trả khi người chơi vào lại. Backup chỉ bị xóa sau khi ván đã trả tiền hoặc tiền cược đã được hoàn. Nếu database không khởi động được, plugin tự tắt để không nhận cược nào mà không có backup.

### Xác minh số dư
Sau mỗi lần trừ và cộng tiền, UltraCoinFlip kiểm tra số dư người chơi có thực sự thay đổi đúng số tiền hay không. Nếu lần trừ tiền không thực sự trừ, lần cược bị từ chối. Lần cộng tiền không hiện ra sẽ được báo vào log khai thác. Tiền tệ PlaceholderAPI tùy chỉnh bỏ qua bước kiểm tra này vì chúng trả tiền qua lệnh console.

### Chống nhấn đúp / race condition
Người chơi không thể tham gia cùng một game hai lần hoặc tham gia nhiều game cùng lúc, và hai người chơi không thể cùng lấy một game. Game được rút khỏi danh sách trước khi trừ tiền người tham gia — nếu trừ tiền thất bại, game được trả lại danh sách ngay. Người chơi có ván đang quay không thể tạo hoặc tham gia game khác.

### Hủy game an toàn
`/cf delete` có cooldown 3 giây, mỗi coinflip chỉ được hoàn tiền một lần, và việc hủy bị chặn khi plugin đang reload hoặc tắt. Nếu không cộng được tiền hoàn, coinflip được đưa lại vào danh sách thay vì biến mất.

### Phát hiện hành vi đáng ngờ
Hệ thống phát hiện đếm từng loại sự kiện theo mỗi người chơi. Từ 3 lần trở lên cùng một loại sự kiện trong 30 giây sẽ đánh dấu người chơi là đáng ngờ và báo cho admin đang online.

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

| Sự kiện | Mức độ |
|---|---|
| Trừ tiền báo thành công nhưng số dư không giảm | Cao |
| Người chơi thoát sau khi kết quả ván đã được quyết định | Cao |
| Cộng tiền báo thành công nhưng số dư không tăng | Trung bình |
| Hai người chơi cùng lúc tham gia một game | Trung bình |
| Lượt tham gia bị hoàn tác vì trừ tiền thất bại | Trung bình |
| Nhấn đúp để tham gia | Thấp |
| Cố tham gia game đã bị người khác lấy | Thấp |

- Mỗi người chơi chỉ được ghi tối đa một dòng cho mỗi loại sự kiện trong 5 giây, để console không bị spam.
- Người có `admin-permission` được báo với sự kiện mức **Cao** và khi có hành vi đáng ngờ.
- `enabled: false` chỉ tắt việc ghi log và báo động — các biện pháp bảo vệ ở trên luôn hoạt động.

## Ngắt kết nối, reload và restart

| Tình huống | Điều gì xảy ra |
|---|---|
| Chủ phòng thoát khi coinflip đang chờ | Coinflip bị xóa và tiền cược được hoàn khi họ vào lại. `refund-on-disconnect: true` hoàn tiền ngay; `keep-coinflip-on-disconnect: true` giữ coinflip trong danh sách. |
| Người chơi thoát giữa ván đang quay | Ván vẫn chạy hết và kết quả được giữ nguyên. Người thắng đang offline nhận tiền thắng khi vào lại. |
| Người chơi vào lại trước khi ván kết thúc | Không hoàn tiền gì — ván trả tiền khi kết thúc. |
| `/cf reload` khi ván đang quay | Ván bị dừng và cả hai người chơi được hoàn tiền cược (người offline nhận khi vào lại). Coinflip đang chờ vẫn nằm trong danh sách. |
| Server tắt | Ván đang quay được hoàn tiền cho cả hai người chơi, và coinflip đang chờ được hoàn tiền cho chủ phòng trừ khi được giữ lại — xem [Hết hạn & Khởi động lại](/vi/ultracoinflip/guide/expiry). Người online nhận tiền ngay, người offline nhận khi vào lại. |
| Server crash | Tiền cược đã lưu được trả lại khi mỗi người chơi vào lại (coinflip đang chờ được giữ lại thì được khôi phục). |
| Cộng tiền thắng hoặc tiền hoàn thất bại | Số tiền được lưu lại và trả khi người chơi vào lại. Riêng khi hủy game mà hoàn tiền thất bại, coinflip được đưa lại vào danh sách. |

Các cài đặt liên quan trong mục `game-behavior:` của `config.yml`:

| Key | Mặc định | Mô tả |
|---|---|---|
| `keep-coinflip-on-disconnect` | `false` | Giữ coinflip đang chờ trong danh sách khi chủ phòng thoát |
| `refund-on-disconnect` | `false` | Hoàn tiền coinflip của chủ phòng ngay khi họ thoát thay vì đợi họ vào lại |
| `refund-on-reconnect-after-shutdown` | `true` | Khi `refund-on-disconnect` cũng là `true`, mọi khoản hoàn tiền lúc tắt server được giữ đến khi người chơi vào lại |
| `cancel-game-on-disconnect` | `false` | Chốt ván ngay khi một người chơi thoát thay vì để ván chạy hết — kết quả đã khóa vẫn được trả |
| `refund-restore-delay` | `40` | Số tick chờ sau khi người chơi vào game trước khi trả tiền hoàn và tiền thắng đã lưu |

## Hệ thống backup hoàn tiền

Khi người chơi vào game, UltraCoinFlip trả lại mọi thứ đã lưu cho họ: tiền cược từ các coinflip bị hủy, hết hạn hoặc bị gián đoạn khi họ offline, và tiền thắng từ các ván kết thúc khi họ không online. Plugin chờ một khoảng ngắn trước, cấu hình trong `config.yml`:

```yaml
game-behavior:
  refund-restore-delay: 40   # số tick sau khi vào trước khi xử lý hoàn tiền (20 tick = 1 giây)
```

Tăng giá trị này nếu plugin kinh tế cần vài giây để load dữ liệu người chơi khi vào. Nếu cộng tiền vẫn thất bại, khoản đó được giữ lại và thử lại ở lần vào tiếp theo.

## Log giao dịch

Các lần hoàn tiền khi hủy coinflip được ghi vào `plugins/UltraCoinFlip/transactions.log`: hoàn tiền thành công, hoàn tiền bị hoàn tác vì cộng tiền thất bại, và các lần bị chặn (cooldown, hoàn tiền trùng, đang reload hoặc tắt server). File này luôn được ghi — cài đặt dưới đây chỉ quyết định có in thêm ra console hay không:

```yaml
transaction-logging:
  console: false
```
