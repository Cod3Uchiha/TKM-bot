const { zokou } = require("./../framework/zokou");

zokou(
  {
    nomCom: 'ping',
    categorie: 'General',
    reaction: '⏱️'
  },
  
  async (dest,zk,commandOptions) => {
    const {ms,arg,repondre} = commandOptions;
    await repondre('Pinging...');
    const ping = Date.now() - ms.createdTimestamp;
    await zk.updateMessage(dest, `Pong! ${ping}ms 🏓`);
    zk.updateRraction(dest, '👊');
  }
  );