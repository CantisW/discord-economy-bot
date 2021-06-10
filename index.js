import Discord from "discord.js"
const client = new Discord.Client();

import fs from "fs"
import crypto from "crypto";

import settings from './data/bot-settings.json';
const { prefix, token, message } = settings;

client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));

for (const file of commandFiles) {
    const command = await import(`./commands/${file}`);
    client.commands.set(command.name, command); 
    console.log("Command loaded: "+command.name);
}


client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    client.user.setPresence({
        status: "online",
        activity: {
            name: `${prefix} | ${message}`,
            type: "PLAYING"
        }
    });
});

client.on('message', msg => {
    if (!msg.content.startsWith(prefix) || msg.author.bot) return; // Check if command starts with prefix or is sent by bot

    const args = msg.content.slice(prefix.length).trim().split(/ +/); // Get content, remove prefix, remove spaces at start and end, and split where there's a space
    const command = args.shift().toLowerCase(); // removes first from "args" and returns it as "command"

    if(!client.commands.has(command)) return; // Does this command exist?

    try {
        client.commands.get(command).execute(msg,args); // msg passes message object so that you can send messages through command files
    } catch (err){
        console.error(err);
    }
});

client.login(token);