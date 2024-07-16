const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0pjZm9qNUovazFONU5KSEJUNGRmUDFEalBWdmU2Qll1TVYzTE1vTmJtaz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSVZ3TVVDTFk5dkV5bmJ4NUxLZUNMTWVhNGVyM0ttdGhLQlpibkZLRktIUT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJnQkUxeWJBN1g5M1J3aTFJNlp5TU1iV0tyVUMvaWtzcEZMOS9ybW56MUdZPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ5bjNBcEdoRktlOHdGMjYrYTE3bVhEKzdtdXhyQkRsY2lWUE81T0RaRm5vPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlVIaDBzSTc5KytsTXJrZjl2ekJJaUQrM2dzR3UvMHhodzdRaC84TDZ4RWc9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkpvaitNeWFXQ0wyR3ZCaDlxZ0dwTEdaOWxWN1N6Y2lzY3d4K3RvUkJJUWc9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRVBoVm9KZmZBMTVRUVQySHZXSTBhS3lBbWFDMGllYlBkTkNERE1wczVHdz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVTFaMGNiVnV0RkVmSGZXdVE1ZzRSdHZrbU1WU3FRMFBYekl3VVM0ZUttST0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImV1VHVpNVU1bTZWczZLT2RlV0c5WldqaEYvdmdUTFcrYmZNTFlXS252KzlnVW9zV2U4UVRZQVI0SjV2MEMrYURTNTdlYkdRbHhzUXRibWRacEpuYkJnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjE5LCJhZHZTZWNyZXRLZXkiOiJGaU82d1UvMExpMUhjREI3SStHN0tFYU5WZ0IwZEx0Tms1VGxBa1EvRFVvPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiI5UTFUNXNPeFQ5LUFCUG1QMXN1b2FBIiwicGhvbmVJZCI6IjA5ZGZlYmIxLTkzYjctNDE5NS04ZmVjLWJkYTY0NDA0NmIyMSIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJncmtNQW1EM1I0SmRQNnQ3emsyOW5PRXBsaXM9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZjRybHhxb3I2eitSZ1dqSlpDUGpxRVlqVkNrPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IlY0NlpGN0ZDIiwibWUiOnsiaWQiOiIyNTQ3NDIxNzk5MTg6MTFAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoibmFiaWJ5YWRlcmljIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNQT0hsTHNHRUw2ODJMUUdHQVlnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiIyaTRRQlA4RHBMcUtPNW1KZktYV3d5Qy9YdlROS3JoSFZ1U2lHb2t6WkZnPSIsImFjY291bnRTaWduYXR1cmUiOiJOaGw4S1ZNYXZ2d1A0bm8wVkc1K3FWTGlESUpMZm1vNm5hVUtLWTVOcVRaV0xydTNaOVZPV3M3SVlPNzN3THV2Wlg2UlU4aDM2N3lISDM4SWd3ZDJBUT09IiwiZGV2aWNlU2lnbmF0dXJlIjoiZUlwVzF6Ny9JUVhFeXJsMXBHUS9OWVNyUlB6YXZENmkxdW9wZ21YTE90bVNCcUF4ejJjcE14MjJoYm80dkFueUM3aTJFand3Ky8rL2RVMEY4SmplQ1E9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyNTQ3NDIxNzk5MTg6MTFAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCZG91RUFUL0E2UzZpanVaaVh5bDFzTWd2MTcwelNxNFIxYmtvaHFKTTJSWSJ9fV0sInBsYXRmb3JtIjoic21iYSIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTcyMTExNDE4NywibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFIVkYifQ==',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "Cod3Uchiha",
    NUMERO_OWNER : process.env.OWNER_NUM || "25474217918",              
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
        ? "postgresql://tkm:Aqi6tqwyv5IwDHncTtVi5XtMGZvfndDJ@dpg-cqahogtds78s739sl81g-a.oregon-postgres.render.com/takudzwa" : "postgresql://tkm:Aqi6tqwyv5IwDHncTtVi5XtMGZvfndDJ@dpg-cqahogtds78s739sl81g-a.oregon-postgres.render.com/takudzwa",
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
