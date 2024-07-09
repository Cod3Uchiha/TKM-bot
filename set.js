const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQVAwQTFYN0ZLQm5rL2pjOWxxcWVyMXBLaGhsbGRDU0FYb0RJQWpsdWcwYz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVDBCaEgxTm5NY09hVGlLeCtKL3c5d1l5aHp1MktUWmZkVkRtUll3RnZYdz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI0S0FMZXlsMjhEKzU2L08vUDNObncrZURlM1dSV3Z6Y1dOeXU3VTZ6cG5jPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJPTE81a05wZTF2eW1FQU41RjBleTJmZTdDYlhld1REU3p1ZjJiZ2hTZGpjPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkFDZGVxZUxvMFVTeHg1S3VsTGlBR04zdGlUcmZnZWxzTGI3ME90V3VxRk09In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik1ZU1RFdGxJNzRpWWs0M2tjYkRiSlJNeGI5NDZZZkgwZEczbjVEOUg2Vmc9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiY0gyT05ickFwK1RLYkFmTHM2TGptUjl4NkZDend6QVk5ZlUwU3JjYzgwYz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWDlmWEVSbWJ4RUJhSWNPK1hKSmlYSEVleDA1WnVpT1VVN1REanY3djczWT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjFVYnVDSHlzdll2ejFSS3IzVXFBUkRUNHp1R2tqamJ2Z0dNS3E4QXltc3c2WDRhcHZ4ZVdaSWpMWTF3YUFCTlpUeHFXdktndzFndjlIaG9Kd2pLZEJBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTk5LCJhZHZTZWNyZXRLZXkiOiJoZUIzbjlQZmxIWVJGMVZnNXB5Qk9HNnpiL1ZDMDRPOTBGUUwvRTdGZExNPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJXTDFtUWR0WFR4YS1IRU9lSWROUnFBIiwicGhvbmVJZCI6IjcwZDI3ODViLWYzNzYtNDU4My1iN2UyLTc0MTg0NWRiMjA3YSIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIxMUdqY1k1WXgyVTU5eml6Zm1iZ0tPNHk0d3M9In0sInJlZ2lzdGVyZWQiOmZhbHNlLCJiYWNrdXBUb2tlbiI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImVOTDcrcG5sWDhSZy9xUTFKWEdqWnQ2R2Vxdz0ifSwicmVnaXN0cmF0aW9uIjp7fSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ05XSDF1OEdFTWlPc3JRR0dBUWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IlBManEvZGZCN3FrMmFQSE9PQTBYUFZaQjFkQXFWUkQ2ZXpQYUVzOXJOeFE9IiwiYWNjb3VudFNpZ25hdHVyZSI6Ii9sT1AwaEM4NTRIM1VvSDZsOFVZajdOU0xkZERqR3Z3Q2xjQzhNSTUrby9WbTZ6Qjd2cTduOE1ZR2FrN25TTGUvY1pJL3dHWktvUnJLOVA2QldxN0JRPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJFLzNXOFA5VE9UeWxPc0JXaXdDTWljUzNzaUF3c1BSQ0pzbXZiem80N0dGbmNmVDY2S3FYUUxsSkQwYWgxWGVPRUFOcU9UK1NGbU5pYSt6YlZTNlpCdz09In0sIm1lIjp7ImlkIjoiMjM0NzA0NDA2MDEwMjo0M0BzLndoYXRzYXBwLm5ldCIsIm5hbWUiOiJEb2xsYXJodW50ZXIiLCJsaWQiOiIyMTEzODU1Mzk2NzQzNjA6NDNAbGlkIn0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjIzNDcwNDQwNjAxMDI6NDNAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCVHk0NnYzWHdlNnBObWp4empnTkZ6MVdRZFhRS2xVUStuc3oyaExQYXpjVSJ9fV0sInBsYXRmb3JtIjoic21iYSIsInJvdXRpbmdJbmZvIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0F3SURRPT0ifSwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzIwNDg1NzE3LCJsYXN0UHJvcEhhc2giOiIxbE9TRUkifQ===',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "dollarhunter",
    NUMERO_OWNER : process.env.OWNER_NUM || "2347044060102",              
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
