# Menus & Icons

Every chest menu in UltraCoinFlip is set up in the files inside `plugins/UltraCoinFlip/gui/`. On Minecraft 1.21.7+ a few steps can also use native dialog screens, and Bedrock players get touch-friendly forms.

Run `/cf reload` after editing a menu file.

## Menu files

| File | Menu | Opens from |
|---|---|---|
| `mainmenu.yml` | Coinflip list (`list-gui`) and the games shown in it (`game-item`) | `/cf` |
| `create.yml` | Create menu (`create-gui`) | Create button, `/cf create` |
| `heads-tails.yml` | Heads or Tails choice (`heads-tails-gui`) | Creating a game, when `heads-tails.enabled` is `true` in `config.yml` |
| `flipping.yml` | Flip animation (`coinflip-gui`) | Every game once it starts |
| `history.yml` | Game history (`history-gui`) and its entries (`history-item`) | History button, `/cf history` |
| `leaderboard.yml` | Leaderboard (`leaderboard-gui`) | Leaderboard button, `/cf leaderboard` |
| `settings.yml` | Player settings (`settings-gui`) | Your stats head in the coinflip list, `/cf settings` |
| `stats.yml` | Player stats (`stats-gui`) | `/cf stats [player]`, when `stats.display-mode` is `GUI` in `config.yml` |
| `audit.yml` | Admin dashboard (`audit-gui`) | `/cf audit` |

### Where menu text lives

Menu files hold the layout: size, slots, materials and on/off switches. Most titles, item names and lore are in your language file, `langs/messages_<lang>.yml`, under `gui.<file name>` followed by the same path as in the menu file:

```yaml
# langs/messages_en.yml
gui:
  mainmenu:              # gui/mainmenu.yml
    list-gui:
      create:            # the list-gui.create button
        title: '&6&lCreate CoinFlip'
        lore:
          - "&8&m━━━━━━━━━━━━━━━━"
          - "&7Click to create a"
          - "&7new coinflip game"
          - "&8&m━━━━━━━━━━━━━━━━"
```

Edit the file for the `language` set in `config.yml`. A few text keys stay in the menu files, such as `game-item.display-name` in `mainmenu.yml` and the preset button `title` in `create.yml`. A text key you add straight into a menu file (for example `title` under `list-gui.create`) is used instead of the language file.

Text for dialogs is in the same language file, under `dialog:`.

## Item options

Buttons in the menu files share these keys. For example, the Create button in `mainmenu.yml`:

```yaml
create:
  slot: 40
  enabled: true
  material: 'NETHER_STAR'
  glowing: false
  custom-model-data: 0
  item-model: ''
  bedrock-image: 'https://cdn.jsdelivr.net/gh/hiiamken/UltraCoinFlip-API@icons-v1/icons/create.png'
```

| Key | What it does |
|---|---|
| `slot` | Position in the menu, starting at `0` in the top-left corner |
| `enabled` | `false` hides the button. Only works on buttons that have this key in the default files (see Button switches below) |
| `material` | The item (see Materials below) |
| `glowing` | `true` adds the enchantment glint |
| `custom-model-data` | Custom model data number for resource packs (1.14+). `0` turns it off |
| `item-model` | Item model ID such as `namespace:path` (1.21.4+). Without a namespace, `minecraft:` is used. `''` turns it off, and older servers ignore it |
| `bedrock-image` | Image on this button in Bedrock forms (see Bedrock menus below) |

### Materials

- Use Bukkit material names such as `NETHER_STAR`, `BLACK_STAINED_GLASS_PANE` or `PLAYER_HEAD`.
- On 1.8–1.12 servers, add a data value after a colon where the old item needs one, for example `STAINED_GLASS_PANE:15` for a black pane or `SKULL_ITEM:3` for a player head. The default files show the old name in a comment next to materials that changed.
- If a material doesn't exist on your server version, the console warns you when the menus load. For some items, such as fillers, the plugin also writes a working default back into the file.

