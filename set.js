const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiR0s2blA1ZjBPRGV0LzRkL0VKT2JTd0xIWUs5UXBvZTBKRFVCUUE1V3FGWT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUGh4KzNSV0tSbE92Nlc1a2ZFVGc4YkJaQWx1R2tRTTE1UG8xcEZoS1hqND0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIwSlZkbmVrSTExS1QzMmw0TDRjS1BzVGRYbWxqc3VhQWJVWjJRRFZyNWxZPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJSZHVaZUVrcEpsUWhYNVUyc3Z2dkQ3UnAvQ2lsN0lxdnpTRS82K0x3SVZNPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InFLWm4xbjNQU2RHQ1V4a0RHY1JlTW5SVjR4WjdSY2pyVnZrTDd5NEZ4a1U9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ill6bGxGbjFOblFpRS9RTnV6UUJoazFnb2dwa1p2QVN5VE8xelljOHFnakk9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVU1BR3lqc09ubUdBdUE5TG1adzlycEhiZ2d0YWlmS3NoN0tiZDY0a0VYST0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQTZyMG5selFKMjB2SFBWOC9yeGppbjNDcHB5VmZUcTl2R2xqNDRWc2gzOD0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlhseUVCaVhmYVFMVmpVMHMwRWJaUUJRRVhnTWlyTGFrbTBsQkNLK3U2dkN4S2V6MGpsejhsQ29OZCtLT0QzYWhaWjd5TkN3SmtnK0syc1JOR25Rd2lRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTk3LCJhZHZTZWNyZXRLZXkiOiJlcStCOVZHN1dMai9QUlZpL01QUlNPS3piYXE5R0NiS1o3N3FVVEVBZDFnPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJPa2lFZWdRSlFMR1hEZUxKT0NkT3FBIiwicGhvbmVJZCI6IjMzNjNjYTQ2LWQyMjgtNDk2NS04YjIyLTZhNWZmMmI2Y2IzYSIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJKWSswVWJQcWM3TmJYK1kwOXl2UGdZZGpOM2c9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiT09OTkx3M3VPTjJsVUttV0wwQWE0TU5FRk1NPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IkxaQ1RQNEVCIiwibWUiOnsiaWQiOiIyNjM3ODUwMjgxMjY6MjVAcy53aGF0c2FwcC5uZXQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0pqanBMWUNFSUtqeTdRR0dBRWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IlJjVHpqcmdlT0Y0TG9BYVBDSDZmUDlIYnN4d1pxd0ZiM3ptMU0zYW5tRTQ9IiwiYWNjb3VudFNpZ25hdHVyZSI6InluUDZ6VUxFQ0pCUlBxZ2pvVk9HMkw5Y1NJRTZYbVhOQ0RzUlF2YTM2NmVNM0dmNkRFS25IZGZ1eHErWHcxM0VPTzUvR0kvdzdnb1ptTDBINzAyQ0RRPT0iLCJkZXZpY2VTaWduYXR1cmUiOiIycmdiUTc1RUwxbHlUT3ozVzY1Q2xTQ3BWcFJnWmVITHk3Zy9rNCtxVEpiRlNqWjZiSlRsanR3WUtoZ2tScXRVakhNMDdIcndaTWJPdFA3bVpiRDVpUT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI2Mzc4NTAyODEyNjoyNUBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJVWEU4NDY0SGpoZUM2QUdqd2grbnovUjI3TWNHYXNCVzk4NXRUTjJwNWhPIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzIwODk3OTM1LCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUdHeCJ9',
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
