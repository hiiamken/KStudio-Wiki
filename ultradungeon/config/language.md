# Language Files

UltraDungeon supports multiple languages. Language files are located at `plugins/UltraDungeon/language/`.

## Available Languages

| File | Language |
|---|---|
| `message_en.yml` | English |
| `message_vi.yml` | Vietnamese |
| `message_ita.yml` | Italian |

## Switching Language

In `config.yml`:
```yaml
language: en    # en, vi, or ita
```

## Customizing Messages

All messages support:
- **Color codes**: `&a`, `&b`, `&c`, `&6`, etc.
- **Format codes**: `&l` (bold), `&o` (italic), `&n` (underline)
- **Placeholders**: `%player%`, `%dungeon%`, `%amount%`, etc.
- **Prefix**: `%prefix%` is auto-replaced with the configured prefix

## Adding a New Language

1. Copy `message_en.yml` to `message_<code>.yml`
2. Translate all values (keep the keys unchanged)
3. Set `language: <code>` in `config.yml`
4. Run `/dungeon reload`

## Key Sections

| Section | Content |
|---|---|
| `Format` | Number formats, time display |
| `Command` | Command messages (join, leave, create, etc.) |
| `Gameplay` | In-game messages (waves, boss, death, victory) |
| `Score` | Score breakdown display |
| `Ticket` | Ticket system messages |
| `Party` | Party system messages |
| `Wizard` | Setup wizard messages |
| `Progression` | Unlock requirement messages |
| `Vault` | Economy messages |
| `Reward` | Reward notification messages |
