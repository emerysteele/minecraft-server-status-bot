# Changelog
## Oct 26 2020
- Added `set pinupdate <true|false>` command for changing the pinupdate from within discord
  - Can only be used by Discord moderators
- Fixed quote error in config.example.json file

## Oct 25 2020
- Added `set [address|port|name|prefix]` command for changing settings from within discord
  - Can only be used by Discord moderators
- Added `pin` command which posts the status of your server + pins it to the Discord channel
  -This pinned status is updated along with the bot status at the interval set in your `config.json` file
