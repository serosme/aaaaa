import type { ElectronAPI } from '@app/shared'
import { contextBridge, ipcRenderer } from 'electron'
import { IPC_CHANNELS } from './ipc/channels.js'

const electronAPI: ElectronAPI = {
  getNodeVersion: () => {
    return ipcRenderer.invoke(IPC_CHANNELS.GET_NODE_VERSION)
  },
  getApplications: () => {
    return ipcRenderer.invoke(IPC_CHANNELS.GET_APPLICATIONS)
  },
  launchApplication: (appId: string) => {
    return ipcRenderer.invoke(IPC_CHANNELS.LAUNCH_APPLICATION, appId)
  },
}

contextBridge.exposeInMainWorld('electronAPI', electronAPI)
