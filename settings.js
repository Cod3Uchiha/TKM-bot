require("./all/module.js")

//========== Setting Owner ==========//
global.owner = "263775571820"
global.namaowner = "TKM-mods"
global.namaowner2 = "TKM-mods"

//======== Setting Bot & Link ========//
global.namabot = "𝚃𝙺𝙼-𝚋𝚘𝚝" 
global.namabot2 = "𝚃𝙺𝙼-𝚋𝚘𝚝"
global.version = "v3"
global.foother = "Created By TKM-mods"
global.linkgc = 'https://youtube.com/@TKM-mods'
global.linksaluran = "https://youtube.com/@TKM-mods"
global.linkyt = 'https://youtube.com/@TKM-mods'
global.linktele = "https://t.me/tkm_mods"
global.packname = "Created By TKM-mods"
global.author = "TKM-mods"

//========== Setting Event ==========//
global.welcome = true
global.autoread = false
global.anticall = false
global.autoreadsw = false
global.owneroff = false
global.antibug = true


//========= Setting Message =========//
global.msg = {
    "error": "An error has occurred",
    "done": "Done, Boss ✅", 
    "wait": "The bot is processing, please wait a moment . . .", 
    "group": "*• Group Only* This feature is only for groups!", 
    "private": "*• Private Chat* This feature is only for private chats!", 
    "admin": "*• Admin Only* This feature is only for group admins!", 
    "adminbot": "*• Bot Admin* This feature can be used when the bot is an admin", 
    "owner": "*• Owner Only* This feature is only for the bot owner!", 
    "developer": "*• Developer Only* This feature is only for developers"
}


let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
	console.log(chalk.redBright(`Update ${__filename}`))
	delete require.cache[file]
	require(file)
})
