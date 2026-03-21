# Discord Webhook

UltraCoinFlip có thể tự động gửi kết quả trò chơi lên **kênh Discord** qua webhook.

## Thiết lập

1. Trong Discord, vào kênh → **Chỉnh sửa kênh → Tích hợp → Webhooks → Tạo Webhook mới**.
2. Sao chép URL webhook.
3. Dán vào `config.yml`:

```yaml
discord:
  enabled: true
  webhook-url: "https://discord.com/api/webhooks/URL_CUA_BAN"
  send-on-win: true
  min-amount: 10000    # Chỉ gửi trò chơi trên mức này
  embed:
    color: "#FFD700"
    title: "💰 Kết quả CoinFlip"
```

## Nội dung được gửi

Mỗi tin nhắn bao gồm:
- Tên người thắng và thua
- Loại tiền và số tiền cược
- Mặt thắng (Heads / Tails)
- Thời gian

## Lọc thông báo

Dùng `min-amount` để chỉ gửi các trò chơi lớn, tránh spam kênh Discord.

::: warning
Không chia sẻ URL webhook công khai — bất kỳ ai có URL đó đều có thể đăng lên kênh của bạn.
:::
