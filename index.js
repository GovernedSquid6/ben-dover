const { Client, Intents } = require('discord.js');
const allIntents = new Intents(32767);

const client = new Client({ intents: allIntents });
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { SlashCommandBuilder } = require('@discordjs/builders');

const rest = new REST({ version: '9' }).setToken(process.env.token);

var owner = "850097464123326515"

client.on('ready', async () => {
  console.log('Rise and shine!');
  
  const command = new SlashCommandBuilder()
	.setName('bensay')
	.setDescription('Make Ben say something')
	.addStringOption(option => option.setName('phrase').setDescription('What you want Ben to say').setRequired(true))
  const rawData = await command.toJSON();
  console.log(rawData)
  await rest.put(
	  Routes.applicationCommands(client.user.id),
	  { body: rawData },
  );
});

client.on('messageCreate', async message => {
  const args = message.content.trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  if(message.author.bot) return
  if(command == "test") message.reply('pp');
  if(command == "oi") message.channel.send('oi');
  if(command == "bensay") {
    await message.delete()
    message.channel.send(args.join(" "))
  }
  if(command == "getpfp") {
    var vic
    if(args.length == 0) vic = message.author
    else vic = await client.users.fetch(args[0].replace(/[\\<>@#&!]/g, ""))
    var pfp = await vic.displayAvatarURL({dynamic: true, format: 'png', size: 4096})
    message.channel.send(pfp)
  }
  if(command == "benspam") {
    if (args[0] > 50 && message.author.id != owner) return message.reply('nothing above 50 or ben will die of cardiac arrest')
    await message.delete()
    for (let i = 0; i < args[0]; i++) {
      await message.channel.send(args.slice(1).join(" "))
    }
  }
  if(command == "makesay") {
    var vic
    var nem
    var vectim = args[0].replace(/[\\<>@#&!]/g, "")
    var guildmems = await message.guild.members.fetch()
    if (guildmems.has(vectim)) {
      vic = await message.guild.members.fetch(vectim)
      nem = vic.displayName
    }
    else {
      vic = await client.users.fetch(vectim)
      nem = vic.username
    }
    var content = args.slice(1).join(" ")
    await message.delete()
    var webh = await message.channel.createWebhook((nem), {
      avatar: vic.displayAvatarURL({dynamic: true, format: 'png', size: 4096}),
    })
    await webh.send(content)
    await webh.delete()
  }
  if(command == "chainspam"){
    var bufferstr = ""
    for (let step = 0; step < 1000; step++) {
      bufferstr += "⛓️"
    }
    message.channel.send(bufferstr)
  }
});

client.login(process.env.token);
