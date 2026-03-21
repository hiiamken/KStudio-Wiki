# Installation

## Step 1: Download

Download the latest `UltraDungeon.jar` from your purchase source.

## Step 2: Install

1. Stop your server
2. Place `UltraDungeon.jar` in the `plugins/` folder
3. (Optional) Place any integration plugins: Vault, MMOItems, MMOCore, etc.
4. Start the server

## Step 3: Verify

Run `/dungeon` in-game. You should see the help menu.

Check console for:
```
[UltraDungeon] UltraDungeon enabled successfully!
[UltraDungeon] Vault hooked successfully!        (if Vault installed)
[UltraDungeon] MMOItems hooked successfully!      (if MMOItems installed)
[UltraDungeon] MMOCore hooked successfully!       (if MMOCore installed)
```

## Generated Files

After first startup, the following files are created:

```
plugins/UltraDungeon/
├── config.yml              # Main configuration
├── room/                   # Dungeon room configs (auto-generated)
├── language/
│   ├── message_en.yml      # English messages
│   ├── message_vi.yml      # Vietnamese messages
│   └── message_ita.yml     # Italian messages
├── gui/
│   ├── wizard.yml          # Setup wizard GUI config
│   └── gui_config.yml      # General GUI appearance
├── data/
│   └── playerdata.db       # Player data (H2 database)
└── progression/            # Progression requirements
```

## Updating

1. Stop the server
2. Replace `UltraDungeon.jar` with the new version
3. Start the server
4. New config keys are added automatically — your existing config is preserved

::: warning
Always back up your `plugins/UltraDungeon/` folder before updating.
:::
