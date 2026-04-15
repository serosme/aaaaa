import { app, globalShortcut } from 'electron'
import { applicationIpc } from './ipc/application.js'
import { confIpc } from './ipc/conf.js'
import { pathIpc } from './ipc/path.js'
import { createAppTray } from './tray/index.js'
import { createMainWindow, removeCloseListener, toggleMainWindow } from './window/main.js'

app.whenReady().then(() => {
  // 创建主窗口
  createMainWindow()

  // 注册
  applicationIpc()
  confIpc()
  pathIpc()

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
