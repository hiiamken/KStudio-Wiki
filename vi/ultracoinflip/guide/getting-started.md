# Bắt đầu

<div style="display:flex;flex-direction:column;align-items:center;padding:20px 0 36px;width:100%">
  <img src="/assets/ultracoinflipava.png" alt="UltraCoinFlip" style="width:160px;height:160px;border-radius:22px;box-shadow:0 8px 28px rgba(0,0,0,0.18)"/>
  <h2 style="margin:20px 0 6px;font-size:1.8rem;font-weight:700">UltraCoinFlip</h2>
  <p style="margin:0 0 22px;color:var(--vp-c-text-2);font-size:1rem">Plugin coinflip tiên tiến nhất cho Minecraft</p>
  <div style="display:flex;gap:12px;flex-wrap:wrap;justify-content:center">
    <a href="https://www.spigotmc.org/resources/%E2%AD%90-ultracoinflip-1-8-x-1-21-11-folia-support.130124/" target="_blank" style="display:inline-block;background:#f97316;color:#fff;padding:11px 30px;border-radius:8px;font-size:0.95rem;font-weight:700;text-decoration:none">Tải trên SpigotMC</a>
    <a href="https://modrinth.com/plugin/ultracoinflip" target="_blank" style="display:inline-block;background:#18c45d;color:#fff;padding:11px 30px;border-radius:8px;font-size:0.95rem;font-weight:700;text-decoration:none">Tải trên Modrinth</a>
  </div>
</div>

## UltraCoinFlip là gì?

UltraCoinFlip là plugin cờ bạc coinflip cao cấp cho Minecraft, cho phép người chơi tạo và tham gia trò chơi, đặt cược tiền tệ trong game với nhau. Mỗi lần tung đồng xu sử dụng **thuật toán ngẫu nhiên an toàn về mật mã** — tỉ lệ 50/50 công bằng, server không thể can thiệp.

Phù hợp cho server **economy, survival, skyblock, factions, prison** và bất kỳ server nào muốn tăng tương tác.

## Tính năng nổi bật

- **[Hỗ trợ nhiều loại tiền tệ](/vi/ultracoinflip/guide/currencies)** — Vault, PlayerPoints, TokenManager, BeastTokens, ExcellentEconomy, CoinsEngine và không giới hạn tiền tệ tùy chỉnh qua PlaceholderAPI
- **Cơ sở dữ liệu** — SQLite (mặc định) và MySQL với connection pool HikariCP
- **Bảng xếp hạng** — Top người chơi (mặc định 16 người), lọc theo wins / profit / largest win / worst profit / winstreak
- **[Chơi với Bot](/vi/ultracoinflip/guide/bot-game)** — Người chơi có thể đấu với bot của server
- **[Coinflip riêng tư & lời mời](/vi/ultracoinflip/guide/private-and-invites)** — Game chỉ dành cho người được mời, kèm nút Chấp nhận/Từ chối bấm được ngay trong chat
- **Nhiều coinflip cùng lúc** — Cho người chơi mở nhiều game một lúc, giới hạn cao hơn theo quyền
- **Chọn sấp/ngửa** — Tùy chọn cho người chơi chọn một mặt trước khi game được tạo
- **[Hệ thống thuế](/vi/ultracoinflip/guide/tax)** — Thuế cố định hoặc theo bậc, cấu hình riêng cho từng loại tiền
- **[Giới hạn cược](/vi/ultracoinflip/guide/betting-limits)** — Giới hạn ngày/tuần cho mỗi người chơi, theo từng loại tiền
- **[Giới hạn thắng & thua](/vi/ultracoinflip/guide/earnings-limits)** — Giới hạn số tiền một người chơi được thắng hoặc thua theo ngày, tuần, tháng hoặc khung thời gian trượt, có cảnh báo và mức riêng cho từng nhóm
- **[Coinflip hết hạn](/vi/ultracoinflip/guide/expiry)** — Tự hoàn tiền các coinflip đang chờ mà không ai vào sau một khoảng thời gian, và giữ game đang chờ qua các lần restart
- **[Menu hiện đại](/vi/ultracoinflip/guide/menus)** — Menu dialog dạng pop-up trên Paper 1.21.7+, menu Bedrock gốc cho người chơi Geyser/Floodgate, icon từ HeadDatabase và item-model
- **[Discord webhook](/vi/ultracoinflip/guide/discord)** — Gửi kết quả trò chơi và thông báo tạo game lên Discord, hỗ trợ PlaceholderAPI
- **Làm tròn số nguyên** — Tùy chọn làm tròn tiền thắng cho các loại tiền chỉ dùng số nguyên (token, shard,...)
- **Lệnh sự kiện** — Chạy lệnh console khi tạo game, bắt đầu, thắng, thua hoặc hủy
- **GUI tùy chỉnh hoàn toàn** — Bố cục, vật phẩm, màu sắc, 4 kiểu animation (default, slot-machine, circular, vertical)
- **Cài đặt cá nhân** — Người chơi tự chọn nhận những tin nhắn, title, action bar, boss bar và âm thanh nào
- **Giới hạn tiền tệ** — Khóa loại tiền theo world hoặc theo quyền
- **[Bảo mật](/vi/ultracoinflip/guide/security)** — Chống gian lận, hoàn tiền tự động, hệ thống backup
- **[60+ placeholder PlaceholderAPI](/vi/ultracoinflip/guide/placeholderapi)** — Thống kê, theo dõi lợi nhuận, bảng xếp hạng, thứ hạng người chơi, giới hạn
- **[Developer API](/vi/ultracoinflip/guide/developer-api)** — Sự kiện và hàm để các plugin khác kết nối vào
- **Hỗ trợ Folia** — Tương thích hoàn toàn với Paper Folia
- **17 ngôn ngữ** — EN, VI, FR, DE, NL, RU, ZH-CN, ZH-TW, ES, AR, IT, LT, PT-BR, PL, TR, KO, JA

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
| Minecraft Server | 1.8.8 – 26.x (Spigot / Paper / Folia) |
| Java | 8 trở lên (theo yêu cầu của phiên bản server) |
| Vault | Bất kỳ phiên bản mới nào |
| Plugin kinh tế | EssentialsX, CMI, hoặc bất kỳ plugin tương thích Vault (cho loại tiền `money`) |

## Phụ thuộc tùy chọn

| Plugin | Mục đích |
|---|---|
| PlaceholderAPI | 60+ placeholder cho scoreboard, hologram,... và tiền tệ tùy chỉnh qua PlaceholderAPI |
| PlayerPoints | Dùng points làm tiền tệ coinflip |
| TokenManager | Dùng token làm tiền tệ coinflip |
| BeastTokens | Dùng beast token làm tiền tệ coinflip |
| ExcellentEconomy | Dùng tiền tệ ExcellentEconomy (trước đây là CoinsEngine) |
| Floodgate | Menu Bedrock gốc cho người chơi vào qua Geyser |
| HeadDatabase | Dùng head từ HeadDatabase làm icon trong menu |

## Thống kê server

[![bStats](https://bstats.org/signatures/bukkit/UltraCoinFlip.svg)](https://bstats.org/plugin/bukkit/UltraCoinFlip)
