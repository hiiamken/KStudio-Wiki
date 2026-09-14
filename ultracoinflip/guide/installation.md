# Installation

## Step 1 — Download the plugin

Download the latest `UltraCoinFlip.jar` from [Modrinth](https://modrinth.com/plugin/ultracoinflip) or [SpigotMC](https://www.spigotmc.org/resources/%E2%AD%90-ultracoinflip-1-8-x-1-21-11-folia-support.130124/).

## Step 2 — Install Vault + Economy plugin

UltraCoinFlip **requires Vault**, plus a Vault-compatible economy plugin for the default `money` currency:

- **EssentialsX** (most common)
- **CMI**
- Any plugin that registers with Vault

Install both `Vault.jar` and your chosen economy plugin in the `plugins/` folder.

::: tip
The server won't load UltraCoinFlip without Vault. If your economy plugin hooks into Vault after UltraCoinFlip has started, the plugin picks it up automatically.
:::

## Step 3 — Drop the jar

Place `UltraCoinFlip.jar` into your server's `plugins/` folder.

## Step 4 — Start the server

Start or restart your server. UltraCoinFlip will generate its configuration files automatically in `plugins/UltraCoinFlip/`.

```
plugins/UltraCoinFlip/
  config.yml              ← main configuration
  sounds.yml              ← sound settings
  ultracoinflip.db        ← SQLite database (default)
  langs/
    messages_en.yml       ← English language file
    ...                   ← 16 more languages
  currencies/
    vault.yml             ← Vault currency config
    playerpoints.yml      ← PlayerPoints config
    tokenmanager.yml      ← TokenManager config
    beasttokens.yml       ← BeastTokens config
    coinsengine.yml       ← ExcellentEconomy / CoinsEngine config
    customplaceholder.yml ← custom PlaceholderAPI currencies
  gui/                    ← menu layout files (mainmenu.yml, create.yml, flipping.yml, ...)
```

## Step 5 — Configure

Open `config.yml` to set up your server's preferences, such as `language`. Only the Vault currency is enabled out of the box — to use another currency, set `enabled: true` in its file under `currencies/`. `default-currency` (default `auto`) decides which currency `/cf create <amount>` uses when players leave the currency out.

::: tip
Use `/coinflip reload` to reload all configs without restarting the server.
:::

## Updating from an older version

Simply replace the old `UltraCoinFlip.jar` with the new one and restart the server. Your existing configuration files are preserved automatically, and new options use their default values until you change them. Check the changelog on the download page for any config changes between versions.

::: warning
Always make a backup of your `plugins/UltraCoinFlip/` folder before updating.
:::
