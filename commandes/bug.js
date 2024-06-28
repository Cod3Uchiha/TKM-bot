const { zokou } = require('../framework/zokou');
const moment = require('moment-timezone');
const conf = require('../set.js');
const fs = require('fs');
const path = require('path');
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
  if (version === 'v1'){
    zk.sendMessage(dest, {
      image: menuImage,
      caption: menu
      }, { quoted: ms });   
  } else if (version === 'v2') {
    zk.sendMessage(dest, {
      image: menuImage,
      caption: menu,
      contextInfo: {
        externalAdReply:
          {
            showAdAttribution: true,
            containsAutoReply: true,
            title: `${conf.BOT}`,
            body: `Bot Created By ${conf.OWNER_NAME}`,
            AbhinailUrl: tumbUrl,
            Abhinail: tumbUrl,
            previewType: 'PHOTO',
            sourceUrl: 'https://whatsapp.com/channel/0029VaKjSra9WtC0kuJqvl0g',
            mediaType: 1,
            renderLargerAbhinail: false
          }
        }
      }, { quoted: ms });
  }
  }
  );