### Names and lore

- A lore line that is empty or only holds color codes, such as `""` or `"&7"`, shows as a blank line. Use it as a spacer.
- A `display-name` of `''` or `' '` shows no item name. The default fillers use this.

### HeadDatabase heads

With the HeadDatabase plugin installed, `material: 'hdb-<id>'` uses a head from its database:

```yaml
filler:
  material: 'hdb-1234'
```

This works on filler and extra filler items, the create menu's + and − preset buttons, and the settings on/off icons (`settings-gui.toggle`). On other buttons an `hdb-` material shows a plain player head. A plain head is also shown when HeadDatabase isn't installed, is still loading, or doesn't know the ID.

### Player heads

Items with `material: 'PLAYER_HEAD'` can choose which skin to show:

```yaml
game-item:
  material: 'PLAYER_HEAD'
  player-head:
    type: 'Host'      # Host, Base64 or Default
    texture: ''       # Base64 texture value, used when type is Base64
```

| `type` | Shows | Used by |
|---|---|---|
| `Host` | The player who created the game | `game-item` |
| `Opponent` | The other player in that game, or the bot's head in bot games | `history-item` |
| `Winner` | The player who won that game | `history-item` |
| `Player` | The player looking at the menu | `list-gui.stats`, `history-gui.stats` and other buttons |
| `Base64` | The skin in `texture`, for example a value copied from minecraft-heads.com | All heads |
| `Default` | A plain head | All heads |

- On other buttons, `type: 'Player'` with a player name in `texture` shows that player's head.
- The page buttons in `mainmenu.yml` use a single `base64-texture` key instead of a `player-head` section.
- The Play with Bot button takes its material from `house.display.material` in `config.yml`. Its head texture comes from `list-gui.house.player-head`.

## Filler items

Every menu except the flip animation has a `filler` that fills empty slots:

```yaml
filler:
  enabled: true
  material: 'BLACK_STAINED_GLASS_PANE'
  display-name: ' '
  glowing: false
  custom-model-data: 0
  item-model: ''
  slots: ["0-3", "5-9", "17-18", "26-27", "35-38", "42-44"]
```

- `enabled: false` removes the filler.
- `slots` takes single slots and ranges such as `"0-8"`. `slots: []` places no filler. If you delete the `slots` key, the menu's built-in layout is used.
- Buttons are never covered by the filler.
- The leaderboard has no `slots` in its default file, so its filler fills every empty slot until you add a list. The audit filler always fills every empty slot.
- The flip animation uses `layout.border-item` in `flipping.yml` instead.

### Extra fillers

Add more decorative items with sections named `filler2`, `filler3` and so on, next to `filler`. They take the same keys: `enabled`, `material`, `slots`, `display-name`, `lore`, `glowing`, `custom-model-data` and `item-model`.

Extra fillers never cover a slot that already holds an item, including the main filler. Take the slots out of the main `filler` first:

```yaml
list-gui:
  filler:
    slots: ["1-3", "5-7", "9", "17-18", "26-27", "35", "37-38", "42-43"]
  filler2:
    material: 'ORANGE_STAINED_GLASS_PANE'
    display-name: ' '
    slots: ["0", "8", "36", "44"]
```

Extra fillers work in every menu file except `flipping.yml`.

## Button switches

Set any of these to `false` to hide the button. Bedrock forms follow the same switches where they have that button.

