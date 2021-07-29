import express from "express";
import { getUsers, getBlockchain } from "./util/economy-blockchain.js";

const app = express();
const port = 27015;


app.get("/", (req, res) => {
    res.send("Valid paths: /blockchain/TXID, /id/ID");
})

app.get("/blockchain", (req, res) => {
    let block = getBlockchain();
    //let count = Object.keys(block.transactions).length;

    //let id = req.params.txid;

    res.json(block.transactions);
});

app.get("/blockchain/latest", (req, res) => {
    let block = getBlockchain();
    let count = Object.keys(block.transactions).length;

    if (req.params) {
        return res.json(block.transactions[count-1]);
    }
    res.send("Could not retrieve TXID " + id);
});

app.get("/blockchain/:txid", (req, res) => {
    let block = getBlockchain();
    let count = Object.keys(block.transactions).length;

    let id = req.params.txid;

    if (req.params) {
        for (let i = 0; i < count; i++) {
            if (block.transactions[i].txid == id) {
                return res.json(block.transactions[i]);
            }
        }
        res.send("Could not retrieve TXID " + id)
    }
});

app.get("/id/:id", (req, res) => {
    let users = getUsers();
    let count = Object.keys(users.accounts).length;

    let id = req.params.id;

    if (req.params) {
        for (i = 0; i < count; i++) {
            if (users.accounts[i].userid == id) {
                return res.json(users.accounts[i]);
            }
        }
        res.send("Could not retrieve USERID " + id)
    }
    else {
        res.send("Invalid ID");
    }
});

app.listen(port, () => {
    console.log(`App is listening on port ${port}!`)
})