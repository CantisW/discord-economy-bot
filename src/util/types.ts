export interface IConfig {
    [key: string]: string | number,
    coinName: string,
    ticker: string,
    maxSupply: number,
    blockReward: number,
    exchangeRate: number,
    currency: string,
    decimals: number,
    txFee: number,
    storedFees: number
}

export interface ISettings {
    [key: string]: string,
    prefix: string,
    token: string,
    guildId: string
}

export interface IAccount {
    address: string,
    balance: number
}

export interface ICooldown {
    command: string,
    time: number,
    author: string
}