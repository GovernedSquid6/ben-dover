const { Client, Intents } = require('discord.js');
const allIntents = new Intents(32767);

const client = new Client({ intents: allIntents });

client.on('ready', () => {
  console.log('Rise and shine!');
});

client.on('messageCreate', async message => {
  const args = message.content.slice(prefix.length).trim().split(' ');
  const command = args.shift().toLowerCase();
  if(message.author.bot) return
  if(command == "test") message.reply('pp');
  if(command == "bensay") {
    await message.channel.send(args.join())
    message.delete()
  }
});

client.login(process.env.token);
