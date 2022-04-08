import { CommandInteraction } from "discord.js";
import { Discord, Slash, SlashOption } from "discordx";
import { parseDecimals } from "../util/blockchain.js";
import { sanitizeId, getConfig } from "../util/bot.js";
import { getAccountBalance, lang } from "../util/users.js";

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
            if (bal === undefined) return interaction.reply(await lang(`ACCOUNT_DOES_NOT_EXIST`, interaction.user.id));
            let calculated = `${bal} ${ticker} (${parseDecimals(exchangeRate * bal)} ${currency})`
            return interaction.reply(await lang(`ACCOUNT_RETURN_BALANCE`, interaction.user.id, [ calculated ]));
        }

        let parsed = sanitizeId(user);
        let bal = await getAccountBalance(parsed);
        if (!bal) {
            return interaction.reply(await lang(`ACCOUNT_DOES_NOT_EXIST`, interaction.user.id));
        }
        let calculated = `${bal} ${ticker} (${parseDecimals(exchangeRate * bal)} ${currency}).`
        interaction.reply(await lang(`ACCOUNT_RETURN_BALANCE_OTHER_USER`, interaction.user.id, [ parsed, calculated ]));
    }
}