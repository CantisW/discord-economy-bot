import Discord from "discord.js";
import { getSupply, getUsers, parseDecimals } from "../util/economy-blockchain.js";
import config from "../data/config.json";
const { coinName, ticker } = config;

export const name = "leaderboard";
export const description = "Get the global leaderboard.";

export const execute = (message, args) => {
    message.channel.send(getLeaderboard());
};

const getLeaderboard = () => {
    let users = getUsers();

    var count = Object.keys(users.accounts).length;

    let supply = getSupply();

    const leaderboardEmbed = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle(`${coinName} (${ticker})`)
        //.setURL('')
        //.setAuthor('Santeeisweird9')
        .setDescription(`The rich list of ${name}!`)
        //.setThumbnail('')
        //.addField('', '', true)
        //.setImage('')
        .setTimestamp()
        .setFooter(`${name} (${ticker})`, ''); // TODO: set url as second arg

    for (let i = 0; i < count; i++) {
        leaderboardEmbed.addFields({ name: `${users.accounts[i].userid}`, value: `${parseDecimals(users.accounts[i].balance)} ${ticker} (${parseDecimals((users.accounts[i].balance / supply)*100)}% of supply)` })
    }
    return leaderboardEmbed;
}