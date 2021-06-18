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
        message.channel.send("Please provide two (2) arguments: userid, amount.");
        return;
    }
    if (!checkIfAccountExists(message.authorID)){
        message.channel.send("You need to make an account before you initiate any transfers.")
        return;
    }
    args[0] = sanitizeId(message, 0)
    if(checkIfAccountExists(args[0])){
        args[1] = parseFloat(args[1])
        if(!(typeof args[1] == "number")){
            message.channel.send("Amount argument must be a number!");
            return;
        }
        if(args[0] == message.authorID){
            message.channel.send("You can't transfer to yourself.")
            return;
        }
        if(transfer(message.authorID, args[0], args[1], txid, timestamp)) {
            message.channel.send(`Transaction to ${args[0]} of ${args[1]} successful (TXID: ${txid}) with a TX fee of ${txfee} ${ticker}.`);
        } else {
            message.channel.send("An error has occurred processing the transaction.")
        }
    } else {
        message.channel.send("That account does not exist.");
    }
};