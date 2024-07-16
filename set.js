const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNE1ycko0THRrajBZbnJXQjFjSGVxTTI2UFlMZy9KM0s1WEtzNk4yVTFuUT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZ0c2aEM0TXU0eU10RDJNVkZXSEZQVnRiMW5abUlqM2xtMjBIZmM3NHEzcz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJxRXBEQXJPelVtK3ZRVWtRV0c5NXVsZTI2Mk96U096R3cxazB2cFE5N1hnPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJXS1pDTVpTNGVZR0l1eUdJQi94Vm9YcklPTjVSMklONEVNNGM5cVUyVlRNPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IklFT0F1b1RRaE45UmdWSGlGakI2MUNNblhJRzFmb21TU2VkVy9rekpGa0k9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IngwdEFZeWxkQ001U0VpUUQwSFZyc3RMQTVxZ2FNdUF4TkJlVGhZM3JJVUk9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNEE5azMvcUJoMHVxWHF0TzIwV0FoSkZpQ0NtSFlmSTlmR2ZhVHVkdk8xcz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiREl3dHhYWkxlVUdsMi9jRWlsM0FMWS91M0U3NktHNEFMT0VxTUdQWnBWZz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImhBRGQ5bWxkR2xoVFRxRTFIYytSWVBIbWVqK2RTQmxqY2MxTDczeWg5dnJCd0pESnM5dm52akdXaFU4VVg4amdwMmcyQjJUQ3IyazBIaTZLYmJlSERnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MzcsImFkdlNlY3JldEtleSI6IkhhWk1ORFl1MWZYdFozbzFVQ1FaOUdZTnMzaFlmNmZ3c2RhWitjMk55QlE9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6InRkTncwWUEwUkxXQkV4RUpzN2M0VWciLCJwaG9uZUlkIjoiMjI5MWIyN2YtMGQ1NC00MjQ3LTgyY2MtMjg5NjdjZjA4ZGFhIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ii9QVldIMzJ0WnIzaDd3RTdOVHpnaWlzY3Q2Zz0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJwMlFUSzZDMjFvRDRlVWR5WFpoWmVlTERuWDQ9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiN1E5NTlNQ0YiLCJtZSI6eyJpZCI6IjI1NDc0MjE3OTkxODoxMEBzLndoYXRzYXBwLm5ldCIsIm5hbWUiOiJuYWJpYnlhZGVyaWMifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ1BPSGxMc0dFS1dmMkxRR0dBVWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IjJpNFFCUDhEcExxS081bUpmS1hXd3lDL1h2VE5LcmhIVnVTaUdva3paRmc9IiwiYWNjb3VudFNpZ25hdHVyZSI6InZWV3NreGRWWmMzUmFZM1FBcXR0SmRZQWxEVmRiNTA3WkdERlZYSWJ1eGx2T0VIbjdnUkVGM0VBMlJPRmcvOTFWaXR4ekZmZ0NjMkVEd0FDOEhzL0JBPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJtZWk5a2s1dzlUamh5OTd6c2EvTEV6N2p6WlcySis4a3UrTk1zd2JNa0lZQmlneFdGRnNOWXJwVE5ZSFRtNGRRNGp3a0RrYkxwTmc0QWU5M0hmQmNEdz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI1NDc0MjE3OTkxODoxMEBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJkb3VFQVQvQTZTNmlqdVppWHlsMXNNZ3YxNzB6U3E0UjFia29ocUpNMlJZIn19XSwicGxhdGZvcm0iOiJzbWJhIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzIxMTEwNDUwLCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUhWRiJ9',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "Cod3Uchiha",
    NUMERO_OWNER : process.env.OWNER_NUM || "254742179918",              
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
