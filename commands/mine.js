import { checkIfAccountExists } from "../util/economy-accounts.js"
import { getConfig, mine } from "../util/economy-blockchain.js";

export const name = "mine";
export const description = "Mine some currency!";
export const cooldown = 15*60;

export const execute = (message,args) => {
    if(!checkIfAccountExists(message.authorID)){
        message.channel.send("Please create an account before mining!");
        return;
    }

    let config = getConfig();

    if(mine(message.authorID)){
        message.channel.send(`You have mined for the block reward of ${config.blockreward} and earned ${config.storedfees} in TX fees.`)
    } else {
        message.channel.send(`The maximum amount of ${config.ticker} that will ever exist has been reached.`)
    }
};