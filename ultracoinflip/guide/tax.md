# Tax System

UltraCoinFlip includes a **tier-based tax system** that deducts a percentage from winnings based on the bet amount.

## How it works

When a player wins, the tax is deducted from the **total pot** before paying out. The tax rate depends on which tier the bet amount falls into.

**Example:** Player bets 10,000. Pot = 20,000. With 5% tax → winner receives 19,000.

## Configuration

Tax is configured per currency file (e.g. `vault.yml`):

```yaml
tax:
  enabled: true
  tiers:
    - min: 0
      max: 9999
      rate: 0      # 0% tax under 10k
    - min: 10000
      max: 99999
      rate: 3      # 3% tax 10k–99k
    - min: 100000
      max: 999999
      rate: 5      # 5% tax 100k–999k
    - min: 1000000
      max: -1      # -1 = no upper limit
      rate: 10     # 10% tax 1M+
```

- `rate` is a percentage (e.g. `5` = 5%)
- `max: -1` means no upper limit
- Tiers are checked from top to bottom — first match wins

## Bypassing tax

Players with the `ultracoinflip.bypass.tax` permission receive full winnings with no tax deducted.

## Where tax goes

By default, tax is simply removed from the economy (not given to anyone). If you want the server to collect tax revenue, you can configure a recipient in `config.yml`:

```yaml
tax:
  recipient: "console"  # run command to deposit to server account
```
