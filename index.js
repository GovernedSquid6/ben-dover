const { Client, Intents } = require('discord.js');
const allIntents = new Intents(32767);

const client = new Client({ intents: allIntents });

client.on('ready', () => {
  console.log('Rise and shine!');
});

client.on('messageCreate', async message => {
  const args = message.content.trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  if(message.author.bot) return
  if(command == "test") message.reply('pp');
  if(command == "bensay") {
    await message.delete()
    message.channel.send(args.join(" "))
  }
  if(command == "benspam") {
    await message.delete()
    for (let i = 0; i < args[0]; i++) {
      await message.channel.send(args.slice(1).join(" "))
    }
  }
  if(command == "makesay") {
    var vic
    var nem
    var vectim = args[0]
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
      avatar: vic.displayAvatarURL(),
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
