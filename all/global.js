require('./module')
require('../settings')

const ensureJson = (file, fallback) => {
  if (!fs.existsSync(file)) fs.writeFileSync(file, JSON.stringify(fallback, null, 2))
}

if (!fs.existsSync('./all/database')) fs.mkdirSync('./all/database', { recursive: true })
ensureJson('./all/database/welcome.json', [])
ensureJson('./all/database/antilink.json', [])
ensureJson('./all/database/antilink2.json', [])
ensureJson('./all/database/contacts.json', [])
ensureJson('./all/database/premium.json', [])
ensureJson('./all/database/owner.json', [])
if (!fs.existsSync('./all/tmp')) fs.mkdirSync('./all/tmp', { recursive: true })
if (!fs.existsSync('./list')) fs.mkdirSync('./list', { recursive: true })
if (!fs.existsSync('./list/teksjpm.js')) fs.writeFileSync('./list/teksjpm.js', 'TKM broadcast message list')
