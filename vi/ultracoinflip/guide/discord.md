# Discord Webhook

UltraCoinFlip có thể tự động gửi kết quả và thông báo tạo game lên **kênh Discord** qua webhook.

## Thiết lập

1. Trong Discord, vào kênh → **Chỉnh sửa kênh → Tích hợp → Webhooks → Tạo Webhook mới**.
2. Sao chép URL webhook.
3. Dán vào `config.yml`:

```yaml
discord:
  enabled: true
  webhook-url: "https://discord.com/api/webhooks/URL_CUA_BAN"
```

::: tip URL Discord được hỗ trợ
Tất cả biến thể URL Discord đều hoạt động: `discord.com`, `canary.discord.com`, `ptb.discord.com`, và `discordapp.com`.
:::

## Webhook kết quả game

Gửi embed Discord khi một trò chơi kết thúc:

```yaml
discord:
  game-finished:
    enabled: true
    min-amount: 10000
    embed:
      color: "#FFD700"
      title: "Kết quả CoinFlip"
```

## Webhook tạo game

Gửi thông báo khi người chơi tạo game mới:

```yaml
discord:
  game-created:
    enabled: true
    min-amount: 5000
    embed:
      color: "#3498db"
      title: "Game CoinFlip mới"
```

## Hỗ trợ PlaceholderAPI

Tất cả tin nhắn webhook hỗ trợ **PlaceholderAPI placeholder**, ví dụ hiển thị rank:

```yaml
description: "%luckperms_prefix% **%winner%** thắng %amount% %currency%!"
```

## Nội dung được gửi

Mỗi tin nhắn bao gồm:
- Tên người thắng và thua
- Loại tiền và số tiền cược
- Mặt thắng (Heads / Tails)
- Thuế (nếu có)
- Thời gian

## Lệnh kiểm tra

Kiểm tra webhook hoạt động mà không cần game thật:

```
/cf webhook test
```

Yêu cầu quyền `ultracoinflip.admin`.

## Lọc thông báo

Dùng `min-amount` để chỉ gửi các trò chơi lớn, tránh spam kênh Discord.

::: warning
Không chia sẻ URL webhook công khai — bất kỳ ai có URL đó đều có thể đăng lên kênh của bạn.
:::
