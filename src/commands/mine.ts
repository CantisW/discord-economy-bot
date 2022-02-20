import { CommandInteraction } from "discord.js";
import { Discord, Slash } from "discordx";
import { mine } from "../util/blockchain.js";
import { getConfig } from "../util/bot.js";

let { blockReward, ticker } = getConfig();

@Discord()
export class Mine {
    @Slash("mine", { description: "Mine some coins!"} )
    async mine(
        interaction: CommandInteraction
    ) {
        mine(interaction.user.id).then(() => {
            interaction.reply(`You have successfully mined for the block reward of ${blockReward} ${ticker}.`)
        }).catch(err => interaction.reply(err))
    }
}