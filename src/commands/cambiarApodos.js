const { CommandInteraction, SlashCommandBuilder } = require('discord.js');

module.exports = {
    perms_req: ['ADMINISTRATOR'],
    data: new SlashCommandBuilder()
        .setName('cambiarapodos')
        .setDescription('Comando para cambiar el apodo de todas las personas con un @rol')
        .setDMPermission(false)
        .addRoleOption(option => option
            .setName('rol')
            .setDescription('El rol que los miembros tienen para el apodo')
            .setRequired(true)
        )
        .addStringOption(option => option
            .setName('apodo')
            .setDescription('El apodo que quieras ponerle con Placeholders (/placeholders)')
            .setRequired(true)
        )
        .addNumberOption(option => option
            .setName('limite')
            .setDescription('El limite de usuarios a cambiarle el apodo')
            .setMinValue(1)
        ),
    /**
     * 
     * @param {CommandInteraction} interaction 
     */
    async run(interaction) {
        // TODO Terminar
    }
}