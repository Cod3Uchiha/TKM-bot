const axios = require('axios')
const fs = require('fs')

const runtime = (seconds) => {
  seconds = Number(seconds)
  const d = Math.floor(seconds / (3600 * 24))
  const h = Math.floor((seconds % (3600 * 24)) / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = Math.floor(seconds % 60)
  return [d && `${d}d`, h && `${h}h`, m && `${m}m`, `${s}s`].filter(Boolean).join(' ')
}
const getRandom = (ext = '') => `${Math.floor(Math.random() * 100000)}${ext}`
const getTime = () => new Date().toLocaleTimeString('en-GB')
const tanggal = () => new Date().toLocaleDateString('en-GB')
const toRupiah = (n) => Number(n || 0).toLocaleString('id-ID')
const telegraPh = async () => { throw new Error('telegraPh helper is unavailable in this build') }
const pinterest = async () => []
const ucapan = () => 'Hello'
const generateProfilePicture = async (buffer) => ({ img: buffer, preview: buffer })
const getBuffer = async (url, options = {}) => {
  const res = await axios.get(url, { responseType: 'arraybuffer', ...options })
  return res.data
}
const fetchJson = async (url, options = {}) => {
  const res = await axios.get(url, options)
  return res.data
}

module.exports = { runtime, getRandom, getTime, tanggal, toRupiah, telegraPh, pinterest, ucapan, generateProfilePicture, getBuffer, fetchJson }
