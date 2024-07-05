const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMFBNSndCVW80UVVhaGFGUVVxeGxyQ0p4aTJGWWpINGVwV3JlRnFWY3Mxdz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoicjNYbStVQUcvWFEwMHVlbjhwcTNKVlNkUzJGZTRaaktpRXllZGpvR2YxMD0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIwTnQ3Uzd6eFg0VXFMRHd3b0Y2UkI0bE5IM2Q5Qlh5eEVwMjRuNlhsWVhJPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJTbGxDSzIxbGlZVUtiTTNNQ0tOcGRraGJpc3NXdmZSV0pkVkRqQkVuYkYwPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IndNR05GQTZ1U1JXMWtEWHpEWjdKc09iNUFIaXZuUU5pVFZSaldNY0RyMkU9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImJBbDlzemZzR2FxOEkwNjNCeGRsc1RLT1EzYk9wbkxDaHdTank4a2QzME09In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiS09wYVo5WnQvZlk0Q0VSeVRUcm0yQ3NIUno2bU5EL21EZXd4OXZUTTgzVT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoid3N0OGRKMVlnUjUvWDhPOTIzQzV1ZUdXSWMrSWdqRFd0aWpGOUtRSHVqZz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjVRLzFCM1AvazZhZ0lRNkhTOU93RGxVQitmS0cvNEE5c1ZXOFYyWFVTSWJiU3E4QmxNQ0JmM1U3N3Y3c0NSdHZGNEVtZ0Q2MXRUM3dKQjRWOTZkU0JRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjQ5LCJhZHZTZWNyZXRLZXkiOiIyeHVNaGMybUpINXhRTXpuQ0sxd0lER0tEU3IwQWREaERIK2JJK3F3djNZPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiI0bHFUaTlDMFNUS2kzRmhsOW5LZ2l3IiwicGhvbmVJZCI6IjE3Zjk1NDU5LWRmZmUtNDRkYy05NzAxLTZkOTMwZTNkZmNkNCIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJKRXZlaXB6RHdHUUZKamhFeWthbXo5ZUZOcEU9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoid1BGQmJhdGxrWVd1bTNES0srMVlNdEduL3lzPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IkhTUllFWVZZIiwibWUiOnsiaWQiOiIyNjM3MTQ0MDY1NjU6MjNAcy53aGF0c2FwcC5uZXQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ1BPcDZIRVFpNEtldEFZWUFTQUFLQUE9IiwiYWNjb3VudFNpZ25hdHVyZUtleSI6ImhzcHVXMFk1RjcwQkJzOU1EMFlMVlllV3JQZFVObjFGcnpteHAwOXgwbHc9IiwiYWNjb3VudFNpZ25hdHVyZSI6Im43ZDdaQVhFeUJseGh1dzVQUjBUSU5NODNwd280MkYxb2NKM0tTODZLNmRpZGJsMENBYmtKbzBGeUVtWW8zckQxMEVoaWY3THFNRWNZbEttUTdvOEFRPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJJc3B1am1WQWN6bTBKSkFJKzlBMVNMSFZNYXRYSkl3V1ZzTzF5eHM3azVWM2txUVI4Z1lFYzhaVmwyVStvRDVNYll0Y0I3dXF1Z2FSMkhSbVJ2cldBUT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI2MzcxNDQwNjU2NToyM0BzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJZYktibHRHT1JlOUFRYlBUQTlHQzFXSGxxejNWRFo5UmE4NXNhZFBjZEpjIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzIwMTU2NDQwfQ==',
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
