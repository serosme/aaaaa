export interface MusicConf {
  path: string
}

export interface ConfIPCChannels {
  'conf:music:get': {
    args: []
    return: MusicConf
  }
  'conf:music:set': {
    args: [MusicConf]
    return: boolean
  }
}
