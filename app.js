const ms = require('ms');
const fetch = require('node-fetch');
const Discord = require('discord.js');
const client = new Discord.Client();

const config = require('./config.json');
const prefix = config.prefix;
const ipAddress = config.serverAddress;
const port = config.serverPort;
const updateInterval = config.updateInterval;
const serverName = config.serverName;

const updateChannel = async () => {
	console.log('Updating bot status')
    const res = await fetch(`https://mcapi.ca/ping/all/${ipAddress}${port ? `:${port}` : ''}`)
    if (!res) {
        return false
    }
    const body = await res.json()
    const players = body.players.online
    const playersMax = body.players.max
    const status = (body.status ? "Online" : "Offline")
	const playerCount = players + '/' + playersMax;
	const statusTitle = (playerCount.length <= 10 ? "Minecraft" :"MC");
	client.user.setActivity(statusTitle + ' | ' + playerCount);

    return true
}

client.on('ready', () => {
    console.log(`Ready. Logged as ${client.user.tag}.`)
	updateChannel()
    setInterval(() => {
        updateChannel()
    }, ms(updateInterval))
})

client.on('message', async (message) => {
	if(message.content.startsWith(prefix)){
		let args = message.content.replace(prefix, "").split(" ");//Remove prefix and split command arguments into an array
		let command = args.shift();//Store first argument and shift array
		  
		  
		// COMMANDS
		if(command === 'help'){
			let helpPage = args[0] || "1";
			if(helpPage === "1"){
				var commandList = "`"+prefix+"ip`\n`"+prefix+"status [serveraddress (optional)]` or `"+prefix+"stat`\n`"+prefix+"online [serveraddress (optional)]` or `"+prefix+"on`\n`"+prefix+"force-update` or `"+prefix+"fu`"
				message.reply(`bot commands:\n${commandList}`)
			}
			else if(helpPage === "2"){
				
			}
		}
		if(command === 'ip'){
			message.reply(`mc server address:\n${ipAddress}${port ? `:${port}` : ''}`)
		}
		if(command === 'force-update' || command === 'fu'){
			if (!message.member.hasPermission('MANAGE_MESSAGES')) {
				return message.channel.send('Only server moderators can run this command!')
			}
			message.delete().catch()
			const sentMessage = await message.channel.send("Updating the channels, please wait...")
			await updateChannel()
			sentMessage.edit("Channels were updated successfully!").then(sentMessage => {
				sentMessage.delete({ timeout: 1000 })
			})
			.catch(/*Your Error handling if the Message isn't returned, sent, etc.*/);
		}
		if(command === 'status' || command === "stat"){
			let saddress = args[0] || ipAddress;
			let sport = args[1] || port;
			const res = await fetch(`https://mcapi.ca/ping/all/${saddress}${sport ? `:${sport}` : ''}`)
			if (!res) return message.channel.send(`Looks like mcapi.ca is not reachable... Please verify it's online and it isn't being blocked!`)

			const body = await res.json()
			console.log(body)
			if(body.status){
				const attachment = new Discord.MessageAttachment(Buffer.from(body.favicon.substr('data:image/png;base64,'.length), 'base64'), "icon.png")
				var playerSample = body.players.sample
				var playersNow = ""
				if(playerSample != null){
					for (var i = 0; i < playerSample.length; i++){
						var obj = playerSample[i];
						playersNow += obj['name'] + ", ";
					}
				}
				playersNow = playersNow.replace(/,\s*$/, "")
				const embed = new Discord.MessageEmbed()
					.setAuthor(`${saddress}:${sport}`)
					.attachFiles(attachment)
					.setThumbnail("attachment://icon.png")
					.addFields(
						{ name: 'Motd', value: `${body.motds.clean}` },
						{ name: 'Version', value: `${body.version.name}`, inline: true },
						{ name: 'Status', value: `${(body.status ? "Online" : "Offline")}`, inline: true },
						{ name: 'Players', value: `${body.players.online}/${body.players.max} ${(body.players.sample == null?'':playersNow)}`},
					)
					.setColor("#5b8731")
					.setFooter(`Minecraft Server Status Bot for Discord`)
				message.channel.send(`Here are the stats for **${saddress}:${sport}**:`, { embed })
			}
			else{
				message.channel.send(`Looks like your server is not reachable... Please verify it's online and it isn't blocking access!`)
			}
		}
		if(command === "online" || command === "on"){
			let saddress = args[0] || ipAddress;
			let sport = args[1] || port;
			const res = await fetch(`https://mcapi.ca/ping/all/${saddress}${sport ? `:${sport}` : ''}`)
			if (!res) return message.channel.send(`Looks like mcapi.ca is not reachable... Please verify it's online and it isn't being blocked!`)

			const body = await res.json()
			var playerSample = body.players.sample
			var playersNow = ""
			if(playerSample != null){
				for (var i = 0; i < playerSample.length; i++){
					var obj = playerSample[i];
					playersNow += obj['name'] + " ";
				}
			}
			playersNow = playersNow.replace(/,\s*$/, "")
			message.channel.send(`Online: ${body.players.online}/${body.players.max} ${playersNow}`)
		}
		if(command === 'supersecretcommandtemplate'){
			let helpPage = args[0] || "1"; //take the page from the msg if supplied, otherwise default to page 1
			if(helpPage === "1"){
				message.channel.send('Super secret commandd template page 1!')
			}
			else if(helpPage === "2"){
				message.channel.send('Super secret commandd template page 2!')
			}
		}
	}
})

client.login(config.token)
