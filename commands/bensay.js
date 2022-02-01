const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('bensay')
    .setDescription('Make Ben say something')
    .addStringOption(option =>
      option.setName('phrase')
      .setDescription('What to make Ben say')
      .setRequired(true));
};
