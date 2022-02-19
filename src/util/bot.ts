import fs from "fs";
import { IConfig } from "./types";

export const getConfig = (): IConfig => {
    let config = fs.readFileSync("./src/data/settings.json","utf-8");
    return JSON.parse(config);
}

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