import { readdir } from 'node:fs/promises'
import { extname } from 'node:path'
import { defineEventHandler } from 'h3'

const musicDir = conf.get('music').path
const exts = new Set(['.mp3', '.flac'])

export default defineEventHandler(async () => {
  const files = await readdir(musicDir)

  return files
    .filter(f => exts.has(extname(f).toLowerCase()))
    .map((f, i) => ({ id: i, name: f }))
})
