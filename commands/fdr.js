const { MessageEmbed, MessageActionRow, MessageSelectMenu, MessageButton } = require(`discord.js`);
const data = require(`../data.json`);
const ticketdb = require('../models/ticket')
const votedb = require('../models/vote')
const db = require("quick.db");

module.exports = {
name: "fdr",
run: async(client, msg, log) => {
if(msg.channel.type === `DM`)return;




if (!msg.member.roles.cache.some(role => role.id === `938052856878080012`)){
return msg.channel.send({ embeds: [new MessageEmbed()
.setAuthor({ name:msg.author.username, iconURL:msg.author.avatarURL() })
.setDescription(`**لا يوجد لديك صلاحيات**`)
.setColor(`#2F3136`)] })
}
ticketdb.findOne({ Channel_Id : msg.channel.id },async (err, datadb) => {
if(datadb.R_Info !== `لم يتم القبول`){
msg.channel.send({ content:`@everyone`, embeds: [new MessageEmbed()
.setAuthor({ name:msg.author.username, iconURL:msg.author.avatarURL() })
.setDescription(`**تم الغاء قبول التذكره من قبل ${msg.author.username}**`)
.setColor(`#2F3136`)] })
ticketdb.deleteOne({ Channel_Id : msg.channel.id }, function (err){if(err)return console.log(err)});
datadb = new ticketdb({
User : datadb.User,
Status : datadb.Status,
Channel_Id : datadb.Channel_Id,
R_Number : datadb.R_Number,
R_Info : `لم يتم القبول`
})
datadb.save()
log.send({ embeds: [new MessageEmbed()
.setTitle(`حذف مستلم التذكره`)
.setDescription(`**لقد قام هذا المسؤول بحذف مستلم التذكره**`)
.addFields(
{ name: `Username S`, value: `${msg.author.tag}`, inline: true },
{ name: `ID S`, value: `${msg.author.id}`, inline: true },
{ name: `Mention S`, value: `${msg.author}`, inline: true },
{ name: `Ticket`, value: `${msg.channel}`, inline: false },)
.setColor(`BLUE`)] })
}else{
if(datadb.R_Info == `لم يتم القبول`){
msg.channel.send({ embeds: [new MessageEmbed()
.setAuthor({ name:msg.author.username, iconURL:msg.author.avatarURL() })
.setDescription(`**لم يقم احد بقبول هذه التذكره**`)
.setColor(`#2F3136`)] }).then(m => {
m.delete({timeout: 5000})
msg.delete({timeout: 5000})
})
}
}
})



}
};