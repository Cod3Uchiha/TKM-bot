const { zokou } = require("./../framework/zokou");

zokou(
  {
    nomCom: 'ping',
    categorie: 'General',
    reaction: '⏱️'
  },
  
  async (dest,zk,commandOptions) => {
    const {ms,arg,repondre} = commandOptions;
    const msg = await zk.sendMessage(dest, {
      text: 'Pinging...'
    });
    const ping = Date.now() - ms.createdTimestamp;
    await msg.edit(dest, `Pong! ${ping}ms 🏓`);
    await msg.updateReaction(dest, '👊');
  }
  );