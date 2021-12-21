# Discord Economy Bot

A cryptocurrency-styled bot that you can change to your liking for Minecraft servers (or any similar game).

index.js contains all of the main code. You do not need to change anything in here.

user-data.json contains all user data. Don't touch this unless you like to manually adjust balances.

config.json is where you set up the coin data for your currency.

blockchain.json is just the blockchain data. If you want to "disable" this, then erase everything in addToBlockchain() in data/economy-blockchain.js and force it to return true.

bot-settings.json are bot settings. Put your prefix, bot token, and custom status here.

app.js is the API app. (Scroll down for more info)

# To Use

* Open Visual Studio Code or similar.
* Open terminal.
* Type in "node --experimental-modules --experimental-json-modules ." on index.js without quotes.
* 
Optionally, you can go into package.json and replace "start" under "scripts" with `node --experimental-modules --experimental-json-modules .`
This allows you to type in "npm start" instead of the longer version above.

Enjoy! Make sure it is set up and you have node.js and @guildedjs/guilded.js (v1.1.5 or higher).

# API Setup

To use the API (if you need to access blockchain or user data via HTTP), you need to install Express and Concurrently. **Please make sure you have a package! If you don't, make a package.json first using `npm init`!**
Open terminal and type in:

`npm install express --save`
then
`npm install concurrently --save`

In your newly created package.json, replace "dev" under "scripts" with the following:

`"dev": "concurrently \"node --experimental-modules --experimental-json-modules .\" \"node server.js" `

Now you can start both your API and bot using `npm start dev`.
Don't forget to forward to port 3000 (or whatever you set it to in the server.js).

Enjoy!
