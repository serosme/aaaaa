import type { MusicConf } from 'shared'

export default defineEventHandler(async (event): Promise<boolean> => {
  const body = await readBody<MusicConf>(event)
  conf.set('music', body)
  return true
})
