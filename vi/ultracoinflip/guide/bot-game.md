# Chơi với Bot

Tính năng **Chơi với Bot** cho phép người chơi tung đồng xu với bot máy chủ thay vì chờ đối thủ thực.

## Cách hoạt động

1. Người chơi mở menu coinflip và nhấn **Chơi với Bot** (hoặc dùng lệnh).
2. Bot chấp nhận trò chơi ngay lập tức.
3. Trò chơi bắt đầu ngay — không cần phòng chờ.
4. Kết quả thắng/thua giống như coinflip thông thường.

## Lệnh

```
/coinflip create <currency> <amount> bot
```

**Ví dụ:** `/coinflip create vault 5000 bot`

## Cấu hình

Cài đặt bot trong `config.yml` dưới mục `house:`:

```yaml
house:
  enabled: true
  name: "§6House Bot"
  skin: default  # 'default', tên người chơi, hoặc texture Base64
  daily-limit: 10  # Số trận bot tối đa mỗi ngày (0 = không giới hạn)
  cooldown: 30     # Giây giữa các trận bot (0 = không giới hạn)
```

## Quyền

| Quyền | Mô tả |
|---|---|
| `ultracoinflip.house.use` | Cho phép chơi với bot |
| `ultracoinflip.house.bypass.limit` | Bỏ qua giới hạn số trận bot mỗi ngày |
| `ultracoinflip.house.bypass.delay` | Bỏ qua thời gian chờ giữa các trận bot |
