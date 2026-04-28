import { readdir } from 'node:fs/promises'
import { extname } from 'node:path'
import { defineEventHandler } from 'h3'
import { readProperties, readTags } from 'taglib-wasm/simple'

const musicDir = conf.get('music').path
const exts = new Set(['.mp3', '.flac'])

export default defineEventHandler(async (): Promise<Music[]> => {
  const files = await readdir(musicDir)
  const musicFiles = files.filter(f => exts.has(extname(f).toLowerCase()))

  const result: Music[] = []

  for (const f of musicFiles) {
    const path = `${musicDir}/${f}`

    // const tags = await readTags(path)
    const properties = await readProperties(path)

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
