const { Client } = require('discord.js');

module.exports = {
    /**
     * @param {Client} client 
     */
    run(client) {
        console.log('Bot online como', client.user.tag);
    }
}