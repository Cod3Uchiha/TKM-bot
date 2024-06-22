const { zokou } = require("./../framework/zokou");

zokou(
  {
    nomCom: 'ping',
    categorie: 'General',
    reaction: '⏱️'
  },
  
  async (dest,zk,commandOptions) => {
    const {ms,arg,responder} = commandOptions;
    const msg = await responder('Pinging...');
    const ping = Date.now() - ms.createdTimeStamp;
    await responder(`Pong! ${ping}ms 🏓`);
    responder.reaction('👊');
  }
  );