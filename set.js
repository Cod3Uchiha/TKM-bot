const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ09KWUF2TjNMNlAvNGhkMS9ycHFOUWhEeFpUWTZtTTF3a2J6UXlHUDAwUT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoicDhlTThwdDVZUkpaL1Y1NG1rblYxb2o1akpnb296VkZQcFNnWklwZkh6WT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJHTDM3aE9IU1pUaEtDMzZZN3djZHZLRlZ5YXVaWld0RUdIQlc1dWI1VEVZPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI4VHdKWERXdzZTZGpEbk5PTnQ4T3BpRlBCaFpyWmZBQUprYkl6dzF3Y0NjPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImtCREt2TDVJSHVDY0l5TFlBZ1RMKzQ5dy9acTZNMHpDMjFYUVBKVDZuM2c9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik84OTlGdEliaTk3RTVMTGFPRUJDU2ZOZ3JpaGh3K241QXpIRWJDSXlud1U9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiV1BRazlqVFdtTjBqOExzR094TkN0dzNnNlJuQnNoS2xJZEc3Z1Z3SXlIND0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRVMwS1RwVHJxL044NWFBTnZOVlZ2YTdkdm1TbVo4N0FqRnhobWRZUlhGdz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkFhdkhYa3V0YStCbmNGU001Um1Kb0hBc2RtemRtWmp0YWRzUHhPemFyUVZmY1J5NmJKL3F4ZUZUOXplV1U4ZC9IRVhFSHpXMlUvWXpHMFE3eHFLVEFnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjI5LCJhZHZTZWNyZXRLZXkiOiJOZXVnbnRacjJjTTdMZUpwNE0xbG1Xc1kxSkc2QVJGT254OGNSbjdyaTVFPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjI1NDcyODg0MjY4OEBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiI0NDJGNzFBODk5MUI0MjIyQjBFQUY2MUM5QjQ3NDY3NyJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzIxMDU2NzAxfSx7ImtleSI6eyJyZW1vdGVKaWQiOiIyNTQ3Mjg4NDI2ODhAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiQjUxQTU4QjEwMUE4QkRCNjI5RjM0MDBDRDZGM0MwQzIifSwibWVzc2FnZVRpbWVzdGFtcCI6MTcyMTA1NjcwMn1dLCJuZXh0UHJlS2V5SWQiOjMxLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6MzEsImFjY291bnRTeW5jQ291bnRlciI6MSwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sImRldmljZUlkIjoiazZEY19kN0dRMlN3QmZzc0dTWi1EdyIsInBob25lSWQiOiI2ZTAzZTMwZi0zNWQxLTQ1MWMtYmVkMy0wMzc1OWEyOTA0ZDciLCJpZGVudGl0eUlkIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibmU0QXVnampZVFlxRURvaHZwMFhIMHhvMkgwPSJ9LCJyZWdpc3RlcmVkIjp0cnVlLCJiYWNrdXBUb2tlbiI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Imkya2cwOFNGVXd3dXZnVHcyYlVDUStCaGVNbz0ifSwicmVnaXN0cmF0aW9uIjp7fSwicGFpcmluZ0NvZGUiOiJQNjlOMUNQUSIsIm1lIjp7ImlkIjoiMjU0NzI4ODQyNjg4OjNAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoiQ29kM1VjaGloYSJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDTU9rcmQ0SEVLLzcxTFFHR0FFZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiemJlcU00bXRmcWhzdnF3TVZCbEdRSGpUbDRneWRWSnZESVFzOGl5RHF6az0iLCJhY2NvdW50U2lnbmF0dXJlIjoiRlR3QVI2dlpnZ1ZBUmpMQ1NYZGlFTXZqODZHY21XV1J2ck1MUUJqTEd6Y1p2MCtTNHZrVWxCOEdpMFU0THlReTBZV1p2eGdBS0xrQkNPMlRGZVdEQ2c9PSIsImRldmljZVNpZ25hdHVyZSI6IjJYNysrRTNxVW5UZ0VpY1JCMDRoMVNMajZDMTZxZFlJVmpqbzFIZ0RPWEFzamNaTnJoSXZvYXd0Z0lKMkhCOFdLUWVCYTl2d3U1clVSNmVxSnNSWkNnPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjU0NzI4ODQyNjg4OjNAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCYzIzcWpPSnJYNm9iTDZzREZRWlJrQjQwNWVJTW5WU2J3eUVMUElzZzZzNSJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTcyMTA1NjY5OSwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFPMFgifQ==',
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
