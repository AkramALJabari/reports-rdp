const { MessageEmbed, MessageActionRow, MessageSelectMenu, MessageButton } = require(`discord.js`);
const data = require(`../data.json`);
const ticketdb = require('../models/ticket')
const votedb = require('../models/vote')
const db = require("quick.db");

module.exports = {
name: "r",
run: async(client, msg, log) => {
if(msg.channel.type === `DM`)return;
const args = msg.content.slice(data.prefix.length).trim().split(/ +/g);




ticketdb.findOne({ Channel_Id : msg.channel.id },async (err, datadb) => {
if(!args[1])return msg.channel.send({ embeds: [new MessageEmbed()
.setAuthor({ name:msg.author.username, iconURL:msg.author.avatarURL() })
.setDescription(`**${data.prefix}r [message]**`)
.setColor(`#2F3136`) ]}).then(m => {
m.delete({timeout: 5000})
msg.delete({timeout: 5000})
})
if(datadb){
let user = await client.users.fetch(datadb.User);
var reply = args.splice(1).join(" ");
msg.delete()
if(msg.member.roles.highest.name === `Founder`){
user.send({ content: `**<:owner:938305706464010290> ${msg.author.username} : **${reply}` }).catch(err=>{msg.channel.send({ content: `**لا يمكنني ارسال رسائل لهذا العضو**` })})
msg.channel.send({ content: `**<:owner:938305706464010290> ${msg.author.username} : **${reply}` })
}else{
if(msg.member.roles.highest.name === `Vice Founder`){
user.send({ content: `**<:owner:938305706464010290> ${msg.author.username} : **${reply}` }).catch(err=>{msg.channel.send({ content: `**لا يمكنني ارسال رسائل لهذا العضو**` })})
msg.channel.send({ content: `**<:owner:938305706464010290> ${msg.author.username} : **${reply}` })
}else{
if(msg.member.roles.highest.name === `Developers`){
user.send({ content: `**<:error:938305358429028403> ${msg.author.username} : **${reply}` }).catch(err=>{msg.channel.send({ content: `**لا يمكنني ارسال رسائل لهذا العضو**` })})
msg.channel.send({ content: `**<:error:938305358429028403> ${msg.author.username} : **${reply}` })
}else{
if(msg.member.roles.highest.name === `Discord Manager`){
user.send({ content: `**<:discord:938305449810345995> ${msg.author.username} : **${reply}` }).catch(err=>{msg.channel.send({ content: `**لا يمكنني ارسال رسائل لهذا العضو**` })})
msg.channel.send({ content: `**<:discord:938305449810345995> ${msg.author.username} : **${reply}` })
}else{
if(msg.member.roles.highest.name === `MTA`){
user.send({ content: `**<:mta:938425423010865272> ${msg.author.username} : **${reply}` }).catch(err=>{msg.channel.send({ content: `**لا يمكنني ارسال رسائل لهذا العضو**` })})
msg.channel.send({ content: `**<:mta:938425423010865272> ${msg.author.username} : **${reply}` })
}else{
if(msg.member.roles.highest.name === `Discord`){
user.send({ content: `**<:discord:938305449810345995> ${msg.author.username} : **${reply}` }).catch(err=>{msg.channel.send({ content: `**لا يمكنني ارسال رسائل لهذا العضو**` })})
msg.channel.send({ content: `**<:discord:938305449810345995> ${msg.author.username} : **${reply}` })
}
}
}
}
}
}
}
})



}
};
