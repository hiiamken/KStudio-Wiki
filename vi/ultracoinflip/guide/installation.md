# Cài đặt

## Bước 1 — Tải plugin

Tải `UltraCoinFlip.jar` mới nhất từ [Modrinth](https://modrinth.com/plugin/ultracoinflip) hoặc [SpigotMC](https://www.spigotmc.org/resources/%E2%AD%90-ultracoinflip-1-8-x-1-21-11-folia-support.130124/).

## Bước 2 — Cài Vault + plugin kinh tế

UltraCoinFlip **bắt buộc cần Vault**, cùng một plugin kinh tế tương thích Vault cho loại tiền mặc định `money`:

- **EssentialsX** (phổ biến nhất)
- **CMI**
- Bất kỳ plugin nào register với Vault đều được

Đặt cả `Vault.jar` và plugin kinh tế bạn chọn vào thư mục `plugins/`.

::: tip
Server sẽ không load UltraCoinFlip nếu thiếu Vault. Nếu plugin kinh tế kết nối với Vault sau khi UltraCoinFlip đã khởi động, plugin sẽ tự nhận ra.
:::

## Bước 3 — Đặt jar vào plugins/

Đặt `UltraCoinFlip.jar` vào thư mục `plugins/` của server.

## Bước 4 — Khởi động server

Khởi động hoặc restart server. UltraCoinFlip sẽ tự động tạo các file cấu hình trong `plugins/UltraCoinFlip/`.

```
plugins/UltraCoinFlip/
  config.yml              ← cấu hình chính
  sounds.yml              ← cài đặt âm thanh
  ultracoinflip.db        ← cơ sở dữ liệu SQLite (mặc định)
  langs/
    messages_en.yml       ← file ngôn ngữ tiếng Anh
    ...                   ← 16 ngôn ngữ khác
  currencies/
    vault.yml             ← cấu hình tiền Vault
    playerpoints.yml      ← cấu hình PlayerPoints
    tokenmanager.yml      ← cấu hình TokenManager
    beasttokens.yml       ← cấu hình BeastTokens
    coinsengine.yml       ← cấu hình ExcellentEconomy / CoinsEngine
    customplaceholder.yml ← tiền tệ tùy chỉnh qua PlaceholderAPI
  gui/                    ← file giao diện menu (mainmenu.yml, create.yml, flipping.yml, ...)
```

## Bước 5 — Cấu hình

Mở `config.yml` để chỉnh theo server của bạn, ví dụ `language`. Mặc định chỉ có tiền Vault được bật — muốn dùng loại tiền khác, đặt `enabled: true` trong file của loại tiền đó ở thư mục `currencies/`. `default-currency` (mặc định `auto`) quyết định loại tiền mà `/cf create <amount>` sử dụng khi người chơi không ghi loại tiền.

::: tip
Dùng `/coinflip reload` để tải lại config mà không cần restart server.
:::

## Cập nhật từ phiên bản cũ

Thay file `UltraCoinFlip.jar` cũ bằng jar mới rồi restart server là xong. File config cũ được giữ nguyên, còn các tùy chọn mới sẽ dùng giá trị mặc định cho đến khi bạn chỉnh. Xem changelog trên trang tải plugin để biết config thay đổi gì giữa các phiên bản.

::: warning
Luôn backup thư mục `plugins/UltraCoinFlip/` trước khi cập nhật.
:::
