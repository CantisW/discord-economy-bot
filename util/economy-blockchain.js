import config from "../data/config.json";
import fs from "fs";
import crypto from "crypto"

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
// Purpose: Mine currency
//---------------------------------------------------------------
export const mine = (id) => {
    let users = getUsers();
    let config = getConfig();

    let blockreward = config.blockreward;

    let count = Object.keys(users.accounts).length;

    if(getSupply() > config.maxsupply || getSupply() + blockreward > config.maxsupply) {
        return false;
    }

    for (let i = 0; i<count; i++){
        if (users.accounts[i].userid == id){
            let txfees = config.storedfees;
            let bal = users.accounts[i].balance;

            // WHY DOESN'T THIS SHIT WORKRKKRKR????!??!
            // nevermind I stupidly tried to write to "bal" and "txfees"
            // which is a number, NOT the actual value I need to change

            users.accounts[i].balance = parseDecimals(bal + blockreward + txfees);
            config.storedfees = 0;
            // write to json
            fs.writeFile("./data/user-data.json", JSON.stringify(users, null, 2), (err) => {
                if (err) console.log(err);
            });
            fs.writeFile("./data/config.json", JSON.stringify(config, null, 2), (err) => {
                if (err) console.log(err);
            });
            return true;
        }
    }
    return false;
}

//---------------------------------------------------------------
// Purpose: Add transaction to the blockchain
//---------------------------------------------------------------
export const addToBlockchain = (txid, sender, recepient, amount, timestamp, fee) => {
    let blockchain = getBlockchain();
    let length = Object.keys(blockchain.transactions).length;
    let prev = "0";

    if(!(typeof blockchain.transactions[length-1] == "undefined")){ // genesis block check
        prev = blockchain.transactions[length-1].txid
    }
    let obj = {"index":length+1,"txid":txid,"sender":sender,"recepient":recepient,"amount":amount,"timestamp":timestamp,"fee":fee,"previousHash":prev}
    blockchain.transactions.push(obj)
    fs.writeFile("./data/blockchain.json", JSON.stringify(blockchain, null, 2), (err) => {
        if (err) console.log(err)
    });
}

//---------------------------------------------------------------
// Purpose: Convert argument to have defined decimal places
//---------------------------------------------------------------
export const parseDecimals = (int) => {
    if (decimals == 0) return int;
    return Math.round(int * (10**decimals)) / (10**decimals)
}

//---------------------------------------------------------------
// Purpose: Remove characters from mentions (@someone)
//---------------------------------------------------------------
export const sanitizeId = (id) => {
    return id.replace(/[\\<>@#&!]/g, "");
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

//---------------------------------------------------------------
// Purpose: Parse blockchain data JSON
//---------------------------------------------------------------
export const getBlockchain = () => {
    let blockchainjson = fs.readFileSync("./data/blockchain.json","utf-8");
    let x = JSON.parse(blockchainjson);
    return x;
}

//---------------------------------------------------------------
// Purpose: Hash a timestamp
//---------------------------------------------------------------
export const hash = (timestamp) => {
    let nonce = Math.random() * 99999999
    return crypto.createHash('md5').update(`${timestamp*nonce}`).digest("hex");
}