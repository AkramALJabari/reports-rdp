const { MessageEmbed, MessageActionRow, MessageSelectMenu, MessageButton } = require(`discord.js`);
const data = require(`../data.json`);
const ticketdb = require('../models/ticket')
const votedb = require('../models/vote')
const db = require("quick.db");
const fs = require("fs");

module.exports = {
name: "unblock",
run: async(client, msg, log) => {
if(msg.channel.type === `DM`)return;
const args = msg.content.split(' ').slice(1);



if(!msg.member.roles.cache.some(role => role.id === `938052856878080012`)){
return msg.channel.send({ embeds: [new MessageEmbed()
.setAuthor({ name:msg.author.username, iconURL:msg.author.avatarURL() })
.setDescription(`**لا يوجد لديك صلاحيات**`)
.setColor(`#2F3136`)] })
}
if(!args)return msg.channel.send({ embeds: [new MessageEmbed()
.setAuthor({ name:msg.author.username, iconURL:msg.author.avatarURL() })
.setDescription(`**${data.prefix}unblock [id user]**`)
.setColor(`#2F3136`)] })
let id = args[0];
if(isNaN(id))return msg.channel.send({ embeds: [new MessageEmbed()
.setAuthor({ name:msg.author.username, iconURL:msg.author.avatarURL() })
.setDescription(`**لا يمكنني العثور على هذا العضو**`)
.setColor(`#2F3136`)] });
let user = await client.users.fetch(id.toString());
if(!user)return msg.channel.send({ embeds: [new MessageEmbed()
.setAuthor({ name:msg.author.username, iconURL:msg.author.avatarURL() })
.setDescription(`**لا يمكنني العثور على هذا العضو**`)
.setColor(`#2F3136`)] });
if(user){
fs.readFile('./blocks.json', 'utf8', (err, data) => {
if(err) {console.log(`Error reading file from disk: ${err}`);}
const blocks = JSON.parse(data);
for(index in blocks){
block = blocks[index];
if (block['id'] == id.toString()){
blocks.splice(index, 1);
msg.channel.send({ embeds: [new MessageEmbed()
.setAuthor({ name:msg.author.username, iconURL:msg.author.avatarURL() })
.setDescription(`**Done UnBlock ${user} By : ${msg.author}**`)
.setColor(`#2F3136`)] });
log.send({ embeds: [new MessageEmbed()
.setTitle(`فك حظر عضو`)
.setDescription(`**لقد قام هذا الإداري بفك حظر عضو ما**`)
.addFields(
{ name: `Username S`, value: `${msg.author.tag}`, inline: true },
{ name: `ID S`, value: `${msg.author.id}`, inline: true },
{ name: `Mention S`, value: `${msg.author}`, inline: true },)
.addFields(
{ name: `Username`, value: `${user.tag}`, inline: true },
{ name: `ID`, value: `${user.id}`, inline: true },
{ name: `Mention`, value: `${user}`, inline: true },)
.setColor(`BLUE`)] })
user.send({ embeds: [new MessageEmbed()
.setAuthor({ name:msg.author.username, iconURL:msg.author.avatarURL() })
.setDescription(`**You Have Been UnBlock By : ${msg.author.username}**`)
.setColor(`#2F3136`)] }).catch(err=>{msg.channel.send({ content: `**لا يمكنني ارسال رسائل لهذا العضو**` })})
var new_json = JSON.stringify(blocks);
fs.writeFileSync('./blocks.json', new_json, 'utf8');
return
}
}
msg.channel.send({ embeds: [new MessageEmbed()
.setAuthor({ name:msg.author.username, iconURL:msg.author.avatarURL() })
.setDescription(`**لا يمكنني العثور على هذا العضو في قائمة المحظورين**`)
.setColor(`#2F3136`)] });
});
}



}
};