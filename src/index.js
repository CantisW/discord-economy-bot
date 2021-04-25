const Discord = require('discord.js');
const client = new Discord.Client();
const { token, prefix } = require('./settings.json');
const fs = require('fs');
var crypto = require('crypto');

const cooldown = new Set();

var { name, ticker, maxsupply, blockreward, decimals } = require("./data.json");

const time = 15 * 60000

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setPresence({
    status: "online",
    activity: {
      name: `${prefix} | The decentralized currency of Minecraft`,
      type: "PLAYING"
    }
  });
});

client.on('message', msg => {
  if (!msg.content.startsWith(prefix) || msg.author.bot) return;

  const args = msg.content.slice(prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();

  if (command === "info") { //
    newEmbed();
    msg.channel.send(infoEmbed);
  }

  else if (command === "mine") { //
    let datajson = fs.readFileSync("./data.json","utf-8");
    let data = JSON.parse(datajson);
    exists = checkIfAccountExists(msg.author.id)
    if (cooldown.has(msg.author.id)){
      msg.channel.send("Please wait 15 minutes before mining again!");
    }
    else if (exists) {
      if(mine(msg.author.id)) {
        msg.reply(`You have mined for the block reward of ${blockreward} ${ticker} plus ${data.storedfees} in TX fees.`)
      }
      else {
        msg.channel.send(`The max supply of ${ticker} that will ever exist has been reached.`)
      }
      cooldown.add(msg.author.id);
      setTimeout(() => {
        cooldown.delete(msg.author.id);
      }, time);
    }
    else {
      msg.reply("You don't seem to have an account.")
    }
  }

  else if (command === "bal") { //
    let datajson = fs.readFileSync("./data.json","utf-8");
    let data = JSON.parse(datajson);
    let exchangerate = data.exchangerate;
    let currency = data.currency;
    exists = checkIfAccountExists(msg.author.id)
    if (exists) {
      bal = returnAccountBalance(msg.author.id);
      if (!bal) { bal = 0 }
      msg.reply(`Your current balance is: ${bal} ${ticker} (${(exchangerate*bal).toFixed(decimals)} ${currency}).`);
    }
    else {
      msg.channel.send("You don't have an account!")
    }
  }

  else if (command === "account") { //
    exists = checkIfAccountExists(msg.author.id)
    console.log(exists);
    if (!exists) {
      createAccount(msg.author.id);
      msg.reply("Your account has been created!")
    }
    else {
      msg.reply("You already own an account!")
    }
  }

  else if (command === "fa") { //
    if (msg.author.id == "301770103224270851") {
      if (!args.length) {
        msg.channel.send("You need to provide a userid to use this command.")
      } else {
        exists = checkIfAccountExists(args[0])
        console.log(exists);
        if (!exists) {
          createAccount(args[0]);
          msg.reply("Your account has been created!")
        }
        else {
          msg.reply("You already own an account!")
        }
      }
    }
    else {
      msg.channel.send("Force Account (FA) is an admin only command.")
    }
  }

  else if (command === "help") { //
    msg.channel.send(helpEmbed);
  }

  else if (command === "view") { //
    let datajson = fs.readFileSync("./data.json","utf-8");
    let data = JSON.parse(datajson);
    let exchangerate = data.exchangerate;
    let currency = data.currency;
    if (!args.length){
      msg.reply("Please provide a user id!")
    }
    args[0] = args[0].replace(/[\\<>@#&!]/g, "");

    if (checkIfAccountExists(args[0])) {
      msg.channel.send("The account balance for "+args[0]+" is "+returnAccountBalance(args[0])+` ${ticker}. (${(exchangerate*returnAccountBalance(args[0])).toFixed(decimals)} ${currency})`)
    }
    else {
      msg.channel.send("That user does not exist.")
    }
  }

  else if (command === "transfer") { //
    let datajson = fs.readFileSync("./data.json","utf-8");
    let data = JSON.parse(datajson);
    let fee = data.txfee;

    let nonce = 3;
    let timestamp = new Date().getTime()
    var hash = crypto.createHash('md5').update(`${timestamp*nonce}`).digest("hex");;

    if (!args.length){
      msg.reply("Please provide a user id!")
    }
    if (checkIfAccountExists(msg.author.id)) {
      args[0] = args[0].replace(/[\\<>@#&!]/g, "");
      if (checkIfAccountExists(args[0])) {
        if (args[1]) {
          msg.channel.send("Attempting to send "+args[1]+` ${ticker} to `+args[0]+"...");
          if(transfer(msg.author.id, args[0], args[1], hash, timestamp, fee)) {
            msg.channel.send("Successfully sent "+args[1]+` ${ticker} to `+args[0]+`! TXID: ${hash} with TX fee of ${fee} ${ticker}.`);
          }
          else {
            msg.channel.send("Something went wrong...somehow.")
          }
        }
        else {
          msg.channel.send("Please specify a valid amount to transfer.")
        }
      }
      else {
        msg.channel.send("That user does not exist.");
      }
    } else {
      msg.channel.send("You need an account to do this!");
    }
  }


  else if (command == "leaderboard"){
    leaderboard();
    msg.channel.send(leaderboardEmbed);
  }
});




















function createAccount(id) {
  let usersjson = fs.readFileSync("./user-data.json","utf-8");
  let users = JSON.parse(usersjson);

  var obj = {"userid":id, "balance":0};
  users.accounts.push(obj);
  fs.writeFile("./user-data.json", JSON.stringify(users, null, 2), (err) => {
    if (err) console.log(err)
  });
}

function checkIfAccountExists(id) {
  let usersjson = fs.readFileSync("./user-data.json","utf-8");
  let users = JSON.parse(usersjson);

  var count = Object.keys(users.accounts).length;
  //var count = userdata.accounts.length;

  console.log(count+" accounts exist!");

  for (i = 0; i < count; i++) {
    try {
      if (users.accounts[i].userid === id) {
        console.log("Account exists for "+id);
        return true;
      }
    } catch (err){
      console.log(err)
      return false;
    }
    
  }
  return false;
}

function returnAccountBalance(id) {
  let usersjson = fs.readFileSync("./user-data.json","utf-8");
  let users = JSON.parse(usersjson);

  var count = Object.keys(users.accounts).length;
  //var count = userdata.accounts.length;

  console.log(count+" accounts exist!");

  for (i = 0; i < count; i++) {
    try {
      if (users.accounts[i].userid === id) {
        var bal = users.accounts[i].balance;
        console.log("Account balance for "+id+ " is "+bal);
        return bal;
      }
    } catch (err){
      console.log(err)
      return 0;
    }
  }
  return 0;
}

function mine(id) {
  let datajson = fs.readFileSync("./data.json","utf-8");
  let supply = JSON.parse(datajson);

  let usersjson = fs.readFileSync("./user-data.json","utf-8");
  let users = JSON.parse(usersjson);
  var count = Object.keys(users.accounts).length;
  if (supply.currentsupply < supply.maxsupply){
    for (i = 0; i < count; i++) {
      if (users.accounts[i].userid === id) {
        users.accounts[i].balance = users.accounts[i].balance + blockreward + supply.storedfees;
        supply.storedfees = 0;
        fs.writeFile("./data.json", JSON.stringify(supply, null, 2), (err) => {
           if (err) console.log(err)
         });
        fs.writeFile("./user-data.json", JSON.stringify(users, null, 2), (err) => {
          if (err) console.log(err)
        });
        return true;
      }
    }
  }
  else {
    return false;
  }
  
}

function transfer(id, receiver, amount, hash, timestamp, fee){
  let usersjson = fs.readFileSync("./user-data.json","utf-8");
  let users = JSON.parse(usersjson);
  var count = Object.keys(users.accounts).length;

  let datajson = fs.readFileSync("./data.json","utf-8");
  let data = JSON.parse(datajson);

  let sender = false;
  let recepient = false;
  let fee_processed = false;

  console.log(typeof amount)

  // Wish there was a way around this, but JavaScript's toFixed thing turns it into a string

  money = parseFloat(amount).toFixed(decimals)
  money = parseFloat(amount)

  if (money > maxsupply || money < 0){
    return false;
  }
  
  console.log(`A transfer has been initiated. ${id} is sending ${amount} to ${receiver}.`);
  for (i = 0; i < count; i++) {
    if (users.accounts[i].userid === id) {
      if (users.accounts[i].balance >= (money+fee)) {
        users.accounts[i].balance = users.accounts[i].balance - (money+fee);
        users.accounts[i].balance.toFixed(decimals);
        parseFloat(users.accounts[i].balance);
        console.log(money+fee + " deducted.");
        sender = true;
        console.log(`Sender now has ${users.accounts[i].balance}.`)
      }
      else {
        return false;
      }
    }
    else if (users.accounts[i].userid === receiver) {
      users.accounts[i].balance = users.accounts[i].balance + money;
      users.accounts[i].balance.toFixed(decimals);
      parseFloat(users.accounts[i].balance);
      recepient = true;
      console.log(`Recepient now has ${users.accounts[i].balance}.`)
    }
    if (sender && recepient){
      data.storedfees = data.storedfees + fee;
      fee_processed = true;
      console.log(`TX fee has been processed.`)
    }
    if (sender && recepient && fee_processed) {
      fs.writeFile("./user-data.json", JSON.stringify(users, null, 2), (err) => {
        if (err) console.log(err)
     });
      fs.writeFile("./data.json", JSON.stringify(data, null, 2), (err) => {
       if (err) console.log(err)
    });
     console.log(`Transfer completed!`)
     sender = false;
     recepient = false;
     fee_processed = false;
     addToBlockchain(id, receiver, money, hash, timestamp, fee)
     return true;
    }
  }
  return false;
}


function addToBlockchain(id, receiver, amount, hash, timestamp, fee){
  let blockchainjson = fs.readFileSync("./blockchain.json","utf-8");
  let block = JSON.parse(blockchainjson);

  var obj = {"txid":hash, "sender":id, "recepient":receiver, "amount":`${amount}`, "timestamp":`${timestamp}`, "fee":`${fee}`};
  block.transactions.push(obj);
  console.log("Blockchain updated!")
  fs.writeFile("./blockchain.json", JSON.stringify(block, null, 2), (err) => {
    if (err) console.log(err)
  });
}

function getSupply(){
  let usersjson = fs.readFileSync("./user-data.json","utf-8");
  let users = JSON.parse(usersjson);

  let datajson = fs.readFileSync("./data.json","utf-8");
  let data = JSON.parse(datajson);

  let x = 0;

  var count = Object.keys(users.accounts).length;
  //var count = userdata.accounts.length;

  for (i = 0; i < count; i++) {
    x = x + users.accounts[i].balance
  }
  return x+data.storedfees;
}








function newEmbed() {
  let datajson = fs.readFileSync("./data.json","utf-8");
  let data = JSON.parse(datajson);
  console.log("returning "+data.currentsupply);
  let supply = getSupply();
  let exchangerate = data.exchangerate;
  let currency = data.currency;
  let fee = data.txfee;

  let market_cap = (exchangerate*supply).toFixed(decimals);

  infoEmbed = new Discord.MessageEmbed()
	.setColor('#0099ff')
	.setTitle(`${name} (${ticker})`)
	//.setURL('')
	//.setAuthor('Santeeisweird9')
	.setDescription(`Exchange and transfer ${name}!`)
	//.setThumbnail('')
	.addFields(
		{ name: 'Max Supply', value: `${maxsupply}` },
		{ name: 'Exchange Rate', value: `1 ${ticker} for ${exchangerate} ${currency}.\n1 iron for ${(1/exchangerate).toFixed(decimals)} ${ticker}.` },
		{ name: 'Current Supply', value: `${supply}`, inline: true },
		{ name: 'Block Reward', value: `${blockreward}`, inline: true },
    { name: 'Market Cap', value: `${market_cap} ${currency}`},
    { name: 'Fully Diluted Market Cap', value: `${exchangerate*maxsupply} ${currency}`},
    { name: 'Transaction (TX) Fee', value: `${fee}`},
	)
	//.addField('', '', true)
	//.setImage('')
	.setTimestamp()
	.setFooter(`${name} (${ticker})`, ''); // TODO: set url as second arg
}



function leaderboard() {
  let usersjson = fs.readFileSync("./user-data.json","utf-8");
  let users = JSON.parse(usersjson);

  var count = Object.keys(users.accounts).length;

  leaderboardEmbed = new Discord.MessageEmbed()
	.setColor('#0099ff')
	.setTitle(`${name} (${ticker})`)
	//.setURL('')
	//.setAuthor('Santeeisweird9')
	.setDescription(`The rich list of ${name}!`)
	//.setThumbnail('')
	//.addField('', '', true)
	//.setImage('')
	.setTimestamp()
	.setFooter(`${name} (${ticker})`, ''); // TODO: set url as second arg

  for (i = 0; i < count; i++) {
    leaderboardEmbed.addFields({name: `${users.accounts[i].userid}`, value: `${users.accounts[i].balance} ${ticker}`})
  }
}




const helpEmbed = new Discord.MessageEmbed()
.setColor('#0099ff')
.setTitle(`${name} (${ticker})`)
//.setURL('')
//.setAuthor('Santeeisweird9')
.setDescription(`PREFIX: ${prefix}`)
//.setThumbnail('')
.addFields(
  { name: 'help', value: `Display this message.` },
  { name: 'account', value: `Create an account.` },
  { name: 'bal', value: `View your balance.`},
  { name: 'view [userid]', value: `View someone else's balance.`},
  { name: 'mine', value: `Mine some ${ticker}!`},
  { name: 'transfer [userid] [amount]', value: `Transfer some ${ticker}.`},
)
//.addField('', '', true)
//.setImage('')
.setTimestamp()
.setFooter(`${name} (${ticker})`, ''); // TODO: set url as second arg

  

  

client.login(token);
