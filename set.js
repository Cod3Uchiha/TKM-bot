const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVUhXNUFORnMxTTdnc0d3YzBjaE12TlpZME5rRDNUbzRmSDAzZDdpWDExST0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTENBaVkraTJpYTFPNGhxS0xIYzlkSzV1M2s2ck1QZUNLaUxtdWY0MGV5VT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJtTnIxWmk0dlcvc3Z5VFIwQ0lVK2tsUzEyaVk0N3Y3eHVqbzdVK2h1MFZnPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIrVzRwT1lWS0Z3YUVOQlZ1RVNmYVFvUUxiVTYwMGlmVVFXTGRzcThZakc4PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImlONExNdkN5OFlORGYrSE81VzUxYUN4Vkh4RzVTbSswc1RyWGw4M2RsM3M9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjNKbFc0WnQyMVBMbk1XTGlyeGRQK1IrU3pOMFJSR2RGMzBLckxJempMQVE9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQUZKTGRxQTFQSzc2SG8yTmZ5eDZSdkVOeTVoZ25SRG5HQTBFejNzTGxIUT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRXUyVUVrRWllcU9TeVBHNWRIN0tkUnE4bFQzeWRDenl2UnlwNWF0MCtFcz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im5uYVRNMm0wZ3ZkUEVnMFBiVS9zSzA0Z3p2YTFsY1M3REVkUW1SK0hzT09sdXlpRUt5YVc3dzNtb0N4VXc1dWEvTEdvNkVudkduMEcvd2xkMjZFL0RRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTQ2LCJhZHZTZWNyZXRLZXkiOiJHbDFrYk4xb25wcURNdHF1eWY0bXkzSG5vMHpoVFpyYzNQdHVJYTMrVm1vPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJncENfU01BTFNmeVpyNVdjak5RQS1RIiwicGhvbmVJZCI6IjIyZmM0YWIyLWZlMTktNDMzZC05MjEwLTc3MDQ3OTBkZWYyNSIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJoVnpxaTI5OVF1dkRZR1RZTTd5TUN4Mm91Q1E9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiYmtQS21nQTZtR0g5cXYwZUYyMlFOYzhkM3pBPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IkIxM0tNV1BNIiwibWUiOnsiaWQiOiIyNjM3ODUwMjgxMjY6MTJAcy53aGF0c2FwcC5uZXQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0pIanBMWUNFUEtGaTdRR0dBRWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IlJjVHpqcmdlT0Y0TG9BYVBDSDZmUDlIYnN4d1pxd0ZiM3ptMU0zYW5tRTQ9IiwiYWNjb3VudFNpZ25hdHVyZSI6InVKVjlKTG4rc3NMTzhCdVNWMnd1SXN3bWUrbFhSSVRoZVJMUGpzc3BLTGlaN0dacmdRV1JRQ2NDN0g5YzRacTA5Rk0vcHlyQmJWNEVEMHZaY0dqZkN3PT0iLCJkZXZpY2VTaWduYXR1cmUiOiI0NUIrMzljM241eFpwcncvM1ZET3VjRkVpanhzSC9iUVQrRlNtUTR3cWNXOVNQK0Y4L2JabnJSWlR3U0hXV00vUnRiNldrNU12ZHhpS3BSd054SWJCQT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI2Mzc4NTAyODEyNjoxMkBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJVWEU4NDY0SGpoZUM2QUdqd2grbnovUjI3TWNHYXNCVzk4NXRUTjJwNWhPIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzE5ODQ1NjM2fQ==',
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
