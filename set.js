const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiT0ZocnFVQUhIZ0RrdXBCdjhNK3VDOG41SE1oaEd1RS80cTF1dVBVeUxIcz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZmk3aFN1Vml5SnFqNlpSVzBydnhiaWxxelR3SGR4aE92QnJ3VmlGekN5ND0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIwRi9OOER2ZkFuRTlnN2wwa2dNdHBXWk1mUXJVczZ2b3YrL1g3N1hsT1c0PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJFSTk4ZnpHVW4xWSsxWHR6ZlA2MVVKaFY4Sllib3hvRks2V29ZM0pSK1JnPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImVNNmNva2tCOEYreU00dGhuNEZkZHJwcDJoWHFSOGsrQTE1aVBFZWd1M0k9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik1kVVB6ZjJxTCtSMUk0UmIvMDB5ZWZKNzZCaE5wcW9GS0RUdFU4Y0JUZ2M9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMEtTWTZkejBWNXFkNkhRdW9ITHE3Tk0rbmtENG5PMDlzMnM4cnNEMTJsMD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWUkzYUNuWUNTYndWWUI0OTQyOTU1QVppVDJCVnpycUN5MnZCdDJLUGh6VT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InVtTGFwWVVtR0FMS2dyVUJMVTBIMGhGNmgrWjhxcWRGV0w4ZWtrelYyM0dwYi9Gdnc4VXBuSWZ4Q3VHcUNNVmdKNjVmekkzWVBUUUtTd21vTE95VGlBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTQ5LCJhZHZTZWNyZXRLZXkiOiJFVWNUVmI5TkFYT0xJWTk5VWp4REluT2l5NWxnOXFmZjBjeURQV2hEWms0PSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjI1NDcyODg0MjY4OEBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiIyNjhEODkxNjhBNzcyOTU0MTA1QkMzREFFQUU3RTMyMSJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzIxMDUyMzUxfSx7ImtleSI6eyJyZW1vdGVKaWQiOiIyNTQ3Mjg4NDI2ODhAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiMTNFQ0ExNzAwOEQzN0I0OUQ3ODQzMDZBNjgyRjRDMTkifSwibWVzc2FnZVRpbWVzdGFtcCI6MTcyMTA1MjM1MX0seyJrZXkiOnsicmVtb3RlSmlkIjoiMjU0NzI4ODQyNjg4QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IkMwNDhERkRCNjI4MDUyQTVGNTgzOUEwOEJGMkY3MDU0In0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3MjEwNTIzNTN9LHsia2V5Ijp7InJlbW90ZUppZCI6IjI1NDcyODg0MjY4OEBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiI5MjE3MDkxRDI4N0EyQzM4QjVEQUM4NzQ4NjUxRDQ3OSJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzIxMDUyMzUzfV0sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjoxLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJieWpvdVB4VVM3ZUlUOXNMNnBydF9nIiwicGhvbmVJZCI6ImY0OWU4MjJhLTIxYTItNDRkOS1hZWNkLWZiMDIyMmEwZDkxMSIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ2OXhuK3IyRmNTT1lvdk1rRXRLNjg3Ym9TS289In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoic3BnYU53RGU1TUJHWEFwbUViU3BjUzU0V2pBPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IlJIMzg5MkpZIiwibWUiOnsiaWQiOiIyNTQ3Mjg4NDI2ODg6MkBzLndoYXRzYXBwLm5ldCIsIm5hbWUiOiJDb2QzVWNoaWhhIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNNS2tyZDRIRUxEWjFMUUdHQUVnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJ6YmVxTTRtdGZxaHN2cXdNVkJsR1FIalRsNGd5ZFZKdkRJUXM4aXlEcXprPSIsImFjY291bnRTaWduYXR1cmUiOiJ6ZGNJeWhsbFJIQVFHNWJrQmNKeGRlckxaU3VTc0VqbU9TLzJkYmpjQ0RnMXNrTXhGV3dqd1VqM1ZDMEtQeG50WklDQjgwREo0UUg1R1pOUElkY01BQT09IiwiZGV2aWNlU2lnbmF0dXJlIjoiN3dsVnNuSXZacXBzc2twTlkxNEhhSXIyMW1WV2FoajRCNm1KZVZ6NnpjNzVTTWE1aDZ1aFJhcEw4V1I4NVFvQmhQS0dYWG5qSVdlL1JjKzJSTkhoakE9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyNTQ3Mjg4NDI2ODg6MkBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJjMjNxak9Kclg2b2JMNnNERlFaUmtCNDA1ZUlNblZTYnd5RUxQSXNnNnM1In19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzIxMDUyMzQ5LCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQU8wVyJ9',
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
