import { createAccount, checkIfAccountExists } from "../util/economy-accounts.js" 

export const name = "account";
export const description = "Create an account.";
export const aliases = ["create"]

export const execute = (message,args) => {
    if (checkIfAccountExists(message.author.id)) {
        message.channel.send("You already have an account!")
    } else {
        createAccount(message.author.id)
        message.channel.send("Your account has been created.")
    }
};