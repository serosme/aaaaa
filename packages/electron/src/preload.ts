import type { ElectronAPI, IPCChannels, MusicConf } from 'shared'
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

  selectDirectory(): Promise<string> {
    throw new Error('Function not implemented.')
  },

  conf: {
    music: {
      get: () => invoke('conf:music:get'),
      set: (conf: MusicConf) => invoke('conf:music:set', conf),
    },
  },

}

contextBridge.exposeInMainWorld('electronAPI', electronAPI)
