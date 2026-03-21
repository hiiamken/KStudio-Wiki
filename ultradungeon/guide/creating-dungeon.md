# Creating a Dungeon

## Using the Setup Wizard

The easiest way to create a dungeon is through the in-game GUI wizard.

```
/dungeon create <name>
```

This opens a 6-row inventory GUI with all dungeon settings organized by category.

## Wizard Layout

| Row | Settings |
|---|---|
| **Row 1** | Border (decorative) |
| **Row 2** | Display Name, Max Players, Time Limit, Info |
| **Row 3** | Spawn Point, Border Region, Border Preview, Entry Fee (Vault) |
| **Row 4** | Ticket System, Permission Gate, HP Scaling, Scale Values |
| **Row 5** | Waves & Mobs, Rewards, Checkpoints, Money Reward (Vault), Status |
| **Row 6** | Cancel, Create/Save |

## Required Settings

These must be configured before you can save:

1. **Display Name** — The name shown to players (supports `&` color codes)
2. **Spawn Point** — Where players teleport when joining
3. **Border Region** — Two corners defining the play area (prevents players from escaping)
4. **Waves** — At least 1 wave with mobs

## Optional Settings

- **Ticket System** — Require tickets to enter
- **Permission Gate** — Restrict access by permission node
- **HP Scaling** — Scale mob HP based on player count
- **Checkpoints** — Respawn points throughout the dungeon
- **Entry Fee** — Vault money cost to join (requires Vault)
- **Money Reward** — Vault money given on completion (requires Vault)

## Step-by-Step Guide

### 1. Set Display Name
Click the **Name Tag** icon → type the display name in chat. Supports `&` color codes.

### 2. Set Spawn Point
Stand at the desired spawn location → click **Spawn Point** → run `/dungeon set`.

### 3. Set Border (Required)
Click **Border Region** → stand at corner 1 → `/dungeon set` → stand at corner 2 → `/dungeon set`.
The border defines the play area and prevents players from escaping the dungeon.

Use **Preview Border** to see a particle outline for 5 seconds.

### 4. Configure Waves
Click **Waves & Mobs** to open the wave editor. See [Waves & Mobs](./waves) for details.

### 5. Add Rewards
Click **Rewards** to open the reward editor. See [Rewards](./rewards) for details.

### 6. Save
Click the **Create** button (bottom-right). The status indicator shows whether all required settings are configured.

## Editing an Existing Dungeon

```
/dungeon edit <name>
```

This loads the existing dungeon config into the wizard GUI. All settings are preserved — make your changes and click **Save**.

::: warning
If you close the wizard without saving, your changes are lost. The plugin will remind you in chat with instructions to continue: `/dungeon continue <name>`.
:::
