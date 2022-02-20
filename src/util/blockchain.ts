import { createQueryBuilder } from "typeorm";
import { Account } from "../entity/Account.js";
import { getConfig } from "./bot.js";
import { ERRORS } from "./errors.js";

const { decimals, blockReward, maxSupply } = getConfig();

export const parseDecimals = (num: number, places = decimals) => {
    if ( decimals === 0 ) return num;
    return Math.round( num * (10 ** places) ) / (10 ** places) // mult by places then round to cut off excess, then go back to decimal
}

export const getSupply = async (): Promise<number> => {
    let { sum } = await Account.createQueryBuilder("account").select('SUM(account.balance)', 'sum').getRawOne();
    sum = parseFloat(sum);
    return sum;
}

export const mine = (id: string): Promise<boolean> => {
    return new Promise(async (resolve, reject) => {
        let user = await Account.findOne({ address: id });
        let supply = await getSupply();
        if (!user) return reject(ERRORS.ACCOUNT_DOES_NOT_EXIST);
        if (parseDecimals((supply + blockReward)) > maxSupply) return reject(ERRORS.SUPPLY_WILL_BE_EXCEEDED);
        try {
            user.balance = parseDecimals(user.balance + blockReward);
            user.save();
        } catch (err) {
            console.log(err);
            reject(ERRORS.GENERIC_ERROR);
        }
        resolve(true);
    })
}