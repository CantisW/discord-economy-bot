import { MessageEmbed } from "discord.js";

import config from "../data/config.json" assert { type: "json" };
import { getSupply, parseDecimals, getConfig } from "../util/economy-blockchain.js";
const { coinName, ticker, maxsupply, blockreward, currency } = config;

export const name = "info";
export const description = `Get info about ${ticker}`;

export const execute = (message,args) => {
	message.channel.send({ embeds: [getInfo()] });
};

const getInfo = () => {
	let config = getConfig();

	let exchangerate = config.exchangerate;
	let txfee = config.txfee;
	let supply = getSupply();
	let marketcap = parseDecimals(supply*exchangerate);
	let places = config.decimals;

    const infoEmbed = new MessageEmbed()
		.setColor('0xf1c40f')
		.setTitle(`${coinName} (${ticker})`)
		//.setURL('')s
		//.setAuthor('Santeeisweird9')
		.setDescription(`Exchange and transfer ${coinName}!`)
		//.setThumbnail('')
		.addFields(
			{ name: 'Max Supply', value: `${maxsupply}` },
			{ name: 'Exchange Rate', value: `1 ${ticker} for ${exchangerate} ${currency}.\n1 ${currency} for ${parseDecimals(1/exchangerate)} ${ticker}.` },
			{ name: 'Current Supply', value: `${supply}`, inline: true },
			{ name: 'Block Reward', value: `${blockreward}`, inline: true },
			{ name: 'Amount Mined', value: `${parseDecimals((supply/maxsupply) * (10**places), 4)}% of max supply`},
  	 		{ name: 'Market Cap', value: `${marketcap} ${currency}`},
  		  	{ name: 'Fully Diluted Market Cap', value: `${parseDecimals(exchangerate*maxsupply)} ${currency}`},
   			{ name: 'Transaction (TX) Fee', value: `${txfee}`},
			{ name: 'Data', value: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSxUPmNczrjFQu-XTxVYGKh65KMoUc_JllrbJ1LUaBPY0NwlvBDEfHg01oZ2OQM-Eoq1aMYTmsmwFUa/pubhtml?gid=0&single=true'}
		)
		//.addField('', '', true)
		//.setImage('')
		.setTimestamp()
		.setFooter(`${coinName} (${ticker})`, ''); // TODO: set url as second arg
	return infoEmbed;
}
