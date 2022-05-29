const { MessageEmbed, MessageActionRow, MessageSelectMenu, MessageButton } = require(`discord.js`);
const data = require(`../data.json`);
const ticketdb = require('../models/ticket')
const votedb = require('../models/vote')
const db = require("quick.db")
const fs = require("fs")
const ms = require("ms")

module.exports = {
name: "reportserver",
run: async(client, msg, log, guild) => {
if(msg.author.id !== `608224231322419202`)return;

msg.delete()

msg.channel.send({ components: [new MessageActionRow()
.addComponents(new MessageButton()
.setCustomId(`reportserver`)
.setLabel(`انشاء ريبورت`)
.setEmoji(`938303066812317727`)
.setStyle(`SUCCESS`)
)] })

  

}
};