const { Client, Intents } = require('discord.js');
const allIntents = new Intents(32767);

const client = new Client({ intents: allIntents });

client.on('ready', () => {
	console.log('Rise and shine!');
});

client.on('message', msg => {
  msg.reply('pp');
});

client.login(process.env.token);
