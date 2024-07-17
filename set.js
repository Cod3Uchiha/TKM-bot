const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiU0xzbWh3VFNLdzNPYThSTTVHOUZEZFRyYkhhUVRtdzNxQnhWNlc3K3owcz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZzdTYWZNRG1PZXlvbTVPRnV2dUptVUdUZWtLajRJaU1jQUhlVzdyTStCZz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJDTnpHbC9YL29lVTlnNU9LYW9CK1FPS2FJdXd1ZnJZUzlUSzl1aW5SNmw4PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJxT016cll6dUNsQ28zVS9vTlQzcGNwMms0Vi82MlJ5L05nTU5ubEtBM2xRPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlVLTXVvem1sY3hPNWtjL20zbFRPT0NRRm5hakNPZHg2cmdaNTZsS3dtRXc9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IitCaStHOE1KcTBFQ0o4RHBCa05IQXFQSXcrazc3Yjl2L1ROQUl0UEhmeHM9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ044TzNveFZCLzN4Z3RpSTg4d0JmQXFnNTkzZytQTm5hc2xXa1dHaHBuWT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibDRoZzZUbno3N0NqMW9IbVdMc1pqSDVrQkorelJJSFlPdjAzOWxEMnRBQT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlNNOEo3dWt1YVNzaHhSYWdMLzRhVXZTZEJPM1JQNG1vVmEvWnJSdzN3ZW5vZ2hvclZCT3ljMHdnekdXcWgvbUpBUXhFQ2k3TU81YUhLV1lrdEh1YUJRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjA3LCJhZHZTZWNyZXRLZXkiOiJOM2NzVXdJNlFrNHJ3YzFSdENHNWx6VUo0aEZXelFXSUZiUmNreWNOSVA4PSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJ4SjFsM2xFUVMwLWpUc3FxTFZBVzNnIiwicGhvbmVJZCI6IjU4MDdhN2FlLTMyNjMtNDQ0OC1iZTZlLTk0NTAzOTdjM2ZiOSIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJmcVJVRGw2azBjY3BKTTF0NkFYZ3VpdW03YU09In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoielROMzQ4TGNCMHRSRm5YZ3ZxeUNFQ09MRTQ4PSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IjZUUVFRQTJaIiwibWUiOnsiaWQiOiIyMzQ4MTY2MDQ5NzIwOjZAcy53aGF0c2FwcC5uZXQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ1Bmc3pzVUdFS2YxMzdRR0dBRWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IitJa043UDlwQWNKQ3BYVDZxQmRFYWhibkh0NFlaTE54WlRXc3hETnJtRm89IiwiYWNjb3VudFNpZ25hdHVyZSI6IkdQME5hMDdXd1lKbGVtMTZ5dTQ2M29RWmt6TGg3OS9RUUwzWS9WTTZnTjhnUGsxOWR4Q1NNZ29hb0ZoRFBIMUlIOUJCdEVoMGs2M1RmTmM0bEp1cURRPT0iLCJkZXZpY2VTaWduYXR1cmUiOiIxSE93SG1vdW5yVThYN1RiaXhqUlg5S1crM1hnRC9XcTl4QmVPanN6U0dPRHh2UVBVVHl1d3VheXFHNGRJRTNpOGxOaE42NDBGTGNNeU5BRTF3d0ZBUT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjIzNDgxNjYwNDk3MjA6NkBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJmaUpEZXovYVFIQ1FxVjArcWdYUkdvVzV4N2VHR1N6Y1dVMXJNUXphNWhhIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzIxMjM2MTQ4LCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUU4SiJ9',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "Cod3Uchiha",
    NUMERO_OWNER : process.env.OWNER_NUM || "254728842688",              
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
