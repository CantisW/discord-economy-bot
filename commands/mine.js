import { checkIfAccountExists } from "../util/economy-accounts.js"
import { getConfig, mine } from "../util/economy-blockchain.js";
import { returnBotSettings } from "../util/economy-bot.js";

export const name = "mine";
export const description = "Mine some currency!";
export const cooldown = 15*60;

const competition = returnBotSettings("allow_competition");
const antiBot = returnBotSettings("disable_botting");
let minedList = [];
let mined = false;

export const execute = (message,args) => {
    if (antiBot && minedList.includes(message.author.id)) {
        return message.channel.send(`Mining operation failed. Unable to find new block!`);
    }
    if (competition && mined) {
        return message.channel.send(`A block has already been mined. Block time is ${cooldown/60} minutes`);
    }
    if(!checkIfAccountExists(message.author.id)){
        return message.channel.send("Please create an account before mining!");
    }

    let config = getConfig();

    if(mine(message.author.id)){
        let antiBotCooldown = 3*Math.random()*1000;
        console.log(antiBotCooldown);
        minedList.push(message.author.id);
        mined = true;
        setTimeout(() => {
            mined = false;
            setTimeout(() => {
                minedList = minedList.filter(x => x !== message.author.id); // tf2 way to remove items from array
            }, antiBotCooldown);
        }, cooldown*1000);
        return message.channel.send(`You have mined for the block reward of ${config.blockreward} and earned ${config.storedfees} in TX fees.`);
    } else {
        return message.channel.send(`The maximum amount of ${config.ticker} that will ever exist has been reached.`);
    }
};
