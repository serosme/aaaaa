import type { Application } from '../application/index.js'
import type { MusicConf } from '../store.js'

export interface ElectronAPI {
  application: {
    get: () => Promise<Application[]>
    launch: (id: string) => Promise<boolean>
  }

  selectDirectory: () => Promise<string>

  conf: {
    music: {
      get: () => Promise<MusicConf>
      set: (conf: MusicConf) => Promise<boolean>
    }
  }
}
