import { createAccount } from "../util/economy-accounts.js";
import { sanitizeId } from "../util/economy-blockchain.js";

export const name = "force-account";
export const description = "Force create an account with a specified userid. Developer usage only.";
export const aliases = ["fa"];

export const execute = (message,args) => {
    if(!args.length){
        message.reply("please provide a userid argument!");
        return;
    }
    if(!(message.author.id == 301770103224270851)) {
        message.channel.send("Force-Account (FA) is a developer-only command.");
        return;
    }
    args[0] = sanitizeId(args[0]);
    createAccount(args[0]);
};