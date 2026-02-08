const fs = require('fs')
const path = require('path')
const util = require('util')
const axios = require('axios')
const moment = require('moment-timezone')
const Jimp = require('jimp')
const PhoneNumber = require('awesome-phonenumber')
const { Boom } = require('@hapi/boom')

let chalk
try {
  chalk = require('chalk')
} catch {
  chalk = new Proxy({}, { get: () => (txt) => txt })
  chalk.white = (txt) => txt
}

const baileys = require('baileys')
const makeWASocket = baileys.default || baileys.makeWASocket || baileys
const makeInMemoryStore = typeof baileys.makeInMemoryStore === 'function'
  ? baileys.makeInMemoryStore
  : () => ({ bind: () => {}, loadMessage: async () => undefined })
const useMultiFileAuthState = typeof baileys.useMultiFileAuthState === 'function'
  ? baileys.useMultiFileAuthState
  : async () => ({ state: { creds: {} }, saveCreds: async () => {} })
const fetchLatestBaileysVersion = typeof baileys.fetchLatestBaileysVersion === 'function'
  ? baileys.fetchLatestBaileysVersion
  : async () => ({ version: [2, 3000, 1017531287], isLatest: true })

const {
  BufferJSON,
  WA_DEFAULT_EPHEMERAL,
  generateWAMessageFromContent,
  proto,
  generateWAMessageContent,
  generateWAMessage,
  prepareWAMessageMedia,
  downloadContentFromMessage,
  areJidsSameUser,
  getContentType,
  DisconnectReason,
  jidDecode,
} = baileys

global.fs = fs
global.path = path
global.chalk = chalk
global.pino = require('pino')
global.util = util
global.axios = axios
global.moment = moment
global.Jimp = Jimp
global.PhoneNumber = PhoneNumber
global.Boom = Boom
global.makeWASocket = makeWASocket
global.BufferJSON = BufferJSON
global.WA_DEFAULT_EPHEMERAL = WA_DEFAULT_EPHEMERAL
global.generateWAMessageFromContent = generateWAMessageFromContent
global.proto = proto
global.generateWAMessageContent = generateWAMessageContent
global.generateWAMessage = generateWAMessage
global.prepareWAMessageMedia = prepareWAMessageMedia
global.downloadContentFromMessage = downloadContentFromMessage
global.areJidsSameUser = areJidsSameUser
global.getContentType = getContentType
global.useMultiFileAuthState = useMultiFileAuthState
global.makeInMemoryStore = makeInMemoryStore
global.fetchLatestBaileysVersion = fetchLatestBaileysVersion
global.DisconnectReason = DisconnectReason
global.jidDecode = jidDecode

global.color = (text, colorName = 'white') => {
  if (!chalk[colorName]) return chalk.white(text)
  return chalk[colorName](text)
}

module.exports = {}
