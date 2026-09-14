# Developer API

UltraCoinFlip has a public API for other plugins. You can read plugin data, such as enabled currencies and a player's earnings limits, and listen to events for every step of a coinflip.

The API is in the `com.kstudio.ultracoinflip.api` package. It is published on JitPack from the [UltraCoinFlip-API](https://github.com/hiiamken/UltraCoinFlip-API) repository.

## Adding the dependency

The UltraCoinFlip jar already contains the API classes. Add the API as `provided` (Maven) or `compileOnly` (Gradle) and never shade it into your plugin.

### Maven

```xml
<repositories>
    <repository>
        <id>jitpack.io</id>
        <url>https://jitpack.io</url>
    </repository>
</repositories>

<dependencies>
    <dependency>
        <groupId>com.github.hiiamken</groupId>
        <artifactId>UltraCoinFlip-API</artifactId>
        <version>v6.3.4</version>
        <scope>provided</scope>
    </dependency>
</dependencies>
```

### Gradle (Groovy)

```groovy
repositories {
    maven { url 'https://jitpack.io' }
}

dependencies {
    compileOnly 'com.github.hiiamken:UltraCoinFlip-API:v6.3.4'
}
```

### Gradle (Kotlin)

```kotlin
repositories {
    maven("https://jitpack.io")
}

dependencies {
    compileOnly("com.github.hiiamken:UltraCoinFlip-API:v6.3.4")
}
```

::: tip Picking a version
The version is a release tag of the API repository, including the `v`, for example `v6.3.4`. The available tags are listed on [JitPack](https://jitpack.io/#hiiamken/UltraCoinFlip-API).
:::

The API is compiled for Java 8 and needs nothing besides the Spigot or Paper API.

## plugin.yml

Make your plugin load after UltraCoinFlip:

```yaml
# Your plugin needs UltraCoinFlip
depend: [UltraCoinFlip]
```

```yaml
# UltraCoinFlip is optional
softdepend: [UltraCoinFlip]
```

## Getting the API

`UltraCoinFlipAPI.get()` returns the API. It throws an `IllegalStateException` when the API isn't registered, which means UltraCoinFlip isn't installed, failed to start, or has been disabled.

UltraCoinFlip registers the API at the end of its startup and removes it first thing when it shuts down. Call `get()` when you need the API instead of keeping the instance around.

With `softdepend`, check that UltraCoinFlip is enabled before you use any API class, and keep that code in its own class. That class then never loads on servers without UltraCoinFlip:

```java
public final class MyPlugin extends JavaPlugin {

    @Override
    public void onEnable() {
        if (getServer().getPluginManager().isPluginEnabled("UltraCoinFlip")) {
            CoinFlipHook.hook(this);
        } else {
            getLogger().info("UltraCoinFlip not found, coinflip features are off.");
        }
    }
}
```

```java
import com.kstudio.ultracoinflip.api.UltraCoinFlipAPI;
import org.bukkit.plugin.java.JavaPlugin;

final class CoinFlipHook {

    static void hook(JavaPlugin plugin) {
        try {
            UltraCoinFlipAPI api = UltraCoinFlipAPI.get();
            plugin.getLogger().info("Hooked into UltraCoinFlip " + api.getPluginVersion());
            plugin.getServer().getPluginManager().registerEvents(new CoinFlipListener(), plugin);
        } catch (IllegalStateException e) {
            plugin.getLogger().warning("UltraCoinFlip is installed but its API is not available.");
        }
    }
}
```

## Methods

| Method | Returns |
|---|---|
| `String getApiVersion()` | Version of the API contract, currently `6.0.0`. It is not the plugin version and doesn't change with every release |
| `String getPluginVersion()` | The installed UltraCoinFlip version |
| `int getActiveGameCount()` | Number of games waiting for an opponent in the coinflip list. Games that are already flipping and bot games aren't counted |
| `Collection<String> getEnabledCurrencyIds()` | IDs of all enabled currencies, as a read-only collection |
| `Optional<EarningsLimitInfo> getEarningsLimit(UUID player, String currencyId, LimitType type)` | A player's progress towards one earnings limit (see below) |

`UltraCoinFlipAPIProvider` is what UltraCoinFlip uses to register the API. Don't call it from your plugin.

### Currency IDs

The same currency IDs are used by `getEnabledCurrencyIds()`, `getEarningsLimit(...)` and every event's `getCurrencyId()`:

| Currency | ID |
|---|---|
| Vault | `vault` |
| PlayerPoints | `playerpoints` |
| TokenManager | `tokenmanager` |
| BeastTokens | `beasttokens` |
| ExcellentEconomy / CoinsEngine | The currency's ID in `coinsengine.yml` |
| Custom (PlaceholderAPI) | The currency's ID in `customplaceholder.yml` |

::: warning Vault is `vault`, not `money`
The API uses these IDs, not the `syntax-command` keywords players type after `/cf create`.
:::

### Earnings limits

`getEarningsLimit(player, currencyId, type)` returns a player's progress towards one [earnings limit](/ultracoinflip/guide/earnings-limits):

- An empty `Optional` when an argument is `null` or `earnings-limit.enabled` is `false` in `config.yml`.
- An `EarningsLimitInfo` with `isEnabled()` set to `false` (cap and usage `0`) when that limit type isn't turned on for the currency.
- Otherwise the player's cap and usage for the current period. Online players get the highest of `default` and the permission `groups` they have; offline players get `default`.

It reads the database, so don't call it every tick.

```java
UltraCoinFlipAPI api = UltraCoinFlipAPI.get();
api.getEarningsLimit(player.getUniqueId(), "vault", LimitType.MAX_WIN).ifPresent(info -> {
    if (info.isEnabled()) {
        player.sendMessage("You can still win " + info.getRemaining() + " this period.");
    }
});
```

`EarningsLimitInfo` (in `com.kstudio.ultracoinflip.api.limit`):

| Getter | Value |
|---|---|
| `getPlayer()` | Player UUID |
| `getCurrencyId()` | Currency ID |
| `getType()` | The `LimitType` |
| `getPeriod()` | The `LimitPeriod` set in `config.yml` |
| `isEnabled()` | Whether this limit type is on for the currency |
| `getCap()` | The player's cap |
| `getUsed()` | Amount counted so far this period |
| `getRemaining()` | `cap - used`, never below 0 |
| `getUsedFraction()` | `used / cap` between 0 and 1, or 0 when the cap is 0 or less |
| `getResetAtEpochMillis()` | End of the current period in epoch milliseconds. For rolling periods this is the current time |

What `getUsed()` counts depends on the type: `MAX_WIN` adds up profit from won games, `MAX_LOSS` the amount lost (as a positive number), `MAX_NET_PROFIT` profit minus losses (can be negative) and `MAX_VOLUME` the total amount bet.

### Enums

| Enum | Package | Values |
|---|---|---|
| `LimitType` | `com.kstudio.ultracoinflip.api.limit` | `MAX_WIN`, `MAX_LOSS`, `MAX_NET_PROFIT`, `MAX_VOLUME` |
| `LimitPeriod` | `com.kstudio.ultracoinflip.api.limit` | `CALENDAR_DAILY`, `CALENDAR_WEEKLY`, `CALENDAR_MONTHLY`, `ROLLING_24H`, `ROLLING_7D` |
| `GameSide` | `com.kstudio.ultracoinflip.api.game` | `HEADS`, `TAILS`, `UNSPECIFIED` |

## Events

All events are in `com.kstudio.ultracoinflip.api.event`. They are normal synchronous Bukkit events, so listen to them with `@EventHandler`.

- Players are given as `UUID`s. `Bukkit.getPlayer(uuid)` returns `null` when the player is offline.
- In bot games the bot's UUID is `00000000-0000-0000-0000-000000000000`, the same as `new UUID(0L, 0L)`.
- Amounts are in the game's currency. `getCurrencyId()` tells you which one.

| Event | Cancellable | Fires |
|---|---|---|
| `CoinFlipPreCreateEvent` | Yes | Before a game is created |
| `CoinFlipCreateEvent` | No | After a game is created |
| `CoinFlipPreJoinEvent` | Yes | Before a player joins a game |
| `CoinFlipJoinEvent` | No | After a player joins, right before the flip |
| `CoinFlipPreResolveEvent` | No | When the flip starts, with the winner already drawn |
| `CoinFlipFinishEvent` | No | After the winner is paid |
| `CoinFlipRefundEvent` | No | After a waiting game's bet is given back |
| `CoinFlipCancelEvent` | No | When a waiting game is removed without an instant refund |
| `CoinFlipEarningsLimitReachedEvent` | No | When a player at an earnings cap is stopped from playing |

A game fires its events in this order:

- Against another player: `PreCreate` → `Create` → `PreJoin` → `Join` → `PreResolve` → `Finish`
- Against the bot: `PreCreate` → `Create` → `PreResolve` → `Finish`

```java
import com.kstudio.ultracoinflip.api.event.CoinFlipFinishEvent;
import com.kstudio.ultracoinflip.api.event.CoinFlipPreCreateEvent;
import org.bukkit.Bukkit;
import org.bukkit.entity.Player;
import org.bukkit.event.EventHandler;
import org.bukkit.event.Listener;

public final class CoinFlipListener implements Listener {

    @EventHandler
    public void onPreCreate(CoinFlipPreCreateEvent event) {
        Player host = Bukkit.getPlayer(event.getHost());
        if (host != null && host.getWorld().getName().equals("spawn")) {
            event.setCancelled(true);
            host.sendMessage("You can't start a coinflip in this world.");
        }
    }

    @EventHandler
    public void onFinish(CoinFlipFinishEvent event) {
        if (event.isHouseGame() || event.getPayout() < 1_000_000) {
            return;
        }
        Player winner = Bukkit.getPlayer(event.getWinner());
        if (winner != null) {
            Bukkit.broadcastMessage(winner.getName() + " won " + event.getPayout() + " in a coinflip!");
        }
    }
}
```

### CoinFlipPreCreateEvent

**Cancellable.** Fires when a player creates a game from the menu, a Bedrock form or `/cf create`, after UltraCoinFlip's own checks and before the game is added to the list. It also fires for [bot games](/ultracoinflip/guide/bot-game).

Cancelling stops the game. In a game against players the host's bet has already been taken at this point and is given back. For a bot game the bet hasn't been taken yet. UltraCoinFlip sends no message when you cancel, so tell the player why.

| Getter | Value |
|---|---|
| `getHost()` | UUID of the player creating the game |
| `getBetAmount()` | Bet amount |
| `getCurrencyId()` | Currency ID |
| `getSide()` | The side the host picked, or `UNSPECIFIED` when there was no choice (always for bot games) |

### CoinFlipCreateEvent

Fires right after a game is added to the coinflip list. For bot games it fires after the bet is taken, just before the flip starts. Bot games never show up in the list; their game ID only links that game's events together.

| Getter | Value |
|---|---|
| `getGameId()` | Game ID |
| `getHost()` | UUID of the player who created the game |
| `getBetAmount()` | Bet amount |
| `getCurrencyId()` | Currency ID |
| `getSide()` | The side the host picked, or `UNSPECIFIED` |

### CoinFlipPreJoinEvent

**Cancellable.** Fires when a player tries to join a game from the list, a Bedrock form or `/cf accept`. It runs after UltraCoinFlip's checks (private games, currency restrictions, balance and limits) and before the joiner's bet is taken. It doesn't fire for bot games.

Cancelling keeps the game in the list and takes nothing from the joiner. No message is sent. UltraCoinFlip holds its join lock while this event runs, so keep the listener quick.

| Getter | Value |
|---|---|
| `getGameId()` | Game ID |
| `getJoiner()` | UUID of the player joining |
| `getHost()` | UUID of the player who created the game |
| `getCurrencyId()` | Currency ID |
| `getBetAmount()` | Bet amount |

### CoinFlipJoinEvent

Fires after the joiner's bet is taken and the game has left the list, right before the flip animation opens. It has the same getters as `CoinFlipPreJoinEvent`.

### CoinFlipPreResolveEvent

**Not cancellable.** Fires when the flip animation starts, in games against players and against the bot. The winner has already been drawn and can't be changed.

Not every game that fires this event fires `CoinFlipFinishEvent` afterwards, for example when the game is refunded while it starts or the flip is cut short.

| Getter | Value |
|---|---|
| `getGameId()` | Game ID |
| `getPredictedWinner()` | UUID of the player who will win (the bot UUID if the bot wins) |
| `getPredictedLoser()` | UUID of the player who will lose (the bot UUID if the bot loses) |

### CoinFlipFinishEvent

Fires when the flip animation ends, after the winner has been paid. If the winner is offline or the payment fails, the payout is saved for their next login before the event fires.

It only fires when the animation plays to the end. If the flip is cut short, for example because both players leave before it ends, UltraCoinFlip still settles the result but doesn't fire this event.

| Getter | Value |
|---|---|
| `getGameId()` | Game ID |
| `getWinner()` | UUID of the winner |
| `getLoser()` | UUID of the loser |
| `getCurrencyId()` | Currency ID |
| `getBetAmount()` | The bet each side put in |
| `getPayout()` | What the winner receives after tax |
| `getTax()` | Tax taken: the pot (two bets) minus the payout |
| `getWinningSide()` | `HEADS` or `TAILS` when the host picked a side, otherwise `UNSPECIFIED`. Always `UNSPECIFIED` in bot games |
| `isHouseGame()` | `true` for bot games |

When the bot wins, `getPayout()` and `getTax()` show what the player would have received. Nothing is paid out.

### CoinFlipRefundEvent

Fires after the bet of a waiting game has been given back to its host.

| `getReason()` | When |
|---|---|
| `cancelled` | The host cancelled the game from the menu, a Bedrock form or `/cf delete`, or left the server while `game-behavior.refund-on-disconnect` is `true` (and `keep-coinflip-on-disconnect` is `false`) |
| `expired` | The game [expired](/ultracoinflip/guide/expiry) while the host was online |

Refunds made at shutdown, or later when a player logs in again, don't fire this event.

| Getter | Value |
|---|---|
| `getGameId()` | Game ID |
| `getRefundedTo()` | UUID of the host who got the bet back |
| `getCurrencyId()` | Currency ID |
| `getAmount()` | Amount given back |
| `getReason()` | `cancelled` or `expired` |

### CoinFlipCancelEvent

Fires when a waiting game is taken out of the list without an instant refund.

| `getReason()` | When |
|---|---|
| `expired` | The game expired. If the host is online and the refund goes through, a `CoinFlipRefundEvent` with reason `expired` follows. Otherwise the host gets the bet back on their next login |
| `disconnect` | The host left the server while `keep-coinflip-on-disconnect` and `refund-on-disconnect` are both `false`. The bet is given back when they log in again |

A host cancelling their own game fires `CoinFlipRefundEvent` instead.

| Getter | Value |
|---|---|
| `getGameId()` | Game ID |
| `getCancelledBy()` | UUID of the game's host |
| `getReason()` | `expired` or `disconnect` |

### CoinFlipEarningsLimitReachedEvent

Fires every time a player who has already reached an [earnings limit](/ultracoinflip/guide/earnings-limits) tries to create a game, start a bot game or join a game. The attempt is blocked and the player gets the limit message, so the same player can fire this event many times. The event describes the first limit found at its cap, checked in the order `MAX_WIN`, `MAX_LOSS`, `MAX_NET_PROFIT`, `MAX_VOLUME`.

| Getter | Value |
|---|---|
| `getPlayer()` | Player UUID |
| `getCurrencyId()` | Currency ID |
| `getType()` | The `LimitType` that was reached |
| `getPeriod()` | The current `LimitPeriod` |
| `getCap()` | The player's cap |
| `getUsed()` | Amount counted this period |
| `getResetAtEpochMillis()` | Always `0` when UltraCoinFlip fires this event |
| `getInfo()` | The same data as an `EarningsLimitInfo` |

To get the end of the current period, call `getEarningsLimit(...)` with the same player, currency and type.

```java
@EventHandler
public void onLimitReached(CoinFlipEarningsLimitReachedEvent event) {
    Bukkit.getLogger().info(event.getPlayer() + " reached " + event.getType()
        + " in " + event.getCurrencyId() + " (" + event.getUsed() + "/" + event.getCap() + ")");
}
```
