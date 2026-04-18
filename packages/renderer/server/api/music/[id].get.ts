import { createReadStream, readdirSync, statSync } from 'node:fs'
import { extname, join } from 'node:path'
import { defineEventHandler, getHeader, setHeader, setResponseStatus } from 'h3'

const musicDir = conf.get('music').path
const audioExts = ['.mp3', '.flac', '.wav', '.m4a']

const mime: Record<string, string> = {
  '.flac': 'audio/flac',
  '.mp3': 'audio/mpeg',
}

export default defineEventHandler((event) => {
  const id = Number(event.context.params?.id)

  const files = readdirSync(musicDir)
    .filter(f => audioExts.includes(extname(f).toLowerCase()))

  const fileName = files[id]
  if (!fileName) {
    setResponseStatus(event, 404)
    return 'Not found'
  }

  const filePath = join(musicDir, fileName)
  const size = statSync(filePath).size
  const range = getHeader(event, 'range')

  setHeader(event, 'Content-Type', mime[extname(fileName)] || 'application/octet-stream')
  setHeader(event, 'Accept-Ranges', 'bytes')

  if (!range) {
    setHeader(event, 'Content-Length', size)
    return createReadStream(filePath)
  }

  const [, startStr, endStr] = range.match(/bytes=(\d+)-(\d*)/) || []
  const start = Number(startStr)
  const end = endStr ? Number(endStr) : size - 1

  setResponseStatus(event, 206)
  setHeader(event, 'Content-Range', `bytes ${start}-${end}/${size}`)
  setHeader(event, 'Content-Length', end - start + 1)

  return createReadStream(filePath, { start, end })
})
