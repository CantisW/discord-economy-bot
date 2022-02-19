import { createQueryBuilder } from "typeorm";
import { Account } from "../entity/Account.js";
import { getConfig } from "./bot.js";

const { decimals } = getConfig();

export const parseDecimals = (num: number, places = decimals) => {
    if ( decimals === 0 ) return num;
    return Math.round(num * (10 ** places)) / (10 ** places) // mult by places then round to cut off excess, then go back to decimal
}

export const getSupply = async () => {
    let { sum } = await Account.createQueryBuilder("account").select('SUM(account.balance)', 'sum').getRawOne();
    return sum;
}