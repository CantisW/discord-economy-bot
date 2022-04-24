import { CommandInteraction } from "discord.js";
import { Discord, Slash } from "discordx";
import { mine, parseDecimals } from "../util/blockchain.js";
import { doCooldown, getConfig, getUnit } from "../util/bot.js";
import { lang } from "../util/users.js";

const { blockReward, ticker } = getConfig();
const cooldown = 20 * 60 * 1000;

@Discord()
export class Mine {
    @Slash("mine", { description: "Mine some coins!" })
    async mine(interaction: CommandInteraction) {
        const { storedFees } = getConfig();
        const parsedFees = parseDecimals(storedFees);
        if (doCooldown(interaction.commandName, cooldown, interaction.user.id))
            return interaction.reply(
                await lang(`COOLDOWN`, interaction.user.id, [cooldown, await getUnit(cooldown, interaction.user.id)]),
            );
        mine(interaction.user.id)
            .then(async () => {
                interaction.reply(
                    await lang(`SUCCESSFULLY_MINED`, interaction.user.id, [blockReward, ticker, parsedFees]),
                );
            })
            .catch((err) => interaction.reply(err));
    }
}
