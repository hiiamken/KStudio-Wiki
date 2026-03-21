# Bắt đầu

<div style="display:flex;align-items:center;gap:16px;margin-bottom:16px">
  <img src="/KStudio-Wiki/ultracoinflipava.png" alt="UltraCoinFlip" style="width:72px;height:72px;border-radius:12px"/>
  <div>
    <h2 style="margin:0">UltraCoinFlip</h2>
    <p style="margin:4px 0 8px">Plugin coinflip tiên tiến nhất cho Minecraft</p>
    <a href="https://www.spigotmc.org/resources/%E2%AD%90-ultracoinflip-1-8-x-1-21-11-folia-support.130124/" target="_blank" style="display:inline-block;background:#f87316;color:#fff;padding:5px 14px;border-radius:6px;font-size:0.85rem;font-weight:600;text-decoration:none;margin-right:8px">⬇ SpigotMC</a>
    <a href="https://modrinth.com/plugin/ultracoinflip" target="_blank" style="display:inline-block;background:#1bd96a;color:#fff;padding:5px 14px;border-radius:6px;font-size:0.85rem;font-weight:600;text-decoration:none">⬇ Modrinth</a>
  </div>
</div>

## UltraCoinFlip là gì?

UltraCoinFlip là plugin cờ bạc coinflip cao cấp cho Minecraft, cho phép người chơi tạo và tham gia trò chơi, đặt cược tiền tệ trong game. Mỗi lần tung đồng xu sử dụng **thuật toán ngẫu nhiên an toàn về mật mã** — công bằng hoàn toàn.

Phù hợp cho server **economy, survival, skyblock, factions, prison** và bất kỳ server nào muốn tăng tương tác.

## Tính năng nổi bật

- **Hỗ trợ nhiều loại tiền tệ** — Vault, PlayerPoints, TokenManager, BeastTokens, ExcellentEconomy, CoinsEngine
- **Cơ sở dữ liệu** — SQLite (mặc định) và MySQL với HikariCP
- **Bảng xếp hạng** — Top 15 người chơi, lọc theo wins / profit / largest win / winstreak
- **Chơi với Bot** — Người chơi có thể đấu với bot máy chủ
- **Hệ thống thuế** — Tỷ lệ thuế theo bậc cho từng loại tiền
- **Giới hạn cược** — Giới hạn ngày/tuần mỗi người chơi
- **Discord webhook** — Gửi kết quả trò chơi lên Discord
- **Bảo mật** — Chống gian lận, hoàn tiền tự động, hệ thống backup
- **Hỗ trợ Folia** — Tương thích hoàn toàn với Paper Folia
- **17 ngôn ngữ** — Bao gồm Tiếng Việt 🇻🇳

## Bắt đầu nhanh

1. Tải `UltraCoinFlip.jar` và đặt vào thư mục `plugins/`
2. Cài đặt **Vault** và plugin kinh tế (EssentialsX, CMI,...)
3. Khởi động server — các file cấu hình tự động tạo
4. Mở menu coinflip bằng `/coinflip`

::: tip
Chạy `/coinflip reload` sau khi chỉnh sửa bất kỳ file config nào để áp dụng thay đổi mà không cần restart server.
:::

## Yêu cầu

| Yêu cầu | Phiên bản |
|---|---|
| Minecraft Server | 1.8.x – 1.21.x (Spigot / Paper / Folia) |
| Java | 8 trở lên |
| Vault | Bất kỳ phiên bản mới nào |
| Plugin kinh tế | EssentialsX, CMI, hoặc bất kỳ plugin tương thích Vault |

## Phụ thuộc tùy chọn

| Plugin | Mục đích |
|---|---|
| PlaceholderAPI | 40+ placeholder cho scoreboard, hologram,... |
| PlayerPoints | Dùng points làm tiền tệ coinflip |
| TokenManager | Dùng token làm tiền tệ coinflip |
| BeastTokens | Dùng beast token làm tiền tệ coinflip |
| ExcellentEconomy | Dùng tiền tệ ExcellentEconomy (trước đây là CoinsEngine) |

## Thống kê server

[![bStats](https://bstats.org/signatures/bukkit/UltraCoinFlip.svg)](https://bstats.org/plugin/bukkit/UltraCoinFlip)
