const { MessageEmbed, MessageActionRow, MessageSelectMenu, MessageButton } = require(`discord.js`);
const data = require(`../data.json`);
const db = require("quick.db");
const gameStats = require("@999-cs/game-stats");
let { query } = require("@999-cs/game-stats");
const moment = require("moment");

module.exports = {
name: "players",
run: async(client, msg, log, guild) => {
if(msg.channel.type === `DM`)return;



query({ip:'51.75.182.50',port:'22003',type:'mtasa'} , async ( error , stats ) => {
            if(error){
                msg.channel.send({ content: `An error occurred` })
            } else {
                if(stats["SERVERINFO"]['State'] != "Online") return msg.reply({ content: `Server is offline` })
                let i0 = 0;
                let i1 = 10;
                let page = 1;
                let players = stats["ONLINEPLAYERS"];
                let description = `Total Players : [${players.length}]\n\n` +  players.map(r => r).map(( r , i) => `[**${i + 1}**] : ${r.Players} - ${r.Hours}`).slice(0,10).join("\n");
                let embed = new MessageEmbed()
                    .setAuthor({ name: msg.author.tag, iconURL: msg.author.displayAvatarURL({ dynamic: true }) })
                    .setColor("GREEN")
                    .setFooter({ text: client.user.username, iconURL: client.user.avatarURL({dynamic:true,format:'png'}) })
                    .setTimestamp()
                    .setTitle(`Page - ${page}/${Math.ceil(players.length / 10)}`)
                    .setThumbnail(msg.author.avatarURL({dynamic:true,format:'png'}))
                    .setDescription(description);
                let msg2 = await msg.reply({ embeds: [embed] })

                await msg2.react("⬅");
                await msg2.react("➡");
                await msg2.react("❌");
                let collector = msg2.createReactionCollector(
                    (reaction, user) => user.id === msg.author.id
                );
                collector.on("collect", async (reaction, user) => {
                    if (reaction._emoji.name === "⬅") {
                      i0 = i0 - 10;
                      i1 = i1 - 10;
                      page = page - 1;
                        if (i0 + 1 < 0) {
                            return msg2.delete();
                        }
                        if (!i0 || !i1) {
                            return msg2.delete();
                        }
                        description =
                            `Total Players : [${players.length}]\n\n` +
                            players.map(r => r).map(( r , i) => `[**${i + 1}**] : ${r.Players} - ${r.Hours}`)
                            .slice(i0, i1)
                            .join("\n");
                        embed
                            .setTitle(
                                `Page - ${page}/${Math.round(players.length / 10 + 1)}`
                            )
                            .setDescription(description);
                        msg2.edit({ embeds: [embed] });
                    }
                    if (reaction._emoji.name === "➡") {
                        i0 = i0 + 10;
                        i1 = i1 + 10;
                        page = page + 1;
                        if (i1 > players.length + 10) {
                            return msg2.delete();
                        }
                        if (!i0 || !i1) {
                            return msg2.delete();
                        }
                        description =
                            `Total Players : [${players.length}]\n\n` +
                            players.map(r => r).map(( r , i) => `[**${i + 1}**] : ${r.Players} - ${r.Hours}`)
                            .slice(i0, i1)
                            .join("\n");
                        embed
                            .setTitle(
                            `Page - ${page}/${Math.round(players.length / 10 + 1)}`
                            )
                            .setDescription(description);
                        msg2.edit({ embeds: [embed] });
                    }
                    if (reaction._emoji.name === "❌") {
                      return msg2.delete();
                    }
                    await reaction.users.remove(msg.author.id);
                });
            }
        });



}
};
