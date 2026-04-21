import type { ElectronAPI, IPCChannels } from 'shared'
import { contextBridge, ipcRenderer } from 'electron'

export function invoke<K extends keyof IPCChannels>(
  channel: K,
  ...args: IPCChannels[K]['args']
): Promise<IPCChannels[K]['return']> {
  return ipcRenderer.invoke(channel, ...args)
}

const electronAPI: ElectronAPI = {
  chat: {
    send: (text: string) => invoke('chat:send', text),
  },

  path: {
    folder: {
      select: () => invoke('path:folder:select'),
    },
  },

  window: {
    create: (path: string) => invoke('window:create', path),
    close: (id: number) => invoke('window:close', id),
  },
}

contextBridge.exposeInMainWorld('electronAPI', electronAPI)
