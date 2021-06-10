import Discord from "discord.js"
const client = new Discord.Client();

import fs from "fs"

import settings from './data/bot-settings.json';
const { prefix, token, status } = settings;

client.commands = new Discord.Collection();
client.cooldowns = new Discord.Collection();

const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));

for (const file of commandFiles) {
    const command = await import(`./commands/${file}`); // semi-hacky way to allow dynamic imports until ES6 actually allows dynamic imports
    client.commands.set(command.name, command);
    console.log("Command loaded: " + command.name);
}


client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    client.user.setPresence({
        status: "online",
        activity: {
            name: `${prefix} | ${status}`,
            type: "PLAYING"
        }
    });
});

client.on('message', msg => {
    if (!msg.content.startsWith(prefix) || msg.author.bot) return; // Check if command starts with prefix or is sent by bot

    const args = msg.content.slice(prefix.length).trim().split(/ +/); // Get content, remove prefix, remove spaces at start and end, and split where there's a space
    const commandName = args.shift().toLowerCase(); // removes first from "args" and returns it as "command"

    const commandObj = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName))

    if (!commandObj) return; // Does this command exist?

    let command = commandObj.name // to lazy to edit current code so this works for now
    let cooldown = client.commands.get(command).cooldown * 1000 || 3 * 1000;

    // this is a REALLY hacky way to do cooldowns
    // but it works so whatever

    let cooldown_token = msg.author.id+"."+command
    
    if (client.cooldowns.has(cooldown_token) && client.cooldowns.get(cooldown_token) == cooldown) { // Cooldown code
        let time = client.commands.get(command).cooldown || 3;
        //
        // dynamic cooldown
        //
        if (cooldown/1000 >= 60) {
            msg.reply(`please wait ${time/60} minutes!`);
        } else {
            msg.reply(`please wait ${time} seconds!`);
        }
    } else {
        client.cooldowns.set(cooldown_token, cooldown);
        setTimeout(() => {
            for (const [key, value] of client.cooldowns.entries()) {
                if (key == cooldown_token && value == cooldown) {
                    client.cooldowns.delete(key);
                }
            }
            
        }, cooldown)
        //
        // Command handler
        //
        try {
            client.commands.get(command).execute(msg, args); // msg passes message object so that you can send messages through command files
        } catch (err) {
            console.error(err);
        }
    }
});

client.login(token);