const { Client, Intents } = require('discord.js');
const allIntents = new Intents(32767);

const client = new Client({ intents: allIntents });
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { SlashCommandBuilder } = require('@discordjs/builders');
const symbols = require('@unicode/unicode-13.0.0/Binary_Property/Assigned/symbols.js');

const rest = new REST({ version: '9' }).setToken(process.env.token);

var owner = "850097464123326515"

client.on('ready', async () => {
  console.log(symbols);
  console.log('Rise and shine!');
  const commands = [];
  const data = new SlashCommandBuilder()
    .setName('bensay')
    .setDescription('Make Ben say something')
    .addStringOption(option =>
      option.setName('phrase')
      .setDescription('What to make Ben say')
      .setRequired(true));
  const rawData = await data.toJSON();
  commands.push(rawData)
  const data2 = new SlashCommandBuilder()
    .setName('makesay')
    .setDescription('Make someone say something')
    .addUserOption(option => option.setName('victim').setDescription('Who to impersonate').setRequired(true))
    .addStringOption(option =>
      option.setName('phrase')
      .setDescription('What to make them say')
      .setRequired(true));
  const rawData2 = await data2.toJSON();
  commands.push(rawData2)
  await rest.put(
    Routes.applicationCommands(client.user.id),
    { body: commands },
  );
  await rest.put(
    Routes.applicationCommands(client.user.id),
    { body: commands },
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
    for (let step = 0; step < 2000; step++) {
      bufferstr += "⛓"
    }
    message.channel.send(bufferstr)
  }
  if(command == "randomshit") {
    var bufferstr = ""
    var am = 20
    if(args.length > 0) am = args[0]
    for (let step = 0; step < 2000; step++) {
      var item = symbols[Math.floor(Math.random()*symbols.length)];
      bufferstr += item
    }
    message.channel.send(bufferstr)
  }
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;
  console.log(interaction)
  if (interaction.commandName === 'bensay') {
    var channel = await client.channels.fetch(interaction.channelId)
    await interaction.reply({ content: 'k', ephemeral: true });
    channel.send(interaction.options.getString('phrase'))
  }
  if(interaction.commandName == "makesay") {
    var vic
    var nem
    var channel = await client.channels.fetch(interaction.channelId)
    var usr = await interaction.options.getUser('victim')
    var vectim = usr.id
    var guildmems = await interaction.member.guild.members.fetch()
    if (guildmems.has(vectim)) {
      vic = await interaction.options.getMember('victim')
      nem = vic.displayName
    }
    else {
      vic = usr
      nem = vic.username
    }
    var content = interaction.options.getString('phrase')
    await interaction.reply({ content: 'k', ephemeral: true });
    var webh = await channel.createWebhook((nem), {
      avatar: vic.displayAvatarURL({dynamic: true, format: 'png', size: 4096}),
    })
    await webh.send(content)
    await webh.delete()
  }
});
client.login(process.env.token);
