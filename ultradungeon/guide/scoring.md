# Scoring & Leaderboard

## Scoring Formula

Final score is calculated as:

```
Score = (Base + Kill Bonus) × Speed × No-Death × Party × Streak
```

### Components

| Component | Description |
|---|---|
| **Base Points** | Random range from config (e.g., 50–100) |
| **Kill Bonus** | Per-kill points + boss kill multiplier |
| **Speed Bonus** | Multiplier based on remaining time % |
| **No-Death Bonus** | Multiplier if 0 deaths |
| **Party Size Bonus** | Fewer players = higher multiplier |
| **Streak Bonus** | Consecutive wins = escalating multiplier |
| **Boss Damage Bonus** | Points based on damage contribution |

### Configuration

```yaml
scoring:
  base:
    victory: 100
    defeat: -50
    death: -10

  kill-bonus:
    per-kill: 2
    boss-multiplier: 5

  speed-bonus:
    thresholds:
      75: 2.0    # 75%+ time remaining → 2x
      50: 1.5    # 50%+ → 1.5x
      25: 1.2    # 25%+ → 1.2x

  no-death-bonus:
    multiplier: 1.5

  party-size-bonus:
    1: 2.0
    2: 1.5
    3: 1.2
    4: 1.0

  streak:
    thresholds:
      3: 1.2     # 3 wins → 1.2x
      5: 1.5     # 5 wins → 1.5x
      10: 2.0    # 10 wins → 2x
```

## Leaderboard

Access via `/dungeon top`. Three tabs:

| Tab | Content |
|---|---|
| **All-Time** | Top players by total score |
| **Season** | Current season leaderboard |
| **Personal** | Your stats, completions, streaks |

## Score Breakdown

After dungeon completion, players receive a detailed score breakdown in chat showing each component's contribution.
