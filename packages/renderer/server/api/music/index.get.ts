import { readdir } from 'node:fs/promises'
import { extname } from 'node:path'
import { defineEventHandler } from 'h3'

const musicDir = conf.get('music').path
const exts = new Set(['.mp3', '.flac'])

export default defineEventHandler(async (): Promise<Music[]> => {
  const files = await readdir(musicDir)
  return files
    .filter(f => exts.has(extname(f).toLowerCase()))
    .map((f) => {
      const nameWithoutExt = f.replace(/\.[^/.]+$/, '')
      const [title, artist] = nameWithoutExt.split(' - ')
      return {
        title: title || nameWithoutExt,
        artist: artist || '未知艺术家',
        base64url: base64urlEncode(f),
      }
    })
})
