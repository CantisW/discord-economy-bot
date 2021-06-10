import { createAccount, checkIfAccountExists } from "../util/economy-accounts.js" 

export const name = "account";
export const description = "Create an account.";

export const execute = (message,args) => {
    if (checkIfAccountExists(message.author.id)) {
        message.reply("you already have an account!")
    } else {
        createAccount(message.author.id)
        message.reply("your account has been created.")
    }
};