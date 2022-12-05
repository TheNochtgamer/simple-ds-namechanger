const { Interaction } = require('discord.js');
const notAuthorized = require('../utils/notAuthorized');

module.exports = {
    /**
     * @param {Interaction} interaction 
     * @returns 
     */
    async run(interaction) {
        if (!interaction.isCommand()) return;

        const command = interaction.client.commands.get(interaction.commandName);

        if (!command) {
            if (interaction.replied) return;
            interaction.reply({ content: 'Hubo un error interno al intentar localizar el comando\nPorfavor espera...', ephemeral: true });
        }

        //--NochtCheckAuth--
        //Parametros en command files:
        // roles_req = String[]
        // perms_req = String[]
        // allRoles_req = Boolean
        // allPerms_req = Boolean
        // everthing_req = Boolean
        const pass = () => {
            if (interaction.user.id === interaction.client.owner) return 1;

            const all = command.everthing_req;
            const member = interaction.member;
            let notPass = 0, checks = 0;

            if (command.roles_req) {
                checks++;
                if (!member.roles.cache.hasAny(...command.roles_req)) if (all) { return 0 } else { notPass++ };
                if (!member.roles.cache.hasAll(...command.roles_req) && command.allRoles_req) if (all) { return 0 } else { notPass++ };
            }
            if (command.perms_req) {
                checks++;
                let permPass = false;
                for (const perm of command.perms_req) {
                    if (member.permissions.has(perm)) { permPass = true; if (!command.allPerms_req) { break } } else {
                        permPass = false; if (command.allPerms_req) break;
                    };
                }
                if (!permPass) { if (all) { return 0 } else { notPass++ } };
            }

            if (notPass == checks && checks) return 0;
            return 1;
        };
        if (!pass()) {
            notAuthorized(interaction);
            return;
        }
        //--NochtCheckAuth--


        try {
            await command.run(interaction);
        } catch (error) {
            console.error('Hubo un error ejecutando el comando ' + interaction.commandName + ': ' + error);
            try {
                if (interaction.replied || interaction.deferred) {
                    await interaction.editReply({ content: 'Hubo un error interno al ejecutar el comando', ephemeral: true });
                } else {
                    await interaction.reply({ content: 'Hubo un error interno al ejecutar el comando', ephemeral: true });
                }
            } catch (error) { }
        }
    }
}