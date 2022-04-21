import express from "express";
import { createConnection } from "typeorm";
import { Account } from "./entity/Account.js";
import { Transaction } from "./entity/Transaction.js";

const app = express();
const port = 3000 || process.env.PORT;

// there's probably a better way to do this than open two connections
// but this will work for now

createConnection()
    .then(() => console.log("Connected to DB!"))
    .catch((e) => console.log(e));

app.get("/", (req, res) => {
    return res.status(404).send("Valid paths: /blockchain/:txid (optional txid), /id/:id");
});

app.get("/blockchain", async (req, res) => {
    const blockchain = await Transaction.createQueryBuilder("transaction").select("*").getRawMany();
    return res.json(blockchain);
});

app.get("/blockchain/latest", async (req, res) => {
    const blockchain = await Transaction.createQueryBuilder("transaction").select("*").getRawMany();
    const length = blockchain.length;
    return res.json(blockchain[length - 1]);
});

app.get("/blockchain/:txid", async (req, res) => {
    const id = req.params.txid;

    if (req.params) {
        const selected = await Transaction.findOne({ txid: id });
        if (selected) return res.json(selected);
        return res.status(404).send(`Could not retrieve TXID: ${id}`);
    }
});

// I'll route this later on

app.get("/id", async (req, res) => {
    const users = await Account.createQueryBuilder("account").select("*").getRawMany();
    return res.json(users);
});

app.get("/id/:id", async (req, res) => {
    const id = req.params.id;

    if (req.params) {
        const selected = await Account.findOne({ address: id });
        if (selected) return res.json(selected);
        return res.status(404).send(`Could not retrieve ADDRESS: ${id}`);
    }
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}!`);
});
