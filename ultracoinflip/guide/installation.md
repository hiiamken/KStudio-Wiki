# Installation

## Step 1 — Download the plugin

Download the latest `UltraCoinFlip.jar` from [Modrinth](https://modrinth.com) or [SpigotMC](https://www.spigotmc.org).

## Step 2 — Install Vault + Economy plugin

UltraCoinFlip **requires Vault** and at least one Vault-compatible economy plugin:

- **EssentialsX** (most common)
- **CMI**
- **AureliumSkills Economy**
- Any plugin that registers with Vault

Install both `Vault.jar` and your chosen economy plugin in the `plugins/` folder.

## Step 3 — Drop the jar

Place `UltraCoinFlip.jar` into your server's `plugins/` folder.

## Step 4 — Start the server

Start or restart your server. UltraCoinFlip will generate its configuration files automatically in `plugins/UltraCoinFlip/`.

```
plugins/UltraCoinFlip/
  config.yml          ← main configuration
  messages_en.yml     ← English language file
  currencies/
    vault.yml         ← Vault currency config
    playerpoints.yml  ← PlayerPoints config (if installed)
    coinsengine.yml   ← ExcellentEconomy / CoinsEngine config
    ...
  gui/                ← GUI layout files
```

## Step 5 — Configure

Open `config.yml` to set up your server's preferences. At minimum, make sure the `default-currency` matches the currency you want players to use.

::: tip
Use `/coinflip reload` to reload all configs without restarting the server.
:::

## Updating from an older version

Simply replace the old `UltraCoinFlip.jar` with the new one and restart the server. Your existing configuration files are preserved automatically. Check the update.txt included with the plugin download for any config changes between versions.

::: warning
Always make a backup of your `plugins/UltraCoinFlip/` folder before updating.
:::
