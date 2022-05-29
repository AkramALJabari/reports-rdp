const { MessageEmbed, MessageActionRow, MessageSelectMenu, MessageButton } = require(`discord.js`);
const data = require(`../data.json`);
const ticketdb = require('../models/ticket')
const votedb = require('../models/vote')
const db = require("quick.db");

module.exports = {
name: "sfb",
run: async(client, msg, log) => {
if(msg.channel.type === `DM`)return;



let user = msg.mentions.users.first() || msg.author;
if(user.bot)return msg.channel.send({ embeds: [new MessageEmbed()
.setAuthor({ name:msg.author.username, iconURL:msg.author.avatarURL() })
.setDescription(`**لا يوجد احصائيات للبوتات**`)
.setColor(`#2F3136`)] })
votedb.findOne({ User : user.id }, (err, datadb) => {
if(datadb){
msg.channel.send({ embeds: [new MessageEmbed()
.setAuthor({ name:user.username, iconURL:user.avatarURL() })
.setDescription(`**⭐ = ${datadb.Vote1}\n⭐⭐ = ${datadb.Vote2}\n⭐⭐⭐ = ${datadb.Vote3}\n⭐⭐⭐⭐ = ${datadb.Vote4}\n⭐⭐⭐⭐⭐ = ${datadb.Vote5}**`)
.setColor(`#2F3136`)] })
}else{
if(!datadb){
msg.channel.send({ embeds: [new MessageEmbed()
.setAuthor({ name:user.username, iconURL:user.avatarURL() })
.setDescription(`**لا يمكنني العثور على معلومات لهذا الحساب**`)
.setColor(`#2F3136`)] })
}
}
})



}
};