import type { Application } from '../ipc/application.js'
import type { AsrConf } from '../types/asr.js'
import type { MusicConf } from '../types/music.js'

export interface ElectronAPI {
  application: {
    get: () => Promise<Application[]>
    launch: (id: string) => Promise<boolean>
  }

  path: {
    folder: {
      select: () => Promise<string>
    }
  }

  conf: {
    music: {
      get: () => Promise<MusicConf>
      set: (conf: MusicConf) => Promise<boolean>
    }
    asr: {
      get: () => Promise<AsrConf>
      set: (conf: AsrConf) => Promise<boolean>
    }
  }

  window: {
    create: (path: string) => Promise<number>
    close: (id: number) => Promise<boolean>
  }
}
