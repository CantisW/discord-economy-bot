# Discord Economy Bot
A cryptocurrency-styled bot that you can change to your liking for Minecraft servers (or any similar game).

index.js contains all of the main code. You probably do not need to change anything in here, except maybe the custom status/presence.

user-data.json contains all user data. Don't touch this unless you like to manually adjust balances.

data.json is where you set up the bot data.

blockchain.json is just the blockchain data. If you want to "disable" this, then erase everything in addToBlockchain() in index.js and force it to return true.

settings.json are bot settings. Put your prefix and bot token here.

# To Use

Open Visual Studio Code or similar.

Open terminal.

Type in "node ." on index.js without quotes.

Enjoy! Make sure it is set up and you have node.js and discord.js.
