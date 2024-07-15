"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { zokou } = require("../framework/zokou");

zokou({ nomCom: "repo", catégorie:"Général", reaction: "✨", nomFichier: __filename }, async (dest, zk, commandeOptions) => {
  const githubRepo = 'https://api.github.com/repos/Cod3Uchiha/TKM-bot';
  const img = 'https://telegra.ph/file/e07a3d933fb4cad0b3791.jpg';

  try {
    const response = await fetch(githubRepo);
    const data = await response.json();

    if (data) {
      const repoInfo = {
        stars: data.stargazers_count,
        forks: data.forks_count,
        lastUpdate: data.updated_at,
        owner: data.owner.login,
      };

      const releaseDate = new Date(data.created_at).toLocaleDateString('en-GB');
      const lastUpdateDate = new Date(data.updated_at).toLocaleDateString('en-GB');

      const gitdata = `_Hello 👋 whatsapp user
this is TKM-bot._

- 🗼 *REPOSITORY:* ${data.html_url}
- ✨ *STARS:* ${repoInfo.stars}
- 🧧 *FORKS:* ${repoInfo.forks}
- 📅 *RELEASE DATE:* ${releaseDate}
- 🕐 *UPDATE ON:* ${repoInfo.lastUpdate}
- 👨‍💻 *OWNER* :Cod3Uchiha
__________________________________
           _TKM INC_`;

      await zk.sendMessage(dest, { image: { url: img }, caption: gitdata });
    } else {
      console.log("Could not fetch data");
    }
  } catch (error) {
    console.log("Error fetching data:", error);
  }
});