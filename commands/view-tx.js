import Discord from "discord.js";
import { getBlockchain } from "../util/economy-blockchain.js";
import config from "../data/config.json";
import settings from "../data/bot-settings.json"
const { coinName, ticker } = config;
const { prefix } = settings;

export const name = "view-tx";
export const description = "View a transaction via the TXID.";
export const aliases = ["view"];

export const execute = (message,args) => {
    if(!args.length){
        message.reply("please provide a TXID!")
    }
    message.channel.send(viewTx(args[0]))
};

const viewTx = (txid) => {
    let block = getBlockchain();

    let count = block.transactions.length

    for (let i = 0; i < count; i++) {
      if (block.transactions[i].txid == txid) {
        return viewTxInitalize(block.transactions[i].index, txid, block.transactions[i].sender, block.transactions[i].recepient, block.transactions[i].amount, block.transactions[i].timestamp, block.transactions[i].fee, block.transactions[i].previousHash);;
        }
    }
}

const viewTxInitalize = (index, txid, sender, recepient, amount, timestamp, fee, previousHash) => {
    const txInfo = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle(`${coinName} (${ticker})`)
        //.setURL('')
        //.setAuthor('Santeeisweird9')
        .setDescription(`PREFIX: ${prefix}`)
        //.setThumbnail('')
        .addFields(
            { name: 'Index:', value: `${index}` },
            { name: 'TXID:', value: `${txid}` },
            { name: 'Sender:', value: `${sender}` },
            { name: 'Recepient:', value: `${recepient}` },
            { name: 'Amount Sent:', value: `${amount} ${ticker}` },
            { name: 'Timestamp', value: `${timestamp}` },
            { name: 'TX Fee', value: `${fee} ${ticker}` },
            { name: 'Previous Hash:', value: `${previousHash}` },
        )
        //.addField('', '', true)
        //.setImage('')
        .setTimestamp()
        .setFooter(`${name} (${ticker})`, ''); // TODO: set url as second arg
    return txInfo;
}