# Vault / EssentialsX

Vault is the default currency for UltraCoinFlip and requires no extra setup beyond installing Vault itself.

## Requirements

- [Vault](https://www.spigotmc.org/resources/vault.34315/) plugin
- A Vault-compatible economy plugin: **EssentialsX**, **CMI**, **AureliumSkills**, etc.

## Config file: `vault.yml`

```yaml
enabled: true
unit: "$"
display-name: "Money"
min-bid: 100
max-bid: 10000000
tax:
  enabled: false
  tiers: []
```

## Notes

- Vault currency is enabled by default.
- The `unit` field sets the prefix symbol displayed next to amounts (e.g. `$500`).
- `display-name` is shown in the GUI and chat messages.
- Set `min-bid` and `max-bid` to control the allowed bet range for this currency.
