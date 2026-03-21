# File cấu hình tiền tệ

Mỗi loại tiền có file riêng trong `plugins/UltraCoinFlip/currencies/`.

## Danh sách file

| File | Tiền tệ |
|---|---|
| `vault.yml` | Vault (EssentialsX, CMI,...) |
| `playerpoints.yml` | PlayerPoints |
| `tokenmanager.yml` | TokenManager |
| `beasttokens.yml` | BeastTokens |
| `coinsengine.yml` | ExcellentEconomy / CoinsEngine |

## Tham chiếu đầy đủ

```yaml
enabled: true

# Hiển thị
unit: "$"
display-name: "Tiền"

# Giới hạn cược
min-bid: 100
max-bid: 10000000

# Thuế (ghi đè cài đặt thuế global)
tax:
  enabled: false
  tiers:
    - min: 0
      max: 9999
      rate: 0
    - min: 10000
      max: 99999
      rate: 3
    - min: 100000
      max: -1
      rate: 5

# Giới hạn thế giới
world-restrictions:
  enabled: false
  mode: whitelist       # whitelist hoặc blacklist
  worlds:
    - world
    - world_nether
```

## ExcellentEconomy / CoinsEngine (`coinsengine.yml`)

```yaml
currencies:
  coins:
    enabled: true
    unit: "🪙"
    display-name: "Xu"
    min-bid: 100
    max-bid: 1000000
  gems:
    enabled: true
    unit: "💎"
    display-name: "Đá quý"
    min-bid: 1
    max-bid: 10000
```

Khóa (`coins`, `gems`) phải khớp chính xác với ID tiền tệ trong ExcellentEconomy.
