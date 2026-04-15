import type { AsrConf } from './types/asr.js'
import type { MusicConf } from './types/music.js'

export interface StoreSchema {
  asr: AsrConf
  music: MusicConf
}

export type ConfKey = keyof StoreSchema
