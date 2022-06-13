const { MessageEmbed, MessageActionRow, MessageSelectMenu, MessageButton } = require(`discord.js`);
const data = require(`../data.json`);
const ticketdb = require('../models/ticket')
const votedb = require('../models/vote')
const db = require("quick.db");

module.exports = {
name: "deltime",
run: async(client, msg, log) => {
if(msg.channel.type === `DM`)return;
const args = msg.content.slice(data.prefix.length).trim().split(/ +/g);

if(msg.author.id !== `608224231322419202`)return;

if(!args[1])return msg.channel.send({ embeds: [new MessageEmbed()
.setAuthor({ name:msg.author.username, iconURL:msg.author.avatarURL() })
.setDescription(`**${data.prefix}deltime [id user]**`)
.setColor(`#2F3136`) ]})
let timesout = await db.fetch(`timeout_${args[1]}`);
if(!timesout)return msg.channel.send({ content: `**لا يمكنني العثور على هذه المعلومات**` })
if(timesout){
	db.delete(`timeout_${args[1]}`)
	msg.channel.send({ content: `**تم حذف المعلومات بنجاح**` })
}


}
};
