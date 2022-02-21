import { CommandInteraction } from "discord.js";
import { Discord, Slash, SlashOption } from "discordx";
import { parseDecimals } from "../util/blockchain.js";
import { sanitizeId, getConfig } from "../util/bot.js";
import { ERRORS } from "../util/errors.js";
import { getAccountBalance } from "../util/users.js";

@Discord()
export class Balance {
    @Slash("balance", { description: "See your own or someone else's balance." })
    async balance(
        @SlashOption("user", { type: "STRING", description: "Who? [ UserId or @User ]", required: false })
        user: string,
        interaction: CommandInteraction
    ) {
        let { ticker, exchangeRate, currency } = getConfig();
        if (!user) {
            let bal = await getAccountBalance(interaction.user.id);
            if (!bal) return interaction.reply(ERRORS.ACCOUNT_DOES_NOT_EXIST);
            return interaction.reply(`Your account balance is ${bal} ${ticker} (${parseDecimals(exchangeRate * bal)} ${currency}).`);
        }

        let parsed = sanitizeId(user);
        let bal = await getAccountBalance(parsed);
        if (!bal) {
            return interaction.reply(ERRORS.BALANCE_CANNOT_RETRIEVE);
        }
        interaction.reply(`${parsed} has ${bal} ${ticker} (${parseDecimals(exchangeRate * bal)} ${currency}).`);
    }
}