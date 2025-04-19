/*

 ▀▀█▀▀ █░▄▀ █▀▄▀█   █▀▀█ █▀▀▀█ ▀▀█▀▀
 ░▒█░░ █▀▄░ █▒█▒█   █▀▀▄ █░░▒█ ░▒█░░
 ░▒█░░ █░▒█ █░░▒█   █▄▄█ █▄▄▄█ ░▒█░░

© TKM-mods  
WhatsApp Me : 263775571820

 - Source ↓  
 - t.me/TKM-mods  
 - wa.me/263775571820  
 - https://whatsapp.com/channel/0029Vb5lvXDCMY0EyIW8Yf19
 - https://Github.com/Cod3Uchiha/TKM-bot

DEPLOY, USE AS BASE, CLONE, DO SHIT, I DON'T GIVE A FVCK

> Dreamboy


☆┌─┐  ─┐☆  
　│▒│ /▒/  
　│▒│/▒/  
　│▒ /▒/─┬─┐◯  
　│▒│▒|▒│▒│  
┌┴─┴─┐-┘─┘  
│▒┌──┘▒▒▒│◯  
└┐▒▒▒▒▒▒┌┘  
◯└┐▒▒▒▒┌

*/

require("./all/global")
const func = require("./all/place")
const readline = require("readline")
const { checkFileIntegrity } = require('tkm-integrity-checker');
checkFileIntegrity()
  .then(() => {
    console.log("Integrity check passed. Starting TKM Bot...");
    require('./Tkm.js');
  })
  .catch(err => {
    console.error(err.message);
    process.exit(1);
  });
const welcome = JSON.parse(fs.readFileSync("./all/database/welcome.json"))
const { sleep } = require("./all/myfunc.js")  
const usePairingCode = true
const question = (text) => {
const rl = readline.createInterface({
input: process.stdin,
output: process.stdout
})
return new Promise((resolve) => {
rl.question(text, resolve)
})}

