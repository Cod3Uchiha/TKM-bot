function delay(ms) {
  console.log(`⏱️ delay for ${ms}ms`)
  return new Promise(resolve => setTimeout(resolve, ms))
}


async function loading (dest, zk) {
var lod = [
"《 █▒▒▒▒▒▒▒▒▒▒▒》10%",
"《 ████▒▒▒▒▒▒▒▒》30%",
"《 ███████▒▒▒▒▒》50%",
"《 ██████████▒▒》80%",
"《 ████████████》100%",
"Loading Completed✅"
]
let { key } = await zk.sendMessage(dest, {text: 'Loading Please Wait'})

for (let i = 0; i < lod.length; i++) {
await XeonBotInc.sendMessage(dest, {text: lod[i], edit: key });
}
}


module.exports = {
  delay: delay,
  loading: loading
}