import { app, globalShortcut } from 'electron'
import { registerStoreIpc } from './ipc/store.js'
import { registerIpc } from './ipc/system.js'
import { createAppTray } from './tray.js'
import { createMainWindow, removeCloseListener, toggleMainWindow } from './window/main.js'

app.whenReady().then(() => {
  // 创建主窗口
  createMainWindow()

  // 注册
  registerIpc()
  registerStoreIpc()

  // 注册全局快捷键
  globalShortcut.register('Alt+Space', () => toggleMainWindow())

  // 创建系统托盘
  createAppTray(
    () => {},
    {
      label: '退出',
      click: () => {
        removeCloseListener()
        app.quit()
      },
    },
  )
})

app.on('window-all-closed', () => {
  // 阻止应用在所有窗口关闭时退出
})
