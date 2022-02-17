import fs from "fs";
import { getUsers } from "./bot.js";
import { IAccount } from "./types.js";

export const createAccount = (id: string) => {
    let users = getUsers();
    let obj: IAccount = {"address":id,"balance":0};

    users.accounts.push(obj);

    fs.writeFile('./src/data/accounts.json', JSON.stringify(users, null, 2), (err) => {
        if (err) console.log(err);
    })
}

export const checkIfAccountExists = (id: string) => {
    let users = getUsers();
    let length = Object.keys(users.accounts).length;

    if (length == 0) return false;
    
    for (let i = 0; i<length; i++) {
        if (users.accounts[i].address = id) {
            return true;
        }
    }
    return false;
}

export const getAccountBalance = (id: string) => {
    let users = getUsers();
    let length = Object.keys(users.accounts).length;
    
    for (let i = 0; i<length; i++) {
        if (users.accounts[i].address = id) {
            return users.accounts[i].balance;
        }
    }
}