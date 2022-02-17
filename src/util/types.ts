export interface IConfig {
    coinName: string,
    ticker: string,
    maxsupply: number,
    blockreward: number,
    exchangerate: number,
    currency: string,
    decimals: number,
    txfee: number,
    storedfees: number
}

export interface ISettings {
    prefix: string,
    token: string,
    guildId: string
}

export interface IUser {
    accounts: IAccount[];
}

export interface IAccount {
    address: string,
    balance: number
}