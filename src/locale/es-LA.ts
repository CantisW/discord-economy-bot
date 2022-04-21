export const locale = "es-LA";
export const localeName = "Español (Latinoamérica)";
export const credits = "CantisW";

export const STRINGS = {
    _NO_LOCALE: (key: string) => `ERROR: ${key} no parece como existe o tal vez aún no está traducido.`,
    GENERIC_ERROR: "Algo extraño ha sucedido. Por favor intenta de nuevo en un ratito.",
    ACCOUNT_ALREADY_EXISTS: "¡Ya tienes una cuenta!",
    ACCOUNT_DOES_NOT_EXIST: "¡Este usuario no tiene una cuenta!",
    ACCOUNT_CANNOT_CREATE: "No se puede crear tu cuenta. Por favor intenta de nuevo en un ratito.",
    ACCOUNT_CANNOT_RETRIEVE: "¡Esta cuente no existe!",
    BALANCE_CANNOT_RETRIEVE: "No hay nada que mostrar.",
    COOLDOWN: (cooldown: number, unit: string) => `Por favor intenta de nuevo en ${cooldown / 60000} ${unit}!`,
    COOLDOWN_MINUTES: "minutos",
    COOLDOWN_SECONDS: "segundos",
    INPUT_INVALID_AMOUNT: "¡Por favor, entra una cantidad válido!",
    SUPPLY_WILL_BE_EXCEEDED: "¡El suministro máximo ha sido alcanzado!",
    TRANSACTION_AMOUNT_INVALID: "¡No tienes suficiente moneda!",
    TRANSACTION_CANNOT_TRANSFER_TO_SELF: "¡No se puede transferir a ti mismo!",
    TRANSACTION_CANNOT_SEND_ZERO: "¡No puedes enviar nada!",
    LEADERBOARD_CANNOT_HAVE_MULTIPLE: "No dejes abierto más de una clasificación.",
    TRANSACTION_LIST_CANNOT_HAVE_MULTIPLE: "No dejes abierto más de una lista de transacciones.",
    TRANSACTION_VIEW_CANNOT_RETRIEVE: "¡Esta transacción no existe!",
    LOCALE_DOES_NOT_EXIST: "¡El idioma que has escogido no existe!",

    ACCOUNT_CREATED: "¡Hemos creado tu cuenta!",
    ACCOUNT_RETURN_BALANCE: (calculated: string) => `El saldo en tu cuenta es ${calculated}.`,
    ACCOUNT_RETURN_BALANCE_OTHER_USER: (parsed: string, calculated: any) => `${parsed} tiene ${calculated}.`,
    CONVERT_AMOUNT_IS: (amount: string, calculated: string) => `${amount} es ${calculated}.`,
    INFO_DESC: (coinName: string) => `Cambiar y transferir ${coinName}!`,
    INFO_MAX_SUPPLY_LABEL: "Suministro máximo",
    INFO_EXCHANGE_RATE_LABEL: "Tipo de cambio",
    INFO_EXCHANGE_RATE_VALUE: (ticker: string, exchangeRate: string, currency: string, calculatedExchange: string) =>
        `1 ${ticker} por ${exchangeRate} ${currency}.\n1 ${currency} por ${calculatedExchange}`,
    INFO_CURRENT_SUPPLY_LABEL: "Suminstro actual",
    INFO_BLOCK_REWARD_LABEL: "Recompensa por bloque",
    INFO_AMOUNT_MINED_LABEL: "Cantidad minado",
    INFO_AMOUNT_MINED_VALUE: (amountMined: number) => `${amountMined}% del suministro total.`,
    INFO_MARKET_CAP_LABEL: "Tapa del mercado",
    INFO_FULLY_DILUTED_MARKET_CAP_LABEL: "Tapa del mercado completamente diluida",
    INFO_TX_FEE_LABEL: "Tarifa de transacción (TX)",
    INFO_DATA_LABEL: "Datos",
    LEADERBOARD_TITLE: "Clasificación",
    LEADERBOARD_DESC: "La lista mundial de los ricos (monstrando 1-10)",
    LEADERBOARD_DESC_FORWARD: (index: number, to: number) =>
        `La lista mundial de los ricos (monstrando ${index + 2}-${to + 1})`,
    LEADERBOARD_DESC_BACK: (to: number) => `La lista mundial de los ricos (monstrando ${to + 1}-${to + 10})`,
    LEADERBOARD_VALUE: (value: string) => `${value} del suministro total.`,
    LOCALES_LIST_TITLE: "Idiomas regionales",
    LOCALES_LIST_DESC: "Lista de idiomas",
    TRANSACTION_LIST_TITLE: "Lista de transacciones",
    TRANSACTION_LIST_DESC: "Lista de transacciones recientes (mostrando 1-10)",
    TRANSACTION_LIST_DESC_FORWARD: (index: number, to: number) =>
        `Lista de transacciones recientes (mostrando ${index + 2}-${to + 1})`,
    TRANSACTION_LIST_DESC_BACK: (to: number) => `Lista de transacciones recientes (mostrando ${to + 1}-${to + 10})`,
    TRANSACTION_VIEW_TITLE: (txid: string) => `Mostrando ${txid}`,
    TRANSACTION_VIEW_DESC: "Ver una transacción.",
    TRANSACTION_VIEW_INDEX_LABEL: "Índice",
    TRANSACTION_VIEW_SENDER_LABEL: "Remitente",
    TRANSACTION_VIEW_RECIPIENT_LABEL: "Destinatario",
    TRANSACTION_VIEW_AMOUNT_SENT_LABEL: "Cantidad enviado",
    TRANSACTION_VIEW_TIMESTAMP_LABEL: "Marca de tiempo",
    TRANSACTION_VIEW_TX_FEE_LABEL: "Tarifa de transacción",
    TRANSACTION_VIEW_PREV_HASH_LABEL: "Hash anterior",
    TRANSACTION_SUCCESS: "¡Transacción éxitosa!",
    SUCCESSFULLY_MINED: (blockReward: number, ticker: string, parsedFees: number) =>
        `Has minado con éxito la recompensa por bloque de ${blockReward} ${ticker} y has recibido ${parsedFees} en tarifas de transacción.`,
    LOCALE_CHANGED: "¡Has cambiado tu idioma con éxito!",
    CURRENT_LOCALE: (localeName: string, locale: string) =>
        `Tu idioma actual es ${localeName} [${locale}].\nCreado por ${credits}.`,
};
