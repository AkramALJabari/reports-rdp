const { Collection, Client, MessageEmbed, Intents, MessageActionRow, MessageSelectMenu, MessageButton } = require(`discord.js`);
const data = require(`./data.json`);
const client = new Client({ intents: [
Intents.FLAGS.GUILDS,
Intents.FLAGS.GUILD_MESSAGES,
Intents.FLAGS.DIRECT_MESSAGES,
Intents.FLAGS.DIRECT_MESSAGE_TYPING,
Intents.FLAGS.GUILD_MEMBERS,
Intents.FLAGS.GUILD_BANS,
Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
],
partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
presence: {
activities: [{
name: `${data.prefix}report`,
type: `COMPETING`}],
status: `online`}});
client.setMaxListeners(0);
const fs = require(`fs`);
const ms = require("ms");
const mongoose = require("mongoose");
const db = require("quick.db");
const gameStats = require("@999-cs/game-stats");
let { query } = require("@999-cs/game-stats");
const moment = require("moment");
const mysql = require(`mysql`);




//shortcuts
client.data = data;
client.commands = new Collection();

const log = client.channels.cache.get("938052857557573680")
const guild = client.guilds.cache.get(data.guild);

//commands run
fs.readdir(`./commands/`, (err, files) => {
if(err)return console.log(err);
files.forEach(file => {
if(!file.endsWith(".js"))return;
const command = require(`./commands/${file}`);
let commandName = file.split(".")[0];
console.log(`Loading Command: "${commandName}"`);
client.commands.set(command.name, command);
});
});
fs.readdir(`./commands/usb/`, (err, files) => {
if(err)return console.log(err);
files.forEach(file => {
if(!file.endsWith(".js"))return;
const command = require(`./commands/usb/${file}`);
let commandName = file.split(".")[0];
console.log(`Loading Command USB: "${commandName}"`);
client.commands.set(command.name, command);
});
});
fs.readdir("./events/", (err, files) => {
if(err)return console.log(err);
files.forEach(file => {
if(!file.endsWith(".js"))return;
const event = require(`./events/${file}`);
let eventName = file.split(".")[0];
console.log(`Loading Event: "${eventName}"`);
client.on(eventName, event.bind(null, client));
});
});


//ready
client.on("ready",async () => {
await console.log(client.user.tag + " Is Ready");
})



//errors
client.on("error", err =>{
console.error(`[ERROR] - ${err}`)
var channel = client.channels.cache.find(c => c.id === "938052857557573678");
channel.send({ content: `[ERROR] -\n\`\`\`js\n${err}\n\`\`\`` })
});
client.on("warn", warn =>{
console.warn(`[WARN] - ${warn}`)
var channel = client.channels.cache.find(c => c.id === "938052857557573678");
channel.send({ content: `[WARN] -\n\`\`\`js\n${warn}\n\`\`\`` })
});
process.on("unhandledRejection", (reason, promise) => {
console.log("Unhandled Rejection at:", reason.stack || reason);
var channel = client.channels.cache.find(c => c.id === "938052857557573678");
channel.send({ content: `\`\`\`js\n${reason.stack || reason}\n\`\`\`` })
});


//mongodb
mongoose.connect(`mongodb+srv://royaltime:pQjC0bf4sGYjFTRf@royal-time-db.doxjc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`, {
useUnifiedTopology: false,
useNewUrlParser: true,
}).then(console.log("Connected successfully to Mongodb ???"))

const ticketdb = require('./models/ticket')
const votedb = require('./models/vote')

client.on("messageCreate", msg => {
const guild = client.guilds.cache.get(data.guild);
if(msg.channel.type == `DM`){
ticketdb.findOne({ User : msg.author.id }, (err, datadb) => {
if(datadb){
let c = guild.channels.cache.find(channel => channel.id === datadb.Channel_Id);
if(msg.attachments.size > 0){
msg.attachments.forEach(attachment => {
const ImageLink = attachment.proxyURL;
c.send({ content: `**<:user:938305640395321375> ${msg.author.username} : **${msg.content}`, embeds: [new MessageEmbed()
.setImage(ImageLink)
.setColor(`#2F3136`) ]})
msg.channel.send({ content: `**<:user:938305640395321375> ${msg.author.username} : **${msg.content}`, embeds: [new MessageEmbed()
.setImage(ImageLink)
.setColor(`#2F3136`) ]})
})
}else{
c.send({ content: `**<:user:938305640395321375> ${msg.author.username} : **${msg.content}` })
msg.channel.send({ content: `**<:user:938305640395321375> ${msg.author.username} : **${msg.content}` })
}
}
})
}
})

