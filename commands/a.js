const { MessageEmbed, MessageActionRow, MessageSelectMenu, MessageButton } = require(`discord.js`);
const data = require(`../data.json`);
const ticketdb = require('../models/ticket')
const votedb = require('../models/vote')
const db = require("quick.db");

module.exports = {
name: "a",
run: async(client, msg, log, guild) => {
if(msg.channel.type === `DM`)return;
const args = msg.content.slice(data.prefix.length).trim().split(/ +/g);



ticketdb.findOne({ Channel_Id : msg.channel.id },async (err, datadb) => {
if(!msg.member.roles.cache.some(role => role.id === `957015080912973824`))return;
if(!args[1])return msg.channel.send({ embeds: [new MessageEmbed()
.setAuthor({ name:msg.author.username, iconURL:msg.author.avatarURL() })
.setDescription(`**${data.prefix}a [message]**`)
.setColor(`#2F3136`) ]}).then(m => {
m.delete({timeout: 5000})
msg.delete({timeout: 5000})
})
if(datadb){
let user = await client.users.fetch(datadb.User);
if(user == null || user == undefined || !user)return msg.channel.send({ content:`**لا يمكنني العثور على هذا العضو\nيرجى اغلاق الريبورت**` })
var reply = args.splice(1).join(" ");
msg.delete()
if(msg.attachments.size > 0){
msg.attachments.forEach(attachment => {
const ImageLink = attachment.proxyURL;
user.send({ content: `**Hidden User : **${reply}`, embeds: [new MessageEmbed()
.setImage(ImageLink)
.setColor(`#2F3136`) ]}).catch(err=>{msg.channel.send({ content:`**لا يمكنني ارسال رسائل لهذا العضو**` })})
msg.channel.send({ content:`**Hidden User [ ${msg.author.username} ] : **${reply}`, embeds: [new MessageEmbed()
.setImage(ImageLink)
.setColor(`#2F3136`) ]})
})
}else{
user.send({ content:`**Hidden User : **${reply}` }).catch(err=>{msg.channel.send({ content:`**لا يمكنني ارسال رسائل لهذا العضو**` })})
msg.channel.send({ content:`**Hidden User [ ${msg.author.username} ] : **${reply}` })
}
log.send({ embeds: [new MessageEmbed()
.setTitle(`ارسال رساله مخفيه`)
.setDescription(`**لقد قام هذا الإداري بإرسال رساله بصفه مخفيه**`)
.addFields(
{ name: `Username S`, value: `${msg.author.tag}`, inline: true },
{ name: `ID S`, value: `${msg.author.id}`, inline: true },
{ name: `Mention S`, value: `${msg.author}`, inline: true },
{ name: `Message`, value: `${reply}`, inline: false },)
.setColor(`GREEN`) ]})
}
})



}
};
