# Vault (Economy)

## Overview

UltraDungeon integrates with [Vault](https://www.spigotmc.org/resources/vault.34315/) to provide economy-based features. Vault is a soft-dependency — the plugin works without it.

## Features

| Feature | Description |
|---|---|
| **Entry Fee** | Charge money to enter a dungeon |
| **Money Reward** | Give money on dungeon completion |

## Setup

1. Install Vault + an economy plugin (e.g., EssentialsX, CMI)
2. Start the server — UltraDungeon hooks automatically
3. Check console: `[UltraDungeon] Vault hooked successfully!`

## Entry Fee

Configured per-dungeon in the setup wizard or room file:

```yaml
EntryFee: 500.0
```

- Checked when player runs `/dungeon join`
- Money is deducted **before** the game starts
- If the player doesn't have enough, they get an error message

### GUI Setup
In the wizard, click the **Entry Fee** item (Row 3, gold nugget icon):
- Left/Right click: ±100
- Shift+Left/Right: ±1000
- Middle-click: type exact amount

## Money Reward

```yaml
MoneyReward: 1000.0
```

Given to each player who completes the dungeon. Configured the same way via the **Money Reward** item in the wizard (Row 5, emerald icon).

## Language Keys

```yaml
Vault:
  NotEnoughMoney: "%prefix%&c[Economy] &fYou need &6%cost% &fto enter!"
  EntryFeeCharged: "%prefix%&7[Economy] &fEntry fee of &6%cost% &fcharged."

Reward:
  Money: "%prefix%&a[Reward] &fYou received &6%amount%&f!"
```
