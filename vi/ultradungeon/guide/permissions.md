# Quyền

## Quyền người chơi

| Quyền | Mô tả | Mặc định |
|---|---|---|
| `ultradungeon.play` | Vào và chơi dungeon | `true` |
| `ultradungeon.list` | Mở GUI danh sách | `true` |
| `ultradungeon.top` | Xem bảng xếp hạng | `true` |
| `ultradungeon.party` | Dùng lệnh party | `true` |

## Quyền Admin

| Quyền | Mô tả | Mặc định |
|---|---|---|
| `ultradungeon.admin` | Tất cả lệnh admin | `op` |
| `ultradungeon.create` | Tạo dungeon | `op` |
| `ultradungeon.edit` | Chỉnh sửa dungeon | `op` |
| `ultradungeon.delete` | Xoá dungeon | `op` |
| `ultradungeon.reload` | Reload config | `op` |
| `ultradungeon.validate` | Chạy validation | `op` |
| `ultradungeon.ticket.manage` | Quản lý ticket | `op` |
| `ultradungeon.point.manage` | Quản lý điểm | `op` |

## Quyền Ticket

| Quyền | Mô tả |
|---|---|
| `ultradungeon.ticket.<số>` | Đặt giới hạn ticket hàng ngày (giá trị cao nhất thắng) |
| `ultradungeon.ticket.unlimited` | Bỏ qua giới hạn ticket |

## Quyền truy cập

Mỗi dungeon có thể giới hạn truy cập bằng permission node tùy chỉnh. Ví dụ:
```
ultradungeon.access.mydungeon
```
Người chơi không có quyền này sẽ không thể vào dungeon (khi Permission Gate được bật).
