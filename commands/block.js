const { MessageEmbed, MessageActionRow, MessageSelectMenu, MessageButton } = require(`discord.js`);
const data = require(`../data.json`);
const ticketdb = require('../models/ticket')
const votedb = require('../models/vote')
const db = require("quick.db");
const fs = require("fs");

module.exports = {
name: "block",
run: async(client, msg, log) => {
if(msg.channel.type === `DM`)return;
const args = msg.content.split(' ').slice(1);




if(!msg.member.roles.cache.some(role => role.id === `938052856878080012`))return msg.channel.send({ embeds: [new MessageEmbed()
.setAuthor({ name:msg.author.username, iconURL:msg.author.avatarURL() })
.setDescription(`**لا يوجد لديك صلاحيات**`)
.setColor(`#2F3136`)] })
if(!args)return msg.channel.send({ embeds: [new MessageEmbed()
.setAuthor({ name:msg.author.username, iconURL:msg.author.avatarURL() })
.setDescription(`**${data.prefix}block [id user]**`)
.setColor(`#2F3136`)] })
let id = args[0];
if(isNaN(id))return msg.channel.send({ embeds: [new MessageEmbed()
.setAuthor({ name:msg.author.username, iconURL:msg.author.avatarURL() })
.setDescription(`**لا يمكنني العثور على هذا العضو**`)
.setColor(`#2F3136`)] });
await client.users.fetch(id.toString()).then(user => {
if(isNaN(user))return msg.channel.send({ embeds: [new MessageEmbed()
.setAuthor({ name:msg.author.username, iconURL:msg.author.avatarURL() })
.setDescription(`**لا يمكنني العثور على هذا العضو**`)
.setColor(`#2F3136`)] });
fs.readFile('./blocks.json', 'utf8', (err, datadb) => {
if (err) {console.log(`Error reading file from disk: ${err}`)}
const blocks = JSON.parse(datadb);
blocks.push({
id: user.id,
time: Math.floor(Date.now() / 1000) + 172800
});
var new_json = JSON.stringify(blocks);
fs.writeFileSync('./blocks.json', new_json, 'utf8');
msg.channel.send({ embeds: [new MessageEmbed()
.setAuthor({ name:msg.author.username, iconURL:msg.author.avatarURL() })
.setDescription(`**Done Block ${user} By : ${msg.author}**`)
.setColor(`#2F3136`)] });
log.send({ embeds: [new MessageEmbed()
.setTitle(`حظر عضو`)
.setDescription(`**لقد قام هذا الإداري بحظر عضو ما**`)
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
.setDescription(`**You Have Been Block From Using Ticket By : ${msg.author.username}\nUnBlock After Two Days**`)
.setColor(`#2F3136`)] }).catch(err=>{msg.channel.send(`**لا يمكنني ارسال رسائل لهذا العضو**`)})
})
}).catch(err => {
msg.channel.send({ embeds: [new MessageEmbed()
.setAuthor({ name:msg.author.username, iconURL:msg.author.avatarURL() })
.setDescription(`**لا يمكنني العثور على هذا العضو**`)
.setColor(`#2F3136`)] });
});



}
};