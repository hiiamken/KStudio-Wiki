# ItemsAdder / Oraxen

## Tổng quan

UltraDungeon tích hợp với **ItemsAdder** và **Oraxen** để hỗ trợ custom items làm phần thưởng dungeon. Plugin tự phát hiện plugin nào đang cài (ItemsAdder kiểm tra trước, Oraxen làm fallback).

## Yêu cầu

- **ItemsAdder** (1.x hoặc 2.x+) với API bật, **HOẶC**
- **Oraxen** (1.x+) với API bật

Không cần config thêm — UltraDungeon tự hook khi khởi động. Kiểm tra console:
```
[UltraDungeon] ItemsAdder hooked successfully!
```
hoặc
```
[UltraDungeon] Oraxen hooked successfully!
```

## Sử dụng Custom Items làm Reward

### Qua GUI (Khuyến nghị)

1. Mở **Rewards** editor trong dungeon setup wizard
2. Click **+ Add New Reward**
3. Gõ `customitem` khi được hỏi loại reward
4. Nhập **item ID**:
   - **ItemsAdder**: `namespace:item_id` (ví dụ: `mypack:ruby_sword`)
   - **Oraxen**: `item_id` (ví dụ: `ruby_sword`)
5. Nhập **số lượng** và **tỷ lệ rơi**

### Qua Room File (Thủ công)

```yaml
rewards:
  entries:
    - type: CUSTOM_ITEM
      customItemId: "mypack:ruby_sword"   # định dạng ItemsAdder
      amount: 1
      rate: 25
    - type: CUSTOM_ITEM
      customItemId: "ruby_sword"          # định dạng Oraxen
      amount: 2
      rate: 50
```

## Cách hoạt động

- Dùng **reflection** để gọi API ItemsAdder/Oraxen — không cần dependency lúc compile
- Nếu plugin custom item chưa cài, reward `CUSTOM_ITEM` bị bỏ qua với warning trong console
- Plugin resolve item ID lúc trao reward, nên thay đổi item trong ItemsAdder/Oraxen được phản ánh ngay

## Xử lý sự cố

| Vấn đề | Giải pháp |
|--------|-----------|
| "CustomItemHook not available" trong console | ItemsAdder/Oraxen chưa cài hoặc API class không tìm thấy |
| Reward không cho gì | Kiểm tra item ID đúng — dùng `/ia list` hoặc `/oraxen inventory` để xác nhận |
| Plugin không được phát hiện | Đảm bảo ItemsAdder/Oraxen load **trước** UltraDungeon (kiểm tra thứ tự load) |
