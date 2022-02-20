import fs from "fs";
import { Account } from "../entity/Account.js";
import { sanitizeId } from "./bot.js";
import { ERRORS } from "./errors.js";
import { IAccount } from "./types.js";

export const createAccount = (id: string): Promise<boolean> => {
    return new Promise(async (resolve, reject) => {
        let obj: IAccount = { address: sanitizeId(id), balance: 0 };
        try {
            await Account.create(obj).save();
            resolve(true);
        } catch (err) {
            console.log(err);
            reject(ERRORS.ACCOUNT_CANNOT_CREATE);
        }
    })
}

export const checkIfAccountExists = async (id: string) => {
    const user = await Account.findOne({ address: id })
    if (user) return true;
}

export const getAccountBalance = async (id: string) => {
    const user = await Account.findOne({ address: id });
    if (user) return user.balance;
}