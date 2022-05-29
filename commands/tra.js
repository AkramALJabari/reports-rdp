const { MessageEmbed, MessageActionRow, MessageSelectMenu, MessageButton } = require(`discord.js`);
const data = require(`../data.json`);
const ticketdb = require('../models/ticket')
const votedb = require('../models/vote')
const db = require("quick.db");

module.exports = {
name: "tra",
run: async(client, msg, log) => {
if(msg.channel.type === `DM`)return;




ticketdb.findOne({ Channel_Id : msg.channel.id },async (err, datadb) => {
if(datadb){
if(datadb.R_Info == msg.author.id || msg.member.roles.cache.some(role => role.id === `938052856878080012`)){
const row = new MessageActionRow()
.addComponents(
new MessageSelectMenu()
.setCustomId("select")
.setPlaceholder("اضغط هنا لإختيار القسم")
.addOptions([
{
label: `استفسارات عامه`,
value: `1`,
emoji: `938306187584213043`
},{
label: `مشاكل المركبات`,
value: `2`,
emoji: `938301879069319198`
},{
label: `مشاكل مابات`,
value: `3`,
emoji: `938301973093036042`
},{
label: `اعتراض على باند`,
value: `4`,
emoji: `938302060879814676`
},{
label: `مشاكل برمجيه`,
value: `5`,
emoji: `938305358429028403`
},{
label: `طلب تعويض`,
value: `6`,
emoji: `938305905613762601`
},{
label: `فاكشن عصابه/عائله`,
value: `7`,
emoji: `938307853482065940`
},{
label: `شكوى على ادمن`,
value: `8`,
emoji: `938302952685305906`
},{
label: `شكوى على سبورت`,
value: `9`,
emoji: `938303066812317727`
},{
label: `مشاكل ديسكورد`,
value: `10`,
emoji: `938305449810345995`
}
])
)
msg.channel.send({ embeds: [new MessageEmbed()
.setAuthor({ name:msg.author.username, iconURL:msg.author.avatarURL() })
.setDescription(`**يرجى اختيار القسم الطلوب!**`)
.setColor(`#2F3136`)], components: [row] }).then(msg2 => {
const collector = msg.channel.createMessageComponentCollector({
componentType: "SELECT_MENU",
max: 1
})
collector.on("collect", async (collected) => {
const value = collected.values[0]
if(value === "1"){
msg.channel.setParent(`938069232145534976`)
msg.channel.send({ content: `@everyone`, embeds: [new MessageEmbed()
.setAuthor({ name:msg.author.username, iconURL:msg.author.avatarURL() })
.setDescription(`**تم نقل التذكره من قبل ${msg.author.username}**`)
.setColor(`#2F3136`) ]})
ticketdb.deleteOne({ Channel_Id : msg.channel.id }, function (err){if(err)return console.log(err)});
datadb = new ticketdb({
User : datadb.User,
Status : datadb.Status,
Channel_Id : datadb.Channel_Id,
R_Number : datadb.R_Number,
R_Info : `لم يتم القبول`
})
datadb.save()
msg2.delete();
log.send({ embeds: [new MessageEmbed()
.setTitle(`نقل تذكره`)
.setDescription(`**لقد نقل هذا الإداري التذكره الى قسم استفسارات عامه**`)
.addFields(
{ name: `Username S`, value: `${msg.author.tag}`, inline: true },
{ name: `ID S`, value: `${msg.author.id}`, inline: true },
{ name: `Mention S`, value: `${msg.author}`, inline: true },
{ name: `Ticket`, value: `${msg.channel}`, inline: false },)
.setColor(`GREEN`)] })
}else{
if(value === "2"){
msg.channel.setParent(`938069232745345044`)
msg.channel.send({ content: `@everyone`, embeds: [new MessageEmbed()
.setAuthor({ name:msg.author.username, iconURL:msg.author.avatarURL() })
.setDescription(`**تم نقل التذكره من قبل ${msg.author.username}**`)
.setColor(`#2F3136`) ]})
ticketdb.deleteOne({ Channel_Id : msg.channel.id }, function (err){if(err)return console.log(err)});
datadb = new ticketdb({
User : datadb.User,
Status : datadb.Status,
Channel_Id : datadb.Channel_Id,
R_Number : datadb.R_Number,
R_Info : `لم يتم القبول`
})
datadb.save()
msg2.delete();
log.send({ embeds: [new MessageEmbed()
.setTitle(`نقل تذكره`)
.setDescription(`**لقد نقل هذا الإداري التذكره الى قسم مشاكل المركبات**`)
.addFields(
{ name: `Username S`, value: `${msg.author.tag}`, inline: true },
{ name: `ID S`, value: `${msg.author.id}`, inline: true },
{ name: `Mention S`, value: `${msg.author}`, inline: true },
{ name: `Ticket`, value: `${msg.channel}`, inline: false },)
.setColor(`GREEN`)] })
}else{
if(value === "3"){
msg.channel.setParent(`938069233303158846`)
msg.channel.send({ content: `@everyone`, embeds: [new MessageEmbed()
.setAuthor({ name:msg.author.username, iconURL:msg.author.avatarURL() })
.setDescription(`**تم نقل التذكره من قبل ${msg.author.username}**`)
.setColor(`#2F3136`) ]})
ticketdb.deleteOne({ Channel_Id : msg.channel.id }, function (err){if(err)return console.log(err)});
datadb = new ticketdb({
User : datadb.User,
Status : datadb.Status,
Channel_Id : datadb.Channel_Id,
R_Number : datadb.R_Number,
R_Info : `لم يتم القبول`
})
datadb.save()
msg2.delete();
log.send({ embeds: [new MessageEmbed()
.setTitle(`نقل تذكره`)
.setDescription(`**لقد نقل هذا الإداري التذكره الى قسم مشاكل مابات**`)
.addFields(
{ name: `Username S`, value: `${msg.author.tag}`, inline: true },
{ name: `ID S`, value: `${msg.author.id}`, inline: true },
{ name: `Mention S`, value: `${msg.author}`, inline: true },
{ name: `Ticket`, value: `${msg.channel}`, inline: false },)
.setColor(`GREEN`)] })
}else{
if(value === "4"){
msg.channel.setParent(`938069233827467366`)
msg.channel.send({ content: `@everyone`, embeds: [new MessageEmbed()
.setAuthor({ name:msg.author.username, iconURL:msg.author.avatarURL() })
.setDescription(`**تم نقل التذكره من قبل ${msg.author.username}**`)
.setColor(`#2F3136`) ]})
ticketdb.deleteOne({ Channel_Id : msg.channel.id }, function (err){if(err)return console.log(err)});
datadb = new ticketdb({
User : datadb.User,
Status : datadb.Status,
Channel_Id : datadb.Channel_Id,
R_Number : datadb.R_Number,
R_Info : `لم يتم القبول`
})
datadb.save()
msg2.delete();
log.send({ embeds: [new MessageEmbed()
.setTitle(`نقل تذكره`)
.setDescription(`**لقد نقل هذا الإداري التذكره الى قسم اعتراض على باند**`)
.addFields(
{ name: `Username S`, value: `${msg.author.tag}`, inline: true },
{ name: `ID S`, value: `${msg.author.id}`, inline: true },
{ name: `Mention S`, value: `${msg.author}`, inline: true },
{ name: `Ticket`, value: `${msg.channel}`, inline: false },)
.setColor(`GREEN`)] })
}else{
if(value === "5"){
msg.channel.setParent(`938069234804731925`)
msg.channel.send({ content: `@everyone`, embeds: [new MessageEmbed()
.setAuthor({ name:msg.author.username, iconURL:msg.author.avatarURL() })
.setDescription(`**تم نقل التذكره من قبل ${msg.author.username}**`)
.setColor(`#2F3136`) ]})
ticketdb.deleteOne({ Channel_Id : msg.channel.id }, function (err){if(err)return console.log(err)});
datadb = new ticketdb({
User : datadb.User,
Status : datadb.Status,
Channel_Id : datadb.Channel_Id,
R_Number : datadb.R_Number,
R_Info : `لم يتم القبول`
})
datadb.save()
msg2.delete();
log.send({ embeds: [new MessageEmbed()
.setTitle(`نقل تذكره`)
.setDescription(`**لقد نقل هذا الإداري التذكره الى قسم مشاكل برمجيه**`)
.addFields(
{ name: `Username S`, value: `${msg.author.tag}`, inline: true },
{ name: `ID S`, value: `${msg.author.id}`, inline: true },
{ name: `Mention S`, value: `${msg.author}`, inline: true },
{ name: `Ticket`, value: `${msg.channel}`, inline: false },)
.setColor(`GREEN`)] })
}else{
if(value === "6"){
msg.channel.setParent(`938069235551330394`)
msg.channel.send({ content: `@everyone`, embeds: [new MessageEmbed()
.setAuthor({ name:msg.author.username, iconURL:msg.author.avatarURL() })
.setDescription(`**تم نقل التذكره من قبل ${msg.author.username}**`)
.setColor(`#2F3136`) ]})
ticketdb.deleteOne({ Channel_Id : msg.channel.id }, function (err){if(err)return console.log(err)});
datadb = new ticketdb({
User : datadb.User,
Status : datadb.Status,
Channel_Id : datadb.Channel_Id,
R_Number : datadb.R_Number,
R_Info : `لم يتم القبول`
})
datadb.save()
msg2.delete();
log.send({ embeds: [new MessageEmbed()
.setTitle(`نقل تذكره`)
.setDescription(`**لقد نقل هذا الإداري التذكره الى قسم طلب تعويض**`)
.addFields(
{ name: `Username S`, value: `${msg.author.tag}`, inline: true },
{ name: `ID S`, value: `${msg.author.id}`, inline: true },
{ name: `Mention S`, value: `${msg.author}`, inline: true },
{ name: `Ticket`, value: `${msg.channel}`, inline: false },)
.setColor(`GREEN`)] })
}else{
if(value === "7"){
msg.channel.setParent(`938069236172062750`)
msg.channel.send({ content: `@everyone`, embeds: [new MessageEmbed()
.setAuthor({ name:msg.author.username, iconURL:msg.author.avatarURL() })
.setDescription(`**تم نقل التذكره من قبل ${msg.author.username}**`)
.setColor(`#2F3136`) ]})
ticketdb.deleteOne({ Channel_Id : msg.channel.id }, function (err){if(err)return console.log(err)});
datadb = new ticketdb({
User : datadb.User,
Status : datadb.Status,
Channel_Id : datadb.Channel_Id,
R_Number : datadb.R_Number,
R_Info : `لم يتم القبول`
})
datadb.save()
msg2.delete();
log.send({ embeds: [new MessageEmbed()
.setTitle(`نقل تذكره`)
.setDescription(`**لقد نقل هذا الإداري التذكره الى قسم فاكشن عصابه/عائله**`)
.addFields(
{ name: `Username S`, value: `${msg.author.tag}`, inline: true },
{ name: `ID S`, value: `${msg.author.id}`, inline: true },
{ name: `Mention S`, value: `${msg.author}`, inline: true },
{ name: `Ticket`, value: `${msg.channel}`, inline: false },)
.setColor(`GREEN`)] })
}else{
if(value === "8"){
msg.channel.setParent(`938069236641849395`)
msg.channel.send({ content: `@everyone`, embeds: [new MessageEmbed()
.setAuthor({ name:msg.author.username, iconURL:msg.author.avatarURL() })
.setDescription(`**تم نقل التذكره من قبل ${msg.author.username}**`)
.setColor(`#2F3136`) ]})
ticketdb.deleteOne({ Channel_Id : msg.channel.id }, function (err){if(err)return console.log(err)});
datadb = new ticketdb({
User : datadb.User,
Status : datadb.Status,
Channel_Id : datadb.Channel_Id,
R_Number : datadb.R_Number,
R_Info : `لم يتم القبول`
})
datadb.save()
msg2.delete();
log.send({ embeds: [new MessageEmbed()
.setTitle(`نقل تذكره`)
.setDescription(`**لقد نقل هذا الإداري التذكره الى قسم شكوى على ادمن**`)
.addFields(
{ name: `Username S`, value: `${msg.author.tag}`, inline: true },
{ name: `ID S`, value: `${msg.author.id}`, inline: true },
{ name: `Mention S`, value: `${msg.author}`, inline: true },
{ name: `Ticket`, value: `${msg.channel}`, inline: false },)
.setColor(`GREEN`)] })
}else{
if(value === "9"){
msg.channel.setParent(`938069237803675748`)
msg.channel.send({ content: `@everyone`, embeds: [new MessageEmbed()
.setAuthor({ name:msg.author.username, iconURL:msg.author.avatarURL() })
.setDescription(`**تم نقل التذكره من قبل ${msg.author.username}**`)
.setColor(`#2F3136`) ]})
ticketdb.deleteOne({ Channel_Id : msg.channel.id }, function (err){if(err)return console.log(err)});
datadb = new ticketdb({
User : datadb.User,
Status : datadb.Status,
Channel_Id : datadb.Channel_Id,
R_Number : datadb.R_Number,
R_Info : `لم يتم القبول`
})
datadb.save()
msg2.delete();
log.send({ embeds: [new MessageEmbed()
.setTitle(`نقل تذكره`)
.setDescription(`**لقد نقل هذا الإداري التذكره الى قسم شكوى على سبورت**`)
.addFields(
{ name: `Username S`, value: `${msg.author.tag}`, inline: true },
{ name: `ID S`, value: `${msg.author.id}`, inline: true },
{ name: `Mention S`, value: `${msg.author}`, inline: true },
{ name: `Ticket`, value: `${msg.channel}`, inline: false },)
.setColor(`GREEN`)] })
}else{
if(value === "10"){
msg.channel.setParent(`938069239108079646`)
msg.channel.send({ content: `@everyone`, embeds: [new MessageEmbed()
.setAuthor({ name:msg.author.username, iconURL:msg.author.avatarURL() })
.setDescription(`**تم نقل التذكره من قبل ${msg.author.username}**`)
.setColor(`#2F3136`) ]})
ticketdb.deleteOne({ Channel_Id : msg.channel.id }, function (err){if(err)return console.log(err)});
datadb = new ticketdb({
User : datadb.User,
Status : datadb.Status,
Channel_Id : datadb.Channel_Id,
R_Number : datadb.R_Number,
R_Info : `لم يتم القبول`
})
datadb.save()
msg2.delete();
log.send({ embeds: [new MessageEmbed()
.setTitle(`نقل تذكره`)
.setDescription(`**لقد نقل هذا الإداري التذكره الى قسم مشاكل ديسكورد**`)
.addFields(
{ name: `Username S`, value: `${msg.author.tag}`, inline: true },
{ name: `ID S`, value: `${msg.author.id}`, inline: true },
{ name: `Mention S`, value: `${msg.author}`, inline: true },
{ name: `Ticket`, value: `${msg.channel}`, inline: false },)
.setColor(`GREEN`)] })
}
}
}
}
}
}
}
}
}
}
})
})
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
};