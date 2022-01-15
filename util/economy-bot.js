import fs from "fs";

//---------------------------------------------------------------
// Purpose: Parse bot-config data JSON
//---------------------------------------------------------------
export const getBotConfig = () => {
    let configjson = fs.readFileSync("./data/bot-settings.json","utf-8");
    let x = JSON.parse(configjson);
    return x;
}

//---------------------------------------------------------------
// Purpose: Get bot settings
//---------------------------------------------------------------
export const returnBotSettings = (settings) => {
    const botSettings = getBotConfig();
    return settings ? botSettings[settings] : botSettings
}