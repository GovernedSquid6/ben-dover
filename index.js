const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Rise and shine`);
});

client.on('message', msg => {
  msg.reply('pp');
});

client.login(process.env.token);
