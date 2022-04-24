import fs from "fs";
import { IConfig, ISettings, ISharedArray } from "./types";
import { lang } from "./users.js";

let cooldowns: ISharedArray[] = [];
const usersArray: ISharedArray[] = [];

export const getConfig = (): IConfig => {
    const config = fs.readFileSync("./src/data/settings.json", "utf-8");
    return JSON.parse(config);
};

/**
 * Write to a certain config property.
 * @param property
 * @param write
 */
export const WriteToConfig = (property: string, write: string | number) => {
    const config = getConfig();

    config[property] = write;

    fs.writeFile("./src/data/settings.json", JSON.stringify(config, null, 2), (err) => {
        if (err) console.log(err);
    });
};

export const returnSetting = (setting: string): string => {
    const bot = fs.readFileSync("./src/data/bot.json", "utf-8");
    const settings: ISettings = JSON.parse(bot);
    return setting ? settings[setting] : "Invalid setting, idiot!"; // just assume that setting will be picked correctly
};

export const sanitizeId = (id: string) => {
    return id.replace(/[\\<>@#&!]/g, "");
};

/**
 * Checks for command cooldown. If false, make a cooldown.
 * @param command
 * @param time
 * @param author
 * @returns boolean
 */
export const doCooldown = (command: string, time: number, author: string) => {
    let found = false;
    cooldowns.forEach((v) => {
        if (v.command === command && v.author === author) {
            found = true;
        }
    });
    if (found) return true;
    const obj: ISharedArray = { command: command, time: time, author: author };
    cooldowns.push(obj);
    setTimeout(() => {
        cooldowns = cooldowns.filter((v) => v !== obj);
    }, time);
    return false;
};

export const getUnit = async (cooldown: number, id: string) => {
    if (cooldown >= 60000) return await lang("COOLDOWN_MINUTES", id);
    return await lang("COOLDOWN_SECONDS", id);
};

/**
 * Returns an index number OR create one. Used for pagination.
 * @param user
 * @param command
 * @returns number
 */
export const getUserIndex = (user: string, command: string) => {
    const obj: ISharedArray = { command: command, time: 0, author: user };
    let found = false;
    let index = 0;
    usersArray.forEach((v) => {
        if (v.author === user && v.command === command) {
            found = true;
            index = v.time;
        }
    });
    if (found) return index;
    usersArray.push(obj);
    return 0;
};

/**
 * Sets an index number. Used for pagination.
 * @param user
 * @param command
 * @returns number
 */
export const setUserIndex = (user: string, command: string, index: number) => {
    const obj: ISharedArray = { command: command, time: 0, author: user };
    if (index === 0) {
        usersArray.filter((v) => v !== obj);
    }
    usersArray.forEach((v) => {
        if (v.author === user && v.command === command) {
            v.time = index;
        }
    });
    return true;
};
