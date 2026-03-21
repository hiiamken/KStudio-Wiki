# Cài đặt

## Bước 1: Tải về

Tải file `UltraDungeon.jar` mới nhất từ nguồn mua hàng của bạn.

## Bước 2: Cài đặt

1. Tắt server
2. Đặt `UltraDungeon.jar` vào thư mục `plugins/`
3. (Tùy chọn) Cài thêm plugin tích hợp: Vault, MMOItems, MMOCore, v.v.
4. Khởi động server

## Bước 3: Kiểm tra

Chạy `/dungeon` trong game. Bạn sẽ thấy menu trợ giúp.

Kiểm tra console:
```
[UltraDungeon] UltraDungeon enabled successfully!
[UltraDungeon] Vault hooked successfully!        (nếu cài Vault)
[UltraDungeon] MMOItems hooked successfully!      (nếu cài MMOItems)
[UltraDungeon] MMOCore hooked successfully!       (nếu cài MMOCore)
```

## File được tạo

Sau lần khởi động đầu tiên, các file sau được tạo:

```
plugins/UltraDungeon/
├── config.yml              # Cấu hình chính
├── room/                   # Config dungeon (tự động tạo)
├── language/
│   ├── message_en.yml      # Tiếng Anh
│   ├── message_vi.yml      # Tiếng Việt
│   └── message_ita.yml     # Tiếng Ý
├── gui/
│   ├── wizard.yml          # Config GUI setup wizard
│   └── gui_config.yml      # Giao diện GUI chung
├── data/
│   └── playerdata.db       # Dữ liệu người chơi (H2)
└── progression/            # Yêu cầu progression
```

## Cập nhật

1. Tắt server
2. Thay `UltraDungeon.jar` bằng phiên bản mới
3. Khởi động server
4. Config key mới được thêm tự động — config cũ được giữ nguyên

::: warning
Luôn backup thư mục `plugins/UltraDungeon/` trước khi cập nhật.
:::
