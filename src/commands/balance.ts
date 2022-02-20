import { CommandInteraction } from "discord.js";
import { Discord, Slash, SlashOption } from "discordx";
import { parseDecimals } from "../util/blockchain.js";
import { sanitizeId, getConfig } from "../util/bot.js";
import { ERRORS } from "../util/errors.js";
import { getAccountBalance } from "../util/users.js";

@Discord()
export class Balance {
    @Slash("balance", { description: "See someone else's balance." })
    async balance(
        @SlashOption("user", { type: "STRING", description: "Who? [ UserId or @User ]" })
        user: string,
        interaction: CommandInteraction
    ) {
        let { ticker, exchangeRate, currency } = getConfig();

        let parsed = sanitizeId(user);
        let bal = await getAccountBalance(parsed);
        if (!bal) {
            return interaction.reply(ERRORS.BALANCE_CANNOT_RETRIEVE)
        }
        interaction.reply(`${parsed} has ${bal} ${ticker} (${parseDecimals(exchangeRate * bal)} ${currency})`)
    }
}