# PlaceholderAPI

## Overview

UltraDungeon registers placeholders with [PlaceholderAPI](https://www.spigotmc.org/resources/placeholderapi.6245/) for use in scoreboards, holograms, and other plugins.

## Setup

1. Install PlaceholderAPI
2. Start the server — expansion registers automatically

## Available Placeholders

| Placeholder | Description |
|---|---|
| `%ultradungeon_points%` | Player's total points |
| `%ultradungeon_season_points%` | Current season points |
| `%ultradungeon_dungeon%` | Current dungeon name (or empty) |
| `%ultradungeon_status%` | Current game status |
| `%ultradungeon_kills%` | Kills in current session |
| `%ultradungeon_deaths%` | Deaths in current session |
| `%ultradungeon_tickets_<dungeon>%` | Remaining tickets for a dungeon |
| `%ultradungeon_completions_<dungeon>%` | Total completions for a dungeon |
| `%ultradungeon_best_score_<dungeon>%` | Best score for a dungeon |
| `%ultradungeon_best_time_<dungeon>%` | Best time for a dungeon |
| `%ultradungeon_streak%` | Current win streak |
| `%ultradungeon_best_streak%` | Best win streak |

## Example Usage

Scoreboard line (using FeatherBoard or similar):
```
&7Points: &e%ultradungeon_points%
&7Season: &b%ultradungeon_season_points%
&7Streak: &6%ultradungeon_streak%
```
