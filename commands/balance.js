import { checkIfAccountExists, returnAccountBalance } from "../util/economy-accounts.js"
import { parseDecimals, sanitizeId } from "../util/economy-blockchain.js"

import config from "../data/config.json" assert { type: "json" };
import { getConfig } from "../util/economy-blockchain.js";
const { ticker, currency } = config;

export const name = "balance";
export const description = "Get an account's balance.";
export const aliases = ["bal"];

export const execute = (message,args) => {
    if(!args.length){
        if(checkIfAccountExists(message.author.id)) {
            let config = getConfig();
            let bal = returnAccountBalance(message.author.id);
            message.channel.send(`Your account balance is: ${bal} ${ticker} (${parseDecimals(bal*(config.exchangerate))} ${currency})`)
        } else {
            message.channel.send("You need an account before you can check your balance.")
        }
    } else {
        if (args[0]) args[0] = sanitizeId(args[0]); // assume first argument is a mention since it's checked below
        if (checkIfAccountExists(args[0])) { // check if account exists
            let bal = returnAccountBalance(args[0]);
            message.channel.send(`The account balance for ${args[0]} is: ${bal} ${ticker} (${parseDecimals(bal*config.exchangerate)} ${currency})`);
        } else {
            message.channel.send(`The account ${args[0]} does not exist.`);
        }
    }
};