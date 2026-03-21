# Language Files

UltraDungeon hỗ trợ nhiều ngôn ngữ. File ngôn ngữ nằm tại `plugins/UltraDungeon/language/`.

## Ngôn ngữ có sẵn

| File | Ngôn ngữ |
|---|---|
| `message_en.yml` | Tiếng Anh |
| `message_vi.yml` | Tiếng Việt |
| `message_ita.yml` | Tiếng Ý |

## Đổi ngôn ngữ

Trong `config.yml`:
```yaml
language: vi    # en, vi, hoặc ita
```

## Tuỳ chỉnh tin nhắn

Tất cả tin nhắn hỗ trợ:
- **Mã màu**: `&a`, `&b`, `&c`, `&6`, v.v.
- **Mã format**: `&l` (đậm), `&o` (nghiêng), `&n` (gạch chân)
- **Placeholder**: `%player%`, `%dungeon%`, `%amount%`, v.v.
- **Prefix**: `%prefix%` tự động thay thế bằng prefix đã cấu hình

## Thêm ngôn ngữ mới

1. Copy `message_en.yml` thành `message_<mã>.yml`
2. Dịch tất cả giá trị (giữ nguyên key)
3. Đặt `language: <mã>` trong `config.yml`
4. Chạy `/dungeon reload`
