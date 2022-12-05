const __discord = require('discord.js');
const fs = require('fs');
require("dotenv").config();

const client = new __discord.Client({
    'intents': ['Guilds', 'GuildMembers', 'GuildMessages', 'MessageContent'],
});
const commandFiles = fs.readdirSync('./src/commands').filter(file => file.endsWith('.js'));
const eventFiles = fs.readdirSync('./src/events').filter(file => file.endsWith('.js'));
client.commands = new __discord.Collection();
client.owner = process.env.BOTOWNER;
// globalThis.client = client;

for (const file of commandFiles) {
    const command = require(`./src/commands/${file}`);
    client.commands.set(command.data.name, command);
}
for (const file of eventFiles) {
    const event = require(`./src/events/${file}`);
    const name = file.slice(0, file.length - 3);
    if (name == 'ready' || event.once) {
        client.once(name, (...args) => event.run(...args));
    } else {
        client.on(name, (...args) => event.run(...args));
    }
}
console.log('Archivos cargados');

(async () => {
    await client.login(process.env.TOKEN);
    try {
        let cmds = await client.application.commands.fetch();
        let allCommandsLoaded = true;
        for (let index = 0; index < client.commands.size; index++) {
            const cmdName = client.commands.keyAt(index);
            if (!cmds.some(cmd => cmd.name === cmdName)) {
                allCommandsLoaded = false;
                break;
            }
        }
        if (allCommandsLoaded) { return } else { console.log('Comandos desactualizados, sincronizando...') };
        require('./src/utils/cargarCmds')(client.user.id);
    } catch (error) {
        console.log('Hubo un error al intentar sincronizar los comandos a discord:', error);
    }
})();