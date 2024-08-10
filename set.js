const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQU9tYjg0S1lDTHZTOHlObTVTbEFaY25UOHZ3UUU4VUljQzMyTkZHa0tGYz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZzFVd0JYVnNJUk42UHUwMk5SY3hteW84UWtqalRZelRsQXFDMGNFYStEOD0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI2THJlakpJMlF4UzNIRXM2aE16bjVpa045Q2NtYzNrRTJzRlhWdSs1MTI4PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJFMXdmTlkvTEpxY25INGRzV3F4TEQ2MEtYYzFOQjkwcWNEemhSYXVOSVhNPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IndCZzVCcytjaTlNT3E5dmJsdE0vaFhIR3J6dlVSVE9BYit3SllHMExxMlE9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjJOdTVQK0N1RDFyMzRDVUx2U29DWDBFQWZybmFNV2tCMUQ1TDZVY2NlV289In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMEZLNVhNanpPalkrNjFtanRTSXhwNnlDZkJIbXVTZ0hsU1VWaWVWTjBrTT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUDY2bzVBSXBVSlZjck1CcXpVQnc0VXF2Rm1UT0gvM20rQlNiNXd4TzFnWT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImF1Q0pXUlduZzhPSVJqVmJxNDlaV0NERy9iSFo5NXFudzlMZ0cyY210aU50MVZ4d1BzdGRjTUI0TFVGYWhPZTVzSERwK0tFdWg1Q1BiRGlWczdqc2pRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTQ2LCJhZHZTZWNyZXRLZXkiOiJJMG1EdGpsTkY5OU9scXpSYzNtY2VSZGR4OTU3dFJ5ZnZiR0I1RnZVSk5zPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJUMlNLaEF0UFJVMm8zMENvdktYTUp3IiwicGhvbmVJZCI6ImZjNjBkYzJhLTBlOTAtNGI2MS1hZjhhLTQxYTQ0MTNjYmU4ZSIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ3RHhEWVkzcnYvUm5xSHcyTlFFYWdkeFIxcGM9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRjQvVTFSNExPSmwwV1V2ejBiem1mcnFxT2trPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IlRBVkE0WUhRIiwibWUiOnsiaWQiOiIyNTQ3NDIxNzk5MTg6MjlAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoibmFiaWJ5YWRlcmljIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNQU0hsTHNHRU92LzNiVUdHQVVnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiIyaTRRQlA4RHBMcUtPNW1KZktYV3d5Qy9YdlROS3JoSFZ1U2lHb2t6WkZnPSIsImFjY291bnRTaWduYXR1cmUiOiJnR0NDdWFzZkJuS2ZnSmtLV0dEYXlHSWN2QnEzTG9ETmZPNFZsTmVhOWZHQUFuNlJaVTJrZ2kwN0tLeGJacFluamF5WUlYNVFBa3RwTzg2ZkhGd0lCUT09IiwiZGV2aWNlU2lnbmF0dXJlIjoiN0xQalVYdXUzRVBDZ2puVlBTU3hXWU11MWZRRkI2b3REUkhFbitPdTYzU3A0OVlrUTJobGp4QStwbEUwT3BWajhrODYraXo3MnBZVWhSWUNlZitoanc9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyNTQ3NDIxNzk5MTg6MjlAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCZG91RUFUL0E2UzZpanVaaVh5bDFzTWd2MTcwelNxNFIxYmtvaHFKTTJSWSJ9fV0sInBsYXRmb3JtIjoic21iYSIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTcyMzMwMTg4MCwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFMU2UifQ==',
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
