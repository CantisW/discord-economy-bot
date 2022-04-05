import { CommandInteraction } from "discord.js";
import { Discord, Permission, Slash, SlashChoice, SlashOption } from "discordx";
import { getConfig } from "../util/bot.js";
import {
    changeLocale,
    checkIfAccountExists,
    createAccount,
    getAccountBalance,
    getLocale,
    lang,
} from "../util/users.js";
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
                    return interaction.reply(await lang(`ACCOUNT_ALREADY_EXISTS`, interaction.user.id));
                } else {
                    createAccount(interaction.user.id).then(async () => {
                        return interaction.reply(await lang(`ACCOUNT_CREATED`, interaction.user.id));
                    });
                }
            case "bal":
                let bal = await getAccountBalance(interaction.user.id);
                if (!bal) return interaction.reply(await lang(`ACCOUNT_DOES_NOT_EXIST`, interaction.user.id));
                let calculated = `${bal} ${ticker} (${parseDecimals(exchangeRate * bal)} ${currency})`;
                return interaction.reply(await lang(`ACCOUNT_RETURN_BALANCE`, interaction.user.id, [ calculated ]));
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
        createAccount(id).then(async () => {
            interaction.reply(await lang(`ACCOUNT_CREATED`, interaction.user.id));
        });
    }

    @Slash("locale", { description: "Define your localization. This will only change command replies." })
    async locale(
        @SlashOption("locale", { type: "STRING", description: "[ string ]", required: false})
        locale: string,
        interaction: CommandInteraction
    ) {
        if (!locale) {
            let { localeKey, localeName } = await getLocale(interaction.user.id);
            return interaction.reply(await lang(`CURRENT_LOCALE`, interaction.user.id, [ localeName, localeKey ]))
        }
        changeLocale(interaction.user.id, locale).then(async () => {
            interaction.reply(await lang(`LOCALE_CHANGED`, interaction.user.id))
        }).catch((err) => interaction.reply(err))
    }
}