client.on('interactionCreate',async interaction => {
if(!interaction.isButton())return;
if(!interaction.guild)return;
if(!interaction.member.roles.cache.some(role => role.id === `938052856878080012`))return;
if(interaction.customId == `1`){
if(db.fetch(`Status1`) == `open`){
db.set(`Status1`, `close`)
await interaction.update({ content: interaction.content, components: [new MessageActionRow()
.addComponents(new MessageButton()
.setCustomId(`1`)
.setLabel(`????????`)
.setStyle(`DANGER`)
)] })
}else{
if(db.fetch(`Status1`) == `close`){
db.set(`Status1`, `open`)
await interaction.update({ content: interaction.content, components: [new MessageActionRow()
.addComponents(new MessageButton()
.setCustomId(`1`)
.setLabel(`??????????`)
.setStyle(`SUCCESS`)
)] })
}
}
await interaction.followUp({ content: `**???? ?????????? ???????????? ??????????**`, ephemeral:true })
}
if(interaction.customId == `2`){
if(db.fetch(`Status2`) == `open`){
db.set(`Status2`, `close`)
await interaction.update({ content: interaction.content, components: [new MessageActionRow()
.addComponents(new MessageButton()
.setCustomId(`2`)
.setLabel(`????????`)
.setStyle(`DANGER`)
)] })
}else{
if(db.fetch(`Status2`) == `close`){
db.set(`Status2`, `open`)
await interaction.update({ content: interaction.content, components: [new MessageActionRow()
.addComponents(new MessageButton()
.setCustomId(`2`)
.setLabel(`??????????`)
.setStyle(`SUCCESS`)
)] })
}
}
await interaction.followUp({ content: `**???? ?????????? ???????????? ??????????**`, ephemeral:true })
}
if(interaction.customId == `3`){
if(db.fetch(`Status3`) == `open`){
db.set(`Status3`, `close`)
await interaction.update({ content: interaction.content, components: [new MessageActionRow()
.addComponents(new MessageButton()
.setCustomId(`3`)
.setLabel(`????????`)
.setStyle(`DANGER`)
)] })
}else{
if(db.fetch(`Status3`) == `close`){
db.set(`Status3`, `open`)
await interaction.update({ content: interaction.content, components: [new MessageActionRow()
.addComponents(new MessageButton()
.setCustomId(`3`)
.setLabel(`??????????`)
.setStyle(`SUCCESS`)
)] })
}
}
await interaction.followUp({ content: `**???? ?????????? ???????????? ??????????**`, ephemeral:true })
}
if(interaction.customId == `4`){
if(db.fetch(`Status4`) == `open`){
db.set(`Status4`, `close`)
await interaction.update({ content: interaction.content, components: [new MessageActionRow()
.addComponents(new MessageButton()
.setCustomId(`4`)
.setLabel(`????????`)
.setStyle(`DANGER`)
)] })
}else{
if(db.fetch(`Status4`) == `close`){
db.set(`Status4`, `open`)
await interaction.update({ content: interaction.content, components: [new MessageActionRow()
.addComponents(new MessageButton()
.setCustomId(`4`)
.setLabel(`??????????`)
.setStyle(`SUCCESS`)
)] })
}
}
await interaction.followUp({ content: `**???? ?????????? ???????????? ??????????**`, ephemeral:true })
}
if(interaction.customId == `5`){
if(db.fetch(`Status5`) == `open`){
db.set(`Status5`, `close`)
await interaction.update({ content: interaction.content, components: [new MessageActionRow()
.addComponents(new MessageButton()
.setCustomId(`5`)
.setLabel(`????????`)
.setStyle(`DANGER`)
)] })
}else{
if(db.fetch(`Status5`) == `close`){
db.set(`Status5`, `open`)
await interaction.update({ content: interaction.content, components: [new MessageActionRow()
.addComponents(new MessageButton()
.setCustomId(`5`)
.setLabel(`??????????`)
.setStyle(`SUCCESS`)
)] })
}
}
await interaction.followUp({ content: `**???? ?????????? ???????????? ??????????**`, ephemeral:true })
}
if(interaction.customId == `6`){
if(db.fetch(`Status6`) == `open`){
db.set(`Status6`, `close`)
await interaction.update({ content: interaction.content, components: [new MessageActionRow()
.addComponents(new MessageButton()
.setCustomId(`6`)
.setLabel(`????????`)
.setStyle(`DANGER`)
)] })
}else{
if(db.fetch(`Status6`) == `close`){
db.set(`Status6`, `open`)
await interaction.update({ content: interaction.content, components: [new MessageActionRow()
.addComponents(new MessageButton()
.setCustomId(`6`)
.setLabel(`??????????`)
.setStyle(`SUCCESS`)
)] })
}
}
await interaction.followUp({ content: `**???? ?????????? ???????????? ??????????**`, ephemeral:true })
}
if(interaction.customId == `7`){
if(db.fetch(`Status7`) == `open`){
db.set(`Status7`, `close`)
await interaction.update({ content: interaction.content, components: [new MessageActionRow()
.addComponents(new MessageButton()
.setCustomId(`7`)
.setLabel(`????????`)
.setStyle(`DANGER`)
)] })
}else{
if(db.fetch(`Status7`) == `close`){
db.set(`Status7`, `open`)
await interaction.update({ content: interaction.content, components: [new MessageActionRow()
.addComponents(new MessageButton()
.setCustomId(`7`)
.setLabel(`??????????`)
.setStyle(`SUCCESS`)
)] })
}
}
await interaction.followUp({ content: `**???? ?????????? ???????????? ??????????**`, ephemeral:true })
}
if(interaction.customId == `8`){
if(db.fetch(`Status8`) == `open`){
db.set(`Status8`, `close`)
await interaction.update({ content: interaction.content, components: [new MessageActionRow()
.addComponents(new MessageButton()
.setCustomId(`8`)
.setLabel(`????????`)
.setStyle(`DANGER`)
)] })
}else{
if(db.fetch(`Status8`) == `close`){
db.set(`Status8`, `open`)
await interaction.update({ content: interaction.content, components: [new MessageActionRow()
.addComponents(new MessageButton()
.setCustomId(`8`)
.setLabel(`??????????`)
.setStyle(`SUCCESS`)
)] })
}
}
await interaction.followUp({ content: `**???? ?????????? ???????????? ??????????**`, ephemeral:true })
}
if(interaction.customId == `9`){
if(db.fetch(`Status9`) == `open`){
db.set(`Status9`, `close`)
await interaction.update({ content: interaction.content, components: [new MessageActionRow()
.addComponents(new MessageButton()
.setCustomId(`9`)
.setLabel(`????????`)
.setStyle(`DANGER`)
)] })
}else{
if(db.fetch(`Status9`) == `close`){
db.set(`Status9`, `open`)
await interaction.update({ content: interaction.content, components: [new MessageActionRow()
.addComponents(new MessageButton()
.setCustomId(`9`)
.setLabel(`??????????`)
.setStyle(`SUCCESS`)
)] })
}
}
await interaction.followUp({ content: `**???? ?????????? ???????????? ??????????**`, ephemeral:true })
}
if(interaction.customId == `10`){
if(db.fetch(`Status10`) == `open`){
db.set(`Status10`, `close`)
await interaction.update({ content: interaction.content, components: [new MessageActionRow()
.addComponents(new MessageButton()
.setCustomId(`10`)
.setLabel(`????????`)
.setStyle(`DANGER`)
)] })
}else{
if(db.fetch(`Status10`) == `close`){
db.set(`Status10`, `open`)
await interaction.update({ content: interaction.content, components: [new MessageActionRow()
.addComponents(new MessageButton()
.setCustomId(`10`)
.setLabel(`??????????`)
.setStyle(`SUCCESS`)
)] })
}
}
await interaction.followUp({ content: `**???? ?????????? ???????????? ??????????**`, ephemeral:true })
}
})



