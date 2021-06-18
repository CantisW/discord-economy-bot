import { checkIfAccountExists, returnAccountBalance } from "../util/economy-accounts.js"
import { parseDecimals, sanitizeId } from "../util/economy-blockchain.js"

import config from "../data/config.json"
import { getConfig } from "../util/economy-blockchain.js";
const { ticker, currency } = config;

export const name = "balance";
export const description = "Get an account's balance.";
export const aliases = ["bal"];

export const execute = (message,args) => {
    if(!args.length){
        if(checkIfAccountExists(message.authorID)) {
            let config = getConfig();
            let bal = returnAccountBalance(message.authorID);
            message.channel.send(`Your account balance is: ${bal} ${ticker} (${parseDecimals(bal*config.exchangerate)} ${currency})`)
        } else {
            message.channel.send("you need an account before you can check your balance.")
        }
    } else {
        args[0] = sanitizeId(message, 0)
        if (checkIfAccountExists(args[0])) {
            let bal = returnAccountBalance(args[0]);
            message.channel.send(`The account balance for ${args[0]} is: ${bal} ${ticker} (${parseDecimals(bal*config.exchangerate)} ${currency})`)
        } else {
            message.channel.send(`The account ${args[0]} does not exist.`)
        }
    }
};