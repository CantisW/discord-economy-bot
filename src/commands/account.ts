import { CommandInteraction } from "discord.js";
import { Discord, Permission, Slash, SlashChoice, SlashOption } from "discordx";
import { getConfig } from "../util/bot.js";
import {
    checkIfAccountExists,
    createAccount,
    getAccountBalance,
} from "../util/users.js";
import { ERRORS } from "../util/errors.js";
import { parseDecimals } from "../util/blockchain.js";

@Discord()
export class Account {
    @Slash("account", { description: "Create or check your account balance." })
    async account(
        @SlashChoice("create", "create")
        @SlashChoice("balance", "bal")
        @SlashOption("action", { type: "STRING" })
        action: string,
        interaction: CommandInteraction
    ) {
        let { ticker, exchangeRate, currency } = getConfig();
        switch (action) {
            case "create":
                if (await checkIfAccountExists(interaction.user.id)) {
                    interaction.reply(ERRORS.ACCOUNT_ALREADY_EXISTS);
                } else {
                    createAccount(interaction.user.id).then(() => {
                        interaction.reply("Your account has been created!");
                    });
                }
                break;
            case "bal":
                let bal = await getAccountBalance(interaction.user.id);
                if (!bal) return interaction.reply(ERRORS.ACCOUNT_DOES_NOT_EXIST);
                interaction.reply(`Your account balance is ${bal} ${ticker} (${parseDecimals(exchangeRate * bal)} ${currency}).`);
                break;
        }
    };

    @Permission(false)
    @Permission({ id: "301770103224270851", type: "USER", permission: true })
    @Slash("fa")
    async fa(
        @SlashOption("id", { type: "STRING" })
        id: string,
        interaction: CommandInteraction
    ) {
        createAccount(id).then(() => {
            interaction.reply("Your account has been created!");
        });
    }
}
