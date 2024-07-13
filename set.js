const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMktTSy9yY1ZFbm9YNDQ5cGp5MXIzWWcwK2Rxem9KbXhuZGd6U01WdkptYz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidmZTd2IzZEppbFNHT2ZuVWFCQU5kN3BOU0FMbDg3SDBZREtYMk1salR3dz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJXQk5ucmo2ZVhkcTB2OUlUTmNSMTc2ZDErb2JJdHc2MTBCb1pXbWhxT0ZNPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI1b0lONkI3SUQwUTJHQkduWTlKcmVxcEg5ckhZUVZaSnFKR05CanNHdkE0PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlVJelVTZHMzZS9EZFVndlpoVGVYZHhaQmhKRUhIdWt6NmJpQzE0S1JKa289In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik9RU0NKWklHUS9RemVzL0U1N0RZbkFCSnAxUnBMV09kTFZtWTEyemRBbTg9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiS05XK3RLWmozbGZLK0Q3OEJGMGN0QjhhRjZiTVp5WW8wZTY0S3FYL2dtTT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoicWNNV1hhRXJHR2VSblFuOXVuOHo3bVhqWDJvQXRqTDJZc1BSd3NUb0d6az0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik9ISVloUkJ0Q0ZQczhjeVpNTGhGMDNVRWhuUTVTK3F3eFhaZ2JnN05IZVBqRWZtUzk3dXJSaWhOSnJsTUNya2RZMThrUysrc0RhK1RSM29kd21mbUJRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjM2LCJhZHZTZWNyZXRLZXkiOiJGeDB5WjBkbEZIdCtRZ1VzMUxhTnJiMGFPQ0JLZFdDWS8zTXlFMXlGS05rPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJIZGI4eFZpbVFyS1pucG03U2tVa0J3IiwicGhvbmVJZCI6ImU3YjZjMDU2LTMyN2ItNGYzYy04YjExLTdhYmRjNDZiYzFiNiIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJTVXVWSk5kbkUzc290TWxLMlFoTXlVVG1TVGs9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWEIxbUFtb1U5UWRLWGVITWkzTCsvdjQ3d2FRPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IjZHM1RNWTc5IiwibWUiOnsiaWQiOiIyNjM3ODUwMjgxMjY6MjRAcy53aGF0c2FwcC5uZXQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0pmanBMWUNFTFBUeUxRR0dBRWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IlJjVHpqcmdlT0Y0TG9BYVBDSDZmUDlIYnN4d1pxd0ZiM3ptMU0zYW5tRTQ9IiwiYWNjb3VudFNpZ25hdHVyZSI6Imx1dGovaDF6T24rYU5UOERjdlhBc0p5SWZRUWJ5SmIyZmNBcGY1V2QyNzFyOHlnNjNEeldyb2JwZjdMR05ObkVkT1JLUk9QUWIxWnpyQzFuNURwekJBPT0iLCJkZXZpY2VTaWduYXR1cmUiOiI0aG5qeXFXRC9GTkljUW1yM1NzQnZBQXBKbGg3bTRtK0tBaFhnUmp2dmdRSEJFN1BIbmcxaVdmZ25zaXZFR3dVV1I3N2RJWFppZ0hlZWdZcWpYT2tDQT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI2Mzc4NTAyODEyNjoyNEBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJVWEU4NDY0SGpoZUM2QUdqd2grbnovUjI3TWNHYXNCVzk4NXRUTjJwNWhPIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzIwODU0OTc2fQ==',
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
