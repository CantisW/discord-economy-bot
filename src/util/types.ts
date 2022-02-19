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
    prefix: string,
    token: string,
    guildId: string
}

export interface IAccount {
    address: string,
    balance: number
}