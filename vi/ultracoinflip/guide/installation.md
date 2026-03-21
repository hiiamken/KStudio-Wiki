# Cài đặt

## Bước 1 — Tải plugin

Tải `UltraCoinFlip.jar` mới nhất từ [Modrinth](https://modrinth.com) hoặc [SpigotMC](https://www.spigotmc.org).

## Bước 2 — Cài Vault + plugin kinh tế

UltraCoinFlip **bắt buộc cần Vault** và ít nhất một plugin kinh tế tương thích:

- **EssentialsX** (phổ biến nhất)
- **CMI**
- Bất kỳ plugin nào register với Vault đều được

## Bước 3 — Đặt jar vào plugins/

Đặt `UltraCoinFlip.jar` vào thư mục `plugins/` của server.

## Bước 4 — Khởi động server

Khởi động hoặc restart server. UltraCoinFlip sẽ tự động tạo các file cấu hình trong `plugins/UltraCoinFlip/`.

```
plugins/UltraCoinFlip/
  config.yml          ← cấu hình chính
  messages_vi.yml     ← file ngôn ngữ
  currencies/
    vault.yml
    playerpoints.yml
    coinsengine.yml
    ...
  gui/                ← file giao diện
```

## Bước 5 — Cấu hình

Mở `config.yml` để chỉnh. Quan trọng nhất là `default-currency` — chọn đúng loại tiền bạn muốn người chơi dùng mặc định.

::: tip
Dùng `/coinflip reload` để tải lại config mà không cần restart server.
:::

## Cập nhật từ phiên bản cũ

Thay file jar cũ bằng jar mới rồi restart server là xong. File config cũ không bị đụng đến.

::: warning
Luôn backup thư mục `plugins/UltraCoinFlip/` trước khi cập nhật.
:::
