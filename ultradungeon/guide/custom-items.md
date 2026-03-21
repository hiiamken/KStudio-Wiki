# ItemsAdder / Oraxen

## Overview

UltraDungeon integrates with **ItemsAdder** and **Oraxen** to support custom items as dungeon rewards. The plugin auto-detects which one is installed (ItemsAdder is checked first, then Oraxen as fallback).

## Requirements

- **ItemsAdder** (1.x or 2.x+) with API enabled, **OR**
- **Oraxen** (1.x+) with API enabled

No extra config needed — UltraDungeon hooks automatically on startup. Check console for:
```
[UltraDungeon] ItemsAdder hooked successfully!
```
or
```
[UltraDungeon] Oraxen hooked successfully!
```

## Using Custom Items as Rewards

### Via GUI (Recommended)

1. Open the **Rewards** editor in the dungeon setup wizard
2. Click **+ Add New Reward**
3. Type `customitem` when asked for reward type
4. Enter the **item ID**:
   - **ItemsAdder**: `namespace:item_id` (e.g. `mypack:ruby_sword`)
   - **Oraxen**: `item_id` (e.g. `ruby_sword`)
5. Enter the **amount** and **drop rate**

### Via Room File (Manual)

```yaml
rewards:
  entries:
    - type: CUSTOM_ITEM
      customItemId: "mypack:ruby_sword"   # ItemsAdder format
      amount: 1
      rate: 25
    - type: CUSTOM_ITEM
      customItemId: "ruby_sword"          # Oraxen format
      amount: 2
      rate: 50
```

## How It Works

- Uses **reflection** to call ItemsAdder/Oraxen APIs — no compile-time dependency
- If the custom item plugin is not installed, `CUSTOM_ITEM` rewards are silently skipped with a console warning
- The plugin resolves the item ID at reward-give time, so item changes in ItemsAdder/Oraxen are reflected immediately

## Troubleshooting

| Issue | Solution |
|-------|----------|
| "CustomItemHook not available" in console | ItemsAdder/Oraxen not installed or API class not found |
| Reward gives nothing | Check item ID is correct — use `/ia list` or `/oraxen inventory` to verify |
| Plugin not detected on startup | Make sure ItemsAdder/Oraxen loads **before** UltraDungeon (check `plugin.yml` load order) |
