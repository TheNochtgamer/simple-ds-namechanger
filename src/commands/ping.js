const { CommandInteraction, SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Te dice pong.'),
    /**
     * 
     * @param {CommandInteraction} interaction 
     */
    async run(interaction) {
        const package = require('../../package.json');
        await interaction.reply({ content: `<@!${interaction.user.id}> - ${interaction.client.ws.ping}ms Pong!\nVer: ${package.version}`, ephemeral: true });
    },
};