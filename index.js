import { Client } from "@guildedjs/guilded.js";
import fs from "fs"

import settings from './data/bot-settings.json';
const { email, password, prefix, status } = settings;

const client = new Client();

let commandsMap = new Map();
let cooldownsMap = new Map();

const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));


// This wrapper has discord.js/collections as a dependency
// but I don't know how to utilize the collections (if any)
// So I'll use this method instead (which I used for guilded.js.gg before the switch to this lib)
// Sadly this means I have to add aliases along with commands which means more stuff to check

for (const file of commandFiles) {
    const command = await import(`./commands/${file}`); // semi-hacky way to allow dynamic imports until ES6 actually allows dynamic imports
    commandsMap.set(command.name, command);
    if (command.aliases){
        for (const a in command.aliases){
            commandsMap.set(command.aliases[a], command); // view comments above
        }
    }
    console.log("Command loaded: " + command.name);
}

client.on('ready', () => {
    console.log(`Logged in!`);
    client.user.setPresence({
        status: "online",
        activity: {
            name: `${prefix} | ${status}`,
            type: "PLAYING"
        }
    });
});

client.on("messageCreate", msg => {

    if (!msg.content.startsWith(prefix) || client.user.id == msg.authorID) return; // Check if command starts with prefix or is sent by bot

    const args = msg.content.slice(prefix.length).trim().split(/ +/); // Get content, remove prefix, remove spaces at start and end, and split where there's a space
    const commandName = args.shift().toLowerCase(); // removes first from "args" and returns it as "command"

    const commandObj = commandsMap.get(commandName);

    if (!commandObj) return; // Does this command exist?

    let command = commandObj.name // to lazy to edit current code so this works for now
    let cooldown = commandsMap.get(command).cooldown * 1000 || 3 * 1000;

    

    // this is a REALLY hacky way to do cooldowns
    // but it works so whatever

    let cooldown_token = msg.authorID+"."+command
    
    if (cooldownsMap.has(cooldown_token) && cooldownsMap.get(cooldown_token) == cooldown) { // Cooldown code
        let time = commandsMap.get(command).cooldown || 3;
        //
        // dynamic cooldown
        //
        if (cooldown/1000 >= 60) {
            msg.channel.send(`Please wait ${time/60} minutes!`);
        } else {
            msg.channel.send(`Please wait ${time} seconds!`);
        }
    } else {
        cooldownsMap.set(cooldown_token, cooldown);
        setTimeout(() => {
            for (const [key, value] of cooldownsMap.entries()) {
                if (key == cooldown_token && value == cooldown) {
                    cooldownsMap.delete(key);
                }
            }
            
        }, cooldown)
        //
        // Command handler
        //
        try {
            commandsMap.get(command).execute(msg, args); // msg passes message object so that you can send messages through command files
        } catch (err) {
            console.error(err);
        }
    }
});

client.login({
    email: email,
    password: password,
});