import type { MusicConf } from 'shared'

export default defineEventHandler((): MusicConf => {
  return conf.get('music')
})
