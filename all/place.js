const {
  default: makeWASocket,
  getContentType,
  jidDecode,
} = require('@whiskeysockets/baileys')

const decodeJid = (jid = '') => {
  if (!jid) return jid
  if (/:\d+@/gi.test(jid)) {
    const d = jidDecode(jid) || {}
    return d.user && d.server ? `${d.user}@${d.server}` : jid
  }
  return jid
}

const smsg = (sock, m) => {
  if (!m) return m
  m.id = m.key?.id
  m.chat = m.key?.remoteJid
  m.fromMe = m.key?.fromMe
  m.isGroup = m.chat?.endsWith('@g.us')
  m.sender = decodeJid(m.fromMe ? sock.user.id : (m.key?.participant || m.chat || ''))
  m.mtype = getContentType(m.message)
  m.msg = m.message?.[m.mtype]
  m.text = m.msg?.text || m.msg?.caption || m.message?.conversation || ''
  if (m.message?.extendedTextMessage?.contextInfo?.quotedMessage) {
    const type = getContentType(m.message.extendedTextMessage.contextInfo.quotedMessage)
    m.quoted = {
      mtype: type,
      msg: m.message.extendedTextMessage.contextInfo.quotedMessage[type],
      text: m.message.extendedTextMessage.contextInfo.quotedMessage[type]?.text ||
        m.message.extendedTextMessage.contextInfo.quotedMessage[type]?.caption || '',
    }
  }
  return m
}

const makeTKMSocket = (...args) => {
  const sock = makeWASocket(...args)
  sock.decodeJid = decodeJid
  sock.sendContact = async (jid, kon, quoted = '', opts = {}) => {
    const list = []
    for (const i of kon) {
      list.push({
        displayName: `${i}`,
        vcard: `BEGIN:VCARD\nVERSION:3.0\nFN:${i}\nTEL;type=CELL;type=VOICE;waid=${i}:${i}\nEND:VCARD`,
      })
    }
    return sock.sendMessage(jid, { contacts: { displayName: `${list.length} Contact`, contacts: list }, ...opts }, { quoted })
  }
  return sock
}

module.exports = { makeWASocket: makeTKMSocket, smsg }
