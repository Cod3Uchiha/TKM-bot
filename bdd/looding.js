async function loading (zk) {
var lod = [
"《 █▒▒▒▒▒▒▒▒▒▒▒》10%",
"《 ████▒▒▒▒▒▒▒▒》30%",
"《 ███████▒▒▒▒▒》50%",
"《 ██████████▒▒》80%",
"《 ████████████》100%",
"Loading Completed✅"
]
let { key } = await zk.sendMessage(from, {text: 'Loading Please Wait'})

for (let i = 0; i < lod.length; i++) {
await zk.sendMessage(from, {text: xeonlod[i], edit: key });
}
}

module.exports = loading;