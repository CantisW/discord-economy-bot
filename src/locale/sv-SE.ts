export const locale = "sv-SE";
export const localeName = "Svenska (Sverige)";
export const credits = "d4n13ls1104";

export const STRINGS = {
    _NO_LOCALE: (key: string) => `FEL: ${key} verkar inte finnas.`,
    GENERIC_ERROR: "Något gick fel. Försök igen senare.",
    ACCOUNT_ALREADY_EXISTS: "Du har redan ett konto!",
    ACCOUNT_DOES_NOT_EXIST: "Du har inget konto!",
    ACCOUNT_CANNOT_CREATE: "Ditt konto kunde inte skapas. Försök igen senare.",
    ACCOUNT_CANNOT_RETRIEVE: "Kontot existerar inte!",
    BALANCE_CANNOT_RETRIEVE: "Det finns inget att visa.",
    COOLDOWN: (cooldown: number, unit: string) => `Försök igen om ${cooldown / 60000} ${unit}!`,
    COOLDOWN_MINUTES: "minuter",
    COOLDOWN_SECONDS: "sekunder",
    INPUT_INVALID_AMOUNT: "Ange ett giltigt belopp!",
    SUPPLY_WILL_BE_EXCEEDED: "Det maximala utbudet har uppnåtts.",
    TRANSACTION_AMOUNT_INVALID: "Du har inte tillräckligt med valuta!",
    TRANSACTION_CANNOT_TRANSFER_TO_SELF: "Du får inte överföra till dig själv!",
    TRANSACTION_CANNOT_SEND_ZERO: "Du kan inte överföra ingenting!",
};
