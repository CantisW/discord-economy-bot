# Discord Economy Bot
A cryptocurrency-styled bot that you can change to your liking for Minecraft servers (or any similar game).

index.js contains all of the main code. You probably do not need to change anything in here, except maybe the custom status/presence.

user-data.json contains all user data. Don't touch this unless you like to manually adjust balances.

data.json is where you set up the bot data.

blockchain.json is just the blockchain data. If you want to "disable" this, then erase everything in addToBlockchain() in index.js and force it to return true.

settings.json are bot settings. Put your prefix and bot token here.

server.js is the API app. (Scroll down for more info)

# To Use

* Open Visual Studio Code or similar.
* Open terminal.
* Type in "node ." on index.js without quotes.

Enjoy! Make sure it is set up and you have node.js and discord.js.

# API Setup

To use the API (if you need to access blockchain or user data via HTTP), you need to install Express and Concurrently. **PLease make a package.json first using `npm init`!**
Open terminal and type in:

`npm install express --save`
then
`npm install concurrently --save`

In your newly created package.json, replace "dev" under "scripts" with the following:

`"dev": "concurrently \"node .\" \"node server.js" `

Now you can start both your API and bot using `npm start dev`.
Don't forget to forward to port 3000 (or whatever you set it to in the server.js).

Enjoy!
