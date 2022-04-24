export interface IConfig {
    [key: string]: string | number;
    coinName: string;
    ticker: string;
    maxSupply: number;
    blockReward: number;
    exchangeRate: number;
    currency: string;
    decimals: number;
    txFee: number;
    storedFees: number;
}

export interface ISettings {
    [key: string]: string;
    token: string;
    prefix: string;
    status: string;
    guildId: string;
    data: string;
    environment: string;
}

export interface IAccount {
    address: string;
    balance: number;
}

export interface ITransaction {
    index: number;
    txid: string;
    sender: string;
    recepient: string;
    amount: number;
    timestamp: Date;
    txfee: number;
    previousHash: string;
}

export interface ISharedArray {
    command: string;
    time: number;
    author: string;
}

export interface ILocale {
    localeKey: string;
    localeName: string;
}
