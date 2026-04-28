import { readdir, readFile } from 'node:fs/promises'
import path, { extname } from 'node:path'
import { defineEventHandler } from 'h3'
import { applyTagsToFile, readProperties, readTags } from 'taglib-wasm/simple'

const musicDir = conf.get('music').path
const exts = new Set(['.mp3', '.flac'])

export default defineEventHandler(async (): Promise<Music[]> => {
  const files = await readdir(musicDir)
  const musicFiles = files.filter(f => exts.has(extname(f).toLowerCase()))
  const musicPaths = files
    .filter(f => exts.has(extname(f).toLowerCase()))
    .map(f => path.resolve(musicDir, f))
  for (const musicPath of musicPaths) {
    const properties = await readProperties(musicPath)
    console.log(properties)
  }

  const result: Music[] = []

  for (const f of musicFiles) {
    const fileBuffer = await readFile(path.join(musicDir, f))
    const properties = await readProperties(fileBuffer)

    // const aa = await applyTagsToFile(path, {
    //   title: 'New Title',
    //   artist: 'New Artist',
    // })

    const duration = Math.floor(properties.duration)
    const nameWithoutExt = f.replace(/\.[^/.]+$/, '')
    const [title, artist] = nameWithoutExt.split(' - ')

    result.push({
      index: musicFiles.indexOf(f),
      title: title || nameWithoutExt,
      artist: artist || '未知艺术家',
      base64url: base64urlEncode(f),
      duration,
    })
  }
  return result
})
