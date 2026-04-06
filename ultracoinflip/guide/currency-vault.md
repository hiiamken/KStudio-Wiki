# Vault / EssentialsX

Vault is the **default and required** currency for UltraCoinFlip. No additional setup is needed beyond installing Vault and an economy plugin.

## Requirements

- Plugin [Vault](https://www.spigotmc.org/resources/vault.34315/)
- A Vault-compatible economy plugin: **EssentialsX**, **CMI**, **AureliumSkills**, etc.

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
tax-enabled: false
tax-rate: 0.1
dynamic-tax-enabled: false
```

## Notes

- Vault is enabled by default — no extra steps needed.
- `unit` is the symbol displayed next to amounts (e.g. `$500`).
- `display-name` is shown in GUIs and chat messages.
- `syntax-command` is the keyword used in `/cf create money 1000`.
- `min-reserve-balance` ensures players always keep at least this amount after betting.
- `round-to-integer` rounds winnings to the nearest whole number (useful if your economy doesn't support decimals).
