import fs from "fs";
import { getUsers } from "../util/economy-blockchain.js"

export const createAccount = (id) => {
    let users = getUsers();
    const obj = {"userid":id,"balance":0};

    users.accounts.push(obj);
    fs.writeFile("./data/user-data.json", JSON.stringify(users, null, 2), (err) => {
        if (err) console.log(err);
    });
}

export const checkIfAccountExists = (id) => {
    let users = getUsers();
    let count = Object.keys(users.accounts).length;

    for (let i = 0; i<count; i++){
        if (users.accounts[i].userid == id){
            return true;
        }
    }
    return false;
}

export const returnAccountBalance = () => {

}