import crypto from "crypto";
import { Account } from "../entity/Account.js";
import { Transaction } from "../entity/Transaction.js";
import { getConfig, sanitizeId, WriteToConfig } from "./bot.js";
import { lang } from "./users.js";

const { decimals, blockReward, maxSupply } = getConfig();

/**
 * Sets input to a specified amount of places and checks that it is greater than 0.
 * @param num
 * @param places
 * @returns number
 */
export const parseDecimals = (num: number, places = decimals) => {
    if (decimals === 0) return num;
    if (num < 0) return 0;
    return Math.round(num * 10 ** places) / 10 ** places; // mult by places then round to cut off excess, then go back to decimal
};

export const getSupply = async (): Promise<number> => {
    let { sum } = await Account.createQueryBuilder("account").select("SUM(account.balance)", "sum").getRawOne();
    let { storedFees } = getConfig();
    sum = parseFloat(sum);
    return parseDecimals(sum + storedFees);
};

export const mine = (id: string): Promise<boolean> => {
    return new Promise(async (resolve, reject) => {
        let user = await Account.findOne({ address: id });
        let supply = await getSupply();
        let { storedFees } = getConfig();
        if (!user) return reject(await lang(`ACCOUNT_DOES_NOT_EXIST`, id));
        if (parseDecimals(supply + blockReward) > maxSupply) return reject(await lang(`SUPPLY_WILL_BE_EXCEEDED`, id));
        try {
            user.balance = parseDecimals(user.balance + blockReward + storedFees);
            user.save();
        } catch (err) {
            console.log(err);
            reject(await lang(`GENERIC_ERROR`, id));
        }
        WriteToConfig("storedFees", 0);
        resolve(true);
    });
};

export const MakeTransaction = async (sender: string, recepient: string, amount: number): Promise<boolean> => {
    let { txFee, storedFees } = getConfig();
    return new Promise(async (resolve, reject) => {
        let senderAccount = await Account.findOne({
            address: sanitizeId(sender),
        });
        let recepientAccount = await Account.findOne({
            address: sanitizeId(recepient),
        });
        if (!senderAccount) return reject(await lang(`ACCOUNT_DOES_NOT_EXIST`, sender));
        if (!recepientAccount) return reject(await lang(`ACCOUNT_CANNOT_RETRIEVE`, sender));

        let timestamp = Date.now();

        amount = parseDecimals(amount);

        if (amount === 0) return reject(await lang(`TRANSACTION_CANNOT_SEND_ZERO`, sender));
        if (amount > senderAccount.balance + txFee) return reject(await lang(`TRANSACTION_AMOUNT_INVALID`, sender));
        if (sanitizeId(sender) === sanitizeId(recepient))
            return reject(await lang(`TRANSACTION_CANNOT_TRANSFER_TO_SELF`, sender));

        senderAccount.balance = parseDecimals(senderAccount.balance - amount - txFee);
        recepientAccount.balance = parseDecimals(recepientAccount.balance + amount);

        senderAccount.save();
        recepientAccount.save();

        WriteToConfig("storedFees", storedFees + txFee);
        await AddToBlockchain(sanitizeId(sender), sanitizeId(recepient), amount, timestamp, txFee);
        resolve(true);
    });
};

export const AddToBlockchain = async (
    sender: string,
    recepient: string,
    amount: number,
    timestamp: number,
    txfee: number,
) => {
    let txid = hash(timestamp);
    let prev = "0";

    let i = await Transaction.count();
    if (i > 0) {
        let previousTransaction = await Transaction.findOne({ index: i });
        prev = previousTransaction!.txid;
    }
    try {
        await Transaction.create({
            txid: txid,
            sender: sender,
            recepient: recepient,
            amount: amount,
            txfee: txfee,
            previousHash: prev,
        }).save();
    } catch (err) {
        console.log(err);
    }
};

export const hash = (timestamp: number) => {
    let nonce = Math.random() * 99999999;
    return crypto
        .createHash("md5")
        .update(`${timestamp * nonce}`)
        .digest("hex");
};

export const returnOrderedBlockchain = async () => {
    let tx = await Transaction.createQueryBuilder("transaction")
        .select("*")
        .orderBy("transaction.timestamp", "DESC")
        .getRawMany();
    return tx;
};

export const getTransactionInfo = async (txid: string) => {
    const tx = await Transaction.findOne({ txid: txid });
    return tx;
};

export const escape = (input: String) => {
    return input.replace(/[\\$'"]/g, "\\$&");
}