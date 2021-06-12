import { createAccount } from "../util/economy-accounts.js";
import { sanitizeId } from "../util/economy-blockchain.js";

export const name = "force-account";
export const description = "Force create an account with a specified userid. Developer usage only.";
export const aliases = ["fa"];

export const execute = (message,args) => {
    if(!args.length){
        message.channel.send("Please provide a userid argument!");
        return;
    }
    if(!(message.authorID == "ndlR12OA")) {
        message.channel.send("Force-Account (FA) is a developer-only command.");
        return;
    }
    args[0] = sanitizeId(args[0]);
    createAccount(args[0]);
    message.channel.send(`Account ${args[0]} made.`)
};