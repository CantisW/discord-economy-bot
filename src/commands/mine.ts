import { CommandInteraction } from "discord.js";
import { Discord, Slash } from "discordx";
import { mine, parseDecimals } from "../util/blockchain.js";
import { doCooldown, getConfig, getUnit } from "../util/bot.js";

let { blockReward, ticker } = getConfig();
const cooldown = 15 * 60 * 1000;

@Discord()
export class Mine {
    @Slash("mine", { description: "Mine some coins!"} )
    async mine(
        interaction: CommandInteraction
    ) {
        let { storedFees } = getConfig();
        if (doCooldown(interaction.commandName, cooldown, interaction.user.id)) return interaction.reply(`Please try again in ${cooldown/60000} ${getUnit(cooldown)}!`)
        mine(interaction.user.id).then(() => {
            interaction.reply(`You have successfully mined for the block reward of ${blockReward} ${ticker} and ${parseDecimals(storedFees)} in TX fees.`)
        }).catch(err => interaction.reply(err))
    }
}