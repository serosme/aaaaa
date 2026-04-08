import { IPC_CHANNELS } from '@app/shared'
import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('electronAPI', {
  getNodeVersion: () => {
    return ipcRenderer.invoke(IPC_CHANNELS.GET_NODE_VERSION)
  },
})
