const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoic0xDNW9Pc09sODRBRjVRWjc0MGxRVy94ZHFOWnRuY2x2clBlZkd4U3pIOD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSnIzN0I4NzZ4YmRYMVlnampJMnd4K3JiNlRJRUlqbU9tNTZURVcvUmtYMD0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIwRmNjK0hZNTR6bWMxQXM3empUNUVvd3NKdnZqKy9qYlFYQzBPUzk3cEVVPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJweWV2R0FtYWV4ZDE1Zml6d2FlQ2xwdDZBcnN5VkpoMVNGVGROZFVRWG1ZPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjhCTDRDeFdqaUd6VnVHTEVrY0JQNStGeGhzQmpKLzh4OGo3L0twdGFxR2s9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkpaMk43NXQ4eENoWE90eU5jM0dqUFQ1RFZuejhhRnc3ZTBqd0h5c2V0d1U9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidVBxNW5SdGlmdVRBbXZlMGV4U1RCQ2pXQjFtZGNkT1ZTRjgwTTJKTGEwZz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUGk2MlNlOEM5Mm52TzFQaGZsMkVja3lhZGJEVDRwdWJmL003VytiNVhHTT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IldkV0ZoK2RTc2E4VElQREhxYzMrN1pSZHBDRCtjYzdkWEhoaDlKMjRHdC9kQlVSU3VNRFE5L2ZJNmIwS2s1V05VdmU0UjlmMjhLVklBRjk1UHNYNUFRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6NTYsImFkdlNlY3JldEtleSI6IkcybGMyUnBZZ20zK1VzdlI2aGp6ay9HbUtCZEhPS25kcVc3aktBcDZRWVk9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6IjBNeUZrd3ROVDJDdFV6MTNldldFU1EiLCJwaG9uZUlkIjoiOTEwOTIyYzgtZjY3YS00YWYzLThiNjUtNDQ4ZTZkYWEwODhhIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImRLem5aS1AxaFVKU29ndThSU3VFZnRRWXNFbz0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI2QjF1amRuTXgwMVBSVVIwUWkrNWxaTGJFM0E9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiN1k5OEJaQ1EiLCJtZSI6eyJpZCI6IjI2Mzc4NTAyODEyNjoxN0BzLndoYXRzYXBwLm5ldCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDSlhqcExZQ0VOZVRvclFHR0FJZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiUmNUempyZ2VPRjRMb0FhUENINmZQOUhic3h3WnF3RmIzem0xTTNhbm1FND0iLCJhY2NvdW50U2lnbmF0dXJlIjoiVUUzTk1PbnZ1c3pRc0t2RndFS0xGWTgvZG52L3M1eXZwSlo4Wk9IaW5vd3luUCt6dE92aWhrZFo2SVlrQmJUd1owdDgyMnk2L3c0c1o1VEVmTnNEQ1E9PSIsImRldmljZVNpZ25hdHVyZSI6InFIU25vTHQ4cFlid3M2dWt0cEl3bHNrbG55NjNJQW5yVUFidU5PdEF1NTBnN2ZrRnV4SVJtbEFtNjBCcElHRitEd0F6N2V4R1dWdWdIcHVCUm5JR0JRPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjYzNzg1MDI4MTI2OjE3QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlVYRTg0NjRIamhlQzZBR2p3aCtuei9SMjdNY0dhc0JXOTg1dFROMnA1aE8ifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MjAyMjQyMjksIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBR0dwIn0=',
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
