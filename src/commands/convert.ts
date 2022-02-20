import { CommandInteraction } from "discord.js";
import { Discord, Slash, SlashChoice, SlashOption } from "discordx";
import { parseDecimals } from "../util/blockchain.js";
import { getConfig } from "../util/bot.js";
import { ERRORS } from "../util/errors.js";

const { currency, ticker } = getConfig();

@Discord()
export class Convert {
    @Slash("convert", { description: "Get the exhcange rate between currencies!"})
    convert(
        @SlashChoice(`${ticker}`, "coin")
        @SlashChoice(`${currency}`, "currency")
        @SlashOption("to", { type: "STRING", description: `Convert to what? [ ${ticker} | ${currency}]` })
        to: string,
        @SlashOption("amount", { type: "STRING", description: "How much to convert? [ number ]"})
        amount: string,
        interaction: CommandInteraction
    ) {
        let { exchangeRate } = getConfig();
        if(!parseFloat(amount)) {
            return interaction.reply(ERRORS.CONVERT_INPUT_VALID_AMOUNT);
        }
        const amt = parseDecimals(parseFloat(amount));
        switch (to) {
            case "coin":
                interaction.reply(`${amt} ${ticker} is ${parseDecimals(amt * exchangeRate)} ${currency}.`);
                break;
            case "currency":
                interaction.reply(`${amt} ${currency} is ${parseDecimals(amt / exchangeRate)} ${ticker}.`);
                break;
        }
    }
}