import { MessageEmbed } from "discord.js";

import settings from "../data/bot-settings.json" assert { type: "json" };
import config from "../data/config.json" assert { type: "json" };

const { prefix } = settings;
const { coinName, ticker } = config;

export const name = "help";
export const description = "Get help on commands.";
export const aliases = ["commands", "cmds"]

export const execute = (message,args) => {
    message.channel.send({ embeds: [helpEmbed] })
};

const helpEmbed = new MessageEmbed()
    .setColor('0xf1c40f')
    .setTitle(`${coinName} (${ticker})`)
    //.setURL('')
    //.setAuthor('Santeeisweird9')
    .setDescription(`PREFIX: ${prefix}`)
    //.setThumbnail('')
    .addFields(
        { name: 'help', value: `Display this message.` },
        { name: 'account', value: `Create an account.` },
        { name: 'bal {optional: userid}', value: `View your balance or someone else's balance.`},
        { name: 'mine', value: `Mine some ${ticker}!`},
        { name: 'transfer {userid} {amount}', value: `Transfer some ${ticker}.`},
        { name: 'list-tx', value: `List the last 3 transactions.`},
        { name: 'view-tx {txid}', value: `View information on a transaction.`},
        { name: 'convert {type} {amount}', value: `Easily convert currency.`},
        { name: 'leaderboard', value: `View the global leaderboard.`},
        { name: 'info', value: `View info about this bot!`},
    )
    //.addField('', '', true)
    //.setImage('')
    .setTimestamp()
    .setFooter(`${coinName} (${ticker})`, ''); // TODO: set url as second arg