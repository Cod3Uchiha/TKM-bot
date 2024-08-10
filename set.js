const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoia0M4UlBZRUVQWTNVTUQ5b1VaS2krS0tkSlVka2tSdGVCUTJwamJCUHJrOD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTzd0dlEyMFE1cWlUb1Ruelk5dk12QXlOVTJzVm42ZEpnWExsRlhJdTZ4TT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIwS2E3Mmw0dmZpOGlVZStIbzZYM0E0amQ1UTJpQlBTMk5IVEhHYWp5T1dZPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ4YzU3TjU4cm9zZEJuNXg2LzJPOWo1U3RhSWR5S20rZ3ZNVGM2MEVXdWdJPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkFJTEtzV0JqVjVDbXNYY2FrTkJISkFhenRSMlhqY09oNE4wMHlUTTlHR289In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlpGY0YxQzBrQzlicW9VVUhpL0Z6cVNMNktzakt3YWdja3JMSStXTHpUV1k9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidVBDZnBPb3dvZW1oS0V4TnovUVRiejVWa1k2YWRyZ3EvT0dmazgycysyQT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoieXVWRkJySXFqbW9ETkFHRWFOZ1FGaFBSZUE4WnJ5UklEVVhpeWhxWkF3UT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImxqSW9nZEhteS9Ra3MvL2ZSVC93YU1UNGs0TFBCa3lKYjM5Nkk0V1VTOFZtVFk0Zm1Xem5zYkd1dFlyay9FOHFKMFVFSWZVamhzNTdBdnpJQVRXL0NRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTUsImFkdlNlY3JldEtleSI6IjNlNnVxcHVWOTZERThHZzhObDlQRkRlV0Ywc0RZVktsK0VqMVRMZHRKc0E9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6Il9UUkJ5UUFZVFpLNTFsemtDbUpjRnciLCJwaG9uZUlkIjoiNzUwZDFmYmQtZWFiYS00ZjEwLTg2MWYtZTU5NzFkZTU4NTMyIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkpGWHg2NUYrcldWU25ZL29nL2pXSGVYcldlMD0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ4Z25jM2g1RUdTcklnOHNkblZGUmE2YXl1WGM9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiMjYxRkVBU1EiLCJtZSI6eyJpZCI6IjI2Mzc4NDUyMjM0ODozOEBzLndoYXRzYXBwLm5ldCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDTk9ieThnSEVLYlEzN1VHR0FFZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiZWZ3bTA5YjlQZlo5Und0OVJtRm5FUnFFVmoxRC9IcjVVNUE5RmFiYUNScz0iLCJhY2NvdW50U2lnbmF0dXJlIjoibERNOTVDeGlycG03SFR0OUNOb0JXVFVHQU5uTzVGVXhHQU1TYVBQb2EwRFdJcURzOHBtQ1V0U1UrVlJYTHg2eTB4YW5HeDMrNUZxc291VnBSdnB1RFE9PSIsImRldmljZVNpZ25hdHVyZSI6InNrMFQwQ1J0RFM3cmJuYTA2RXF6dUp2dFZwZzJpMEcycVcvZVRFYnlMUmtzdk1uSmZ3SjBMV0I5Q1Nkb0RTaEFHYm5zNXdkK29UOWhLMGlISGp5QUF3PT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjYzNzg0NTIyMzQ4OjM4QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlhuOEp0UFcvVDMyZlVjTGZVWmhaeEVhaEZZOVEveDYrVk9RUFJXbTJna2IifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MjMzMjg1NjJ9',
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
