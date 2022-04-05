# Discord Economy Bot

A cryptocurrency-styled bot that you can change to your liking for Minecraft servers (or any game/usage).

# To Use

* Clone this repository (`git clone https://github.com/CantisW/discord-economy-bot`)
* Open Visual Studio Code or similar and open a terminal
* Download PostgreSQL and set it up. Optionally, download a DB management service such as [DBeaver](https://dbeaver.io/download/).
* Put your username and password into `ormconfig.json.default` then rename it to `ormconfig.json`. Everything else is already set up.
* Type in `npm i` and wait for dependencies to install
* Type in `npm start`

Enjoy! Make sure it is set up and you have node.js (`v16.14.0` or higher).

# Features

* Fairly simple to set up system
* Slash commands
* Simple economy commands
* Leaderboards and "blockchain"-like transaction logging
* Localization
* API support

# Settings

ALl bot settings are located in `src/data`.

`bot.json` handles all bot-specific settings. Here is where you'll input your [token](https://discord.com/developers/applications) and [guild id]().
'settings.json' handles the settings for your currency. Put in a [name](), [max supply](), etc.