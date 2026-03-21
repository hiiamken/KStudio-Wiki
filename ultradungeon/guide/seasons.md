# Season System

## Overview

The season system provides **time-limited leaderboards** with automatic rewards for top players. All-time points are never affected — seasons only track a separate seasonal score.

## How It Works

1. A season runs for a set duration (e.g. 30 days or between explicit dates)
2. Players earn **season points** from dungeon completions (same scoring formula as all-time)
3. When a season ends, **top players receive reward commands** automatically
4. A **new season starts immediately** after the old one ends
5. The first season is auto-created on plugin startup if none exists

## Configuration

Located in `config.yml` under `scoring.season`.
Timezone is set globally at `general.timezone` (shared with ticket resets and all time-based features).

```yaml
general:
  timezone: "UTC"               # Java TimeZone ID (e.g. Asia/Ho_Chi_Minh, America/New_York)

scoring:
  season:
    enabled: true
    start-date: ""                # Explicit start (yyyy-MM-dd), empty = auto
    end-date: ""                  # Explicit end (yyyy-MM-dd), empty = auto
    duration-days: 30             # Fallback when dates are empty (30 = monthly, 7 = weekly)
    rewards:
      1:
        commands:
          - "give %player% diamond 64"
          - "say %player% achieved #1 in the dungeon season!"
      2:
        commands:
          - "give %player% diamond 32"
      3:
        commands:
          - "give %player% diamond 16"
```

### Two Scheduling Modes

| Mode | How to use | What happens when season ends |
|------|-----------|-------------------------------|
| **Explicit dates** | Set `start-date` and `end-date` (e.g. `2026-03-01` to `2026-03-31`) | New season auto-created using `duration-days` from end date |
| **Duration only** | Leave `start-date` and `end-date` empty | Plugin uses today as start, adds `duration-days` for end |

### Reward Placeholders

| Placeholder | Description |
|-------------|-------------|
| `%player%` | Player name |
| `%rank%` | Leaderboard rank |
| `%points%` | Season points |

## Viewing Season Info

- `/dungeon top` → **Season tab** (page 2) shows current season leaderboard
- Season start/end dates are displayed
- Rankings update in real-time
- **Personal Stats tab** (page 3) shows your season points, completions, and streaks

## Database

Season data is stored in two tables:

| Table | Contents |
|-------|----------|
| `season_points` | Per-player per-season point totals |
| `season_info` | Season metadata (ID, start date, end date, active flag) |

## Season Lifecycle

```
Plugin starts
  └─ No active season? → Create new season from config
  └─ Active season expired?
       └─ Distribute rewards to top players (console commands)
       └─ End current season
       └─ Create new season automatically
  └─ Active season still running → Do nothing
```
