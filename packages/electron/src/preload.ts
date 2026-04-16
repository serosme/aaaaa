import type { AsrConf, ElectronAPI, IPCChannels, MusicConf } from 'shared'
import { contextBridge, ipcRenderer } from 'electron'

export function invoke<K extends keyof IPCChannels>(
  channel: K,
  ...args: IPCChannels[K]['args']
): Promise<IPCChannels[K]['return']> {
  return ipcRenderer.invoke(channel, ...args)
}

const electronAPI: ElectronAPI = {
  application: {
    get: () => invoke('application:get'),
    launch: (id: string) => invoke('application:launch', id),
  },

  path: {
    folder: {
      select: () => invoke('path:folder:select'),
    },
  },

  conf: {
    music: {
      get: () => invoke('conf:music:get'),
      set: (conf: MusicConf) => invoke('conf:music:set', conf),
    },
    asr: {
      get: () => invoke('conf:asr:get'),
      set: (conf: AsrConf) => invoke('conf:asr:set', conf),
    },
  },

  window: {
    create: (path: string) => invoke('window:create', path),
    close: (id: number) => invoke('window:close', id),
  },
}

contextBridge.exposeInMainWorld('electronAPI', electronAPI)
