# Vault (Economy)

## Tổng quan

Tích hợp [Vault](https://www.spigotmc.org/resources/vault.34315/) cho tính năng economy. Vault là soft-dependency.

## Tính năng

| Tính năng | Mô tả |
|---|---|
| **Entry Fee** | Thu tiền để vào dungeon |
| **Money Reward** | Thưởng tiền khi hoàn thành |

## Setup

1. Cài Vault + plugin economy (EssentialsX, CMI, v.v.)
2. Khởi động server — UltraDungeon tự hook
3. Console: `[UltraDungeon] Vault hooked successfully!`

## Entry Fee

```yaml
EntryFee: 500.0
```
Kiểm tra khi `/dungeon join`. Trừ tiền trước khi game bắt đầu.

### GUI Setup
Trong wizard, click **Entry Fee** (Row 3, gold nugget):
- Left/Right click: ±100
- Shift: ±1000
- Middle-click: gõ số chính xác

## Money Reward

```yaml
MoneyReward: 1000.0
```
Thưởng cho mỗi người chơi hoàn thành.
