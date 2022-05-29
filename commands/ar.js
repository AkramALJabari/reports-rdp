const { MessageEmbed, MessageActionRow, MessageSelectMenu, MessageButton } = require(`discord.js`);
const data = require(`../data.json`);
const ticketdb = require('../models/ticket')
const votedb = require('../models/vote')
const db = require("quick.db");

module.exports = {
name: "ar",
run: async(client, msg, log) => {
if(msg.channel.type === `DM`)return;


ticketdb.findOne({ Channel_Id : msg.channel.id }, (err, datadb) => {
if(datadb){
if(datadb.R_Info === "لم يتم القبول"){
msg.channel.send({ embeds: [new MessageEmbed()
.setAuthor({ name:msg.author.username, iconURL:msg.author.avatarURL() })
.setDescription(`**تم قبول التذكره من قبل ${msg.author.username}**`)
.setColor(`#2F3136`)] })
ticketdb.deleteOne({ Channel_Id : msg.channel.id }, function (err){if(err)return console.log(err)});
datadb = new ticketdb({
User : datadb.User,
Status : datadb.Status,
Channel_Id : datadb.Channel_Id,
R_Number : datadb.R_Number,
R_Info : msg.author.id
})
datadb.save()
log.send({ embeds: [new MessageEmbed()
.setTitle(`قبول تذكره`)
.setDescription(`**لقد قام هذا الإداري بقبول تذكره جديده**`)
.addFields(
{ name: `Username S`, value: `${msg.author.tag}`, inline: true },
{ name: `ID S`, value: `${msg.author.id}`, inline: true },
{ name: `Mention S`, value: `${msg.author}`, inline: true },
{ name: `Ticket`, value: `${msg.channel}`, inline: false },)
.setColor(`GREEN`)] })
}else{
msg.channel.send({ embeds: [new MessageEmbed()
.setAuthor({ name:msg.author.username, iconURL:msg.author.avatarURL() })
.setDescription(`**التذكره مقبوله اصلاً من قبل <@${datadb.R_Info}>**`)
.setColor(`#2F3136`)] }).then(m => {
m.delete({timeout: 5000})
msg.delete({timeout: 5000})
})
}
}
})



}
};