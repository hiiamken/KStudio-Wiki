# API cho Developer

UltraCoinFlip có API công khai cho các plugin khác. Bạn có thể đọc dữ liệu của plugin, như các loại tiền đang bật và giới hạn thắng thua của người chơi, và lắng nghe event ở từng bước của một ván coinflip.

API nằm trong package `com.kstudio.ultracoinflip.api`. API được phát hành trên JitPack từ repository [UltraCoinFlip-API](https://github.com/hiiamken/UltraCoinFlip-API).

## Thêm dependency

File jar của UltraCoinFlip đã chứa sẵn các class API. Hãy thêm API dưới dạng `provided` (Maven) hoặc `compileOnly` (Gradle) và tuyệt đối không shade nó vào plugin của bạn.

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

::: tip Chọn phiên bản
Phiên bản là tag release của repository API, có cả chữ `v`, ví dụ `v6.3.4`. Các tag hiện có được liệt kê trên [JitPack](https://jitpack.io/#hiiamken/UltraCoinFlip-API).
:::

API được biên dịch cho Java 8 và không cần gì ngoài Spigot hoặc Paper API.

## plugin.yml

Cho plugin của bạn tải sau UltraCoinFlip:

```yaml
# Plugin của bạn cần UltraCoinFlip
depend: [UltraCoinFlip]
```

```yaml
# UltraCoinFlip là tùy chọn
softdepend: [UltraCoinFlip]
```

## Lấy API

`UltraCoinFlipAPI.get()` trả về API. Hàm này ném `IllegalStateException` khi API chưa được đăng ký, nghĩa là UltraCoinFlip chưa được cài, khởi động thất bại hoặc đã bị tắt.

UltraCoinFlip đăng ký API ở cuối quá trình khởi động và gỡ nó ngay bước đầu tiên khi tắt. Hãy gọi `get()` mỗi khi cần thay vì giữ instance mãi.

Với `softdepend`, hãy kiểm tra UltraCoinFlip đã bật trước khi dùng bất kỳ class API nào, và đặt phần code đó trong một class riêng. Nhờ vậy class đó không bao giờ được tải trên server không có UltraCoinFlip:

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

## Các method

| Method | Trả về |
|---|---|
| `String getApiVersion()` | Phiên bản của hợp đồng API, hiện là `6.0.0`. Đây không phải phiên bản plugin và không đổi theo mỗi bản cập nhật |
| `String getPluginVersion()` | Phiên bản UltraCoinFlip đang cài |
| `int getActiveGameCount()` | Số ván đang chờ đối thủ trong danh sách coinflip. Ván đang tung và ván với bot không được tính |
| `Collection<String> getEnabledCurrencyIds()` | ID của mọi loại tiền đang bật, dạng collection chỉ đọc |
| `Optional<EarningsLimitInfo> getEarningsLimit(UUID player, String currencyId, LimitType type)` | Mức sử dụng một giới hạn thắng thua của người chơi (xem bên dưới) |

`UltraCoinFlipAPIProvider` là class UltraCoinFlip dùng để đăng ký API. Đừng gọi nó từ plugin của bạn.

### ID loại tiền

`getEnabledCurrencyIds()`, `getEarningsLimit(...)` và `getCurrencyId()` của mọi event đều dùng chung các ID loại tiền sau:

| Loại tiền | ID |
|---|---|
| Vault | `vault` |
| PlayerPoints | `playerpoints` |
| TokenManager | `tokenmanager` |
| BeastTokens | `beasttokens` |
| ExcellentEconomy / CoinsEngine | ID của loại tiền trong `coinsengine.yml` |
| Custom (PlaceholderAPI) | ID của loại tiền trong `customplaceholder.yml` |

::: warning Vault là `vault`, không phải `money`
API dùng các ID này, không dùng từ khóa `syntax-command` mà người chơi gõ sau `/cf create`.
:::

### Giới hạn thắng thua

`getEarningsLimit(player, currencyId, type)` trả về mức sử dụng một [giới hạn thắng thua](/vi/ultracoinflip/guide/earnings-limits) của người chơi:

- `Optional` rỗng khi có tham số là `null` hoặc `earnings-limit.enabled` là `false` trong `config.yml`.
- Một `EarningsLimitInfo` có `isEnabled()` là `false` (hạn mức và mức dùng đều là `0`) khi loại giới hạn đó chưa bật cho loại tiền.
- Các trường hợp còn lại trả về hạn mức và mức dùng của người chơi trong chu kỳ hiện tại. Người chơi online nhận mức cao nhất giữa `default` và các `groups` quyền mà họ có; người chơi offline nhận `default`.

Hàm này đọc database, nên đừng gọi nó mỗi tick.

```java
UltraCoinFlipAPI api = UltraCoinFlipAPI.get();
api.getEarningsLimit(player.getUniqueId(), "vault", LimitType.MAX_WIN).ifPresent(info -> {
    if (info.isEnabled()) {
        player.sendMessage("You can still win " + info.getRemaining() + " this period.");
    }
});
```

`EarningsLimitInfo` (trong `com.kstudio.ultracoinflip.api.limit`):

| Getter | Giá trị |
|---|---|
| `getPlayer()` | UUID người chơi |
| `getCurrencyId()` | ID loại tiền |
| `getType()` | `LimitType` |
| `getPeriod()` | `LimitPeriod` đặt trong `config.yml` |
| `isEnabled()` | Loại giới hạn này có đang bật cho loại tiền không |
| `getCap()` | Hạn mức của người chơi |
| `getUsed()` | Số đã tính trong chu kỳ này |
| `getRemaining()` | `cap - used`, không bao giờ dưới 0 |
| `getUsedFraction()` | `used / cap` trong khoảng 0 đến 1, hoặc 0 khi hạn mức bằng 0 hay nhỏ hơn |
| `getResetAtEpochMillis()` | Thời điểm kết thúc chu kỳ hiện tại, tính bằng mili giây epoch. Với chu kỳ trượt, đây là thời điểm hiện tại |

`getUsed()` tính gì tùy vào loại: `MAX_WIN` cộng tiền lãi từ các ván thắng, `MAX_LOSS` cộng tiền thua (là số dương), `MAX_NET_PROFIT` lấy tiền lãi trừ tiền thua (có thể âm) và `MAX_VOLUME` cộng tổng tiền đã cược.

### Enum

| Enum | Package | Giá trị |
|---|---|---|
| `LimitType` | `com.kstudio.ultracoinflip.api.limit` | `MAX_WIN`, `MAX_LOSS`, `MAX_NET_PROFIT`, `MAX_VOLUME` |
| `LimitPeriod` | `com.kstudio.ultracoinflip.api.limit` | `CALENDAR_DAILY`, `CALENDAR_WEEKLY`, `CALENDAR_MONTHLY`, `ROLLING_24H`, `ROLLING_7D` |
| `GameSide` | `com.kstudio.ultracoinflip.api.game` | `HEADS`, `TAILS`, `UNSPECIFIED` |

## Event

Mọi event nằm trong `com.kstudio.ultracoinflip.api.event`. Đây là các event Bukkit đồng bộ bình thường, nên chỉ cần lắng nghe bằng `@EventHandler`.

- Người chơi được truyền dưới dạng `UUID`. `Bukkit.getPlayer(uuid)` trả về `null` khi người chơi offline.
- Trong ván với bot, UUID của bot là `00000000-0000-0000-0000-000000000000`, giống `new UUID(0L, 0L)`.
- Số tiền tính theo loại tiền của ván. `getCurrencyId()` cho biết đó là loại tiền nào.

| Event | Hủy được | Kích hoạt |
|---|---|---|
| `CoinFlipPreCreateEvent` | Có | Trước khi tạo ván |
| `CoinFlipCreateEvent` | Không | Sau khi tạo ván |
| `CoinFlipPreJoinEvent` | Có | Trước khi người chơi vào ván |
| `CoinFlipJoinEvent` | Không | Sau khi người chơi vào ván, ngay trước khi tung |
| `CoinFlipPreResolveEvent` | Không | Khi bắt đầu tung, người thắng đã được bốc sẵn |
| `CoinFlipFinishEvent` | Không | Sau khi người thắng được trả tiền |
| `CoinFlipRefundEvent` | Không | Sau khi tiền cược của ván đang chờ được trả lại |
| `CoinFlipCancelEvent` | Không | Khi ván đang chờ bị gỡ mà không hoàn tiền ngay |
| `CoinFlipEarningsLimitReachedEvent` | Không | Khi người chơi đã chạm hạn mức bị chặn không cho chơi |

Một ván kích hoạt event theo thứ tự:

- Đấu với người chơi khác: `PreCreate` → `Create` → `PreJoin` → `Join` → `PreResolve` → `Finish`
- Đấu với bot: `PreCreate` → `Create` → `PreResolve` → `Finish`

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

**Hủy được.** Kích hoạt khi người chơi tạo ván từ menu, form Bedrock hoặc `/cf create`, sau khi UltraCoinFlip đã tự kiểm tra và trước khi ván được thêm vào danh sách. Event này cũng kích hoạt với [ván chơi với bot](/vi/ultracoinflip/guide/bot-game).

Hủy event thì ván không được tạo. Với ván đấu người chơi, tiền cược của chủ phòng đã bị trừ ở thời điểm này và sẽ được trả lại. Với ván chơi với bot, tiền cược chưa bị trừ. UltraCoinFlip không gửi tin nhắn nào khi bạn hủy, nên hãy tự báo lý do cho người chơi.

| Getter | Giá trị |
|---|---|
| `getHost()` | UUID của người tạo ván |
| `getBetAmount()` | Số tiền cược |
| `getCurrencyId()` | ID loại tiền |
| `getSide()` | Mặt chủ phòng đã chọn, hoặc `UNSPECIFIED` khi không có bước chọn (luôn như vậy với ván chơi với bot) |

### CoinFlipCreateEvent

Kích hoạt ngay sau khi ván được thêm vào danh sách coinflip. Với ván chơi với bot, event kích hoạt sau khi trừ tiền cược, ngay trước khi bắt đầu tung. Ván chơi với bot không bao giờ xuất hiện trong danh sách; ID ván chỉ dùng để nối các event của ván đó với nhau.

| Getter | Giá trị |
|---|---|
| `getGameId()` | ID ván |
| `getHost()` | UUID của người tạo ván |
| `getBetAmount()` | Số tiền cược |
| `getCurrencyId()` | ID loại tiền |
| `getSide()` | Mặt chủ phòng đã chọn, hoặc `UNSPECIFIED` |

### CoinFlipPreJoinEvent

**Hủy được.** Kích hoạt khi người chơi thử vào một ván từ danh sách, form Bedrock hoặc `/cf accept`. Event chạy sau khi UltraCoinFlip đã kiểm tra (ván riêng tư, giới hạn loại tiền, số dư và các giới hạn) và trước khi trừ tiền cược của người vào ván. Event này không kích hoạt với ván chơi với bot.

Hủy event thì ván vẫn nằm trong danh sách và người vào ván không bị trừ gì. Không có tin nhắn nào được gửi. UltraCoinFlip giữ khóa vào ván trong lúc event này chạy, nên hãy để listener xử lý thật nhanh.

| Getter | Giá trị |
|---|---|
| `getGameId()` | ID ván |
| `getJoiner()` | UUID của người vào ván |
| `getHost()` | UUID của người tạo ván |
| `getCurrencyId()` | ID loại tiền |
| `getBetAmount()` | Số tiền cược |

### CoinFlipJoinEvent

Kích hoạt sau khi tiền cược của người vào ván đã bị trừ và ván đã rời khỏi danh sách, ngay trước khi mở hiệu ứng tung đồng xu. Event này có cùng các getter với `CoinFlipPreJoinEvent`.

### CoinFlipPreResolveEvent

**Không hủy được.** Kích hoạt khi hiệu ứng tung đồng xu bắt đầu, cả với ván đấu người chơi lẫn ván chơi với bot. Người thắng đã được bốc sẵn và không thay đổi được.

Không phải ván nào kích hoạt event này cũng kích hoạt `CoinFlipFinishEvent` sau đó, ví dụ khi ván được hoàn tiền ngay lúc bắt đầu hoặc lượt tung bị dừng giữa chừng.

| Getter | Giá trị |
|---|---|
| `getGameId()` | ID ván |
| `getPredictedWinner()` | UUID của người sẽ thắng (UUID của bot nếu bot thắng) |
| `getPredictedLoser()` | UUID của người sẽ thua (UUID của bot nếu bot thua) |

### CoinFlipFinishEvent

Kích hoạt khi hiệu ứng tung đồng xu kết thúc, sau khi người thắng đã được trả tiền. Nếu người thắng offline hoặc trả tiền thất bại, tiền thưởng được lưu lại cho lần đăng nhập sau trước khi event kích hoạt.

Event chỉ kích hoạt khi hiệu ứng chạy đến cuối. Nếu lượt tung bị dừng giữa chừng, ví dụ cả hai người chơi đều thoát trước khi tung xong, UltraCoinFlip vẫn chốt kết quả nhưng không kích hoạt event này.

| Getter | Giá trị |
|---|---|
| `getGameId()` | ID ván |
| `getWinner()` | UUID của người thắng |
| `getLoser()` | UUID của người thua |
| `getCurrencyId()` | ID loại tiền |
| `getBetAmount()` | Tiền cược mỗi bên bỏ vào |
| `getPayout()` | Số tiền người thắng nhận sau thuế |
| `getTax()` | Tiền thuế: pot (hai phần cược) trừ đi tiền thưởng |
| `getWinningSide()` | `HEADS` hoặc `TAILS` khi chủ phòng đã chọn mặt, còn lại là `UNSPECIFIED`. Luôn là `UNSPECIFIED` với ván chơi với bot |
| `isHouseGame()` | `true` với ván chơi với bot |

Khi bot thắng, `getPayout()` và `getTax()` cho biết số tiền người chơi lẽ ra nhận được. Không có khoản nào được trả.

### CoinFlipRefundEvent

Kích hoạt sau khi tiền cược của một ván đang chờ đã được trả lại cho chủ phòng.

| `getReason()` | Khi nào |
|---|---|
| `cancelled` | Chủ phòng hủy ván từ menu, form Bedrock hoặc `/cf delete`, hoặc thoát server khi `game-behavior.refund-on-disconnect` là `true` (và `keep-coinflip-on-disconnect` là `false`) |
| `expired` | Ván [hết hạn](/vi/ultracoinflip/guide/expiry) trong lúc chủ phòng đang online |

Các khoản hoàn tiền lúc tắt server, hoặc sau này khi người chơi đăng nhập lại, không kích hoạt event này.

| Getter | Giá trị |
|---|---|
| `getGameId()` | ID ván |
| `getRefundedTo()` | UUID của chủ phòng được trả lại tiền cược |
| `getCurrencyId()` | ID loại tiền |
| `getAmount()` | Số tiền được trả lại |
| `getReason()` | `cancelled` hoặc `expired` |

### CoinFlipCancelEvent

Kích hoạt khi một ván đang chờ bị gỡ khỏi danh sách mà không được hoàn tiền ngay.

| `getReason()` | Khi nào |
|---|---|
| `expired` | Ván hết hạn. Nếu chủ phòng đang online và hoàn tiền thành công, một `CoinFlipRefundEvent` với lý do `expired` sẽ kích hoạt tiếp theo. Nếu không, chủ phòng nhận lại tiền cược ở lần đăng nhập sau |
| `disconnect` | Chủ phòng thoát server khi `keep-coinflip-on-disconnect` và `refund-on-disconnect` đều là `false`. Tiền cược được trả lại khi họ đăng nhập lại |

Chủ phòng tự hủy ván của mình sẽ kích hoạt `CoinFlipRefundEvent` thay vì event này.

| Getter | Giá trị |
|---|---|
| `getGameId()` | ID ván |
| `getCancelledBy()` | UUID của chủ phòng |
| `getReason()` | `expired` hoặc `disconnect` |

### CoinFlipEarningsLimitReachedEvent

Kích hoạt mỗi lần một người chơi đã chạm [giới hạn thắng thua](/vi/ultracoinflip/guide/earnings-limits) thử tạo ván, bắt đầu ván với bot hoặc vào một ván. Lượt đó bị chặn và người chơi nhận thông báo giới hạn, nên cùng một người chơi có thể kích hoạt event này nhiều lần. Event mô tả giới hạn đầu tiên được tìm thấy đã chạm hạn mức, kiểm tra theo thứ tự `MAX_WIN`, `MAX_LOSS`, `MAX_NET_PROFIT`, `MAX_VOLUME`.

| Getter | Giá trị |
|---|---|
| `getPlayer()` | UUID người chơi |
| `getCurrencyId()` | ID loại tiền |
| `getType()` | `LimitType` đã chạm |
| `getPeriod()` | `LimitPeriod` hiện tại |
| `getCap()` | Hạn mức của người chơi |
| `getUsed()` | Số đã tính trong chu kỳ này |
| `getResetAtEpochMillis()` | Thời điểm kết thúc chu kỳ hiện tại, tính bằng mili giây epoch. Với chu kỳ trượt, đây là thời điểm hiện tại |
| `getInfo()` | Cùng dữ liệu đó dưới dạng `EarningsLimitInfo` |

```java
@EventHandler
public void onLimitReached(CoinFlipEarningsLimitReachedEvent event) {
    Bukkit.getLogger().info(event.getPlayer() + " reached " + event.getType()
        + " in " + event.getCurrencyId() + " (" + event.getUsed() + "/" + event.getCap() + ")");
}
```
