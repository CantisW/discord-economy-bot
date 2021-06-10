import { checkIfAccountExists } from "../util/economy-accounts.js";
import { sanitizeId, hash } from "../util/economy-blockchain.js";
import { transfer } from "../util/economy-transactions.js";
import config from "../data/config.json";
const { ticker, txfee } = config;

export const name = "transfer";
export const description = "Transfer currency between two people.";

export const execute = (message,args) => {
    let timestamp = new Date().getTime();
    let txid = hash(timestamp);

    if (!args.length){
        message.reply("please provide two (2) arguments: userid, amount.");
        return;
    }
    if (!checkIfAccountExists(message.author.id)){
        message.reply("you need to make an account before you initiate any transfers.")
        return;
    }
    args[0] = sanitizeId(args[0])
    if(checkIfAccountExists(args[0])){
        if(!(typeof args[1] == "number")){
            message.reply("amount argument must be a number!");
            return;
        }
        if(transfer(message.author.id, args[0], args[1], txid, timestamp)) {
            message.channel.send(`Transaction to ${args[0]} of ${args[1]} successful (TXID: ${txid}) with a TX fee of ${txfee} ${ticker}.`);
        } else {
            message.channel.send("An error has occurred processing the transaction.")
        }
    } else {
        message.reply("that account does not exist.");
    }
};