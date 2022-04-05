import { Account } from "../entity/Account.js";
import { sanitizeId } from "./bot.js";
import { IAccount } from "./types.js";
import fs from "fs";
import path from "path";

const localesPath = "./src/locale"

export const createAccount = (id: string): Promise<boolean> => {
    return new Promise(async (resolve, reject) => {
        let obj: IAccount = { address: sanitizeId(id), balance: 0 };
        try {
            await Account.create(obj).save();
            resolve(true);
        } catch (err) {
            console.log(err);
            reject(await lang(`ACCOUNT_CANNOT_CREATE`, id));
        }
    });
};

export const checkIfAccountExists = async (id: string) => {
    const user = await Account.findOne({ address: id });
    if (user) return true;
};

export const getAccountBalance = async (id: string) => {
    const user = await Account.findOne({ address: id });
    if (user) return user.balance;
};

export const returnOrderedUsers = async () => {
    const user = await Account.createQueryBuilder("account")
        .select("*")
        .where("account.balance > 0")
        .orderBy("account.balance", "DESC")
        .getRawMany();
    return user;
};

export const getLocale = async (id: string) => {
    let locale = "en-US"

    const user = await Account.findOne({ address: id });
    if (user) locale = user.locale;

    const localeFile = fs.readdirSync(localesPath).filter(file => path.parse(file).base === `${locale}.ts`).join();
    const file = await import(`../locale/${localeFile}`);
    return { "localeKey": file.locale, "localeName": file.localeName };
}

export const getAllLocales = async () => {
    let object = [];
    const files = fs.readdirSync(localesPath).filter(file => file.endsWith(".ts"));

    for (const file in files) {
        const localeFile = await import(`../locale/${files[file]}`);
        object.push({ "localeKey": localeFile.locale, "localeName": localeFile.localeName })
    }
    return object;
}

export const changeLocale = async (id: string, locale: string) => {
    return new Promise(async (resolve, reject) => {
        const locales = fs.readdirSync(localesPath);
        let localeFile = locale + ".ts";

        const user = await Account.findOne({ address: id });
        if (!user) return reject(await lang(`ACCOUNT_DOES_NOT_EXIST`, id));

        let found = false;
        if (user) {
            locales.forEach((v) => {
                if (v === localeFile) found = true;
            })
            if (found) {
                user.locale = locale;
                user.save();
                resolve(true);
            } else {
                reject(await lang(`LOCALE_DOES_NOT_EXIST`, id));
            }
        }
    })
}

export const lang = async (string: string, id: string, params?: any[]) => {
    let locale = "en-US"

    const user = await Account.findOne({ address: id });
    if (user) locale = user.locale;

    const localeFile = fs.readdirSync(localesPath).filter(file => path.parse(file).base === `${locale}.ts`).join();
    const file = await import(`../locale/${localeFile}`);

    if (typeof file.STRINGS[string] === "undefined") return file.STRINGS._NO_LOCALE(string);

    if (params) {
        let length = params.length;
        // behold your eyes for some tf2 spaghetti
        switch (length) {
            case 1:
                return file.STRINGS[string].call(this, params[0]);
            case 2:
                return file.STRINGS[string].call(this, params[0], params[1]);
            case 3:
                return file.STRINGS[string].call(this, params[0], params[1], params[2]);
            case 4:
                return file.STRINGS[string].call(this, params[0], params[1], params[2], params[3]);
        }
    }
    return file.STRINGS[string];
}