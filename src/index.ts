import "reflect-metadata";

import { Client } from "discordx";
import { Intents, Interaction, Message } from "discord.js";
import { dirname, importx } from "@discordx/importer";
import { createConnection } from "typeorm";

import config from "./data/bot.json" assert { type: "json" };
const { token, prefix, guildId } = config;

createConnection().catch(e => console.log(e));

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
    botGuilds: [guildId]
});

client.once("ready", async () => {
    await client.guilds.fetch();
    await client.initApplicationCommands({
        guild: { log: true },
        global: { log: true },
    });
    await client.initApplicationPermissions(true);
    console.log("Ready!");
});

client.on("interactionCreate", (interaction: Interaction) => {
    client.executeInteraction(interaction);
});

client.on("messageCreate", (message: Message) => {
    client.executeCommand(message);
});

const start = async () => {
    await importx(
        dirname(import.meta.url) + "/{events,commands,api}/**/*.{ts,js}"
    );

    await client.login(token);
};

start();
