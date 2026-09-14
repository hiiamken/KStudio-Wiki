# Discord Webhook

UltraCoinFlip có thể tự động gửi kết quả và thông báo tạo game lên **kênh Discord** qua webhook.

## Thiết lập

1. Trong Discord, vào kênh → **Chỉnh sửa kênh → Tích hợp → Webhooks → Tạo Webhook mới**.
2. Sao chép URL webhook.
3. Dán vào `config.yml`:

```yaml
discord:
  webhook:
    enabled: true
    url: "https://discord.com/api/webhooks/YOUR_WEBHOOK_ID/YOUR_WEBHOOK_TOKEN"
    username: "UltraCoinFlip"   # để trống để dùng tên mặc định của Discord
    avatar: ""                  # URL ảnh, để trống để dùng avatar mặc định của Discord
    min-amount: 0               # chỉ gửi game có tiền cược từ mức này trở lên
```

::: tip URL Discord được hỗ trợ
Tất cả biến thể URL Discord đều hoạt động: `discord.com`, `canary.discord.com`, `ptb.discord.com`, và `discordapp.com`.
:::

## Webhook kết quả game

Gửi embed Discord khi một trò chơi kết thúc. Kết quả được gửi khi `discord.webhook.enabled` là `true`, dùng nội dung trong `discord.message`:

```yaml
discord:
  message:
    content: ""                 # văn bản thường phía trên embed (để trống = chỉ gửi embed)
    embed:
      enabled: true
      title: "Coin Flip Result"
      description: ""
      color:                    # màu viền embed (RGB)
        r: 255
        g: 165
        b: 0
      thumbnail: ""             # URL ảnh (tùy chọn)
      fields:
        - name: "Winner"
          value: "**%winner%**"
          inline: true
        - name: "Loser"
          value: "%loser%"
          inline: true
        - name: "Bet Amount"
          value: "%amount% %symbol%"
          inline: true
        - name: "Winnings"
          value: "**%taxed_amount% %symbol%**"
          inline: false
      footer:
        text: "UltraCoinFlip"
        icon: ""
      timestamp: true
```

| Placeholder | Mô tả |
|---|---|
| `%winner%` | Tên người thắng |
| `%loser%` | Tên người thua |
| `%amount%` | Số tiền cược (trước thuế) |
| `%taxed_amount%` | Số tiền người thắng nhận được (sau thuế) |
| `%currency%` | Tên hiển thị của loại tiền |
| `%symbol%` | Ký hiệu loại tiền |

Ván chơi với bot cũng được gửi khi `house.notifications.enabled` là `true` (mặc định). Tên bot được dùng cho `%winner%` hoặc `%loser%`, và `%taxed_amount%` bằng `0` khi bot thắng.

## Webhook tạo game

Gửi thông báo khi người chơi tạo game mới. Mặc định tính năng này tắt, dùng chung URL webhook, tên, avatar và `min-amount`, và chỉ gửi khi `discord.webhook.enabled` là `true`:

```yaml
discord:
  game-created:
    enabled: true
    message:
      content: ""
      embed:
        enabled: true
        title: "New Coin Flip Created"
        description: ""
        color:
          r: 100
          g: 200
          b: 255
        thumbnail: ""
        fields:
          - name: "Player"
            value: "**%player%**"
            inline: true
          - name: "Amount"
            value: "%amount% %symbol%"
            inline: true
        footer:
          text: "UltraCoinFlip"
          icon: ""
        timestamp: true
```

Placeholder có sẵn: `%player%`, `%amount%`, `%currency%`, `%symbol%`. Ván chơi với bot không gửi thông báo này.

## Hỗ trợ PlaceholderAPI

Nội dung webhook (content, title, description, fields và footer) hỗ trợ **PlaceholderAPI placeholder**. Trong tin nhắn kết quả, placeholder được lấy theo người thắng; trong tin nhắn tạo game, theo người tạo game. Ví dụ hiển thị rank:

```yaml
description: "%luckperms_prefix% **%winner%** thắng %taxed_amount% %symbol%!"
```

Mã màu Minecraft (`&b`, màu hex và thẻ MiniMessage) được xóa trước khi gửi, nên prefix hiển thị dạng chữ thường trên Discord.

## Nội dung được gửi

Với embed mặc định, mỗi tin nhắn kết quả bao gồm:
- Tên người thắng và người thua
- Số tiền cược và ký hiệu loại tiền
- Tiền thắng sau thuế
- Thời gian

## Lệnh kiểm tra

Kiểm tra webhook hoạt động mà không cần game thật:

```
/cf webhook test
```

Lệnh này kiểm tra webhook đã bật và URL hợp lệ, gửi một embed thử cố định tới webhook, rồi báo trong chat là thành công hay lỗi. Yêu cầu quyền `ultracoinflip.admin` và dùng được cả từ console.

## Lọc thông báo

Dùng `discord.webhook.min-amount` để chỉ gửi các trò chơi lớn, tránh spam kênh Discord. Giá trị này áp dụng cho cả tin nhắn kết quả và tin nhắn tạo game.

::: warning
Không chia sẻ URL webhook công khai — bất kỳ ai có URL đó đều có thể đăng lên kênh của bạn. Chỉ để URL trong `config.yml`.
:::
