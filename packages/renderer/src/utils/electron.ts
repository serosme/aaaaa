import type { ElectronAPI, MusicConf } from 'shared'

export const electron = {
  application: {
    get: () => window.electronAPI.application.get(),
    launch: (id: string) => window.electronAPI.application.launch(id),
  },

  selectDirectory: () => window.electronAPI.selectDirectory(),

  conf: {
    music: {
      get: () => window.electronAPI.conf.music.get(),
      set: (conf: MusicConf) => window.electronAPI.conf.music.set(conf),
    },
  },
} satisfies ElectronAPI
