const { MessageEmbed, MessageActionRow, MessageSelectMenu, MessageButton } = require(`discord.js`);
const data = require(`../data.json`);
const ticketdb = require('../models/ticket')
const votedb = require('../models/vote')
const db = require("quick.db");

module.exports = {
name: "ri",
run: async(client, msg, log) => {
if(msg.channel.type === `DM`)return;



ticketdb.findOne({ Channel_Id : msg.channel.id },async (err, datadb) => {
if(datadb){
let user = await client.users.fetch(datadb.User);
if(datadb.R_Info == `لم يتم القبول`)datadb.R_Info = `لم يتم القبول`;
if(datadb.R_Info !== `لم يتم القبول`)datadb.R_Info = `مقبوله من قبل <@${datadb.R_Info}>`;
msg.channel.send({ embeds: [new MessageEmbed()
.setThumbnail(user.avatarURL({ format: "png", dynamic: true }))
.setDescription(`**Reporter Name : ${user.username}
Reporter ID : ${user.id}
Reporter Tag : ${user.tag}
Reporter Mention : ${user}
Reporte Number : ${datadb.R_Number}
Reporte Info : ${datadb.R_Info}**`)
.setColor(`#2F3136`)] })
}
})



}
};
