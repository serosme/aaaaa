import type { AsrConf } from '../types/asr.js'
import type { MusicConf } from '../types/music.js'

export interface ConfIPCChannels {
  'conf:music:get': {
    args: []
    return: MusicConf
  }
  'conf:music:set': {
    args: [MusicConf]
    return: boolean
  }
  'conf:asr:get': {
    args: []
    return: AsrConf
  }
  'conf:asr:set': {
    args: [AsrConf]
    return: boolean
  }
}
