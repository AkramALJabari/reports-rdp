const { MessageEmbed, MessageActionRow, MessageSelectMenu, MessageButton } = require(`discord.js`);
const data = require(`../data.json`);
const ticketdb = require('../models/ticket')
const votedb = require('../models/vote')
const db = require("quick.db");
const ms = require("ms");

module.exports = {
name: "cr",
run: async(client, msg, log) => {
if(msg.channel.type === `DM`)return;
const args = msg.content.slice(data.prefix.length).trim().split(/ +/g);



const crFunction = async () => {
  if(msg.channel.parent == `938052857557573681` || msg.channel.parent == `939174153641152523` || msg.channel.parent == `939174179876528249`)return msg.channel.send({ content: `**لا يمكنك اغلاق التذكره المغلقه (:**` })
ticketdb.findOne({ Channel_Id : msg.channel.id },async (err, datadb) => {
if(datadb){
let user = await client.users.fetch(datadb.User);
if(datadb.R_Info == msg.author.id || msg.member.roles.cache.some(role => role.id === `938052856878080012`)){
if(user == null || user == undefined || !user){
ticketdb.deleteOne({ Channel_Id : msg.channel.id }, function (err){if(err)return console.log(err)});
msg.channel.setParent(`938052857557573681`).catch(()=>{msg.channel.setParent(`939174153641152523`).catch(()=>{msg.channel.setParent(`939174179876528249`)})})
log.send({ embeds: [new MessageEmbed()
.setTitle(`اغلاق تذكره`)
.setDescription(`**لقد قام هذا الإداري بإغلاق التذكره**`)
.addFields(
{ name: `Username S`, value: `${msg.author.tag}`, inline: true },
{ name: `ID S`, value: `${msg.author.id}`, inline: true },
{ name: `Mention S`, value: `${msg.author}`, inline: true },
{ name: `Ticket`, value: `${msg.channel}`, inline: false },)
.setColor(`GREEN`)] })
}
const row = new MessageActionRow()
.addComponents(
new MessageButton()
.setCustomId(`1v`)
.setLabel(`1`)
.setEmoji(`⭐`)
.setStyle(`DANGER`),
new MessageButton()
.setCustomId(`2v`)
.setLabel(`2`)
.setEmoji(`⭐`)
.setStyle(`DANGER`),
new MessageButton()
.setCustomId(`3v`)
.setLabel(`3`)
.setEmoji(`⭐`)
.setStyle(`PRIMARY`),
new MessageButton()
.setCustomId(`4v`)
.setLabel(`4`)
.setEmoji(`⭐`)
.setStyle(`SUCCESS`),
new MessageButton()
.setCustomId(`5v`)
.setLabel(`5`)
.setEmoji(`⭐`)
.setStyle(`SUCCESS`),
);
db.set(`timeout_${user.id}`, Math.floor(Date.now() / 1000) + (ms(`15m`)*0.001));
const DM = await user.send({ content: `**Your Ticket Closed By ${msg.author.username}**` }).catch(err=>{msg.channel.send({ content: `**لا يمكنني ارسال رسائل لهذا العضو**` })})
ticketdb.deleteOne({ Channel_Id : msg.channel.id }, function (err){if(err)return console.log(err)});
msg.channel.setParent(`938052857557573681`).catch(()=>{msg.channel.setParent(`939174153641152523`).catch(()=>{msg.channel.setParent(`939174179876528249`)})})
msg.channel.send({ content: `**Your Ticket Closed By ${msg.author.username}**` })
log.send({ embeds: [new MessageEmbed()
.setTitle(`اغلاق تذكره`)
.setDescription(`**لقد قام هذا الإداري بإغلاق التذكره**`)
.addFields(
{ name: `Username S`, value: `${msg.author.tag}`, inline: true },
{ name: `ID S`, value: `${msg.author.id}`, inline: true },
{ name: `Mention S`, value: `${msg.author}`, inline: true },
{ name: `Ticket`, value: `${msg.channel}`, inline: false },)
.setColor(`GREEN`)] })
user.send({ embeds: [new MessageEmbed()
.setAuthor({ name:msg.author.username, iconURL:msg.author.avatarURL() })
.setDescription(`**يرجى تقييم عضو المساعده الذي ساعدك**`)
.setColor(`#2F3136`)], components: [row] }).then(msg2 => {
const filter = i => i.user.id === user.id;
const collector = DM.channel.createMessageComponentCollector({ filter, max: 1, time: 1200000 });
collector.on("collect",async i => {
if(i.customId == `1v`){
msg2.delete()
votedb.findOne({ User : msg.author.id }, (err, vdatadb) => {
if(vdatadb){
votedb.deleteOne({ User : msg.author.id }, function (err){if(err)return console.log(err)});
vdatadb = new votedb({
User : vdatadb.User,
Vote1 : Number(vdatadb.Vote1)+1,
Vote2 : vdatadb.Vote2,
Vote3 : vdatadb.Vote3,
Vote4 : vdatadb.Vote4,
Vote5 : vdatadb.Vote5
})
vdatadb.save()
}
if(!vdatadb){
vdatadb = new votedb({
User : msg.author.id,
Vote1 : `1`,
Vote2 : `0`,
Vote3 : `0`,
Vote4 : `0`,
Vote5 : `0`
})
vdatadb.save()
}
user.send({ content: `**شكراً للمشاركه في التقييم ❤️**` })
log.send({ embeds: [new MessageEmbed()
.setTitle(`تم تقيم إداري`)
.setDescription(`**لقد قام هذا العضو بتقيم الإداري**`)
.addFields(
{ name: `Username S`, value: `${msg.author.tag}`, inline: true },
{ name: `ID S`, value: `${msg.author.id}`, inline: true },
{ name: `Mention S`, value: `${msg.author}`, inline: true },)
.addFields(
{ name: `Username`, value: `${user.tag}`, inline: true },
{ name: `ID`, value: `${user.id}`, inline: true },
{ name: `Mention`, value: `${user}`, inline: true },
{ name: `Evaluation`, value: `⭐ 1/5`, inline: true },)
.setColor(`GREEN`)] })
})
}else{
if(i.customId == `2v`){
msg2.delete()
votedb.findOne({ User : msg.author.id }, (err, vdatadb) => {
if(vdatadb){
votedb.deleteOne({ User : msg.author.id }, function (err){if(err)return console.log(err)});
vdatadb = new votedb({
User : vdatadb.User,
Vote1 : vdatadb.Vote1,
Vote2 : Number(vdatadb.Vote2)+1,
Vote3 : vdatadb.Vote3,
Vote4 : vdatadb.Vote4,
Vote5 : vdatadb.Vote5
})
vdatadb.save()
}
if(!vdatadb){
vdatadb = new votedb({
User : msg.author.id,
Vote1 : `0`,
Vote2 : `1`,
Vote3 : `0`,
Vote4 : `0`,
Vote5 : `0`
})
vdatadb.save()
}
user.send({ content: `**شكراً للمشاركه في التقييم ❤️**` })
log.send({ embeds: [new MessageEmbed()
.setTitle(`تم تقيم إداري`)
.setDescription(`**لقد قام هذا العضو بتقيم الإداري**`)
.addFields(
{ name: `Username S`, value: `${msg.author.tag}`, inline: true },
{ name: `ID S`, value: `${msg.author.id}`, inline: true },
{ name: `Mention S`, value: `${msg.author}`, inline: true },)
.addFields(
{ name: `Username`, value: `${user.tag}`, inline: true },
{ name: `ID`, value: `${user.id}`, inline: true },
{ name: `Mention`, value: `${user}`, inline: true },
{ name: `Evaluation`, value: `⭐ 2/5`, inline: true },)
.setColor(`GREEN`)] })
})
}else{
if(i.customId == `3v`){
msg2.delete()
votedb.findOne({ User : msg.author.id }, (err, vdatadb) => {
if(vdatadb){
votedb.deleteOne({ User : msg.author.id }, function (err){if(err)return console.log(err)});
vdatadb = new votedb({
User : vdatadb.User,
Vote1 : vdatadb.Vote1,
Vote2 : vdatadb.Vote2,
Vote3 : Number(vdatadb.Vote3)+1,
Vote4 : vdatadb.Vote4,
Vote5 : vdatadb.Vote5
})
vdatadb.save()
}
if(!vdatadb){
vdatadb = new votedb({
User : msg.author.id,
Vote1 : `0`,
Vote2 : `0`,
Vote3 : `1`,
Vote4 : `0`,
Vote5 : `0`
})
vdatadb.save()
}
user.send({ content: `**شكراً للمشاركه في التقييم ❤️**` })
log.send({ embeds: [new MessageEmbed()
.setTitle(`تم تقيم إداري`)
.setDescription(`**لقد قام هذا العضو بتقيم الإداري**`)
.addFields(
{ name: `Username S`, value: `${msg.author.tag}`, inline: true },
{ name: `ID S`, value: `${msg.author.id}`, inline: true },
{ name: `Mention S`, value: `${msg.author}`, inline: true },)
.addFields(
{ name: `Username`, value: `${user.tag}`, inline: true },
{ name: `ID`, value: `${user.id}`, inline: true },
{ name: `Mention`, value: `${user}`, inline: true },
{ name: `Evaluation`, value: `⭐ 3/5`, inline: true },)
.setColor(`GREEN`)] })
})
}else{
if(i.customId == `4v`){
msg2.delete()
votedb.findOne({ User : msg.author.id }, (err, vdatadb) => {
if(vdatadb){
votedb.deleteOne({ User : msg.author.id }, function (err){if(err)return console.log(err)});
vdatadb = new votedb({
User : vdatadb.User,
Vote1 : vdatadb.Vote1,
Vote2 : vdatadb.Vote2,
Vote3 : vdatadb.Vote3,
Vote4 : Number(vdatadb.Vote4)+1,
Vote5 : vdatadb.Vote5
})
vdatadb.save()
}
if(!vdatadb){
vdatadb = new votedb({
User : msg.author.id,
Vote1 : `0`,
Vote2 : `0`,
Vote3 : `0`,
Vote4 : `1`,
Vote5 : `0`
})
vdatadb.save()
}
user.send({ content: `**شكراً للمشاركه في التقييم ❤️**` })
log.send({ embeds: [new MessageEmbed()
.setTitle(`تم تقيم إداري`)
.setDescription(`**لقد قام هذا العضو بتقيم الإداري**`)
.addFields(
{ name: `Username S`, value: `${msg.author.tag}`, inline: true },
{ name: `ID S`, value: `${msg.author.id}`, inline: true },
{ name: `Mention S`, value: `${msg.author}`, inline: true },)
.addFields(
{ name: `Username`, value: `${user.tag}`, inline: true },
{ name: `ID`, value: `${user.id}`, inline: true },
{ name: `Mention`, value: `${user}`, inline: true },
{ name: `Evaluation`, value: `⭐ 4/5`, inline: true },)
.setColor(`GREEN`)] })
})
}else{
if(i.customId == `5v`){
msg2.delete()
votedb.findOne({ User : msg.author.id }, (err, vdatadb) => {
if(vdatadb){
votedb.deleteOne({ User : msg.author.id }, function (err){if(err)return console.log(err)});
vdatadb = new votedb({
User : vdatadb.User,
Vote1 : vdatadb.Vote1,
Vote2 : vdatadb.Vote2,
Vote3 : vdatadb.Vote3,
Vote4 : vdatadb.Vote4,
Vote5 : Number(vdatadb.Vote5)+1
})
vdatadb.save()
}
if(!vdatadb){
vdatadb = new votedb({
User : msg.author.id,
Vote1 : `0`,
Vote2 : `0`,
Vote3 : `0`,
Vote4 : `0`,
Vote5 : `1`
})
vdatadb.save()
}
user.send({ content: `**شكراً للمشاركه في التقييم ❤️**` })
log.send({ embeds: [new MessageEmbed()
.setTitle(`تم تقيم إداري`)
.setDescription(`**لقد قام هذا العضو بتقيم الإداري**`)
.addFields(
{ name: `Username S`, value: `${msg.author.tag}`, inline: true },
{ name: `ID S`, value: `${msg.author.id}`, inline: true },
{ name: `Mention S`, value: `${msg.author}`, inline: true },)
.addFields(
{ name: `Username`, value: `${user.tag}`, inline: true },
{ name: `ID`, value: `${user.id}`, inline: true },
{ name: `Mention`, value: `${user}`, inline: true },
{ name: `Evaluation`, value: `⭐ 5/5`, inline: true },)
.setColor(`GREEN`)] })
})
}
}
}
}
}
})
}).catch(err=>{return})
}else{
msg.channel.send({ embeds: [new MessageEmbed()
.setAuthor({ name:msg.author.username, iconURL:msg.author.avatarURL() })
.setDescription(`**يجب عليك قبول التذكره اول \`${data.prefix}ar\`**`)
.setColor(`#2F3136`)] }).then(m => {
m.delete({timeout: 5000})
msg.delete({timeout: 5000})
})
}
}
})
}




if(args[1] == `wait`){
ticketdb.findOne({ Channel_Id : msg.channel.id },async (err, datadb) => {
if(datadb){
let user = await client.users.fetch(datadb.User);
if(datadb.R_Info == msg.author.id || msg.member.roles.cache.some(role => role.id === `938052856878080012`)){
msg.channel.send({ content: `**سوف يتم اغلاق الريبورت تلقائياً بعد (1 ساعه) اذا لم يتم الرد على الريبورت**` })
const DM = await user.send({ content: `**سوف يتم اغلاق الريبورت تلقائياً بعد (1 ساعه) اذا لم يتم الرد على الريبورت**` })
const filter = (m) => m.author.id === user.id;
var r = DM.channel.awaitMessages({
  filter,
  max: 1,
  time: ms("1h"),
  errors: ['time']
}).then(async collected => {
  msg.channel.send({ content: `**تم الغاء اغلاق الريبورت بواسطة : ${collected.first().author}**` })
  user.send({ content: `**تم الغاء اغلاق الريبورت**` })
      }).catch(() => {
        crFunction()
      });
}
}
})
}else{
crFunction()
}




}
};