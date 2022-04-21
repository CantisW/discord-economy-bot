export const locale = "uwu";
export const localeName = "uwu (uwu)";

export const STRINGS = {
    _NO_LOCALE: (key: string) => `BUG: ${key} doesn't seem to exist.`,
    GENERIC_ERROR: "UwU uwu uwu UwU! UwU uwu uwu.",
    ACCOUNT_ALREADY_EXISTS: "UwU uwu!",
    ACCOUNT_DOES_NOT_EXIST: "UwU uwu!",
    ACCOUNT_CANNOT_CREATE: "UwU uwu uwu UwU! UwU uwu uwu.",
    ACCOUNT_CANNOT_RETRIEVE: "UwU uwu uwu!",
    BALANCE_CANNOT_RETRIEVE: "UwU uwu uwu!",
    COOLDOWN: (cooldown: number, unit: string) => `UwU uwu uwu ${cooldown / 60000} ${unit}!`,
    COOLDOWN_MINUTES: "UwU",
    COOLDOWN_SECONDS: "UwU",
    INPUT_INVALID_AMOUNT: "UwU uwu uwu!",
    SUPPLY_WILL_BE_EXCEEDED: "UwU uwu uwu!",
    TRANSACTION_AMOUNT_INVALID: "UwU uwu uwu!",
    TRANSACTION_CANNOT_TRANSFER_TO_SELF: "UwU uwu uwu!",
    TRANSACTION_CANNOT_SEND_ZERO: "UwU uwu!",
    LEADERBOARD_CANNOT_HAVE_MULTIPLE: "UwU uwu uwu uwu uwu!",
    TRANSACTION_LIST_CANNOT_HAVE_MULTIPLE: "UwU uwu uwu uwu uwu!",
    TRANSACTION_VIEW_CANNOT_RETRIEVE: "UwU uwu uwu.",
    LOCALE_DOES_NOT_EXIST: "UwU uwu uwu!",

    ACCOUNT_CREATED: "UwU uwu uwu! Nya~",
    ACCOUNT_RETURN_BALANCE: (calculated: string) => `UwU uwu uwu ${calculated}.`,
    ACCOUNT_RETURN_BALANCE_OTHER_USER: (parsed: string, calculated: any) => `${parsed} uwu ${calculated}.`,
    CONVERT_AMOUNT_IS: (amount: string, calculated: string) => `${amount} uwu ${calculated}.`,
    INFO_DESC: (coinName: string) => `UwU uwu ${coinName}!`,
    INFO_MAX_SUPPLY_LABEL: "UwU",
    INFO_EXCHANGE_RATE_LABEL: "UwU",
    INFO_EXCHANGE_RATE_VALUE: (ticker: string, exchangeRate: string, currency: string, calculatedExchange: string) =>
        `1 ${ticker} uwu ${exchangeRate} ${currency}.\n1 ${currency} uwu ${calculatedExchange}`,
    INFO_CURRENT_SUPPLY_LABEL: "UwU",
    INFO_BLOCK_REWARD_LABEL: "UwU",
    INFO_AMOUNT_MINED_LABEL: "UwU",
    INFO_AMOUNT_MINED_VALUE: (amountMined: number) => `${amountMined}% uwu uwu`,
    INFO_MARKET_CAP_LABEL: "UwU",
    INFO_FULLY_DILUTED_MARKET_CAP_LABEL: "UwU",
    INFO_TX_FEE_LABEL: "UwU (nya~) UwU",
    INFO_DATA_LABEL: "UwU",
    LEADERBOARD_TITLE: "UwU",
    LEADERBOARD_DESC: "UwU UwU (UwU 1-10)",
    LEADERBOARD_DESC_FORWARD: (index: number, to: number) => `UwU UwU (uwu ${index + 2}-${to + 1})`,
    LEADERBOARD_DESC_BACK: (to: number) => `UwU UwU (uwu ${to + 1}-${to + 10})`,
    LEADERBOARD_VALUE: (value: string) => `${value} uwu uwu.`,
    TRANSACTION_LIST_TITLE: "UwU",
    TRANSACTION_LIST_DESC: "UwU UwU (uwu 1-10)",
    TRANSACTION_LIST_DESC_FORWARD: (index: number, to: number) => `UwU UwU (uwu ${index + 2}-${to + 1})`,
    TRANSACTION_LIST_DESC_BACK: (to: number) => `UwU UwU (uwu ${to + 1}-${to + 10})`,
    TRANSACTION_VIEW_TITLE: (txid: string) => `UwU ${txid}`,
    TRANSACTION_VIEW_DESC: "UwU uwu.",
    TRANSACTION_VIEW_INDEX_LABEL: "UwU",
    TRANSACTION_VIEW_SENDER_LABEL: "UwU",
    TRANSACTION_VIEW_RECIPIENT_LABEL: "UwU",
    TRANSACTION_VIEW_AMOUNT_SENT_LABEL: "UwU Sent",
    TRANSACTION_VIEW_TIMESTAMP_LABEL: "UwU",
    TRANSACTION_VIEW_TX_FEE_LABEL: "Nya~ UwU",
    TRANSACTION_VIEW_PREV_HASH_LABEL: "UwU",
    TRANSACTION_SUCCESS: "UwU uwu!",
    SUCCESSFULLY_MINED: (blockReward: number, ticker: string, parsedFees: number) =>
        `UwU uwu uwu uwu uwu uwu ${blockReward} ${ticker} uwu ${parsedFees} uwu Nya~ uwu.`,
    LOCALE_CHANGED: "UwU uwu uwu uwu!",
    CURRENT_LOCALE: (localeName: string, locale: string) => `UwU uwu uwu uwu uwu ${localeName} (${locale}).`,
};
