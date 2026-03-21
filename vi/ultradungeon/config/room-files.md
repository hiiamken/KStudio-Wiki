# Room Files

Mỗi dungeon có file cấu hình riêng tại `plugins/UltraDungeon/room/<tên>.yml`. File được tạo tự động bởi setup wizard.

## Các section chính

| Section | Bắt buộc | Mô tả |
|---|---|---|
| `Prefix` | ✅ | Tên hiển thị |
| `Player` | ✅ | Số người chơi tối đa |
| `Time` | ✅ | Giới hạn thời gian (phút) |
| `Spawn` | ✅ | Vị trí spawn |
| `Mob1`–`Mob10` | ✅ (ít nhất 1) | Cấu hình wave |
| `Boss` | ❌ | Boss wave |
| `BorderPos1/2` | ❌ | Khu vực border |
| `Access` | ❌ | Ticket/permission |
| `HealthScale` | ❌ | HP scaling theo số người |
| `Reward` | ❌ | Reward ngẫu nhiên |
| `DefaultRewards` | ❌ | Reward bảo đảm |
| `MoneyReward` | ❌ | Tiền Vault (cần Vault) |
| `EntryFee` | ❌ | Phí vào Vault (cần Vault) |
| `MMOCoreExpReward` | ❌ | XP class (cần MMOCore) |
| `MMOItemRewards` | ❌ | MMOItems (cần MMOItems) |
| `Checkpoints` | ❌ | Điểm hồi sinh |
| `Requirements` | ❌ | Yêu cầu mở khoá |
| `VictoryCommands` | ❌ | Lệnh khi hoàn thành |

Xem trang [Room Files (EN)](/config/room-files) để xem ví dụ đầy đủ.
