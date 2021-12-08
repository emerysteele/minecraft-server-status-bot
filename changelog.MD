# Changelog
## Dec 07 2021 - v0.1.3
- Added `package.json` with dependencies to ensure the proper module versions are installed.
- Added version number

## Oct 27 2020
- Added `showPlayerSample <true|false>` setting to enable/disable showing the sample player list.
  - Set to `true` by default

## Oct 26 2020
- Added `set pinupdate <true|false>` command for changing the pinupdate from within discord
  - Can only be used by Discord moderators
- Fixed quote error in config.example.json file

## Oct 25 2020
- Added `set [address|port|name|prefix]` command for changing settings from within discord
  - Can only be used by Discord moderators
- Added `pin` command which posts the status of your server + pins it to the Discord channel
  -This pinned status is updated along with the bot status at the interval set in your `config.json` file
