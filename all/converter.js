const ffmpeg = require('fluent-ffmpeg')

const notReady = async () => {
  throw new Error('Media conversion helper is unavailable in this environment')
}

module.exports = {
  toAudio: notReady,
  toPTT: notReady,
  toVideo: notReady,
  ffmpeg,
}
