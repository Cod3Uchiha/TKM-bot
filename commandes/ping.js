const { zokou } = require("./../framework/zokou");

zokou(
  {
    nomCom: 'ping',
    categorie: 'General',
    reaction: '⏱️'
  },
  
  async (dest,zk,commandOptions) => {
    const {ms,arg,repondre} = commandOptions;
    const msg = await repondre('Pinging...');
    const ping = Date.now() - ms.createdTimeStamp;
    await repondre(`Pong! ${ping}ms 🏓`);
    repondre.reaction('👊');
  }
  );