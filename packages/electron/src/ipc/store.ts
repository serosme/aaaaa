import type { ConfKey, StoreSchema } from 'shared'
import { ipcMain } from 'electron'
import { get, has, set, unset } from '../config-store.js'
import { IPC_CHANNELS } from './channels.js'

export function registerStoreIpc() {
  ipcMain.handle(IPC_CHANNELS.CONFIG_GET, (_, key: ConfKey) => {
    return get(key)
  })

  ipcMain.handle(IPC_CHANNELS.CONFIG_SET, (_, key: ConfKey, value: StoreSchema[ConfKey]) => {
    set(key, value)
  })

  ipcMain.handle(IPC_CHANNELS.CONFIG_UNSET, (_, key: ConfKey) => {
    unset(key)
  })

  ipcMain.handle(IPC_CHANNELS.CONFIG_HAS, (_, key: ConfKey) => {
    return has(key)
  })
}
