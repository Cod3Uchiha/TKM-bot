const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRUprR0QwWDFYdE0zS250T1RrMzNrNC93Z1g1QUhtd3VUeTlIRzVwSWZXUT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVHJtSkVDckJRMVpTU2V5b2ZhUE1zTXp6dVdLeFpHR3N1QmwzdnBvckZBcz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ5T3dNeHVxelluZ1VkdG5OWU9MdnhseGZ6ZGUyMUVacUpJQXdJNE1lQ1dJPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJRK0VRTVhObVVjTmRQbnBSZ093Y1hpcTRoV25OMTR3MGFqaEtaV0hub2dNPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IllDeTVndkxEVEUreE5YdldnYVlwMGNkTFN5VWdtWmlHY2Z2VTNMYkRKbjg9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImhpbWhPNFcwdkhVMVVhQUozaTc2b0M5K0xYUjFmS3hHRDdTSEg2cXpQWGc9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoicU90YlVGOTBTTEtJS1JNQTVXZ3plMnd2Sk9jZ1Zjb2RZcXczeEJPYVQyYz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZ0MvQXFVTVpKTFJ4cVMwL283akhIdUZnR0RGWk8vN1VsZ1phcDlWVitUbz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImtVcklZQlU5ZHNCdUhJRWk2MTQrN2NHc1BrbU9mNHNiWjZnYW1YZmwxWHlnWWJ1b05DTVdvcElPczZ0QUR4eDRnOWp3djhqMndIVXF3SldWWXUyd0FnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjQyLCJhZHZTZWNyZXRLZXkiOiJDNHF4OUFyMXJIbGl6NGJBQVNZNy9STTA0UzFsS0o1UzhSeStLTC91aDR3PSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJkazJqaTdNN1EtUzBNZHFlem44b1JnIiwicGhvbmVJZCI6IjJkNjA4ZDc3LTE0ODMtNDY3YS05OTUwLWY4NTg1NDE0MGQ0NyIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI0VVdmR1F1Rlp6NW9HSUxrSzJXVGpOSDdneEU9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiV2tZRCtXOVlHZGVocGkzaURoQWVVZzZPUnpnPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IlFWSjVEV0s4IiwibWUiOnsiaWQiOiIyNjM3ODUwMjgxMjY6MTVAcy53aGF0c2FwcC5uZXQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0pUanBMWUNFTWYxbTdRR0dBRWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IlJjVHpqcmdlT0Y0TG9BYVBDSDZmUDlIYnN4d1pxd0ZiM3ptMU0zYW5tRTQ9IiwiYWNjb3VudFNpZ25hdHVyZSI6IlNyWVpGcjlJb21ET0VUMUNROW0zQ0Mzbmc3R3hmT2lYUlN2aklSSEYzTnpRUDV4QUFBUXQ1R1FueUgxaEhJQ0ovTkxsRTltSFNvOXpyNUZWdVV4TkJRPT0iLCJkZXZpY2VTaWduYXR1cmUiOiIzVUZHRTVYdkRMR3NUZVRhYnB1YlBtOUhEcjZOMjE1a3FuaXJGa3REY3ZsRGR6eVpWWC9wbkxHeGx4aGs4VnNid3RodlArSnhQa1BiUE1zOE1XbjBDZz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI2Mzc4NTAyODEyNjoxNUBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJVWEU4NDY0SGpoZUM2QUdqd2grbnovUjI3TWNHYXNCVzk4NXRUTjJwNWhPIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzIwMTIyMDcyfQ==',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "Cod3Uchiha",
    NUMERO_OWNER : process.env.OWNER_NUM || "263785028126",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "non",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    BOT : process.env.BOT_NAME || 'TKM bot',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/e07a3d933fb4cad0b3791.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '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',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    TZ : process.env.TIME_ZONE || 'Etc/GMT',
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    BOOM_MESSAGE_LIMIT : process.env.BOOM_MESSAGE_LIMIT || 100,
    PORT : process.env.PORT || 8000,
    LINK : process.env.LINK || '',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`update ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
