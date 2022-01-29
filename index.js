const { Client, Intents } = require('discord.js');

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.on('ready', () => {
	console.log('Rise and shine!');
});

client.on('message', msg => {
  msg.reply('pp');
});

client.login(process.env.token);
