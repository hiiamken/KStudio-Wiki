# Gates & Loot Chests

## Gates

Gates are barriers that block player progression until a specific wave is cleared.

### How Gates Work
1. A gate is a region (two corner blocks) that acts as a wall
2. The gate opens (disappears) when its assigned wave is completed
3. Players cannot pass through a closed gate

### Setup
Gates are configured through the **Editor GUI** (not the setup wizard) since they require in-world block selection:

1. Open the editor: `/dungeon edit <name>` → Editor GUI
2. Click **Gates**
3. Click **Add Gate**
4. Right-click the two corner blocks of the gate region
5. Set the trigger wave number
6. Save

### Config Reference

```yaml
Gates:
  gate_1:
    pos1: {world: world, x: 100, y: 65, z: 200}
    pos2: {world: world, x: 100, y: 68, z: 204}
    trigger-stage: 3
    material: IRON_BARS    # block type for the gate
```

## Loot Chests

Loot chests are special chests placed in the dungeon that become available after specific waves.

### How Loot Chests Work
1. A loot chest is placed at a specific block location
2. It becomes interactable after its trigger wave is cleared
3. Each player can open it once per dungeon run
4. Contents are defined per-chest in the config

### Setup

1. Open the editor
2. Click **Loot Chests**
3. Click **Add Chest**
4. Right-click the chest block in the world
5. Configure trigger wave and contents
6. Save

### Config Reference

```yaml
LootChests:
  chest_1:
    location: {world: world, x: 110, y: 65, z: 210}
    trigger-stage: 2
    items:
      - <serialized ItemStack>
      - <serialized ItemStack>
```

::: info
Gates and Loot Chests use the **Unified Setup Flow** with `LocationSetupManager` for block-click sessions. The setup process guides you through each step with chat prompts.
:::
