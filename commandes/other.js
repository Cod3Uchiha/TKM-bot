const { zokou } = require("../framework/zokou");
const { delay, loading, react } = require("../bdd/utils");

const JavaScriptObfuscator = require("javascript-obfuscator");

zokou(
    {
        nomCom: "encode",
        categorie: "other",
        reaction: "🥸"
    },

    async (dest, zk, commandOptions) => {
        const { ms, arg, repondre } = commandOptions;
        if (!arg[0]) return repondre("*provide text or code to encode*");

        const text = arg.join(" ");

        let obfuscatedText = JavaScriptObfuscator.obfuscate(text, {
            compact: true,
            controlFlowFlattening: true,
            controlFlowFlatteningThreshold: 0.5,
            deadCodeInjection: false,
            debugProtection: false,
            debugProtectionInterval: 0,
            disableConsoleOutput: true,
            identifierNamesGenerator: "hexadecimal",
            log: false,
            renameGlobals: false,
            selfDefending: false,
            stringArray: true,
            stringArrayRotate: true,
            stringArrayEncoding: ["base64"],
            stringArrayThreshold: 0.6,
            transformObjectKeys: true,
            unicodeEscapeSequence: false
        }).getObfuscatedCode();

        await repondre(obfuscatedText);
        await react(dest, zk, ms, "👾");
    }
);
