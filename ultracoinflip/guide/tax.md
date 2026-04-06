# Tax System

UltraCoinFlip includes a flexible tax system that deducts a percentage from winnings.

## How it works

When a player wins, the tax is deducted from the **total pot** before paying out.

**Example:** Player bets 10,000. Pot = 20,000. With 10% tax → winner receives 18,000.

## Configuration

Tax is configured **per currency** in each currency's config file (e.g. `vault.yml`, `playerpoints.yml`):

### Flat Tax Rate

```yaml
tax-enabled: true
tax-rate: 0.1          # 10% flat tax on all winnings
```

### Dynamic (Tiered) Tax Rates

Enable tiered tax rates so larger bets are taxed more:

```yaml
tax-enabled: true
tax-rate: 0.1                    # fallback rate if no tier matches
dynamic-tax-enabled: true
tax-rate-config:
  base-tax-rate: 0.1
  tiers:
    - min-amount: 0
      max-amount: 100
      tax-rate: 0.05             # 5% tax for bets 0–100
    - min-amount: 100
      max-amount: 1000
      tax-rate: 0.10             # 10% tax for bets 100–1,000
    - min-amount: 1000
      max-amount: -1             # -1 = no upper limit
      tax-rate: 0.15             # 15% tax for bets 1,000+
```

- `tax-rate` values are decimals (e.g. `0.05` = 5%, `0.15` = 15%)
- `max-amount: -1` means no upper limit
- Tiers are checked from top to bottom — first match wins
- Each currency can have its own independent tax tiers

## Bypassing tax

Players with the `ultracoinflip.bypass.tax` permission receive full winnings with no tax deducted.

::: tip
You can set different tax rates for different currencies. For example, Vault at 5% and PlayerPoints at 10%.
:::
