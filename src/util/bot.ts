import fs from "fs";
import { IConfig, ICooldown, ISettings } from "./types";

let cooldowns: ICooldown[] = [];

export const getConfig = (): IConfig => {
    let config = fs.readFileSync("./src/data/settings.json","utf-8");
    return JSON.parse(config);
}

/**
 * Write to a certain config property.
 * @param property 
 * @param write 
 */
export const WriteToConfig = (property: string, write: string | number) => {
    let config = getConfig()

    config[property] = write;

    fs.writeFile("./src/data/settings.json", JSON.stringify(config, null, 2), (err) => {
        if (err) console.log(err);
    });
}

export const returnSetting = (setting: string) => {
    let bot = fs.readFileSync("./src/data/bot.json","utf-8");
    let settings = JSON.parse(bot);
    return setting ? settings[setting] : settings
}

export const sanitizeId = (id: string) => {
    return id.replace(/[\\<>@#&!]/g, "");
}

/**
 * Checks for command cooldown. If false, make a cooldown.
 * @param command 
 * @param time 
 * @param author 
 * @returns boolean
 */
export const doCooldown = (command: string, time: number, author: string) => {
    let found = false;
    cooldowns.forEach((v, i) => {
        if (v.command === command && v.author === author) {
            found = true;
        }
    })
    if (found) return true;
    let obj: ICooldown = { command: command, time: time, author: author };
    cooldowns.push(obj);
    setTimeout(() => {
        cooldowns = cooldowns.filter(v => v !== obj)
    }, time)
    return false;
}

export const getUnit = (cooldown: number) => {
    if (cooldown >= 60000) return "minutes";
    return "seconds";
}