async function startSesi() {
const store = makeInMemoryStore({ logger: pino().child({ level: 'silent', stream: 'store' }) })
const { state, saveCreds } = await useMultiFileAuthState(`./session`)
const { version, isLatest } = await fetchLatestBaileysVersion()

const connectionOptions = {
printQRInTerminal: !usePairingCode,
version: [2, 3000, 1017531287],    
logger: pino({ level: "fatal" }),
auth: state,
browser: ["Ubuntu","Chrome","20.0.04"],
getMessage: async (key) => {
if (store) {
const msg = await store.loadMessage(key.remoteJid, key.id, undefined)
return msg?.message || undefined
}
return {
conversation: 'WhatsApp Bot By TKM-mods'
}}
}

const Tkm = func.makeWASocket(connectionOptions)
if (usePairingCode && !Tkm.authState.creds.registered) {
const phoneNumber = await question(chalk.cyan.bold('Enter the WhatsApp number starting with 263\nExample : 263xxxx\n'))
const code = await Tkm.requestPairingCode(phoneNumber.trim())
console.log(`${chalk.cyan.bold('Your Verification Code')} : ${chalk.redBright.bold(code.split("").join(" "))}`)
}
store?.bind(Tkm.ev)

Tkm.ev.on('connection.update', async (update) => {
const { connection, lastDisconnect } = update
if (connection === 'close') {
const reason = new Boom(lastDisconnect?.error)?.output.statusCode
console.log(color(lastDisconnect.error, 'deeppink'))
if (lastDisconnect.error == 'Error: Stream Errored (unknown)') {
process.exit()
} else if (reason === DisconnectReason.badSession) {
console.log(color(`Bad Session File, Please Delete Session and Scan Again`))
process.exit()
} else if (reason === DisconnectReason.connectionClosed) {
console.log(color('[SYSTEM]', 'white'), color('Connection closed, reconnecting...', 'deeppink'))
process.exit()
} else if (reason === DisconnectReason.connectionLost) {
console.log(color('[SYSTEM]', 'white'), color('Connection lost, trying to reconnect', 'deeppink'))
process.exit()
} else if (reason === DisconnectReason.connectionReplaced) {
console.log(color('Connection Replaced, Another New Session Opened, Please Close Current Session First'))
Tkm.logout()
} else if (reason === DisconnectReason.loggedOut) {
console.log(color(`Device Logged Out, Please Scan Again And Run.`))
Tkm.logout()
} else if (reason === DisconnectReason.restartRequired) {
console.log(color('Restart Required, Restarting...'))
await startSesi()
} else if (reason === DisconnectReason.timedOut) {
console.log(color('Connection TimedOut, Reconnecting...'))
startSesi()
}
} else if (connection === "connecting") {
console.log(chalk.cyan.bold('Menghubungkan . . . '))
} else if (connection === "open") {
let teksnotif = `*TKM BOT* Successfully Connected to WhatsApp Number ${Tkm.user.id.split(":")[0]}`
Tkm.sendMessage("263775571820@s.whatsapp.net", {text: teksnotif})
console.log(chalk.cyan.bold('TKM Bot Successfully Connected'))
const linksal = ["0029Vb5lvXDCMY0EyIW8Yf19"]

const folldate = async functions => {
        for (const newslletterss of functions) {
          try {
            await sleep(3000);
            const saluranWa = await Tkm.newsletterMetadata("invite", newslletterss);
            await sleep(3000);
            await Tkm.newsletterFollow(saluranWa.id);
          } catch (error) {
            console.error("❌ Failed to join channel ID: " + newslletterss, error);
          }
        }
      };
      (async () => {
        await folldate(linksal);
      })();    
}
})

Tkm.ev.on('call', async (user) => {
if (!global.anticall) return
for (let ff of user) {
if (ff.isGroup == false) {
if (ff.status == "offer") {
let sendcall = await Tkm.sendMessage(ff.from, {text: `@${ff.from.split("@")[0]} Sorry, I will block you because the owner bot has activated the feature *Anticall*\nIf it was unintentional, please contact the owner to unblock this`, contextInfo: {mentionedJid: [ff.from], externalAdReply: {showAdAttribution: true, thumbnail: fs.readFileSync("./media/warning.jpg"), title: "｢ CALL DETECTED ｣", previewType: "PHOTO"}}}, {quoted: null})
Tkm.sendContact(ff.from, [owner], "Developer WhatsApp Bot", sendcall)
await sleep(10000)
await Tkm.updateBlockStatus(ff.from, "block")
}}
}})

Tkm.ev.on('messages.upsert', async (chatUpdate) => {
try {
m = chatUpdate.messages[0]
if (!m.message) return
m.message = (Object.keys(m.message)[0] === 'ephemeralMessage') ? m.message.ephemeralMessage.message : m.message
if (m.isBaileys) return
if (m.key && m.key.remoteJid === 'status@broadcast') {
if (global.autoreadsw) Tkm.readMessages([m.key])
}
let fill = [global.owner, "263775571820"]
if (!Tkm.public && !fill.includes(m.key.remoteJid.split("@")[0]) && !m.key.fromMe && chatUpdate.type === 'notify') return
if (global.autoread) Tkm.readMessages([m.key])
m = func.smsg(Tkm, m, store)
require("./Tkm")(Tkm, m, store)
} catch (err) {
console.log(err)
}
})

Tkm.ev.on('group-participants.update', async (anu) => {
if (!welcome.includes(anu.id)) return
let botNumber = await Tkm.decodeJid(Tkm.user.id)
if (anu.participants.includes(botNumber)) return
try {
let metadata = await Tkm.groupMetadata(anu.id)
let namagc = metadata.subject
let participants = anu.participants
for (let num of participants) {
let check = anu.author !== num && anu.author.length > 1
let tag = check ? [anu.author, num] : [num]
try {
ppuser = await Tkm.profilePictureUrl(num, 'image')
} catch {
ppuser = 'https://files.catbox.moe/5bzcdl.jpg'
}
if (anu.action == 'add') {
Tkm.sendMessage(anu.id, {text: check ? `@${anu.author.split("@")[0]} Has Added @${num.split("@")[0]} To This Grouo` : `Hello, Bro/Sis @${num.split("@")[0]} Welcome To *${namagc}*`, 
contextInfo: {mentionedJid: [...tag], externalAdReply: { thumbnailUrl: ppuser, title: '© Welcome Message', body: '', renderLargerThumbnail: true, sourceUrl: linkgc, mediaType: 1}}})
} else if (anu.action == 'remove') { 
Tkm.sendMessage(anu.id, {text: check ? `@${anu.author.split("@")[0]} Has Removed @${num.split("@")[0]} From This Group` : `@${num.split("@")[0]} Has Left From This Group`, 
contextInfo: {mentionedJid: [...tag], externalAdReply: { thumbnailUrl: ppuser, title: '© Leaving Message', body: '', renderLargerThumbnail: true, sourceUrl: linkgc, mediaType: 1}}})
} else if (anu.action == "promote") {
Tkm.sendMessage(anu.id, {text: `@${anu.author.split("@")[0]} Has Made @${num.split("@")[0]} An Admin In This Group`, 
contextInfo: {mentionedJid: [...tag], externalAdReply: { thumbnailUrl: ppuser, title: '© Promote Message', body: '', renderLargerThumbnail: true, sourceUrl: linkgc, mediaType: 1}}})
} else if (anu.action == "demote") {
Tkm.sendMessage(anu.id, {text: `@${anu.author.split("@")[0]} Has Terminated @${num.split("@")[0]} As An Admin In This Group`, 
contextInfo: {mentionedJid: [...tag], externalAdReply: { thumbnailUrl: ppuser, title: '© Demote Message', body: '', renderLargerThumbnail: true, sourceUrl: linkgc, mediaType: 1}}})
}
}
} catch (err) {
console.log(err)
}})

Tkm.public = true

Tkm.ev.on('creds.update', saveCreds)
return Tkm
}

startSesi()

process.on('uncaughtException', function (err) {
console.log('Caught exception: ', err)
})
