const { zokou } = require("./../framework/zokou");

zokou(
  {
    nomCom: 'ping',
    categorie: 'General',
    reaction: '⏱️'
  },
  
  async (dest,zk,commandOptions) => {
    const {ms,arg,repondre} = commandOptions;
    const start = new Date().getTime();
    const msg = await zk.sendMessage(dest, {text: 'Pinging...',},{quoted: ms});
    const end = new Date().getTime();
    const ping = start - end ;
    await zk.sendMessage(dest, {text: `Pong! ${ping}ms 🏓`, edit: {id: msg.key.id, remoteJid: dest }});
    await repondre(zk)
  }
)