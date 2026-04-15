import type { ElectronAPI, MusicConf } from 'shared'

export const electron = {
  application: {
    get: () => window.electronAPI.application.get(),
    launch: (id: string) => window.electronAPI.application.launch(id),
  },

  path: {
    folder: {
      select: () => window.electronAPI.path.folder.select(),
    },
  },

  conf: {
    music: {
      get: () => window.electronAPI.conf.music.get(),
      set: (conf: MusicConf) => window.electronAPI.conf.music.set(conf),
    },
  },
} satisfies ElectronAPI
