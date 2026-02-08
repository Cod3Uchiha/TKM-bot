const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const pino = require('pino')
const util = require('util')
const axios = require('axios')
const moment = require('moment-timezone')
const Jimp = require('jimp')
const PhoneNumber = require('awesome-phonenumber')
const { Boom } = require('@hapi/boom')
const {
  default: makeWASocket,
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
  useMultiFileAuthState,
  makeInMemoryStore,
  fetchLatestBaileysVersion,
  DisconnectReason,
  jidDecode,
} = require('baileys')

global.fs = fs
global.path = path
global.chalk = chalk
global.pino = pino
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
