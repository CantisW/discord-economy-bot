import config from "../data/config.json";
import fs from "fs";

const { decimals } = config;

//---------------------------------------------------------------
// Purpose: Get the global supply of currency
//---------------------------------------------------------------
export const getSupply = () => {
    let users = getUsers();
    let config = getConfig();

    let count = Object.keys(users.accounts).length;
    let supply = 0;

    for(let i=0; i<count; i++) {
        supply = supply + users.accounts[i].balance;
    }
    supply = supply + config.storedfees;
    return parseDecimals(supply);
}


//---------------------------------------------------------------
// Purpose: Convert argument to have defined decimal places
//---------------------------------------------------------------
export const parseDecimals = (int) => {
    if (decimals == 0) return int;
    return Math.round(int * (10**decimals)) / (10**decimals)
}

//---------------------------------------------------------------
// Purpose: Parse user data JSON
//---------------------------------------------------------------
export const getUsers = () => {
    let usersjson = fs.readFileSync("./data/user-data.json","utf-8"); // Note: This is in relation to WORKING DIRECTORY (index.js)!
    let x = JSON.parse(usersjson);
    return x;
}

//---------------------------------------------------------------
// Purpose: Parse config data JSON
//---------------------------------------------------------------
export const getConfig = () => {
    let configjson = fs.readFileSync("./data/config.json","utf-8");
    let x = JSON.parse(configjson);
    return x;
}