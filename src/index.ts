import "reflect-metadata";
import "dotenv/config";

import { Client } from "discordx";
import { Intents, Interaction, Message } from "discord.js";
import { dirname, importx } from "@discordx/importer";
import { createConnection } from "typeorm";
import { getConfig, returnSetting } from "./util/bot.js";
import config from "./data/bot.json" assert { type: "json" };

let { token, prefix, status, guildId } = config;
const { coinName, ticker } = getConfig();

createConnection()
    .then(() => console.log("Connected to DB!"))
    .catch((e) => console.log(e));

if (returnSetting("environment") !== "production") {
    token = process.env.TOKEN || "";
    guildId = process.env.GUILDID || "";
}

export const client = new Client({
    simpleCommand: {
        prefix: prefix,
    },
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    ],
    botGuilds: [guildId],
});

client.once("ready", async () => {
    await client.guilds.fetch();
    await client.initApplicationCommands({
        guild: { log: true },
        global: { log: true },
    });
    await client.initApplicationPermissions(true);
    client.user!.setPresence({ activities: [{ name: `${coinName} (${ticker}) | ${status}` }], status: "online" });
    console.log("Ready!");
});

client.on("interactionCreate", (interaction: Interaction) => {
    client.executeInteraction(interaction);
});

client.on("messageCreate", (message: Message) => {
    client.executeCommand(message);
});

const start = async () => {
    await importx(dirname(import.meta.url) + "/{events,commands,api}/**/*.{ts,js}");

    await client.login(token);
};

start();
