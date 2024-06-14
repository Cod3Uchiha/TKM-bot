const { zokou } = require("../framework/zokou");
const {getAllSudoNumbers,isSudoTableNotEmpty} = require("../bdd/sudo")
const conf = require("../set");

zokou({ nomCom: "mods", categorie: "General", reaction: "💞" }, async (dest, zk, commandeOptions) => {
    const { ms , mybotpic } = commandeOptions;
    
  const thsudo = await isSudoTableNotEmpty()

  if (thsudo) {
     let msg = `*My Super-User*\n
     *Owner Number\n* :
- ✨ @${conf.NUMERO_OWNER}

------ *other sudos* -----\n`
     
 let sudos = await getAllSudoNumbers()

   for ( const sudo of sudos) {
    if (sudo) { // Vérification plus stricte pour éliminer les valeurs vides ou indéfinies
      sudonumero = sudo.replace(/[^0-9]/g, '');
      msg += `- 💼 @${sudonumero}\n`;
    } else {return}

   }   const ownerjid = conf.NUMERO_OWNER.replace(/[^0-9]/g) + "@s.whatsapp.net";
   const mentionedJid = sudos.concat([ownerjid])
   console.log(sudos);
   console.log(mentionedJid)
      zk.sendMessage(
        dest,
        {
          image : { url : mybotpic() },
          caption : msg,
          mentions : mentionedJid
        }
      )
  } else {
    const vcard =
        'BEGIN:VCARD\n' + // metadata of the contact card
        'VERSION:3.0\n' +
        'FN:' + conf.OWNER_NAME + '\n' + // full name
        'ORG:undefined;\n' + // the organization of the contact
        'TEL;type=CELL;type=VOICE;waid=' + conf.NUMERO_OWNER + ':+' + conf.NUMERO_OWNER + '\n' + // WhatsApp ID + phone number
        'END:VCARD';
    zk.sendMessage(dest, {
        contacts: {
            displayName: conf.OWNER_NAME,
            contacts: [{ vcard }],
        },
    },{quoted:ms});
  }
});

zokou({ nomCom: "dev", categorie: "General", reaction: "⛑️" }, async (dest, zk, commandeOptions) => {
    const { ms, mybotpic } = commandeOptions;

    const devs = [
      { nom: "Cod3Uchiha-TKM", numero: "263775571820" }, 
      { nom: "TAKUDZWA-TKM", numero: "263785028126" }, 
      // Ajoute d'autres développeurs ici avec leur nom et numéro
    ];

    let message = "HELLO👋!,WELCOME TO TKM bot HELP CENTER,ASK FOR HELP FROM THE DEVELOPER:\n\n";
    for (const dev of devs) {
      message += `----------------\n⬡ ${dev.nom} : https://wa.me/${dev.numero}\n`;
    }
  var lien = mybotpic()
    if (lien.match(/\.(mp4|gif)$/i)) {
    try {
        zk.sendMessage(dest, { video: { url: lien }, caption:message }, { quoted: ms });
    }
    catch (e) {
        console.log("🥵🥵 Menu erreur " + e);
        repondre("🥵🥵 Menu erreur " + e);
    }
} 
// Vérification pour .jpeg ou .png
else if (lien.match(/\.(jpeg|png|jpg)$/i)) {
    try {
        zk.sendMessage(dest, { image: { url: lien }, caption:message }, { quoted: ms });
    }
    catch (e) {
        console.log("🥵🥵 Menu erreur " + e);
        repondre("🥵🥵 Menu erreur " + e);
    }
} 
else {
    repondre(lien)
    repondre("link error");
    
}
});

zokou({ nomCom: "support", categorie: "General" }, async (dest, zk, commandeOptions) => {
  const { ms, repondre, auteurMessage, } = commandeOptions; 
 
  repondre("THANK YOU FOR CHOOSING TKM bot, Support me \n\n ⬡ Join my whatsapp channel ⬡ \n\n⬡⁠[https://whatsapp.com/channel/0029VaKjSra9WtC0kuJqvl0g] ⁠\n\n ⬡YOUTUBE LINK IS HERE ⬡\n\n❒⁠⁠⁠⁠[https://www.youtube.com/@Cod3Uchiha] \n\n\n⬡𝙿𝚘𝚠𝚎𝚛𝚎𝚍 𝚋𝚢 © Cod3Uchiha-TKM") 
  await zk.sendMessage(auteurMessage,{text : `THANK YOU FOR CHOOSING TKM bot, Support me \n\n ⬡ Join my whatsapp channel ⬡ \n\n⬡⁠[https://whatsapp.com/channel/0029VaKjSra9WtC0kuJqvl0g] ⁠\n\n ⬡YOUTUBE LINK IS HERE ⬡\n\n❒⁠⁠⁠⁠[https://www.youtube.com/@Cod3Uchiha] \n\n\n⬡𝙿𝚘𝚠𝚎𝚛𝚎𝚍 𝚋𝚢 © Cod3Uchiha-TKM`},{quoted :ms})

})