| File | Key | Hides |
|---|---|---|
| All except `flipping.yml` | `<menu>.filler.enabled` | The filler |
| `mainmenu.yml` | `list-gui.leaderboard.enabled` | Leaderboard button |
| `mainmenu.yml` | `list-gui.history.enabled` | History button |
| `mainmenu.yml` | `list-gui.create.enabled` | Create button |
| `mainmenu.yml` | `list-gui.filter.enabled` | Filter button |
| `mainmenu.yml` | `list-gui.house.enabled` | Play with Bot button. It is also hidden when `house.enabled` is `false` in `config.yml` |
| `create.yml` | `create-gui.decrease.enabled` / `create-gui.increase.enabled` | All − / all + preset buttons |
| `create.yml` | `create-gui.decrease.buttons.<n>.enabled` / `create-gui.increase.buttons.<n>.enabled` | One preset button |
| `create.yml` | `create-gui.private-toggle.enabled` | Private toggle. It is also hidden when `invite.enabled` is `false` in `config.yml` |
| `create.yml` | `create-gui.back.enabled` | Back button |
| `history.yml` | `history-gui.back.enabled` | Back button |
| `leaderboard.yml` | `leaderboard-gui.filter.enabled` | Filter button |
| `leaderboard.yml` | `leaderboard-gui.currency.enabled` | Currency button |
| `leaderboard.yml` | `leaderboard-gui.back.enabled` | Back button |
| `settings.yml` | `settings-gui.back.enabled` | Back button |
| `settings.yml` | `settings-gui.settings.<setting>.enabled` | That setting's toggle |
| `stats.yml` | `stats-gui.back.enabled` | Back button |
| `flipping.yml` | `coinflip-gui.layout.player-slots.default.arrow-enabled` | Arrow in the default animation |

## Create menu

### Starting amount

The create menu opens on the amount set in `config.yml`:

```yaml
game-behavior:
  default-bet: 100      # -1 = start on the currency's min-bid
```

The amount always stays between the selected currency's `min-bid` and `max-bid`, whatever `default-bet` says. See [Currency Files](/ultracoinflip/config/currencies).

### Preset buttons

The − and + buttons change the bet by a fixed amount:

```yaml
create-gui:
  decrease:
    enabled: true
    material: 'RED_STAINED_GLASS_PANE'
    title: '&c&l-<amount>'
    glowing: false
    custom-model-data: 0
    item-model: ''
    buttons:
      1:
        slot: 9
        amount: 500
      2:
        slot: 10
        amount: 1000
        enabled: false       # hides only this button
```

- `decrease` takes the amount off the bet and `increase` adds it.
- Each button needs a `slot` and an `amount` above 0. Number the buttons 1, 2, 3 and so on. You can add as many as you like.
- `<amount>` in `title` shows the button's amount. The lore is in the language file, under `gui.create.create-gui.decrease.lore` and `gui.create.create-gui.increase.lore`.
- A button can set its own `material`, `title`, `lore`, `glowing`, `custom-model-data` and `item-model`. Anything it doesn't set comes from the `decrease` or `increase` section.
- `enabled: false` on `decrease` or `increase` hides the whole group, so players set the bet with the custom amount button only. On a single button, it hides just that button. While the filler is on, it takes the free slot.
- + never goes above the currency's `max-bid`. A − click that would drop the bet below `min-bid` sets the bet to 0.

### Other create menu buttons

| Button | Notes |
|---|---|
| `currency` | Left-click picks the next currency, right-click the previous one |
| `custom-amount` | Players type an amount such as `2500` or `1.5M`. `input.method` in `config.yml` picks `CHAT` or `ANVIL`. On Folia, or when the anvil can't open, chat is used |
| `create` | Uses `material` when the game can be created, `material-insufficient` when the player can't afford the bet and `material-disabled` when no currency is available |
| `private-toggle` | Uses `material` while the game is public and `material-private` while it is private. `glowing-when-private` makes it glow while private. See [Private Coinflips & Invites](/ultracoinflip/guide/private-and-invites) |
| `back` | Goes back to the coinflip list |

## Dialog menus (1.21.7+)

On Paper-based servers running 1.21.7 or newer, some steps can use Minecraft's native dialog screens instead of chest menus. Dialogs are off by default:

```yaml
dialog:
  enabled: false          # master switch
  create-side: true
  amount-input: true
  join-confirm: true
  house-confirm: true
  currency-select: true
  amount:
    fallback-max: 1000000
```

