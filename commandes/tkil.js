const { zokou } = require("../framework/zokou");
const conf = require("../set");

const ios2 = "🌤️";
const ios1 = "𝐋𝐎𝐑𝐃𒆜𝐓𝐊𝐌";
const ngazap = "𝐬𝐚𝐲𝐬 🖕😎🖕 🔥";
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

zokou(
  {
    nomCom: "tkill",
    categorie: "Mods",
    reaction: "😈",
  },
  async (dest, zk, commandeOptions) => {
    const { ms, arg, repondre, superUser } = commandeOptions;
    const limit = conf.TKILL_MESSAGE_LIMIT;

    if (!superUser) {
      repondre("You are not authorized to use this command!!!");
      return;
    } else {
      for (let i = 0; i < limit; i++) {
        attention(`${ios2}${ios1}${ngazap}`);
        await sleep(1000);
      }
      repondre("*Success sending Bug via tkill.Please Wait for 3 Minutes*");
    }
  }
);
