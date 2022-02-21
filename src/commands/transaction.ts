import { ButtonInteraction, ColorResolvable, CommandInteraction, MessageActionRow, MessageButton, MessageEmbed } from "discord.js";
import { ButtonComponent, Discord, Slash, SlashOption } from "discordx";
import { getTransactionInfo, MakeTransaction, returnOrderedBlockchain } from "../util/blockchain.js";
import { getConfig, getUserIndex, setUserIndex } from "../util/bot.js";
import { ERRORS } from "../util/errors.js";

const { coinName, ticker } = getConfig();

const backButton = new MessageButton({
    style: "SECONDARY",
    label: "Back",
    emoji: "⬅️",
    customId: "backList",
});
const forwardButton = new MessageButton({
    style: "SECONDARY",
    label: "Forward",
    emoji: "➡️",
    customId: "forwardList",
});

@Discord()
export class Blockchain {
    tx: any[]
    length: number;

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

    @Slash("view", { description: "View a transaction." })
    async view(
        @SlashOption("txid", { type: "STRING", description: "[ string TXID ]"})
        txid: string,
        interaction: CommandInteraction
    ) {
        let tx = await getTransactionInfo(txid);
        if (!tx) return interaction.reply(ERRORS.TRANSACTION_VIEW_CANNOT_RETRIEVE);

        const embed = new MessageEmbed()
            .setColor("0xf1c40f" as ColorResolvable)
            .setTitle(`Viewing ${txid}`)
            //.setURL('')s
            //.setAuthor('Santeeisweird9')
            .setDescription(`View a transaction`)
            .addFields(
                { name: "Index", value: `${tx.index}` },
                { name: "TXID", value: `${tx.txid}` },
                { name: "Sender", value: `${tx.sender}` },
                { name: "Recepient", value: `${tx.recepient}` },
                { name: "Amount Sent", value: `${tx.amount}` },
                { name: "Timestamp", value: `${tx.timestamp}` },
                { name: "TX Fee", value: `${tx.txfee}` },
                { name: "Previous Hash", value: `${tx.previousHash}` },
            )
            //.setThumbnail('')
            //.addField('', '', true)
            //.setImage('')
            .setTimestamp()
            .setFooter(`${coinName} (${ticker})`, ""); // TODO: set url as second arg

        interaction.reply({ embeds: [embed] })
    }

    @Slash("list", { description: "List transactions." })
    async list(interaction: CommandInteraction) {
        let index = 9;
        let components = false;
        let row = new MessageActionRow();
        this.tx = await returnOrderedBlockchain();
        this.length = this.tx.length;
        await interaction.deferReply();

        const embed = new MessageEmbed()
            .setColor("0xf1c40f" as ColorResolvable)
            .setTitle(`Transactions List`)
            //.setURL('')s
            //.setAuthor('Santeeisweird9')
            .setDescription(`List of recent transactions (showing 1-10)`)
            //.setThumbnail('')
            //.addField('', '', true)
            //.setImage('')
            .setTimestamp()
            .setFooter(`${coinName} (${ticker})`, ""); // TODO: set url as second arg

        if (this.length > 10) {
            components = true;
            getUserIndex(interaction.user.id, interaction.commandName);
            row = row.addComponents([forwardButton]);
        } else {
            index = this.length - 1; // length is 1 based, so subtract 1
        }

        for (let i = 0; i <= index; i++) {
            embed.addFields({
                name: `TXID`,
                value: `${this.tx[i].txid}`,
            });
        }
        if (components) {
            await interaction.editReply({ embeds: [embed], components: [row] });
        } else {
            await interaction.editReply({ embeds: [embed] });
        }
    }

    @ButtonComponent("forwardList")
    async forward(interaction: ButtonInteraction) {
        let index = getUserIndex(interaction.user.id, "list");
        if (index < 9) index = 9;
        let to = index + 10;
        let row = new MessageActionRow();

        if (index > this.length) {
            setUserIndex(interaction.user.id, "list", 0);
            return interaction.reply(ERRORS.TRANSACTION_LIST_CANNOT_HAVE_MULTIPLE);
        }

        const embed = new MessageEmbed()
            .setColor("0xf1c40f" as ColorResolvable)
            .setTitle(`Transactions List`)
            //.setURL('')s
            //.setAuthor('Santeeisweird9')
            .setDescription(
                `List of recent transactions (showing ${index + 2}-${to + 1})`
            )
            //.setThumbnail('')
            //.addField('', '', true)
            //.setImage('')
            .setTimestamp()
            .setFooter(`${coinName} (${ticker})`, ""); // TODO: set url as second arg

        if (to > this.length) {
            to = this.length - 1;
            row = row.addComponents([backButton]);
        } else {
            row = row.addComponents([backButton, forwardButton]);
        }

        for (let i = index + 1; i <= to; i++) {
            embed.addFields({
                name: `TXID`,
                value: `${this.tx[i].txid}`,
            });
        }
        setUserIndex(interaction.user.id, "list", index + 10);
        await interaction.deferUpdate();
        await interaction.editReply({ embeds: [embed], components: [row] });
    }

    @ButtonComponent("backList")
    async back(interaction: ButtonInteraction) {
        let index = getUserIndex(interaction.user.id, "list"); // tf2 dev moment
        let row = new MessageActionRow();

        if (index - 10 < 9) {
            setUserIndex(interaction.user.id, "list", 0);
            return interaction.reply(ERRORS.TRANSACTION_LIST_CANNOT_HAVE_MULTIPLE);
        }

        // complex maths
        // since index = max of current iteration,
        // check if we are on second page (i - 10)
        // else go to previous page (i - 19)
        // we cannot do (i - 10) on pages beyond second because that would just repeat itself
        // i.e if i = 39, it would go from 29 to 39 (third page) instead of 19 to 29 (second page)

        let to = index - 10;

        if (index - 10 === 9) {
            index = index - 10;
            to = index - 9;
        } else {
            to = index - 19;
        }

        const embed = new MessageEmbed()
            .setColor("0xf1c40f" as ColorResolvable)
            .setTitle(`Transactions List`)
            //.setURL('')s
            //.setAuthor('Santeeisweird9')
            .setDescription(
                `List of recent transactions (showing ${to + 1}-${to + 10})`
            )
            //.setThumbnail('')
            //.addField('', '', true)
            //.setImage('')
            .setTimestamp()
            .setFooter(`${coinName} (${ticker})`, ""); // TODO: set url as second arg

        // check if going back again will reach the start

        if (to === 0) {
            row = row.addComponents([forwardButton]);
        } else {
            row = row.addComponents([backButton, forwardButton]);
        }

        // get values from i to i + 10 for correct order

        for (let i = to; i < to + 10; i++) {
            embed.addFields({
                name: `TXID`,
                value: `${this.tx[i].txid}`,
            });
        }
        if (to === 10) to = 19;
        setUserIndex(interaction.user.id, "list", index - 10);
        await interaction.deferUpdate();
        await interaction.editReply({ embeds: [embed], components: [row] });
    }
}