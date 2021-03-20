# Minecraft Server Status Bot for Discord

 ![Example](https://github.com/emerysteele/minecraft-server-status-bot/blob/main/sample-member-list.png?raw=true)

## Requirements
- NodeJS
- Minecraft JAVA Server
- Discord Bot Token (obtainable through the [discord developer portal](https://discord.com/developers/applications/))

## Setup
- Download this git repository
- Rename config.example.json > config.json
- Edit config.json with your minecraft server info + discord bot token
- CD to repo directory & install required NodeJS packages:
  - `npm i discord.js`
  - `npm i node-fetch`
  - `npm i ms`
- Run using: `node app.js` or if you use pm2: `pm2 start app.js`
- Invite the bot to your discord server with permisions to:
  - `Send Messages`
  - `Manage Messages`
  - `Attach Files`
  - `Read Message History`

## Useage
- By default the bot command prefix is `mc!`, this can be changed in config.json
- Available commands are:
  - `help` replies with list of bot commands
  - `ip` replies with minecraft server address listed in your config file
  - `status|stat [serveraddress:port]` responds with status of minecraft server. If no server address given, bot will use the one set in your config file. Port will default to 25565 if not specified.
  - `online|on [serveraddress:port]` responds with list of online players. Pulls from player sample array, may have limitation on number of results.
  - `force-update|fu` forces the bot to update it's status with server player count. Can only be run by server moderators.
  - `pin` posts the status of your mc server + pins it to the Discord channel. status/pin will be auto updated at the interval set in your config.json file
  - `set <address|port|name|prefix|pinupdate|showPlayerSample> [value]` updates the value for the specified setting in the config. if no value is set, it will return the current value
- Examples:
  - `mc!set address mc.hypixel.net`
  - `mc!status`
  - `mc!on`
  - `mc!status mc.hypixel.net`

  ![Example](https://github.com/emerysteele/minecraft-server-status-bot/blob/main/sample.png?raw=true)

## Notes
- This bot uses the mcapi.us API.
  - mcapi.us is ratelimited to 600 requests per 10 minutes.
  - Try not to exceed this limit. If you do, your bots IP address could be blocked for abuse.



Updated Mar 20th 2021
