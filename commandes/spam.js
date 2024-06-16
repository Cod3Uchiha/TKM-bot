zokou(
  {
    nomCom: 'spam',
    categorie: 'Test-cmds'
  },
  async (dest, zk, commandeOptions) => {
    const { ms, arg, repondre, superUser } = commandeOptions;
    const nombre = parseInt(arg[0]);

    if (nombre > 100) {
      repondre("Sorry, I can't send more than 100 messages at once.");
      return;
    }

    const texte = arg.slice(1).join(' ');

    for (let i = 0; i < nombre; i++) {
      repondre(texte);
      await new Promise(resolve => setTimeout(resolve, 1000)); // wait 1 second
    }
  }
);
