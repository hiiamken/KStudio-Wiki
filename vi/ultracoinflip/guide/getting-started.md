# Bắt đầu

<div style="text-align:center;margin:8px 0 36px">
  <img src="/ultracoinflipava.png" alt="UltraCoinFlip" style="width:120px;height:120px;border-radius:20px;box-shadow:0 6px 24px rgba(0,0,0,0.18)"/>
  <h2 style="margin:18px 0 6px;font-size:1.75rem">UltraCoinFlip</h2>
  <p style="margin:0 0 20px;color:var(--vp-c-text-2);font-size:1rem">Plugin coinflip tiên tiến nhất cho Minecraft</p>
  <div style="display:flex;justify-content:center;gap:12px;flex-wrap:wrap">
    <a href="https://www.spigotmc.org/resources/%E2%AD%90-ultracoinflip-1-8-x-1-21-11-folia-support.130124/" target="_blank" style="display:inline-block;background:#f97316;color:#fff;padding:10px 28px;border-radius:8px;font-size:0.95rem;font-weight:700;text-decoration:none;letter-spacing:0.01em">Tải trên SpigotMC</a>
    <a href="https://modrinth.com/plugin/ultracoinflip" target="_blank" style="display:inline-block;background:#18c45d;color:#fff;padding:10px 28px;border-radius:8px;font-size:0.95rem;font-weight:700;text-decoration:none;letter-spacing:0.01em">Tải trên Modrinth</a>
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
