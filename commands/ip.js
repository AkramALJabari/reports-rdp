const { MessageEmbed, MessageActionRow, MessageSelectMenu, MessageButton } = require(`discord.js`);
const data = require(`../data.json`);
const db = require("quick.db");

module.exports = {
name: "ip",
run: async(client, msg, log, guild) => {
if(msg.channel.type === `DM`)return;
  
  let embed = new MessageEmbed()
    .setColor("GREEN")
    .setTitle(`Server IP`)
    .setDescription(`mtasa://51.75.182.50:22003`)
    .setFooter({ text: `Asked by : ${msg.author.tag}`, iconURL: msg.author.avatarURL({dynamic:true,format:'png'}) })
  
  msg.reply({ embeds: [embed] })




}
};
