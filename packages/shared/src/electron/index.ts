import type { Application } from '../ipc/application.js'
import type { MusicConf } from '../store.js'

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
  }
}
