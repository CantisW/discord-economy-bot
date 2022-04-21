import { ColorResolvable, CommandInteraction, MessageEmbed } from "discord.js";
import { Discord, Slash } from "discordx";
import { getSupply, parseDecimals } from "../util/blockchain.js";
import { getConfig, returnSetting } from "../util/bot.js";
import { lang } from "../util/users.js";

@Discord()
export class Info {
    @Slash("info", { description: "Get info about the bot." })
    async info(interaction: CommandInteraction) {
        let config = getConfig();
        let { coinName, ticker, currency, txFee, blockReward, decimals, maxSupply, exchangeRate } = config;
        let supply = await getSupply();
        let marketCap = parseDecimals(supply * exchangeRate);

        let calculatedExchange = `${parseDecimals(1 / exchangeRate)} ${ticker}`;
        let amountMined = parseDecimals((supply / maxSupply) * 10 ** decimals, 4);

        const embed = new MessageEmbed()
            .setColor("0xf1c40f" as ColorResolvable)
            .setTitle(`${coinName} (${ticker})`)
            //.setURL('')s
            //.setAuthor('Santeeisweird9')
            .setDescription(await lang("INFO_DESC", interaction.user.id, [coinName]))
            //.setThumbnail('')
            .addFields(
                { name: await lang("INFO_MAX_SUPPLY_LABEL", interaction.user.id), value: `${maxSupply}` },
                {
                    name: await lang("INFO_EXCHANGE_RATE_LABEL", interaction.user.id),
                    value: await lang("INFO_EXCHANGE_RATE_VALUE", interaction.user.id, [
                        ticker,
                        exchangeRate,
                        currency,
                        calculatedExchange,
                    ]),
                },
                {
                    name: await lang("INFO_CURRENT_SUPPLY_LABEL", interaction.user.id),
                    value: `${supply}`,
                    inline: true,
                },
                {
                    name: await lang("INFO_BLOCK_REWARD_LABEL", interaction.user.id),
                    value: `${blockReward}`,
                    inline: true,
                },
                {
                    name: await lang("INFO_AMOUNT_MINED_LABEL", interaction.user.id),
                    value: await lang("INFO_AMOUNT_MINED_VALUE", interaction.user.id, [amountMined]),
                },
                { name: await lang("INFO_MARKET_CAP_LABEL", interaction.user.id), value: `${marketCap} ${currency}` },
                {
                    name: await lang("INFO_FULLY_DILUTED_MARKET_CAP_LABEL", interaction.user.id),
                    value: `${parseDecimals(exchangeRate * maxSupply)} ${currency}`,
                },
                { name: await lang("INFO_TX_FEE_LABEL", interaction.user.id), value: `${txFee}` },
                { name: await lang("INFO_DATA_LABEL", interaction.user.id), value: returnSetting("data") },
            )
            //.addField('', '', true)
            //.setImage('')
            .setTimestamp()
            .setFooter(`${coinName} (${ticker})`, ""); // TODO: set url as second arg
        interaction.reply({ embeds: [embed] });
    }
}
