const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('makesay')
    .setDescription('Make someone say something')
    .addUserOption(option => option.setName('victim').setDescription('Who to impersonate').setRequired(true))
    .addStringOption(option =>
      option.setName('phrase')
      .setDescription('What to make them say')
      .setRequired(true));
};
