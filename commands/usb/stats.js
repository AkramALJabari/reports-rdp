const { MessageEmbed, MessageActionRow, MessageSelectMenu, MessageButton } = require(`discord.js`);
const data = require(`./../../data.json`);
const db = require("quick.db");
const gameStats = require("@999-cs/game-stats");
let { query } = require("@999-cs/game-stats");
const moment = require("moment");

module.exports = {
name: "stats",
run: async(client, msg, log, guild) => {
if(msg.channel.type === `DM`)return;



  

query({ip:'178.33.4.27',port:'22003',type:'mtasa'} , ( error , stats ) => {
            if(error){
                msg.channel.send({ content: `An error occurred` })
            } else {
                if(stats["SERVERINFO"]['State'] != "Online") return msg.reply({ content: `Server is offline` }) 
                let statusEmbed = new MessageEmbed()
                    .setTitle(`${stats["SERVERINFO"]["Server Name"]}`)
                    .addField(`**SERVER INFO**`,
`Sever name : ${stats["SERVERINFO"]["Server Name"]}
State : ${stats["SERVERINFO"]['State'] == 'Online' ? `🟢 ${stats["SERVERINFO"]['State']}` : `🔴 ${stats["SERVERINFO"]['State']}`}
Adress : ${stats["SERVERINFO"]["Address"].replace("https://www.game-state.com/",'mtasa://')}
Players : ${stats["SERVERINFO"]["Players"]}
Game Mode : ${stats["SERVERINFO"]["Game Mode"]}
Map Name : ${stats["SERVERINFO"]["Map Name"]}
Password : ${stats["SERVERVARIABLES"]["password"] == 0 ?  "`❌`" : "`✅`"}
Port : ${stats["SERVERVARIABLES"]["port"]}
Game Version : ${stats["SERVERVARIABLES"]["version"]}`)

                    .setColor('RANDOM')
                    .setFooter({ text: `Asked by : ${msg.author.tag}`, iconURL: msg.author.avatarURL({dynamic:true,format:'png'}) })
                    .setThumbnail(msg.guild.iconURL({dynamic:true,format:'png'}))
                    .setTimestamp();
                msg.reply({ embeds: [statusEmbed] }).then(m => {
                  m.react(`🔃`)
                  const filter = (reaction, user) => {
	return reaction.emoji.name === '🔃' && user.id == msg.author.id;
};
const collector = m.createReactionCollector({ filter });
                  collector.on('collect', (reaction, user) => {

                    query({ip:'178.33.4.27',port:'22003',type:'mtasa'} , ( error , stats ) => {
            if(error){
                msg.channel.send({ content: `An error occurred` })
            } else {
                if(stats["SERVERINFO"]['State'] != "Online") return msg.reply({ content: `Server is offline` }) 
                let statusEmbed = new MessageEmbed()
                    .setTitle(`${stats["SERVERINFO"]["Server Name"]}`)
                    .addField(`**SERVER INFO**`,
`Sever name : ${stats["SERVERINFO"]["Server Name"]}
State : ${stats["SERVERINFO"]['State'] == 'Online' ? `🟢 ${stats["SERVERINFO"]['State']}` : `🔴 ${stats["SERVERINFO"]['State']}`}
Adress : ${stats["SERVERINFO"]["Address"].replace("https://www.game-state.com/",'mtasa://')}
Players : ${stats["SERVERINFO"]["Players"]}
Game Mode : ${stats["SERVERINFO"]["Game Mode"]}
Map Name : ${stats["SERVERINFO"]["Map Name"]}
Password : ${stats["SERVERVARIABLES"]["password"] == 0 ?  "`❌`" : "`✅`"}
Port : ${stats["SERVERVARIABLES"]["port"]}
Game Version : ${stats["SERVERVARIABLES"]["version"]}`)
                    .setColor('RANDOM')
                    .setFooter({ text: `Asked by : ${msg.author.tag}`, iconURL: msg.author.avatarURL({dynamic:true,format:'png'}) })
                    .setThumbnail(msg.guild.iconURL({dynamic:true,format:'png'}))
                    .setTimestamp();
                m.edit({ content: `**تم تحديث البيانات بنجاح**`, embeds: [statusEmbed] })
            }
        });
});
                })
            }
        });



}
};
