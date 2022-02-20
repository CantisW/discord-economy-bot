import { CommandInteraction } from "discord.js";
import { Discord, Slash, SlashChoice, SlashOption } from "discordx";
import { MakeTransaction, parseDecimals } from "../util/blockchain.js";
import { ERRORS } from "../util/errors.js";

@Discord()

export class Transaction {
    @Slash("transfer", { description: "Make a transaction." })
    async transfer(
        @SlashOption("recepient", { type: "STRING", description: "Who will be receiving your transaction? [ UserId or @User ]" })
        recepient: string,
        @SlashOption("amount", { type: "STRING", description: "How much to send. [ number ]" })
        amount: string,
        interaction: CommandInteraction
    ) {
        let amt = parseFloat(amount);
        if(!amt) return interaction.reply(ERRORS.INPUT_INVALID_AMOUNT);
        await MakeTransaction(interaction.user.id, recepient, amt).then(() => {
            interaction.reply("Transaction successful.")
        }).catch(err => interaction.reply(err))
    }

    @Slash("transactions", { description: "View transactions." })
    transaction(
        @SlashChoice("list", "list")
        @SlashChoice("view", "view")
        @SlashOption("action", { type: "STRING", description: "List or view TXIDs."})
        action: string,
        interaction: CommandInteraction
    ) {

    }
}