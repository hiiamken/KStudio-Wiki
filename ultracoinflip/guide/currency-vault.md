# Vault / EssentialsX

Vault is the **default** currency for UltraCoinFlip and the only one enabled out of the box. No additional setup is needed beyond installing Vault and an economy plugin.

## Requirements

- Plugin [Vault](https://www.spigotmc.org/resources/vault.34315/) — UltraCoinFlip won't start without it, even if you turn this currency off
- A Vault-compatible economy plugin: **EssentialsX**, **CMI**, etc.

## Config File: `vault.yml`

```yaml
enabled: true
unit: "$"
display-name: "Money"
syntax-command: "money"          # /cf create money 1000
broadcast-enabled: true
min-broadcast-amount: 100
min-bid: 1
max-bid: -1                      # -1 = unlimited
min-reserve-balance: 0
round-to-integer: false
tax-enabled: true
tax-rate: 0.1
dynamic-tax-enabled: false
```

The file also has `tax-rate-config`, `restrictions`, `messages` and `event-commands` sections — see [Currency Files](/ultracoinflip/config/currencies).

## Notes

- Vault is enabled by default — no extra steps needed. Set `enabled: false` if you only want to use other currencies.
- If no economy plugin is hooked into Vault, the console shows an error and players can't bet money. If your economy plugin hooks in after UltraCoinFlip has started, the currency is picked up automatically.
- `unit` is the symbol displayed next to amounts (by default after the number, e.g. `500$`).
- `display-name` is shown in GUIs and chat messages.
- `syntax-command` is the keyword used in `/cf create money 1000`.
- `min-reserve-balance` ensures players always keep at least this amount after betting.
- `round-to-integer` rounds bets down and winnings to the nearest whole number (useful if your economy doesn't support decimals).
