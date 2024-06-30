const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRUhEK0xFNVhNdFlZT1NxYk1hQmdiVFZpRlJXcFZ6OE10aFBpVlpUcFhFdz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRis0ZWsxUGUwZjdkRjU4TCt6VVRMVDBESWthUVk3VzNZUVpZVFkySmUxRT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJDRFVjUWJWOC9lN0dhdStSRlJON1d5WUxlZXd6MWEvSVR5TmVQaGxKdzBrPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJkYWpiWlZWVWRzTEtXME9vT3liMFhqazd6SU1ESVdoNGY1UzFzQXFmZHprPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlVDRXAyaWFBVFAyc1lEY1BWUjN0dUU4WG42cklRc1Fvc3FCdlBpeEhPM3M9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InRUSXQ0T3JJYk9jRHB5d3Jzb3VNK21qazhxaHR0MWhVRTVKbG13SXQyVHM9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiU0htZ3RjdkN2VnJUZ0N2SGZDZjdRenMwZmN3YVJSc3BlSTZFMnhhSWIzTT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiL01OU09PL0cyVk5UL2ZjZzltNSs0OWNpVmlidmRRdHNaMTNHYmlZamFpQT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkhOOWR0MmI3VDlQS0J5Tzg2WVZFVXB6VHY1UnVOdnBmclJpT3kxRnhiRzlGTjhLbEdLUEVEOWx4WUk2NC9WVXpKTVJOZDJuSDJ4UmMyTDh1K3RuTkJBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTEyLCJhZHZTZWNyZXRLZXkiOiI1bks5bjFOWHg4Uzd6b3pERlp6aE1XdTk5S1dNMVlqaUg2R2M5VHR0dEZRPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJVcndyME44VVNCNkV0aHNhTjAyWDJBIiwicGhvbmVJZCI6ImVkYWNjYzE5LTlhZTAtNDQxNC1iNTQ4LTlhMTRiNjRhYTk1OSIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJjbUtJSlVVSlI2Smx0R2JWQmdjbCtWdGNPcGs9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiYVYyeFdiSGc4dkJ2WUt5Uld0b0psMnI5bTdnPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IjNKRFJZRkw2IiwibWUiOnsiaWQiOiIyNjM3ODUwMjgxMjY6MTBAcy53aGF0c2FwcC5uZXQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0kvanBMWUNFTldvaDdRR0dBRWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IlJjVHpqcmdlT0Y0TG9BYVBDSDZmUDlIYnN4d1pxd0ZiM3ptMU0zYW5tRTQ9IiwiYWNjb3VudFNpZ25hdHVyZSI6ImpaUWNzV0Q5ankvbmhEV2N1VXQzN3J3VHVmeXdGMGIyM1NkRlBWSGwxTW9qZEU0T3cvSjYvUnpmcVAvVllsd3RyUC9jREZqanJKU2c4eDNESFJoVkRRPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJMczNaTG5aaFMxQVV0MFUrTzRGQzVvNlFOMkFFQnM0NlN2T0w3N1U1aFFFYlVGTVoyZ2pkOGgwRFFrMmlndjJRdW41ZGZURERpei8vN0pPYTRqUlFEZz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI2Mzc4NTAyODEyNjoxMEBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJVWEU4NDY0SGpoZUM2QUdqd2grbnovUjI3TWNHYXNCVzk4NXRUTjJwNWhPIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzE5Nzg0NTQ3fQ==',
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
