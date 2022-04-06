import {
    ButtonInteraction,
    ColorResolvable,
    CommandInteraction,
    MessageActionRow,
    MessageButton,
    MessageEmbed,
} from "discord.js";
import { ButtonComponent, Discord, Slash } from "discordx";
import { getSupply, parseDecimals } from "../util/blockchain.js";
import { getConfig, getUserIndex, setUserIndex } from "../util/bot.js";
import { lang, returnOrderedUsers } from "../util/users.js";

const { coinName, ticker } = getConfig();

const backButton = new MessageButton({
    style: "SECONDARY",
    label: "Back",
    emoji: "⬅️",
    customId: "back",
});
const forwardButton = new MessageButton({
    style: "SECONDARY",
    label: "Forward",
    emoji: "➡️",
    customId: "forward",
});

@Discord()
export class Leaderboard {
    users: any[];
    supply: number;
    length: number;

    @Slash("leaderboard", { description: "View the global leaderboard." })
    async leaderboard(interaction: CommandInteraction) {
        let index = 9;
        let components = false;
        let row = new MessageActionRow();
        await interaction.deferReply();
        this.supply = await getSupply();
        this.users = await returnOrderedUsers();
        this.length = this.users.length;

        const embed = new MessageEmbed()
            .setColor("0xf1c40f" as ColorResolvable)
            .setTitle(await lang("LEADERBOARD_TITLE", interaction.user.id))
            //.setURL('')s
            //.setAuthor('Santeeisweird9')
            .setDescription(await lang("LEADERBOARD_DESC", interaction.user.id))
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
            let val = `${this.users[i].balance} ${ticker} (${parseDecimals((this.users[i].balance / this.supply) * 100)}%)`;
            embed.addFields({
                name: `${this.users[i].address}`,
                value: await lang("LEADERBOARD_VALUE", interaction.user.id, [ val ]),
            });
        }
        if (components) {
            await interaction.editReply({ embeds: [embed], components: [row] });
        } else {
            await interaction.editReply({ embeds: [embed] });
        }
    }

    @ButtonComponent("forward")
    async forward(interaction: ButtonInteraction) {
        let index = getUserIndex(interaction.user.id, "leaderboard"); // tf2 dev moment
        if (index < 9) index = 9;
        let to = index + 10;
        let row = new MessageActionRow();

        if (index > this.length) {
            setUserIndex(interaction.user.id, "leaderboard", 0);
            return interaction.reply(await lang(`LEADERBOARD_CANNOT_HAVE_MULTIPLE`, interaction.user.id));
        }

        const embed = new MessageEmbed()
            .setColor("0xf1c40f" as ColorResolvable)
            .setTitle(await lang("LEADERBOARD_TITLE", interaction.user.id))
            //.setURL('')s
            //.setAuthor('Santeeisweird9')
            .setDescription(
                await lang("LEADERBOARD_DESC_FORWARD", interaction.user.id, [ index, to ])
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
                name: `${this.users[i].address}`,
                value: `${this.users[i].balance} ${ticker} (${parseDecimals(
                    (this.users[i].balance / this.supply) * 100
                )}% of total supply)`,
            });
        }
        setUserIndex(interaction.user.id, "leaderboard", index + 10);
        await interaction.deferUpdate();
        await interaction.editReply({ embeds: [embed], components: [row] });
    }

    @ButtonComponent("back")
    async back(interaction: ButtonInteraction) {
        let index = getUserIndex(interaction.user.id, "leaderboard"); // tf2 dev moment
        let row = new MessageActionRow();

        if (index - 10 < 9) {
            setUserIndex(interaction.user.id, "leaderboard", 0);
            return interaction.reply(await lang(`LEADERBOARD_CANNOT_HAVE_MULTIPLE`, interaction.user.id));
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
            .setTitle(await lang("LEADERBOARD_TITLE", interaction.user.id))
            //.setURL('')s
            //.setAuthor('Santeeisweird9')
            .setDescription(
                await lang("LEADERBOARD_DESC_BACK", interaction.user.id, [ to ])
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
                name: `${this.users[i].address}`,
                value: `${this.users[i].balance} ${ticker} (${parseDecimals(
                    (this.users[i].balance / this.supply) * 100
                )}% of total supply)`,
            });
        }
        if (to === 10) to = 19;
        setUserIndex(interaction.user.id, "leaderboard", index - 10);
        await interaction.deferUpdate();
        await interaction.editReply({ embeds: [embed], components: [row] });
    }
}
