import { getConfig, parseDecimals } from "../util/economy-blockchain.js";
import config from "../data/config.json" assert { type: "json" };
const { ticker, currency } = config;

export const name = "convert";
export const description = "Convert currencies!";

export const execute = (message, args) => {
    if (!args.length) {
        message.channel.send(`Types:\n\n1. ${ticker} to ${currency}\n2. ${currency} to ${ticker}`)
    }
    if (args[0] == "1" || args[0] == "2") {
        if (args[1]) {
            let conversion = convert(args[0], args[1]);
            if (conversion != false) {
                if (args[0] == "1") {
                    message.channel.send(`${args[1]} ${ticker} is ${conversion} ${currency}.`);
                }
                else if (args[0] == "2") {
                    message.channel.send(`${args[1]} ${currency} is ${conversion} ${ticker}.`);
                }
            }
            else {
                message.channel.send("An error has occured.");
            }
        }
        else {
            message.channel.send("Please input a proper argument!")
        }
    }
};

const convert = (type, input) => {
    let config = getConfig();
    let exchangerate = config.exchangerate;
    switch (type) {
        case "1":
            let x = parseDecimals(input * exchangerate);
            return x;
        case "2":
            let y = parseDecimals(input / exchangerate);
            return y;
        default:
            return false;
    }
}