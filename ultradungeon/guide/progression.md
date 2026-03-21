# Progression System

## Overview

The progression system lets you lock dungeons behind requirements. Players must meet all requirements before they can join.

## Requirement Types

### 1. Completed Dungeons
Require completing another dungeon first.

```yaml
Requirements:
  completed-dungeons:
    - "tutorial_dungeon"
    - "beginner_cave"
```

### 2. Minimum Completions
Require completing a dungeon a specific number of times.

```yaml
Requirements:
  min-completions:
    tutorial_dungeon: 3
    beginner_cave: 1
```

### 3. Permission Level
Require a minimum permission-based level (`ultradungeon.level.<number>`).

```yaml
Requirements:
  min-level: 10
```

### 4. Custom Permission
Require a specific permission node.

```yaml
Requirements:
  permission: "rank.vip"
```

### 5. MMOCore Level
Requires [MMOCore](./mmocore) integration.

```yaml
Requirements:
  mmocore-level: 15
```

### 6. MMOCore Class
Requires [MMOCore](./mmocore) integration.

```yaml
Requirements:
  mmocore-class: "Warrior"
```

## Configuration

Requirements are stored in the room file under the `Requirements` section:

```yaml
# room/advanced_dungeon.yml
Requirements:
  completed-dungeons:
    - "tutorial_dungeon"
  min-completions:
    tutorial_dungeon: 3
  min-level: 5
  mmocore-level: 10
  mmocore-class: "Warrior"
```

## Player Messages

When a player doesn't meet requirements, they receive a specific error message explaining what's missing. These messages are configurable in the language files under the `Progression` section.
