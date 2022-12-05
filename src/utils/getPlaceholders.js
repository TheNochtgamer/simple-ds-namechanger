const { GuildMember } = require("discord.js");

/**
 * 
 * @param {GuildMember} member 
 */
module.exports = (member) => {
    const placeholders = [
        { name: 'userName', rgx: /%name%/gi, replace: member.user.username },
        { name: 'id', rgx: /%id%/gi, replace: member.id },
        { name: 'discrim', rgx: /%discrim%/gi, replace: member.user.discriminator },
        { name: 'tag', rgx: /%tag%/gi, replace: member.user.tag },
        { name: 'nick', rgx: /%nick%/gi, replace: member.nickname },
        { name: 'rolesCount', rgx: /%rolescount%/gi, replace: member.roles.cache.size },
        // { name: '', rgx: /%%/gi, replace: member. },
    ];

    return placeholders;
}