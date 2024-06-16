const util = require('util');
const fs = require('fs-extra');
const { zokou } = require(__dirname + "/../framework/zokou");
const { format } = require(__dirname + "/../framework/mesfonctions");
const os = require("os");
const moment = require("moment-timezone");
const s = require(__dirname + "/../set");

zokou({ nomCom: "menu3", categorie: "General" }, async (dest, zk, commandeOptions) => {
    let { ms, repondre ,prefixe,nomAuteurMessage,mybotpic} = commandeOptions;
    let { cm } = require(__dirname + "/../framework//zokou");
    var coms = {};
    var mode = "public";
    
    if ((s.MODE).toLocaleLowerCase() != "yes") {
        mode = "private";
    }


    

    cm.map(async (com, index) => {
        if (!coms[com.categorie])
            coms[com.categorie] = [];
        coms[com.categorie].push(com.nomCom);
    });

    moment.tz.setDefault('Etc/GMT');

// Créer une date et une heure en GMT
const temps = moment().format('HH:mm:ss');
const date = moment().format('DD/MM/YYYY');

  let infoMsg =  `
Theme : TKMbot
User : ${s.OWNER_NAME}
Prefix : ${s.PREFIXE}
Mode : ${mode}
Commands : ${cm.length}
Date : ${date}
Time : ${temps}
Ram : ${format(os.totalmem() - os.freemem())}/${format(os.totalmem())}
Platform : ${os.platform()}
Creator: Cod3Uchiha
*TKM bot*\n`;
    
let menuMsg = `
*TKM-BOT*

*_Cod3Uchiha_*
  █████████
  █▄█████▄█
  █▼▼▼▼▼
  █
  █▲▲▲▲▲
  █████████
  ██ ██  𝕿𝕶𝕸 𝖇𝖔𝖙

 *TKM bot COMMANDS* 
`;

    for (const cat in coms) {
        menuMsg += `*${cat}*`;
        for (const cmd of coms[cat]) {
            menuMsg += `
 ${cmd}`;
        }
        menuMsg += `
\n`
    }

    menuMsg += `
TKM-bot
`;

   var lien = mybotpic();

   if (lien.match(/\.(mp4|gif)$/i)) {
    try {
        zk.sendMessage(dest, { video: { url: lien }, caption:infoMsg + menuMsg, footer: "Je suis *Beltahmd*, déveloper Beltah Tech" , gifPlayback : true }, { quoted: ms });
    }
    catch (e) {
        console.log("🥵🥵 Menu erreur " + e);
        repondre("🥵🥵 Menu erreur " + e);
    }
} 
// Vérification pour .jpeg ou .png
else if (lien.match(/\.(jpeg|png|jpg)$/i)) {
    try {
        zk.sendMessage(dest, { image: { url: lien }, caption:infoMsg + menuMsg, footer: "Je suis *Beltahmd*, déveloper Beltah Tech" }, { quoted: ms });
    }
    catch (e) {
        console.log("🥵🥵 Menu erreur " + e);
        repondre("🥵🥵 Menu erreur " + e);
    }
} 
else {
    
    repondre(infoMsg + menuMsg);
    
}

});
