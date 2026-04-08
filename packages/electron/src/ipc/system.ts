import { IPC_CHANNELS } from '@app/shared'
import { ipcMain } from 'electron'

export function registerIpc() {
  ipcMain.handle(IPC_CHANNELS.GET_NODE_VERSION, () => {
    return '1111'
  })
}
