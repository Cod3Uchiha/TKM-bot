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

//==== Waktu Jeda Jpm & Pushkon ====//
global.delaypushkontak = 4500
global.delayjpm = 1000

//========== Setting Foto ===========//

//========== Setting Panell ==========//
global.egg = "15"
global.loc = "1"
global.domain = "https://"
global.apikey = "plta_"
global.capikey = "pltc_"

//========= Setting Payment =========//
//Kalo Gak Ada Isi Aja jadi false
global.dana = "085813708397"
global.gopay = "085813708397"
global.ovo = "085813708397"
global.qris = fs.readFileSync("./media/qris.jpg")

//========= Setting Payment =========// 
global.namadana = "FallZx Store"
global.namagopay = "Fall"
global.namaovo = "Fall" 
                          
//=========== Api Domain ===========//
global.zone1 = ""
global.apitoken1 = ""
global.tld1 = ""

//========== Api Domain 2 ==========//
global.zone2 = "";
global.apitoken2 = "";
global.tld2 = "";
//========== Api Domain 3 ==========//
global.zone3 = "";
global.apitoken3 = "";
global.tld3 = "";
//========== Api Domain 4 ==========//
global.zone4 = "";
global.apitoken4 = "";
global.tld4 = "";

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