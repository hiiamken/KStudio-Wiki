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
| `customplaceholder.yml` | Custom PlaceholderAPI |

## Cấu hình tiền tệ tiêu chuẩn

Dùng cho Vault, PlayerPoints, TokenManager, và BeastTokens:

```yaml
enabled: true

# Hiển thị
unit: "$"
display-name: "Money"
syntax-command: "money"            # từ khóa cho /cf create <keyword> <amount>

# Phát sóng
broadcast-enabled: true
min-broadcast-amount: 100

# Giới hạn cược
min-bid: 1
max-bid: -1                        # -1 = không giới hạn
min-reserve-balance: 0

# Làm tròn
round-to-integer: false            # làm tròn tiền thắng về số nguyên

# Thuế
tax-enabled: true
tax-rate: 0.1

# Thuế theo bậc (tùy chọn)
dynamic-tax-enabled: false
tax-rate-config:
  base-tax-rate: 0.1
  tiers:
    - min-amount: 0
      max-amount: 100
      tax-rate: 0.05
    - min-amount: 100
      max-amount: 1000
      tax-rate: 0.1
    - min-amount: 1000
      max-amount: -1
      tax-rate: 0.15

# Giới hạn thế giới & quyền
restrictions:
  enabled: false
  allowed-worlds: []
  blocked-worlds: []
  required-permissions: []

# Lệnh sự kiện
event-commands:
  on-created:
    commands: []
  on-start:
    commands: []
  on-win:
    commands: []
  on-lose:
    commands: []
  on-cancelled:
    commands: []
```

## ExcellentEconomy / CoinsEngine (`coinsengine.yml`)

```yaml
currencies:
  coins:
    enabled: true
    unit: "Coins"
    display-name: "Coins"
    syntax-command: "coin"
    min-bid: 1
    max-bid: -1
    round-to-integer: false
    tax-enabled: true
    tax-rate: 0.1
    # ... cùng tùy chọn như tiền tệ tiêu chuẩn
```

Khóa (`coins`, `gems`) phải khớp chính xác với ID tiền tệ trong ExcellentEconomy.

## Custom PlaceholderAPI (`customplaceholder.yml`)

Xem [Custom PlaceholderAPI Currencies](/vi/ultracoinflip/guide/currency-customplaceholder) để biết chi tiết.

```yaml
currencies:
  orbs:
    enabled: true
    placeholder: '%yourplugin_orbs%'
    unit: 'Orbs'
    display-name: 'Orbs'
    give-command: 'orbs give {player} {amount}'
    remove-command: 'orbs remove {player} {amount}'
    syntax-command: 'orb'
    round-to-integer: false
    # ... cùng tùy chọn như tiền tệ tiêu chuẩn
```

## Lệnh sự kiện

Chạy lệnh console tự động khi các sự kiện game xảy ra. Placeholder có sẵn:

| Placeholder | Mô tả |
|---|---|
| `%player%` | Người chơi liên quan |
| `%opponent%` | Đối thủ |
| `%winner%` | Người thắng |
| `%loser%` | Người thua |
| `%amount%` | Số tiền cược |
| `%winnings_formatted%` | Tiền thắng được định dạng |
| `%currency%` | Tên tiền tệ |

**Ví dụ:**
```yaml
event-commands:
  on-win:
    commands:
      - "broadcast &6%winner% &7vừa thắng &e%winnings_formatted% %currency%&7!"
      - "give %winner% diamond 1"
```
