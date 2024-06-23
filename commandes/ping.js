const { zokou } = require("./../framework/zokou");

zokou(
  {
    nomCom: 'ping',
    categorie: 'General',
    reaction: '⏱️'
  },
  
  async (dest,zk,commandOptions) => {
    const {ms,arg,repondre} = commandOptions;
    const msg = await zk.sendMessage(dest, {text: 'Pinging...',},{quoted: ms});
    const ping = msg.messageTimestamp - ms.messageTimestamp;
    await zk.sendMessage(dest, {text: `Pong! ${ping}ms 🏓`, edit: msg});
  }
)