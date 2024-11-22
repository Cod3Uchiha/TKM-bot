const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMktRNlAvY2JBcEgvaTBqL1kzRkhzd2VNVURBZHNzb1AvNkV2OW92bGVXUT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoic0FldXdVMnBmdWwrYUZ6ejNETUJkeVUrWnNuem1FOGtRUlJlbkM0RkQyMD0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJBQzVITG9YOUsxcUVidmRqSkhZdG1raU9IQjJhdS8rM1BmRlhDRU43b0VVPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJKRDlSd0haREtCdkx4a3VGNUpPckd3TThQOFNTUlFkVU0vTTk4TFljMnlnPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im9QRzVtUlQvcGhjamdmM2tScUx0MGR5VTUvMDY0cUFXMHo4VFZjVHVDM289In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InVoUVFLVVVSV0hwaVk5U3djVjBIRkhON3M4cHI0K05ZdnBvaDQxWmlSRW89In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiY0t0RXRvcEpWOHYyVzhwYXkvVVE4TjFLdzdETFR6aHljSTFSWjVKUlJrVT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSEc2emIvZXFRdkRzT091UE1sVDJoM0hCQTdZSnVZL1hrNUV6UHA0K0NVWT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlVBcFlIMWtHQXl6aUFDUzkyL2xQTHhQa1hodkFFb1A1WU15Wks5LzBhZlVaZENZeWNTRWxKUVo4OHAyYWYzNS9ESjErZ0NSQzhrUElITCtoRjl4NGdnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTg4LCJhZHZTZWNyZXRLZXkiOiJGMCtONWVUMWJVMHFVU1ZGZkZaY0cwM1hJQm9nN1cwdk8rMVdGUTBtbTNjPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjoxLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJ2NUJodi1SNVJ3NktkQXF3STZuQjF3IiwicGhvbmVJZCI6IjRiNDk5NjM4LTY4YjQtNDM5MS04ZjEwLTA4OWZjNmFmNWRkZSIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI5UEZVQ1NWMzh1QzFUN0huUXZ2MzNIS1ZzUlE9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoieHRVMHUrR3l5eXJmOW5vYzFsaXAyNHRRbUljPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IlJSREFaVEVQIiwibWUiOnsiaWQiOiIyNzYyNDk2NTkyMDo3QHMud2hhdHNhcHAubmV0IiwibmFtZSI6IvCdkbfwnZKN8J2SgvCdkprwnZKD8J2SkPCdkoog8J2RqvCdkoLwnZKT8J2SlfCdkooifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ09QLzRZVUdFSWFHbzdVR0dBRWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6Ik5ZcCsyTGpOeXZ4SXRZZG9TNkdNYmhsNGR0QUhSRHFkR0tOYm9BZzA1aHc9IiwiYWNjb3VudFNpZ25hdHVyZSI6Im1mWFdGZlJFbnZSdWZVNUphSjJyVFY5d3F5c1U0UHBpakFQZmlDQnZBUFZPVVE3WDlwV212S2xsOW4rMEN3Vys2aXRPNlVOcHlLc2xzQjBCdkNnNkF3PT0iLCJkZXZpY2VTaWduYXR1cmUiOiIvd3EyNSsyUzhzemd4MHpQZDV4Y2Nsc3NPUVNIVDEvTHBob2xiZXhSS3pmS0ptREZKaWRLN1pFZnkxczYrSXgyYm54S0Q3U1pHNExTQklHQVZvU2JqQT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI3NjI0OTY1OTIwOjdAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCVFdLZnRpNHpjcjhTTFdIYUV1aGpHNFplSGJRQjBRNm5SaWpXNkFJTk9ZYyJ9fV0sInBsYXRmb3JtIjoic21iYSIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTcyMjMzNjAyMCwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFKN04ifQ==
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
