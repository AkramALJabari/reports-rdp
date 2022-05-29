const { MessageEmbed, MessageActionRow, MessageSelectMenu, MessageButton } = require(`discord.js`);
const data = require(`../data.json`);
const ticketdb = require('../models/ticket')
const votedb = require('../models/vote')
const db = require("quick.db")
const fs = require("fs")
const ms = require("ms")

module.exports = {
name: "report",
run: async(client, msg, log, guild) => {
const datab = fs.readFileSync("./blocks.json");
const blocks = JSON.parse(datab);
now = Math.floor(Date.now() / 1000);
for (index in blocks){
block = blocks[index];
if(block['time'] <= now){
blocks.slice(index, 1);
var new_json = JSON.stringify(blocks);
fs.writeFileSync('../blocks.json', new_json, 'utf8');
continue;
}
if (block['id'].toString() == msg.author.id.toString()){
let command = msg.content.toLowerCase().split(' ')[0].slice(data.prefix.length);
if (command !== 'unblock')return;
}}


if(msg.channel.type == `DM`){
/*let timesout = await db.fetch(`timeout_${msg.author.id}`);
if(timesout > Math.floor(Date.now() / 1000) || !timesout){
msg.channel.send({ content: `**يمكنك استخدام هذا الامر بعد <t:${timesout}:R>**` })
}else*/{
ticketdb.findOne({ User : msg.author.id }, (err, datadb) => {
if(!datadb){
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
.setDescription(`**يرجى إختيار قسم الريبورت المطلوب!**`)
.setColor(`#2F3136`)], components: [row] }).then(msg2 => {
const collector = msg.channel.createMessageComponentCollector({
componentType: "SELECT_MENU",
max: 1
})
var oldn = db.fetch(`number`) || 0
collector.on("collect", async (collected) => {
const value = collected.values[0]
if(value === "1"){
if(db.fetch(`Status1`) == `close`){
msg.channel.send({ content: `**عذراً لقد تم اغلاق هذا القسم**` })
msg2.delete();
log.send({ embeds: [new MessageEmbed()
.setTitle(`محاولة انشاء تذكره فاشله`)
.setDescription(`**لقد حاول هذا العضو انشاء تذكره من قسم استفسارات عامه**`)
.addFields(
{ name: `Username`, value: `${msg.author.tag}`, inline: true },
{ name: `ID`, value: `${msg.author.id}`, inline: true },
{ name: `Mention`, value: `${msg.author}`, inline: true },)
.setColor(`RED`) ]})
}else{
if(db.fetch(`Status1`) == `open`){
var newn = oldn+1
await db.set(`number`, newn)
guild.channels.create(`${newn}`, { type: 'text' }).then(async c => {
c.setParent(`938069232145534976`)
c.send({ content: `@everyone`, embeds: [new MessageEmbed()
.setThumbnail(msg.author.avatarURL({ format: "png", dynamic: true }))
.setDescription(`**Reporter Name : ${msg.author.username}
Reporter ID : ${msg.author.id}
Reporter Tag : ${msg.author.tag}
Reporter Mention : ${msg.author}
Reporte Number : ${newn}**`)
.setColor(`#2F3136`) ]})
msg.channel.send({ content: `**لقد تم رفع رسالتك لفريق الإدارة سيتم التواصل معك في اقرب وقت ممكن\nرقم الريبورت : ${newn}**` })
datadb = new ticketdb({
User : msg.author.id,
Status : `open`,
Channel_Id : c.id,
R_Number : `${newn}`,
R_Info : `لم يتم القبول`
})
datadb.save()
msg2.delete();
log.send({ embeds: [new MessageEmbed()
.setTitle(`محاولة انشاء تذكره ناجحه`)
.setDescription(`**لقد صنع هذا العضو تذكره من قسم استفسارات عامه**`)
.addFields(
{ name: `Username`, value: `${msg.author.tag}`, inline: true },
{ name: `ID`, value: `${msg.author.id}`, inline: true },
{ name: `Mention`, value: `${msg.author}`, inline: true },
{ name: `Ticket`, value: `${c}`, inline: false },)
.setColor(`GREEN`) ]})
})
}
}
}else{
if(value === "2"){
if(db.fetch(`Status2`) == `close`){
msg.channel.send({ content: `**عذراً لقد تم اغلاق هذا القسم**` })
msg2.delete();
log.send({ embeds: [new MessageEmbed()
.setTitle(`محاولة انشاء تذكره فاشله`)
.setDescription(`**لقد حاول هذا العضو انشاء تذكره من قسم مشاكل المركبات**`)
.addFields(
{ name: `Username`, value: `${msg.author.tag}`, inline: true },
{ name: `ID`, value: `${msg.author.id}`, inline: true },
{ name: `Mention`, value: `${msg.author}`, inline: true },)
.setColor(`RED`) ]})
}else{
if(db.fetch(`Status2`) == `open`){
var newn = oldn+1
await db.set(`number`, newn)
guild.channels.create(`${newn}`, { type: 'text' }).then(async c => {
c.setParent(`938069232745345044`)
c.send({ content: `@everyone`, embeds: [new MessageEmbed()
.setThumbnail(msg.author.avatarURL({ format: "png", dynamic: true }))
.setDescription(`**Reporter Name : ${msg.author.username}
Reporter ID : ${msg.author.id}
Reporter Tag : ${msg.author.tag}
Reporter Mention : ${msg.author}
Reporte Number : ${newn}**`)
.setColor(`#2F3136`) ]})
msg.channel.send({ content: `**لقد تم رفع رسالتك لفريق الإدارة سيتم التواصل معك في اقرب وقت ممكن\nرقم الريبورت : ${newn}**` })
datadb = new ticketdb({
User : msg.author.id,
Status : `open`,
Channel_Id : c.id,
R_Number : `${newn}`,
R_Info : `لم يتم القبول`
})
datadb.save()
msg2.delete();
log.send({ embeds: [new MessageEmbed()
.setTitle(`محاولة انشاء تذكره ناجحه`)
.setDescription(`**لقد صنع هذا العضو تذكره من قسم مشاكل المركبات**`)
.addFields(
{ name: `Username`, value: `${msg.author.tag}`, inline: true },
{ name: `ID`, value: `${msg.author.id}`, inline: true },
{ name: `Mention`, value: `${msg.author}`, inline: true },
{ name: `Ticket`, value: `${c}`, inline: false },)
.setColor(`GREEN`) ]})
})
}
}
}else{
if(value === "3"){
if(db.fetch(`Status3`) == `close`){
msg.channel.send({ content: `**عذراً لقد تم اغلاق هذا القسم**` })
msg2.delete();
log.send({ embeds: [new MessageEmbed()
.setTitle(`محاولة انشاء تذكره فاشله`)
.setDescription(`**لقد حاول هذا العضو انشاء تذكره من قسم مشاكل مابات**`)
.addFields(
{ name: `Username`, value: `${msg.author.tag}`, inline: true },
{ name: `ID`, value: `${msg.author.id}`, inline: true },
{ name: `Mention`, value: `${msg.author}`, inline: true },)
.setColor(`RED`) ]})
}else{
if(db.fetch(`Status3`) == `open`){
var newn = oldn+1
await db.set(`number`, newn)
guild.channels.create(`${newn}`, { type: 'text' }).then(async c => {
c.setParent(`938069233303158846`)
c.send({ content: `@everyone`, embeds: [new MessageEmbed()
.setThumbnail(msg.author.avatarURL({ format: "png", dynamic: true }))
.setDescription(`**Reporter Name : ${msg.author.username}
Reporter ID : ${msg.author.id}
Reporter Tag : ${msg.author.tag}
Reporter Mention : ${msg.author}
Reporte Number : ${newn}**`)
.setColor(`#2F3136`) ]})
msg.channel.send({ content: `**لقد تم رفع رسالتك لفريق الإدارة سيتم التواصل معك في اقرب وقت ممكن\nرقم الريبورت : ${newn}**` })
datadb = new ticketdb({
User : msg.author.id,
Status : `open`,
Channel_Id : c.id,
R_Number : `${newn}`,
R_Info : `لم يتم القبول`
})
datadb.save()
msg2.delete();
log.send({ embeds: [new MessageEmbed()
.setTitle(`محاولة انشاء تذكره ناجحه`)
.setDescription(`**لقد صنع هذا العضو تذكره من قسم مشاكل مابات**`)
.addFields(
{ name: `Username`, value: `${msg.author.tag}`, inline: true },
{ name: `ID`, value: `${msg.author.id}`, inline: true },
{ name: `Mention`, value: `${msg.author}`, inline: true },
{ name: `Ticket`, value: `${c}`, inline: false },)
.setColor(`GREEN`) ]})
})
}
}
}else{
if(value === "4"){
if(db.fetch(`Status4`) == `close`){
msg.channel.send({ content: `**عذراً لقد تم اغلاق هذا القسم**` })
msg2.delete();
log.send({ embeds: [new MessageEmbed()
.setTitle(`محاولة انشاء تذكره فاشله`)
.setDescription(`**لقد حاول هذا العضو انشاء تذكره من قسم اعتراض على باند**`)
.addFields(
{ name: `Username`, value: `${msg.author.tag}`, inline: true },
{ name: `ID`, value: `${msg.author.id}`, inline: true },
{ name: `Mention`, value: `${msg.author}`, inline: true },)
.setColor(`RED`) ]})
}else{
if(db.fetch(`Status4`) == `open`){
var newn = oldn+1
await db.set(`number`, newn)
guild.channels.create(`${newn}`, { type: 'text' }).then(async c => {
c.setParent(`938069233827467366`)
c.send({ content: `@everyone`, embeds: [new MessageEmbed()
.setThumbnail(msg.author.avatarURL({ format: "png", dynamic: true }))
.setDescription(`**Reporter Name : ${msg.author.username}
Reporter ID : ${msg.author.id}
Reporter Tag : ${msg.author.tag}
Reporter Mention : ${msg.author}
Reporte Number : ${newn}**`)
.setColor(`#2F3136`) ]})
msg.channel.send({ content: `**لقد تم رفع رسالتك لفريق الإدارة سيتم التواصل معك في اقرب وقت ممكن\nرقم الريبورت : ${newn}**` })
datadb = new ticketdb({
User : msg.author.id,
Status : `open`,
Channel_Id : c.id,
R_Number : `${newn}`,
R_Info : `لم يتم القبول`
})
datadb.save()
msg2.delete();
log.send({ embeds: [new MessageEmbed()
.setTitle(`محاولة انشاء تذكره ناجحه`)
.setDescription(`**لقد صنع هذا العضو تذكره من قسم اعتراض على باند**`)
.addFields(
{ name: `Username`, value: `${msg.author.tag}`, inline: true },
{ name: `ID`, value: `${msg.author.id}`, inline: true },
{ name: `Mention`, value: `${msg.author}`, inline: true },
{ name: `Ticket`, value: `${c}`, inline: false },)
.setColor(`GREEN`) ]})
})
}
}
}else{
if(value === "5"){
if(db.fetch(`Status5`) == `close`){
msg.channel.send({ content: `**عذراً لقد تم اغلاق هذا القسم**` })
msg2.delete();
log.send({ embeds: [new MessageEmbed()
.setTitle(`محاولة انشاء تذكره فاشله`)
.setDescription(`**لقد حاول هذا العضو انشاء تذكره من قسم مشاكل برمجيه**`)
.addFields(
{ name: `Username`, value: `${msg.author.tag}`, inline: true },
{ name: `ID`, value: `${msg.author.id}`, inline: true },
{ name: `Mention`, value: `${msg.author}`, inline: true },)
.setColor(`RED`) ]})
}else{
if(db.fetch(`Status5`) == `open`){
var newn = oldn+1
await db.set(`number`, newn)
guild.channels.create(`${newn}`, { type: 'text' }).then(async c => {
c.setParent(`938069234804731925`)
c.send({ content: `@everyone`, embeds: [new MessageEmbed()
.setThumbnail(msg.author.avatarURL({ format: "png", dynamic: true }))
.setDescription(`**Reporter Name : ${msg.author.username}
Reporter ID : ${msg.author.id}
Reporter Tag : ${msg.author.tag}
Reporter Mention : ${msg.author}
Reporte Number : ${newn}**`)
.setColor(`#2F3136`) ]})
msg.channel.send({ content: `**لقد تم رفع رسالتك لفريق الإدارة سيتم التواصل معك في اقرب وقت ممكن\nرقم الريبورت : ${newn}**` })
datadb = new ticketdb({
User : msg.author.id,
Status : `open`,
Channel_Id : c.id,
R_Number : `${newn}`,
R_Info : `لم يتم القبول`
})
datadb.save()
msg2.delete();
log.send({ embeds: [new MessageEmbed()
.setTitle(`محاولة انشاء تذكره ناجحه`)
.setDescription(`**لقد صنع هذا العضو تذكره من قسم مشاكل برمجيه**`)
.addFields(
{ name: `Username`, value: `${msg.author.tag}`, inline: true },
{ name: `ID`, value: `${msg.author.id}`, inline: true },
{ name: `Mention`, value: `${msg.author}`, inline: true },
{ name: `Ticket`, value: `${c}`, inline: false },)
.setColor(`GREEN`) ]})
})
}
}
}else{
if(value === "6"){
if(db.fetch(`Status6`) == `close`){
msg.channel.send({ content: `**عذراً لقد تم اغلاق هذا القسم**` })
msg2.delete();
log.send({ embeds: [new MessageEmbed()
.setTitle(`محاولة انشاء تذكره فاشله`)
.setDescription(`**لقد حاول هذا العضو انشاء تذكره من قسم طلب تعويض**`)
.addFields(
{ name: `Username`, value: `${msg.author.tag}`, inline: true },
{ name: `ID`, value: `${msg.author.id}`, inline: true },
{ name: `Mention`, value: `${msg.author}`, inline: true },)
.setColor(`RED`) ]})
}else{
if(db.fetch(`Status6`) == `open`){
var newn = oldn+1
await db.set(`number`, newn)
guild.channels.create(`${newn}`, { type: 'text' }).then(async c => {
c.setParent(`938069235551330394`)
c.send({ content: `@everyone`, embeds: [new MessageEmbed()
.setThumbnail(msg.author.avatarURL({ format: "png", dynamic: true }))
.setDescription(`**Reporter Name : ${msg.author.username}
Reporter ID : ${msg.author.id}
Reporter Tag : ${msg.author.tag}
Reporter Mention : ${msg.author}
Reporte Number : ${newn}**`)
.setColor(`#2F3136`) ]})
msg.channel.send({ content: `**لقد تم رفع رسالتك لفريق الإدارة سيتم التواصل معك في اقرب وقت ممكن\nرقم الريبورت : ${newn}**` })
datadb = new ticketdb({
User : msg.author.id,
Status : `open`,
Channel_Id : c.id,
R_Number : `${newn}`,
R_Info : `لم يتم القبول`
})
datadb.save()
msg2.delete();
log.send({ embeds: [new MessageEmbed()
.setTitle(`محاولة انشاء تذكره ناجحه`)
.setDescription(`**لقد صنع هذا العضو تذكره من قسم طلب تعويض**`)
.addFields(
{ name: `Username`, value: `${msg.author.tag}`, inline: true },
{ name: `ID`, value: `${msg.author.id}`, inline: true },
{ name: `Mention`, value: `${msg.author}`, inline: true },
{ name: `Ticket`, value: `${c}`, inline: false },)
.setColor(`GREEN`) ]})
})
}
}
}else{
if(value === "7"){
if(db.fetch(`Status7`) == `close`){
msg.channel.send({ content: `**عذراً لقد تم اغلاق هذا القسم**` })
msg2.delete();
log.send({ embeds: [new MessageEmbed()
.setTitle(`محاولة انشاء تذكره فاشله`)
.setDescription(`**لقد حاول هذا العضو انشاء تذكره من قسم فاكشن عصابه/عائله**`)
.addFields(
{ name: `Username`, value: `${msg.author.tag}`, inline: true },
{ name: `ID`, value: `${msg.author.id}`, inline: true },
{ name: `Mention`, value: `${msg.author}`, inline: true },)
.setColor(`RED`) ]})
}else{
if(db.fetch(`Status7`) == `open`){
var newn = oldn+1
await db.set(`number`, newn)
guild.channels.create(`${newn}`, { type: 'text' }).then(async c => {
c.setParent(`938069236172062750`)
c.send({ content: `@everyone`, embeds: [new MessageEmbed()
.setThumbnail(msg.author.avatarURL({ format: "png", dynamic: true }))
.setDescription(`**Reporter Name : ${msg.author.username}
Reporter ID : ${msg.author.id}
Reporter Tag : ${msg.author.tag}
Reporter Mention : ${msg.author}
Reporte Number : ${newn}**`)
.setColor(`#2F3136`) ]})
msg.channel.send({ content: `**لقد تم رفع رسالتك لفريق الإدارة سيتم التواصل معك في اقرب وقت ممكن\nرقم الريبورت : ${newn}**` })
datadb = new ticketdb({
User : msg.author.id,
Status : `open`,
Channel_Id : c.id,
R_Number : `${newn}`,
R_Info : `لم يتم القبول`
})
datadb.save()
msg2.delete();
log.send({ embeds: [new MessageEmbed()
.setTitle(`محاولة انشاء تذكره ناجحه`)
.setDescription(`**لقد صنع هذا العضو تذكره من قسم فاكشن عصابه/عائله**`)
.addFields(
{ name: `Username`, value: `${msg.author.tag}`, inline: true },
{ name: `ID`, value: `${msg.author.id}`, inline: true },
{ name: `Mention`, value: `${msg.author}`, inline: true },
{ name: `Ticket`, value: `${c}`, inline: false },)
.setColor(`GREEN`) ]})
})
}
}
}else{
if(value === "8"){
if(db.fetch(`Status8`) == `close`){
msg.channel.send({ content: `**عذراً لقد تم اغلاق هذا القسم**` })
msg2.delete();
log.send({ embeds: [new MessageEmbed()
.setTitle(`محاولة انشاء تذكره فاشله`)
.setDescription(`**لقد حاول هذا العضو انشاء تذكره من قسم شكوى على ادمن**`)
.addFields(
{ name: `Username`, value: `${msg.author.tag}`, inline: true },
{ name: `ID`, value: `${msg.author.id}`, inline: true },
{ name: `Mention`, value: `${msg.author}`, inline: true },)
.setColor(`RED`) ]})
}else{
if(db.fetch(`Status8`) == `open`){
var newn = oldn+1
await db.set(`number`, newn)
guild.channels.create(`${newn}`, { type: 'text' }).then(async c => {
c.setParent(`938069236641849395`)
c.send({ content: `@everyone`, embeds: [new MessageEmbed()
.setThumbnail(msg.author.avatarURL({ format: "png", dynamic: true }))
.setDescription(`**Reporter Name : ${msg.author.username}
Reporter ID : ${msg.author.id}
Reporter Tag : ${msg.author.tag}
Reporter Mention : ${msg.author}
Reporte Number : ${newn}**`)
.setColor(`#2F3136`) ]})
msg.channel.send({ content: `**لقد تم رفع رسالتك لفريق الإدارة سيتم التواصل معك في اقرب وقت ممكن\nرقم الريبورت : ${newn}**` })
datadb = new ticketdb({
User : msg.author.id,
Status : `open`,
Channel_Id : c.id,
R_Number : `${newn}`,
R_Info : `لم يتم القبول`
})
datadb.save()
msg2.delete();
log.send({ embeds: [new MessageEmbed()
.setTitle(`محاولة انشاء تذكره ناجحه`)
.setDescription(`**لقد صنع هذا العضو تذكره من قسم شكوى على ادمن**`)
.addFields(
{ name: `Username`, value: `${msg.author.tag}`, inline: true },
{ name: `ID`, value: `${msg.author.id}`, inline: true },
{ name: `Mention`, value: `${msg.author}`, inline: true },
{ name: `Ticket`, value: `${c}`, inline: false },)
.setColor(`GREEN`) ]})
})
}
}
}else{
if(value === "9"){
if(db.fetch(`Status9`) == `close`){
msg.channel.send({ content: `**عذراً لقد تم اغلاق هذا القسم**` })
msg2.delete();
log.send({ embeds: [new MessageEmbed()
.setTitle(`محاولة انشاء تذكره فاشله`)
.setDescription(`**لقد حاول هذا العضو انشاء تذكره من قسم شكوى على سبورت**`)
.addFields(
{ name: `Username`, value: `${msg.author.tag}`, inline: true },
{ name: `ID`, value: `${msg.author.id}`, inline: true },
{ name: `Mention`, value: `${msg.author}`, inline: true },)
.setColor(`RED`) ]})
}else{
if(db.fetch(`Status9`) == `open`){
var newn = oldn+1
await db.set(`number`, newn)
guild.channels.create(`${newn}`, { type: 'text' }).then(async c => {
c.setParent(`938069237803675748`)
c.send({ content: `@everyone`, embeds: [new MessageEmbed()
.setThumbnail(msg.author.avatarURL({ format: "png", dynamic: true }))
.setDescription(`**Reporter Name : ${msg.author.username}
Reporter ID : ${msg.author.id}
Reporter Tag : ${msg.author.tag}
Reporter Mention : ${msg.author}
Reporte Number : ${newn}**`)
.setColor(`#2F3136`) ]})
msg.channel.send({ content: `**لقد تم رفع رسالتك لفريق الإدارة سيتم التواصل معك في اقرب وقت ممكن\nرقم الريبورت : ${newn}**` })
datadb = new ticketdb({
User : msg.author.id,
Status : `open`,
Channel_Id : c.id,
R_Number : `${newn}`,
R_Info : `لم يتم القبول`
})
datadb.save()
msg2.delete();
log.send({ embeds: [new MessageEmbed()
.setTitle(`محاولة انشاء تذكره ناجحه`)
.setDescription(`**لقد صنع هذا العضو تذكره من قسم شكوى على سبورت**`)
.addFields(
{ name: `Username`, value: `${msg.author.tag}`, inline: true },
{ name: `ID`, value: `${msg.author.id}`, inline: true },
{ name: `Mention`, value: `${msg.author}`, inline: true },
{ name: `Ticket`, value: `${c}`, inline: false },)
.setColor(`GREEN`) ]})
})
}
}
}else{
if(value === "10"){
if(db.fetch(`Status10`) == `close`){
msg.channel.send({ content: `**عذراً لقد تم اغلاق هذا القسم**` })
msg2.delete();
log.send({ embeds: [new MessageEmbed()
.setTitle(`محاولة انشاء تذكره فاشله`)
.setDescription(`**لقد حاول هذا العضو انشاء تذكره من قسم مشاكل ديسكورد**`)
.addFields(
{ name: `Username`, value: `${msg.author.tag}`, inline: true },
{ name: `ID`, value: `${msg.author.id}`, inline: true },
{ name: `Mention`, value: `${msg.author}`, inline: true },)
.setColor(`RED`) ]})
}else{
if(db.fetch(`Status10`) == `open`){
var newn = oldn+1
await db.set(`number`, newn)
guild.channels.create(`${newn}`, { type: 'text' }).then(async c => {
c.setParent(`938069239108079646`)
c.send({ content: `@everyone`, embeds: [new MessageEmbed()
.setThumbnail(msg.author.avatarURL({ format: "png", dynamic: true }))
.setDescription(`**Reporter Name : ${msg.author.username}
Reporter ID : ${msg.author.id}
Reporter Tag : ${msg.author.tag}
Reporter Mention : ${msg.author}
Reporte Number : ${newn}**`)
.setColor(`#2F3136`) ]})
msg.channel.send({ content: `**لقد تم رفع رسالتك لفريق الإدارة سيتم التواصل معك في اقرب وقت ممكن\nرقم الريبورت : ${newn}**` })
datadb = new ticketdb({
User : msg.author.id,
Status : `open`,
Channel_Id : c.id,
R_Number : `${newn}`,
R_Info : `لم يتم القبول`
})
datadb.save()
msg2.delete();
log.send({ embeds: [new MessageEmbed()
.setTitle(`محاولة انشاء تذكره ناجحه`)
.setDescription(`**لقد صنع هذا العضو تذكره من قسم مشاكل ديسكورد**`)
.addFields(
{ name: `Username`, value: `${msg.author.tag}`, inline: true },
{ name: `ID`, value: `${msg.author.id}`, inline: true },
{ name: `Mention`, value: `${msg.author}`, inline: true },
{ name: `Ticket`, value: `${c}`, inline: false },)
.setColor(`GREEN`) ]})
})
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
}
}
})
})
}
})
}
}





}
};