| Key | Dialog | When the dialog is off |
|---|---|---|
| `create-side` | Heads or Tails choice | Heads/tails chest menu |
| `amount-input` | Slider for the custom amount button | Chat or anvil input |
| `join-confirm` | Confirm screen after clicking a game in the list | The player joins right away |
| `house-confirm` | Confirm screen before a bot game | Heads/tails chest menu |
| `currency-select` | List of currencies on the currency button | Clicking cycles through currencies |

- `create-side` and `house-confirm` only matter when `heads-tails.enabled` is `true`. Without it there is no choice step and games start straight from the create menu.
- The slider runs from the currency's `min-bid` (at least 1) to its `max-bid`. For a currency with `max-bid: -1`, `amount.fallback-max` is the top of the slider. It picks whole numbers.
- The coinflip list, create menu, history, leaderboard, settings, stats and flip animation stay chest menus.
- On older servers and non-Paper servers the `dialog` settings do nothing. Server support is checked at startup. `enabled` and the other switches can be changed with `/cf reload`.
- If a dialog can't be shown, the console warns once and the player gets the chest menu instead. A join confirm that fails just joins the game.
- Bedrock players who get Bedrock forms see forms instead of these dialogs.

## Bedrock menus

Players who join through Geyser and Floodgate get native Bedrock forms instead of chest menus. This is on by default:

```yaml
bedrock:
  enabled: true
```

- UltraCoinFlip looks for **Floodgate** on its own server, not for Geyser:
  - Geyser on a BungeeCord or Velocity proxy: install Floodgate on the backend server that runs UltraCoinFlip too.
  - Geyser as a plugin on the same server: Floodgate must be installed on that server as well.
- Without Floodgate, Bedrock players get the normal chest menus.
- `bedrock.enabled` is only read at startup, so restart the server after changing it. Set it to `false` only if forms cause trouble. Bedrock players then use chest menus.

| Menu | Bedrock form |
|---|---|
| Coinflip list | A button for each game, plus Create, Play with Bot, Leaderboard, History, Settings and page buttons. Tapping your own game cancels it (needs `ultracoinflip.command.delete`) |
| Create menu | Currency dropdown, amount slider (a text box when the currency has no `max-bid`) and a Private toggle when invites and the private toggle are on |
| Heads or Tails | Heads and Tails buttons, or Play and Cancel for bot games |
| Settings | One toggle per setting |
| History | Your stats and one button per game, with page and back buttons |
| Leaderboard | The ranking as text, with filter, currency and back buttons |
| Audit | Dashboard text with a close button |

The stats menu and the flip animation stay chest menus. If a form can't be built, the player gets the chest menu.

Forms use the same text as the chest menus in your language file, plus a few `dialog.*` keys such as the currency and amount labels on the create form.

### Button images

Form buttons can show an image. Set it with `bedrock-image` next to the button in the menu file:

```yaml
list-gui:
  create:
    bedrock-image: 'https://example.com/icons/create.png'
```

- The value is a web link (`http://` or `https://`). Anything else is sent as a path inside the Bedrock resource pack.
- `bedrock-image: ''` removes the image.
- If the key is missing, the built-in icon is used.
- The default files set it on the coinflip list's create, bot, leaderboard, history and page buttons, on `game-item`, on the history back and page buttons and `history-item`, on the leaderboard filter, currency and back buttons, and on the audit close button (`audit-gui.items.close`).
- The Settings button on the coinflip list form reads `settings-gui.bedrock-image` in `settings.yml`. That key isn't in the default file, so add it to change the icon.

::: tip
The built-in icons are hosted at `https://cdn.jsdelivr.net/gh/hiiamken/UltraCoinFlip-API@icons-v1/icons/`. Every different image is a separate download on the player's device, so reuse the same image for similar buttons.
:::
