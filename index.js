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
    var vectim = args[0]
    var memvic = await message.guild.members.fetch(vectim)
    var usvic = await client.users.fetch(vectim)
    console.log(memvic)
    var vic = 
    var content = args.slice(1).join(" ")
    await message.delete()
    var webh = await message.channel.createWebhook((vic.displayName | vic.username), {
      avatar: vic.displayAvatarURL(),
    })
      .then(console.log)
      .catch(console.error)
    await webh.send(content)
    webh.delete()
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
