import { RichEmbed } from "@guildedjs/guilded.js";
import { getBlockchain } from "../util/economy-blockchain.js";
import config from "../data/config.json";
import settings from "../data/bot-settings.json"
const { coinName, ticker } = config;
const { prefix } = settings;

export const name = "list-tx";
export const description = "Get the list of transactions.";
export const aliases = ["list"];

export const execute = (message,args) => {
    message.channel.send(listTx());
};

const listTx = () => {
    let block = getBlockchain();

    if (!block.transactions || Object.keys(block.transactions).length == 0) {
      return "There are no transactions to list!";
    }
  
    let count = Object.keys(block.transactions).length
  
    let b1 = 0;
    let b2 = 0;
    let b3 = 0;
  
    for (let i = 0; i < count; i++) {
      if (i == count-3){
        b1 = block.transactions[i].txid
      }
      if (i == count-2) {
        b2 = block.transactions[i].txid
      }
      if (i == count-1) {
        b3 = block.transactions[i].txid
      }
    }

   const transactionsList = new RichEmbed()
        .setColor('0xf1c40f')
         .setTitle(`${coinName} (${ticker})`)
         //.setURL('')
          //.setAuthor('Santeeisweird9')
         .setDescription(`PREFIX: ${prefix}`)
          //.setThumbnail('')
          .addFields(
          { name: 'Last 3 Transactions:', value: `${b3}\n${b2}\n${b1}` },
        )
        //.addField('', '', true)
        //.setImage('')
         .setTimestamp()
         .setFooter(`${coinName} (${ticker})`, ''); // TODO: set url as second arg
    return transactionsList;
}