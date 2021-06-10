import * as accounts from "../util/economy-accounts.js" 

export const name = "account";
export const description = "Create an account.";

export const execute = (message,args) => {
    if (accounts.checkIfAccountExists(message.author.id)) {
        message.reply("you already have an account!")
    } else {
        accounts.createAccount(message.author.id)
        message.reply("your account has been created.")
    }
};