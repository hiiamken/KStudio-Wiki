# Tax System

UltraCoinFlip includes a flexible tax system that deducts a percentage from winnings.

## How it works

When a player wins, the tax is deducted from the **total pot** before paying out.

**Example:** Player bets 10,000. Pot = 20,000. With 10% tax → winner receives 18,000.

- The winner never gets back less than their own bet, so any rate above 50% pays out the same as 50%. Only a rate of `1.0` (100%) takes the whole pot.
- Payouts are rounded to 2 decimal places. With `round-to-integer: true` in the currency file, winnings are rounded to a whole number (and bets in that currency are rounded down to whole numbers).

## Configuration

Tax is configured **per currency** in each currency's config file in `plugins/UltraCoinFlip/currencies/` (e.g. `vault.yml`, `playerpoints.yml`). For `coinsengine.yml` and `customplaceholder.yml`, the same keys go under each currency's entry.

### Flat Tax Rate

```yaml
tax-enabled: true
tax-rate: 0.1          # 10% flat tax on all winnings
```

Set `tax-enabled: false` to take no tax for that currency.

### Dynamic (Tiered) Tax Rates

Enable tiered tax rates so larger bets are taxed more:

```yaml
tax-enabled: true
dynamic-tax-enabled: true
tax-rate-config:
  base-tax-rate: 0.1             # used when no tier matches
  tiers:
    - min-amount: 0
      max-amount: 100
      tax-rate: 0.05             # 5% tax for bets under 100
    - min-amount: 100
      max-amount: 1000
      tax-rate: 0.10             # 10% tax for bets from 100 up to 1,000
    - min-amount: 1000
      max-amount: -1             # -1 = no upper limit
      tax-rate: 0.15             # 15% tax for bets 1,000+
```

- `tax-rate` values are decimals (e.g. `0.05` = 5%, `0.15` = 15%)
- Tiers are matched against the **bet amount** (what one player bet), and the matching rate is applied to the whole pot
- `min-amount` is included, `max-amount` is not — a `0`–`100` tier covers bets below 100
- `max-amount: -1` means no upper limit
- If tiers overlap, the **last** matching tier in the list wins
- If no tier matches, `base-tax-rate` is used
- While dynamic tax is on, `base-tax-rate` and the tiers replace the flat `tax-rate`
- Each currency can have its own independent tax tiers

## Bypassing tax

Players with the `ultracoinflip.bypass.tax` permission receive full winnings with no tax deducted. The permission is checked on the winner and is not given to anyone by default.

## Bot games

Winnings from [Play with Bot](/ultracoinflip/guide/bot-game) use the same tax settings as the currency. Set `house.tax.enabled: false` in `config.yml` to pay bot game winnings without tax.

::: tip
You can set different tax rates for different currencies. For example, Vault at 5% and PlayerPoints at 10%.
:::
