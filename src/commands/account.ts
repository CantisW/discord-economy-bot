import { CommandInteraction } from "discord.js";
import { Discord, Slash, SlashChoice, SlashOption } from "discordx";
import { getConfig } from "../util/bot.js";
import { checkIfAccountExists, createAccount, getAccountBalance } from "../util/users.js";
import { ERRORS } from "../util/errors.js";

let config = getConfig();

@Discord()
export class Account {

    @Slash("account", { description: "Create or check your account balance."})
    account(
        @SlashChoice("create", "create")
        @SlashChoice("balance", "bal")
        @SlashOption("action", { type: "STRING" })
        action: string,
        interaction: CommandInteraction
    ) {
        switch (action) {
            case "create":
                if (checkIfAccountExists(interaction.user.id)) {
                    interaction.reply(ERRORS.ACCOUNT_ALREADY_EXISTS)
                } else {
                    createAccount(interaction.user.id);
                    interaction.reply("Your account has been created!")
                }
                break;
            case "bal":
                if (checkIfAccountExists(interaction.user.id)) {
                    let bal = getAccountBalance(interaction.user.id);
                    interaction.reply(`Your account balance is ${bal}`)
                } else {
                    interaction.reply(ERRORS.ACCOUNT_DOES_NOT_EXIST);
                }
                break;
        }
    }
}