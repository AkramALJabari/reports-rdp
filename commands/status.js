const { MessageEmbed, MessageActionRow, MessageSelectMenu, MessageButton } = require(`discord.js`);
const data = require(`../data.json`);
const ticketdb = require('../models/ticket')
const votedb = require('../models/vote')
const db = require("quick.db");

module.exports = {
name: "status",
run: async(client, msg, log) => {
if(msg.channel.type === `DM`)return;




if(msg.author.id !== `608224231322419202`)return;
//if(!msg.member.roles.cache.some(role => role.id === `938052856878080012`))return;
/*
db.set(`Status1`, `open`)
db.set(`Status2`, `open`)
db.set(`Status3`, `open`)
db.set(`Status4`, `open`)
db.set(`Status5`, `open`)
db.set(`Status6`, `open`)
db.set(`Status7`, `open`)
db.set(`Status8`, `open`)
db.set(`Status9`, `open`)
db.set(`Status10`, `open`)
*/
msg.channel.send({ content: `**حالة قسم استفسارات عامه**`, components: [new MessageActionRow()
.addComponents(new MessageButton()
.setCustomId(`1`)
.setLabel(`مفتوح`)
.setStyle(`SUCCESS`)
)] })
msg.channel.send({ content: `**حالة قسم مشاكل المركبات**`, components: [new MessageActionRow()
.addComponents(new MessageButton()
.setCustomId(`2`)
.setLabel(`مفتوح`)
.setStyle(`SUCCESS`)
)] })
msg.channel.send({ content: `**حالة قسم مشاكل مابات**`, components: [new MessageActionRow()
.addComponents(new MessageButton()
.setCustomId(`3`)
.setLabel(`مفتوح`)
.setStyle(`SUCCESS`)
)] })
msg.channel.send({ content: `**حالة قسم اعتراض على باند**`, components: [new MessageActionRow()
.addComponents(new MessageButton()
.setCustomId(`4`)
.setLabel(`مفتوح`)
.setStyle(`SUCCESS`)
)] })
msg.channel.send({ content: `**حالة قسم مشاكل برمجيه**`, components: [new MessageActionRow()
.addComponents(new MessageButton()
.setCustomId(`5`)
.setLabel(`مفتوح`)
.setStyle(`SUCCESS`)
)] })
msg.channel.send({ content: `**حالة قسم طلب تعويض**`, components: [new MessageActionRow()
.addComponents(new MessageButton()
.setCustomId(`6`)
.setLabel(`مفتوح`)
.setStyle(`SUCCESS`)
)] })
msg.channel.send({ content: `**حالة قسم فاكشن عصابه/عائله**`, components: [new MessageActionRow()
.addComponents(new MessageButton()
.setCustomId(`7`)
.setLabel(`مفتوح`)
.setStyle(`SUCCESS`)
)] })
msg.channel.send({ content: `**حالة قسم شكوى على ادمن**`, components: [new MessageActionRow()
.addComponents(new MessageButton()
.setCustomId(`8`)
.setLabel(`مفتوح`)
.setStyle(`SUCCESS`)
)] })
msg.channel.send({ content: `**حالة قسم شكوى على سبورت**`, components: [new MessageActionRow()
.addComponents(new MessageButton()
.setCustomId(`9`)
.setLabel(`مفتوح`)
.setStyle(`SUCCESS`)
)] })
msg.channel.send({ content: `**حالة قسم مشاكل ديسكورد**`, components: [new MessageActionRow()
.addComponents(new MessageButton()
.setCustomId(`10`)
.setLabel(`مفتوح`)
.setStyle(`SUCCESS`)
)] })



}
};