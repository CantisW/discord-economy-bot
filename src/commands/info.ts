import { ColorResolvable, CommandInteraction, MessageEmbed } from "discord.js";
import { Discord, Slash } from "discordx";
import { getSupply, parseDecimals } from "../util/blockchain.js";
import { getConfig } from "../util/bot.js";
import { IConfig } from "../util/types.js";

let config = getConfig();

@Discord()
export class Info {
    @Slash("info", { description: "Get info about the bot." })
    async info(interaction: CommandInteraction) {
        let config = getConfig();
        let { coinName, ticker, currency, txFee, blockReward, decimals, maxSupply, exchangeRate } = config;
        let supply = await getSupply();
        let marketCap = parseDecimals(supply * exchangeRate);

        const embed = new MessageEmbed()
            .setColor('0xf1c40f' as ColorResolvable)
            .setTitle(`${coinName} (${ticker})`)
            //.setURL('')s
            //.setAuthor('Santeeisweird9')
            .setDescription(`Exchange and transfer ${coinName}!`)
            //.setThumbnail('')
            .addFields(
                { name: 'Max Supply', value: `${maxSupply}` },
                { name: 'Exchange Rate', value: `1 ${ticker} for ${exchangeRate} ${currency}.\n1 ${currency} for ${parseDecimals(1 / exchangeRate)} ${ticker}.` },
                { name: 'Current Supply', value: `${supply}`, inline: true },
                { name: 'Block Reward', value: `${blockReward}`, inline: true },
                { name: 'Amount Mined', value: `${parseDecimals((supply / maxSupply) * (10 ** decimals), 4)}% of max supply` },
                { name: 'Market Cap', value: `${marketCap} ${currency}` },
                { name: 'Fully Diluted Market Cap', value: `${parseDecimals(exchangeRate * maxSupply)} ${currency}` },
                { name: 'Transaction (TX) Fee', value: `${txFee}` },
                { name: 'Data', value: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSxUPmNczrjFQu-XTxVYGKh65KMoUc_JllrbJ1LUaBPY0NwlvBDEfHg01oZ2OQM-Eoq1aMYTmsmwFUa/pubhtml?gid=0&single=true' }
            )
            //.addField('', '', true)
            //.setImage('')
            .setTimestamp()
            .setFooter(`${coinName} (${ticker})`, ''); // TODO: set url as second arg
        interaction.reply({ embeds: [embed] })
    }
}