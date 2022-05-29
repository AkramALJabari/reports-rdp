const { Client, Intents, MessageEmbed } = require(`discord.js`);
const data = require('../data.json');
const ticketdb = require('../models/ticket')
const votedb = require('../models/vote')
const client = new Client({ intents: [
Intents.FLAGS.GUILDS,
Intents.FLAGS.GUILD_MESSAGES,
Intents.FLAGS.DIRECT_MESSAGES,
Intents.FLAGS.DIRECT_MESSAGE_TYPING,
Intents.FLAGS.GUILD_MEMBERS,
Intents.FLAGS.GUILD_BANS,
Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
],
partials: ['MESSAGE', 'CHANNEL', 'REACTION']});

module.exports = (client, msg) => {
if(msg.author.bot)return;
const log = client.channels.cache.get("938052857557573680")
const guild = client.guilds.cache.get(data.guild);






let command = msg.content.toLowerCase().split(' ')[0].slice(data.prefix.length);
let cmd;
client.cmd = cmd;
if(client.commands.has(command)){
cmd = client.commands.get(command);
}
if(cmd){
cmd.run(client, msg, log, guild);
}
}