import fs from "fs";
import { IUser } from "./types.js";

export const getUsers = (): IUser => {
    let users = fs.readFileSync("./src/data/accounts.json","utf-8");
    return JSON.parse(users);
}

export const getConfig = (): object => {
    let config = fs.readFileSync("./src/data/settings.json","utf-8");
    return JSON.parse(config);
}

export const returnSetting = (setting: string) => {
    let bot = fs.readFileSync("./src/data/bot.json","utf-8");
    let settings = JSON.parse(bot);
    return setting ? settings[setting] : settings
}