import fs from "fs"
import { checkIfAccountExists, returnAccountBalance } from "./economy-accounts.js";
import { addToBlockchain, getBlockchain, getConfig, getUsers, parseDecimals } from "./economy-blockchain.js";
import config from "../data/config.json";
const { txfee } = config;

export const transfer = (sender, recepient, amount, hash, timestamp) => {
    let users = getUsers();
    let config = getConfig();
    let count = Object.keys(users.accounts).length;
    let sent = false;
    let received = false;

    amount = parseDecimals(amount);
    if (amount <= 0){
        return false;
    }

    if(!checkIfAccountExists(recepient)) {
        return false;
    }
    let senderNewBal = parseDecimals(returnAccountBalance(sender) - amount - txfee);
    let recepientNewBal = parseDecimals(returnAccountBalance(recepient) + amount);

    if(!(senderNewBal > 0)){
        return false;
    }
    for (let i = 0; i<count; i++){
        let id = users.accounts[i].userid
        if (!sent && id == sender){
            users.accounts[i].balance = senderNewBal;
            sent = true
        }
        if (!received && id == recepient){
            users.accounts[i].balance = recepientNewBal;
            received = true
        }
    }
    if (sent && received){
        config.storedfees = parseDecimals(config.storedfees + config.txfee);
        fs.writeFile("./data/user-data.json", JSON.stringify(users, null, 2), (err) => {
            if (err) console.log(err);
        });
        fs.writeFile("./data/config.json", JSON.stringify(config, null, 2), (err) => {
            if (err) console.log(err);
        });
        addToBlockchain(hash, sender, recepient, amount, timestamp, txfee);
        return true;
    }
    return false;
}