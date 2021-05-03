const express = require("express");
const app = express();
const port = 3000;

const fs = require('fs');


app.get("/", (req, res) => {
    res.send("Valid paths: /blockchain/TXID, /id/ID");
})

app.get("/blockchain", (req, res) => {
    let blockjson = fs.readFileSync("./blockchain.json","utf-8");
    let block = JSON.parse(blockjson);
    //let count = Object.keys(block.transactions).length;

    //let id = req.params.txid;

    res.json(block.transactions);
});

app.get("/blockchain/:txid", (req, res) => {
    let blockjson = fs.readFileSync("./blockchain.json","utf-8");
    let block = JSON.parse(blockjson);
    let count = Object.keys(block.transactions).length;

    let id = req.params.txid;

    if (req.params) {
        for (i = 0; i < count; i++){
            if (block.transactions[i].txid == id) {
                res.json(block.transactions[i]);
                return;
            }
        }
        res.send("Could not retrieve TXID "+id)
    }
});

app.get("/id/:id", (req, res) => {
    let usersjson  = fs.readFileSync("./user-data.json","utf-8");
    let users = JSON.parse(usersjson);
    let count = Object.keys(users.accounts).length;

    let id = req.params.id;

    if (req.params) {
        for (i = 0; i < count; i++){
            if (users.accounts[i].userid == id) {
                res.json(users.accounts[i]);
                return;
            }
        }
        res.send("Could not retrieve USERID "+id)
    }
    else {
        res.send("Invalid ID");
    }
});

app.listen(port, () => {
    console.log(`App is listening on port ${port}!`)
})