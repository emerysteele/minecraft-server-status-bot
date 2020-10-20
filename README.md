# minecraft-server-status-bot
Minecraft Server Status Bot for Discord

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

## Useage
- By default command prefix is `mc!`, this can be changed in config.json
- Available commands are:
  - `help` replies with list of bot commands
  - `ip` replies with minecraft server address listed in your config file
  - `status [Server Address(optional)]` or `stat` responds with status of minecraft server. if no server address given, bot will use the one set in your config file
  - `online [Server Address(optional)]` or `on` responds with list of online players. pulls from player sample array, may have limitation on number of results
  - `force-update` or `fu` forces the bot to update it's status with server player count. can only be run by server moderators.
- Examples:
  - `mc!status`
  - `mc!on`
  - `mc!status mc.hypixel.net`

  ![Example](https://github.com/emerysteele/minecraft-server-status-bot/blob/main/sample.png?raw=true)

## Notes
- This bot uses the mcapi.ca API. The mcapi.ca API is ratelimited to 600 requests per 10 minutes. Try not to exceed this limit. If you do, your bots IP address could be blocked for abuse.
