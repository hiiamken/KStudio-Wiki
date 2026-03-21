# Checkpoints

## Tổng quan

Checkpoint là điểm hồi sinh đặt trong dungeon. Khi chết, người chơi hồi sinh tại checkpoint gần nhất đã kích hoạt thay vì spawn dungeon.

## Loại Trigger

| Trigger | Mô tả |
|---|---|
| `AUTO` | Tự động kích hoạt khi đạt wave/stage nhất định |
| `INTERACT` | Kích hoạt khi người chơi click phải vị trí checkpoint |
| `BOTH` | Kích hoạt bằng cả hai cách |

## Cài đặt

| Cài đặt | Mô tả |
|---|---|
| **Location** | Vị trí hồi sinh |
| **Trigger** | `AUTO`, `INTERACT`, hoặc `BOTH` |
| **Trigger Stage** | Wave nào kích hoạt (cho AUTO/BOTH) |
| **Interact Radius** | Bán kính phát hiện (cho INTERACT/BOTH, mặc định: 1.5) |

::: tip
Dùng `AUTO` cho dungeon tuyến tính. Dùng `INTERACT` cho dungeon dạng mở.
:::
