import type { ConfKey, ElectronAPI, StoreSchema } from 'shared'
import { contextBridge, ipcRenderer } from 'electron'
import { IPC_CHANNELS } from './ipc/channels.js'

const electronAPI: ElectronAPI = {
  getApplications: () => {
    return ipcRenderer.invoke(IPC_CHANNELS.GET_APPLICATIONS)
  },
  launchApplication: (appId: string) => {
    return ipcRenderer.invoke(IPC_CHANNELS.LAUNCH_APPLICATION, appId)
  },
  config: {
    get: <K extends ConfKey>(key: K) => {
      return ipcRenderer.invoke(IPC_CHANNELS.CONFIG_GET, key) as Promise<StoreSchema[K]>
    },
    set: <K extends ConfKey>(key: K, value: StoreSchema[K]) => {
      return ipcRenderer.invoke(IPC_CHANNELS.CONFIG_SET, key, value)
    },
    unset: (key: ConfKey) => {
      return ipcRenderer.invoke(IPC_CHANNELS.CONFIG_UNSET, key)
    },
    has: (key: ConfKey) => {
      return ipcRenderer.invoke(IPC_CHANNELS.CONFIG_HAS, key)
    },
  },
}

contextBridge.exposeInMainWorld('electronAPI', electronAPI)
