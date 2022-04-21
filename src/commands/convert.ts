import { CommandInteraction } from "discord.js";
import { Discord, Slash, SlashChoice, SlashOption } from "discordx";
import { parseDecimals } from "../util/blockchain.js";
import { getConfig } from "../util/bot.js";
import { lang } from "../util/users.js";

const { currency, ticker } = getConfig();

@Discord()
export class Convert {
    @Slash("convert", { description: "Get the exhcange rate between currencies!" })
    async convert(
        @SlashChoice(`${ticker}`, "coin")
        @SlashChoice(`${currency}`, "currency")
        @SlashOption("from", { type: "STRING", description: `Convert from what? [ ${ticker} | ${currency}]` })
        to: string,
        @SlashOption("amount", { type: "STRING", description: "How much to convert? [ number ]" })
        amount: string,
        interaction: CommandInteraction,
    ) {
        let { exchangeRate } = getConfig();
        if (!parseFloat(amount)) return interaction.reply(await lang(`INPUT_INVALID_AMOUNT`, interaction.user.id));
        const amt = parseDecimals(parseFloat(amount));

        let calculatedToCoin = `${parseDecimals(amt * exchangeRate)} ${currency}`;
        let calculatedToCurrency = `${parseDecimals(amt / exchangeRate)} ${ticker}`;

        switch (to) {
            case "coin":
                return interaction.reply(
                    await lang(`CONVERT_AMOUNT_IS`, interaction.user.id, [`${amt} ${ticker}`, calculatedToCoin]),
                );
            case "currency":
                return interaction.reply(
                    await lang(`CONVERT_AMOUNT_IS`, interaction.user.id, [`${amt} ${currency}`, calculatedToCurrency]),
                );
        }
    }
}