client.on('interactionCreate',async interaction => {
if(!interaction.isButton())return;
if(interaction.customId == `reportserver`){
const log = client.channels.cache.get("938052857557573680")
const guild = client.guilds.cache.get(data.guild);
let timesout = await db.fetch(`timeout_${interaction.user.id}`);
if(timesout > Math.floor(Date.now() / 1000)){
interaction.reply({ content: `**?????????? ?????????????? ?????? ?????????? ?????? <t:${timesout}:R>**`, ephemeral:true })
}else{
ticketdb.findOne({ User : interaction.user.id }, (err, datadb) => {
if(!datadb){
const row = new MessageActionRow()
.addComponents(
new MessageSelectMenu()
.setCustomId("select")
.setPlaceholder("???????? ?????? ?????????????? ??????????")
.addOptions([
{
  
label: `?????????????????? ????????`,
value: `1`,
emoji: `938306187584213043`
},{
label: `?????????? ????????????????`,
value: `2`,
emoji: `938301879069319198`
},{
label: `?????????? ??????????`,
value: `3`,
emoji: `938301973093036042`
},{
label: `???????????? ?????? ????????`,
value: `4`,
emoji: `938302060879814676`
},{
label: `?????????? ????????????`,
value: `5`,
emoji: `938305358429028403`
},{
label: `?????? ??????????`,
value: `6`,
emoji: `938305905613762601`
},{
label: `?????????? ??????????/??????????`,
value: `7`,
emoji: `938307853482065940`
},{
label: `???????? ?????? ????????`,
value: `8`,
emoji: `938302952685305906`
},{
label: `???????? ?????? ??????????`,
value: `9`,
emoji: `938303066812317727`
},{
label: `?????????? ??????????????`,
value: `10`,
emoji: `938305449810345995`
}
])
)
interaction.user.send({ embeds: [new MessageEmbed()
.setAuthor({ name:interaction.user.username, iconURL:interaction.user.avatarURL() })
.setDescription(`**???????? ???????????? ?????? ???????????????? ??????????????!**`)
.setColor(`#2F3136`)], components: [row] }).then(msg2 => {
const collector = msg2.createMessageComponentCollector({
componentType: "SELECT_MENU",
max: 1
})
var oldn = db.fetch(`number`) || 0
collector.on("collect", async (collected) => {
const value = collected.values[0]
if(value === "1"){
if(db.fetch(`Status1`) == `close`){
interaction.user.send({ content: `**?????????? ?????? ???? ?????????? ?????? ??????????**` }).catch(err=>{return})
msg2.delete();
log.send({ embeds: [new MessageEmbed()
.setTitle(`???????????? ?????????? ?????????? ??????????`)
.setDescription(`**?????? ???????? ?????? ?????????? ?????????? ?????????? ???? ?????? ?????????????????? ????????**`)
.addFields(
{ name: `Username`, value: `${interaction.user.tag}`, inline: true },
{ name: `ID`, value: `${interaction.user.id}`, inline: true },
{ name: `Mention`, value: `${interaction.user}`, inline: true },)
.setColor(`RED`) ]})
}else{
if(db.fetch(`Status1`) == `open`){
var newn = oldn+1
await db.set(`number`, newn)
guild.channels.create(`${newn}`, { type: 'text' }).then(async c => {
c.setParent(`938069232145534976`)
c.send({ content: `@everyone`, embeds: [new MessageEmbed()
.setThumbnail(interaction.user.avatarURL({ format: "png", dynamic: true }))
.setDescription(`**Reporter Name : ${interaction.user.username}
Reporter ID : ${interaction.user.id}
Reporter Tag : ${interaction.user.tag}
Reporter Mention : ${interaction.user}
Reporte Number : ${newn}**`)
.setColor(`#2F3136`) ]})
interaction.user.send({ content: `**?????? ???? ?????? ???????????? ?????????? ?????????????? ???????? ?????????????? ?????? ???? ???????? ?????? ????????\n?????? ???????????????? : ${newn}**` }).catch(err=>{return})
datadb = new ticketdb({
User : interaction.user.id,
Status : `open`,
Channel_Id : c.id,
R_Number : `${newn}`,
R_Info : `???? ?????? ????????????`
})
datadb.save()
msg2.delete();
log.send({ embeds: [new MessageEmbed()
.setTitle(`???????????? ?????????? ?????????? ??????????`)
.setDescription(`**?????? ?????? ?????? ?????????? ?????????? ???? ?????? ?????????????????? ????????**`)
.addFields(
{ name: `Username`, value: `${interaction.user.tag}`, inline: true },
{ name: `ID`, value: `${interaction.user.id}`, inline: true },
{ name: `Mention`, value: `${interaction.user}`, inline: true },
{ name: `Ticket`, value: `${c}`, inline: false },)
.setColor(`GREEN`) ]})
})
}
}
}else{
if(value === "2"){
if(db.fetch(`Status2`) == `close`){
interaction.user.send({ content: `**?????????? ?????? ???? ?????????? ?????? ??????????**` }).catch(err=>{return})
msg2.delete();
log.send({ embeds: [new MessageEmbed()
.setTitle(`???????????? ?????????? ?????????? ??????????`)
.setDescription(`**?????? ???????? ?????? ?????????? ?????????? ?????????? ???? ?????? ?????????? ????????????????**`)
.addFields(
{ name: `Username`, value: `${interaction.user.tag}`, inline: true },
{ name: `ID`, value: `${interaction.user.id}`, inline: true },
{ name: `Mention`, value: `${interaction.user}`, inline: true },)
.setColor(`RED`) ]})
}else{
if(db.fetch(`Status2`) == `open`){
var newn = oldn+1
await db.set(`number`, newn)
guild.channels.create(`${newn}`, { type: 'text' }).then(async c => {
c.setParent(`938069232745345044`)
c.send({ content: `@everyone`, embeds: [new MessageEmbed()
.setThumbnail(interaction.user.avatarURL({ format: "png", dynamic: true }))
.setDescription(`**Reporter Name : ${interaction.user.username}
Reporter ID : ${interaction.user.id}
Reporter Tag : ${interaction.user.tag}
Reporter Mention : ${interaction.user}
Reporte Number : ${newn}**`)
.setColor(`#2F3136`) ]})
interaction.user.send({ content: `**?????? ???? ?????? ???????????? ?????????? ?????????????? ???????? ?????????????? ?????? ???? ???????? ?????? ????????\n?????? ???????????????? : ${newn}**` }).catch(err=>{return})
datadb = new ticketdb({
User : interaction.user.id,
Status : `open`,
Channel_Id : c.id,
R_Number : `${newn}`,
R_Info : `???? ?????? ????????????`
})
datadb.save()
msg2.delete();
log.send({ embeds: [new MessageEmbed()
.setTitle(`???????????? ?????????? ?????????? ??????????`)
.setDescription(`**?????? ?????? ?????? ?????????? ?????????? ???? ?????? ?????????? ????????????????**`)
.addFields(
{ name: `Username`, value: `${interaction.user.tag}`, inline: true },
{ name: `ID`, value: `${interaction.user.id}`, inline: true },
{ name: `Mention`, value: `${interaction.user}`, inline: true },
{ name: `Ticket`, value: `${c}`, inline: false },)
.setColor(`GREEN`) ]})
})
}
}
}else{
if(value === "3"){
if(db.fetch(`Status3`) == `close`){
interaction.user.send({ content: `**?????????? ?????? ???? ?????????? ?????? ??????????**` }).catch(err=>{return})
msg2.delete();
log.send({ embeds: [new MessageEmbed()
.setTitle(`???????????? ?????????? ?????????? ??????????`)
.setDescription(`**?????? ???????? ?????? ?????????? ?????????? ?????????? ???? ?????? ?????????? ??????????**`)
.addFields(
{ name: `Username`, value: `${interaction.user.tag}`, inline: true },
{ name: `ID`, value: `${interaction.user.id}`, inline: true },
{ name: `Mention`, value: `${interaction.user}`, inline: true },)
.setColor(`RED`) ]})
}else{
if(db.fetch(`Status3`) == `open`){
var newn = oldn+1
await db.set(`number`, newn)
guild.channels.create(`${newn}`, { type: 'text' }).then(async c => {
c.setParent(`938069233303158846`)
c.send({ content: `@everyone`, embeds: [new MessageEmbed()
.setThumbnail(interaction.user.avatarURL({ format: "png", dynamic: true }))
.setDescription(`**Reporter Name : ${interaction.user.username}
Reporter ID : ${interaction.user.id}
Reporter Tag : ${interaction.user.tag}
Reporter Mention : ${interaction.user}
Reporte Number : ${newn}**`)
.setColor(`#2F3136`) ]})
interaction.user.send({ content: `**?????? ???? ?????? ???????????? ?????????? ?????????????? ???????? ?????????????? ?????? ???? ???????? ?????? ????????\n?????? ???????????????? : ${newn}**` }).catch(err=>{return})
datadb = new ticketdb({
User : interaction.user.id,
Status : `open`,
Channel_Id : c.id,
R_Number : `${newn}`,
R_Info : `???? ?????? ????????????`
})
datadb.save()
msg2.delete();
log.send({ embeds: [new MessageEmbed()
.setTitle(`???????????? ?????????? ?????????? ??????????`)
.setDescription(`**?????? ?????? ?????? ?????????? ?????????? ???? ?????? ?????????? ??????????**`)
.addFields(
{ name: `Username`, value: `${interaction.user.tag}`, inline: true },
{ name: `ID`, value: `${interaction.user.id}`, inline: true },
{ name: `Mention`, value: `${interaction.user}`, inline: true },
{ name: `Ticket`, value: `${c}`, inline: false },)
.setColor(`GREEN`) ]})
})
}
}
}else{
if(value === "4"){
if(db.fetch(`Status4`) == `close`){
interaction.user.send({ content: `**?????????? ?????? ???? ?????????? ?????? ??????????**` }).catch(err=>{return})
msg2.delete();
log.send({ embeds: [new MessageEmbed()
.setTitle(`???????????? ?????????? ?????????? ??????????`)
.setDescription(`**?????? ???????? ?????? ?????????? ?????????? ?????????? ???? ?????? ???????????? ?????? ????????**`)
.addFields(
{ name: `Username`, value: `${interaction.user.tag}`, inline: true },
{ name: `ID`, value: `${interaction.user.id}`, inline: true },
{ name: `Mention`, value: `${interaction.user}`, inline: true },)
.setColor(`RED`) ]})
}else{
if(db.fetch(`Status4`) == `open`){
var newn = oldn+1
await db.set(`number`, newn)
guild.channels.create(`${newn}`, { type: 'text' }).then(async c => {
c.setParent(`938069233827467366`)
c.send({ content: `@everyone`, embeds: [new MessageEmbed()
.setThumbnail(interaction.user.avatarURL({ format: "png", dynamic: true }))
.setDescription(`**Reporter Name : ${interaction.user.username}
Reporter ID : ${interaction.user.id}
Reporter Tag : ${interaction.user.tag}
Reporter Mention : ${interaction.user}
Reporte Number : ${newn}**`)
.setColor(`#2F3136`) ]})
interaction.user.send({ content: `**?????? ???? ?????? ???????????? ?????????? ?????????????? ???????? ?????????????? ?????? ???? ???????? ?????? ????????\n?????? ???????????????? : ${newn}**` }).catch(err=>{return})
datadb = new ticketdb({
User : interaction.user.id,
Status : `open`,
Channel_Id : c.id,
R_Number : `${newn}`,
R_Info : `???? ?????? ????????????`
})
datadb.save()
msg2.delete();
log.send({ embeds: [new MessageEmbed()
.setTitle(`???????????? ?????????? ?????????? ??????????`)
.setDescription(`**?????? ?????? ?????? ?????????? ?????????? ???? ?????? ???????????? ?????? ????????**`)
.addFields(
{ name: `Username`, value: `${interaction.user.tag}`, inline: true },
{ name: `ID`, value: `${interaction.user.id}`, inline: true },
{ name: `Mention`, value: `${interaction.user}`, inline: true },
{ name: `Ticket`, value: `${c}`, inline: false },)
.setColor(`GREEN`) ]})
})
}
}
}else{
if(value === "5"){
if(db.fetch(`Status5`) == `close`){
interaction.user.send({ content: `**?????????? ?????? ???? ?????????? ?????? ??????????**` }).catch(err=>{return})
msg2.delete();
log.send({ embeds: [new MessageEmbed()
.setTitle(`???????????? ?????????? ?????????? ??????????`)
.setDescription(`**?????? ???????? ?????? ?????????? ?????????? ?????????? ???? ?????? ?????????? ????????????**`)
.addFields(
{ name: `Username`, value: `${interaction.user.tag}`, inline: true },
{ name: `ID`, value: `${interaction.user.id}`, inline: true },
{ name: `Mention`, value: `${interaction.user}`, inline: true },)
.setColor(`RED`) ]})
}else{
if(db.fetch(`Status5`) == `open`){
var newn = oldn+1
await db.set(`number`, newn)
guild.channels.create(`${newn}`, { type: 'text' }).then(async c => {
c.setParent(`938069234804731925`)
c.send({ content: `@everyone`, embeds: [new MessageEmbed()
.setThumbnail(interaction.user.avatarURL({ format: "png", dynamic: true }))
.setDescription(`**Reporter Name : ${interaction.user.username}
Reporter ID : ${interaction.user.id}
Reporter Tag : ${interaction.user.tag}
Reporter Mention : ${interaction.user}
Reporte Number : ${newn}**`)
.setColor(`#2F3136`) ]})
interaction.user.send({ content: `**?????? ???? ?????? ???????????? ?????????? ?????????????? ???????? ?????????????? ?????? ???? ???????? ?????? ????????\n?????? ???????????????? : ${newn}**` }).catch(err=>{return})
datadb = new ticketdb({
User : interaction.user.id,
Status : `open`,
Channel_Id : c.id,
R_Number : `${newn}`,
R_Info : `???? ?????? ????????????`
})
datadb.save()
msg2.delete();
log.send({ embeds: [new MessageEmbed()
.setTitle(`???????????? ?????????? ?????????? ??????????`)
.setDescription(`**?????? ?????? ?????? ?????????? ?????????? ???? ?????? ?????????? ????????????**`)
.addFields(
{ name: `Username`, value: `${interaction.user.tag}`, inline: true },
{ name: `ID`, value: `${interaction.user.id}`, inline: true },
{ name: `Mention`, value: `${interaction.user}`, inline: true },
{ name: `Ticket`, value: `${c}`, inline: false },)
.setColor(`GREEN`) ]})
})
}
}
}else{
if(value === "6"){
if(db.fetch(`Status6`) == `close`){
interaction.user.send({ content: `**?????????? ?????? ???? ?????????? ?????? ??????????**` }).catch(err=>{return})
msg2.delete();
log.send({ embeds: [new MessageEmbed()
.setTitle(`???????????? ?????????? ?????????? ??????????`)
.setDescription(`**?????? ???????? ?????? ?????????? ?????????? ?????????? ???? ?????? ?????? ??????????**`)
.addFields(
{ name: `Username`, value: `${interaction.user.tag}`, inline: true },
{ name: `ID`, value: `${interaction.user.id}`, inline: true },
{ name: `Mention`, value: `${interaction.user}`, inline: true },)
.setColor(`RED`) ]})
}else{
if(db.fetch(`Status6`) == `open`){
var newn = oldn+1
await db.set(`number`, newn)
guild.channels.create(`${newn}`, { type: 'text' }).then(async c => {
c.setParent(`938069235551330394`)
c.send({ content: `@everyone`, embeds: [new MessageEmbed()
.setThumbnail(interaction.user.avatarURL({ format: "png", dynamic: true }))
.setDescription(`**Reporter Name : ${interaction.user.username}
Reporter ID : ${interaction.user.id}
Reporter Tag : ${interaction.user.tag}
Reporter Mention : ${interaction.user}
Reporte Number : ${newn}**`)
.setColor(`#2F3136`) ]})
interaction.user.send({ content: `**?????? ???? ?????? ???????????? ?????????? ?????????????? ???????? ?????????????? ?????? ???? ???????? ?????? ????????\n?????? ???????????????? : ${newn}**` }).catch(err=>{return})
datadb = new ticketdb({
User : interaction.user.id,
Status : `open`,
Channel_Id : c.id,
R_Number : `${newn}`,
R_Info : `???? ?????? ????????????`
})
datadb.save()
msg2.delete();
log.send({ embeds: [new MessageEmbed()
.setTitle(`???????????? ?????????? ?????????? ??????????`)
.setDescription(`**?????? ?????? ?????? ?????????? ?????????? ???? ?????? ?????? ??????????**`)
.addFields(
{ name: `Username`, value: `${interaction.user.tag}`, inline: true },
{ name: `ID`, value: `${interaction.user.id}`, inline: true },
{ name: `Mention`, value: `${interaction.user}`, inline: true },
{ name: `Ticket`, value: `${c}`, inline: false },)
.setColor(`GREEN`) ]})
})
}
}
}else{
if(value === "7"){
if(db.fetch(`Status7`) == `close`){
interaction.user.send({ content: `**?????????? ?????? ???? ?????????? ?????? ??????????**` }).catch(err=>{return})
msg2.delete();
log.send({ embeds: [new MessageEmbed()
.setTitle(`???????????? ?????????? ?????????? ??????????`)
.setDescription(`**?????? ???????? ?????? ?????????? ?????????? ?????????? ???? ?????? ?????????? ??????????/??????????**`)
.addFields(
{ name: `Username`, value: `${interaction.user.tag}`, inline: true },
{ name: `ID`, value: `${interaction.user.id}`, inline: true },
{ name: `Mention`, value: `${interaction.user}`, inline: true },)
.setColor(`RED`) ]})
}else{
if(db.fetch(`Status7`) == `open`){
var newn = oldn+1
await db.set(`number`, newn)
guild.channels.create(`${newn}`, { type: 'text' }).then(async c => {
c.setParent(`938069236172062750`)
c.send({ content: `@everyone`, embeds: [new MessageEmbed()
.setThumbnail(interaction.user.avatarURL({ format: "png", dynamic: true }))
.setDescription(`**Reporter Name : ${interaction.user.username}
Reporter ID : ${interaction.user.id}
Reporter Tag : ${interaction.user.tag}
Reporter Mention : ${interaction.user}
Reporte Number : ${newn}**`)
.setColor(`#2F3136`) ]})
interaction.user.send({ content: `**?????? ???? ?????? ???????????? ?????????? ?????????????? ???????? ?????????????? ?????? ???? ???????? ?????? ????????\n?????? ???????????????? : ${newn}**` }).catch(err=>{return})
datadb = new ticketdb({
User : interaction.user.id,
Status : `open`,
Channel_Id : c.id,
R_Number : `${newn}`,
R_Info : `???? ?????? ????????????`
})
datadb.save()
msg2.delete();
log.send({ embeds: [new MessageEmbed()
.setTitle(`???????????? ?????????? ?????????? ??????????`)
.setDescription(`**?????? ?????? ?????? ?????????? ?????????? ???? ?????? ?????????? ??????????/??????????**`)
.addFields(
{ name: `Username`, value: `${interaction.user.tag}`, inline: true },
{ name: `ID`, value: `${interaction.user.id}`, inline: true },
{ name: `Mention`, value: `${interaction.user}`, inline: true },
{ name: `Ticket`, value: `${c}`, inline: false },)
.setColor(`GREEN`) ]})
})
}
}
}else{
if(value === "8"){
if(db.fetch(`Status8`) == `close`){
interaction.user.send({ content: `**?????????? ?????? ???? ?????????? ?????? ??????????**` }).catch(err=>{return})
msg2.delete();
log.send({ embeds: [new MessageEmbed()
.setTitle(`???????????? ?????????? ?????????? ??????????`)
.setDescription(`**?????? ???????? ?????? ?????????? ?????????? ?????????? ???? ?????? ???????? ?????? ????????**`)
.addFields(
{ name: `Username`, value: `${interaction.user.tag}`, inline: true },
{ name: `ID`, value: `${interaction.user.id}`, inline: true },
{ name: `Mention`, value: `${interaction.user}`, inline: true },)
.setColor(`RED`) ]})
}else{
if(db.fetch(`Status8`) == `open`){
var newn = oldn+1
await db.set(`number`, newn)
guild.channels.create(`${newn}`, { type: 'text' }).then(async c => {
c.setParent(`938069236641849395`)
c.send({ content: `@everyone`, embeds: [new MessageEmbed()
.setThumbnail(interaction.user.avatarURL({ format: "png", dynamic: true }))
.setDescription(`**Reporter Name : ${interaction.user.username}
Reporter ID : ${interaction.user.id}
Reporter Tag : ${interaction.user.tag}
Reporter Mention : ${interaction.user}
Reporte Number : ${newn}**`)
.setColor(`#2F3136`) ]})
interaction.user.send({ content: `**?????? ???? ?????? ???????????? ?????????? ?????????????? ???????? ?????????????? ?????? ???? ???????? ?????? ????????\n?????? ???????????????? : ${newn}**` }).catch(err=>{return})
datadb = new ticketdb({
User : interaction.user.id,
Status : `open`,
Channel_Id : c.id,
R_Number : `${newn}`,
R_Info : `???? ?????? ????????????`
})
datadb.save()
msg2.delete();
log.send({ embeds: [new MessageEmbed()
.setTitle(`???????????? ?????????? ?????????? ??????????`)
.setDescription(`**?????? ?????? ?????? ?????????? ?????????? ???? ?????? ???????? ?????? ????????**`)
.addFields(
{ name: `Username`, value: `${interaction.user.tag}`, inline: true },
{ name: `ID`, value: `${interaction.user.id}`, inline: true },
{ name: `Mention`, value: `${interaction.user}`, inline: true },
{ name: `Ticket`, value: `${c}`, inline: false },)
.setColor(`GREEN`) ]})
})
}
}
}else{
if(value === "9"){
if(db.fetch(`Status9`) == `close`){
interaction.user.send({ content: `**?????????? ?????? ???? ?????????? ?????? ??????????**` }).catch(err=>{return})
msg2.delete();
log.send({ embeds: [new MessageEmbed()
.setTitle(`???????????? ?????????? ?????????? ??????????`)
.setDescription(`**?????? ???????? ?????? ?????????? ?????????? ?????????? ???? ?????? ???????? ?????? ??????????**`)
.addFields(
{ name: `Username`, value: `${interaction.user.tag}`, inline: true },
{ name: `ID`, value: `${interaction.user.id}`, inline: true },
{ name: `Mention`, value: `${interaction.user}`, inline: true },)
.setColor(`RED`) ]})
}else{
if(db.fetch(`Status9`) == `open`){
var newn = oldn+1
await db.set(`number`, newn)
guild.channels.create(`${newn}`, { type: 'text' }).then(async c => {
c.setParent(`938069237803675748`)
c.send({ content: `@everyone`, embeds: [new MessageEmbed()
.setThumbnail(interaction.user.avatarURL({ format: "png", dynamic: true }))
.setDescription(`**Reporter Name : ${interaction.user.username}
Reporter ID : ${interaction.user.id}
Reporter Tag : ${interaction.user.tag}
Reporter Mention : ${interaction.user}
Reporte Number : ${newn}**`)
.setColor(`#2F3136`) ]})
interaction.user.send({ content: `**?????? ???? ?????? ???????????? ?????????? ?????????????? ???????? ?????????????? ?????? ???? ???????? ?????? ????????\n?????? ???????????????? : ${newn}**` }).catch(err=>{return})
datadb = new ticketdb({
User : interaction.user.id,
Status : `open`,
Channel_Id : c.id,
R_Number : `${newn}`,
R_Info : `???? ?????? ????????????`
})
datadb.save()
msg2.delete();
log.send({ embeds: [new MessageEmbed()
.setTitle(`???????????? ?????????? ?????????? ??????????`)
.setDescription(`**?????? ?????? ?????? ?????????? ?????????? ???? ?????? ???????? ?????? ??????????**`)
.addFields(
{ name: `Username`, value: `${interaction.user.tag}`, inline: true },
{ name: `ID`, value: `${interaction.user.id}`, inline: true },
{ name: `Mention`, value: `${interaction.user}`, inline: true },
{ name: `Ticket`, value: `${c}`, inline: false },)
.setColor(`GREEN`) ]})
})
}
}
}else{
if(value === "10"){
if(db.fetch(`Status10`) == `close`){
interaction.user.send({ content: `**?????????? ?????? ???? ?????????? ?????? ??????????**` }).catch(err=>{return})
msg2.delete();
log.send({ embeds: [new MessageEmbed()
.setTitle(`???????????? ?????????? ?????????? ??????????`)
.setDescription(`**?????? ???????? ?????? ?????????? ?????????? ?????????? ???? ?????? ?????????? ??????????????**`)
.addFields(
{ name: `Username`, value: `${interaction.user.tag}`, inline: true },
{ name: `ID`, value: `${interaction.user.id}`, inline: true },
{ name: `Mention`, value: `${interaction.user}`, inline: true },)
.setColor(`RED`) ]})
}else{
if(db.fetch(`Status10`) == `open`){
var newn = oldn+1
await db.set(`number`, newn)
guild.channels.create(`${newn}`, { type: 'text' }).then(async c => {
c.setParent(`938069239108079646`)
c.send({ content: `@everyone`, embeds: [new MessageEmbed()
.setThumbnail(interaction.user.avatarURL({ format: "png", dynamic: true }))
.setDescription(`**Reporter Name : ${interaction.user.username}
Reporter ID : ${interaction.user.id}
Reporter Tag : ${interaction.user.tag}
Reporter Mention : ${interaction.user}
Reporte Number : ${newn}**`)
.setColor(`#2F3136`) ]})
interaction.user.send({ content: `**?????? ???? ?????? ???????????? ?????????? ?????????????? ???????? ?????????????? ?????? ???? ???????? ?????? ????????\n?????? ???????????????? : ${newn}**` }).catch(err=>{return})
datadb = new ticketdb({
User : interaction.user.id,
Status : `open`,
Channel_Id : c.id,
R_Number : `${newn}`,
R_Info : `???? ?????? ????????????`
})
datadb.save()
msg2.delete();
log.send({ embeds: [new MessageEmbed()
.setTitle(`???????????? ?????????? ?????????? ??????????`)
.setDescription(`**?????? ?????? ?????? ?????????? ?????????? ???? ?????? ?????????? ??????????????**`)
.addFields(
{ name: `Username`, value: `${interaction.user.tag}`, inline: true },
{ name: `ID`, value: `${interaction.user.id}`, inline: true },
{ name: `Mention`, value: `${interaction.user}`, inline: true },
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
}).then(r=>{interaction.reply({ content:`**???? ?????????? ?????????????? ??????????**`, ephemeral:true })}).catch(err=>{return interaction.reply({ content:`**???? ???????????? ?????????? ?????????????? ?? ?????? ???????? ?????????? ???????? ?????????? ?????????????? ????????????**`, ephemeral:true })})
}else{
interaction.reply({ content:`**???? ?????????? ?????? ???????? ???? ???????????? ???? ?????????? ???????? ?? ???????? ?????? ???????? ???????????? ?????? ???????? ?????????? ?????????????? ?????????????? ????????????**`, ephemeral:true })
}
})
}
}
})




  
//token
client.login(`OTM4MDU4NjU2NTU2MTMwMzU0.GRbkV_.jFARgtQt2ZN4Ql-yFPBLkxJOFZ4P3k4goZuJnA`);