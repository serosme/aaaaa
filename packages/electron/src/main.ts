import { app, globalShortcut } from 'electron'
import { createMainWindow, toggleMainWindow } from './window/main.js'

app.whenReady().then(() => {
  // 创建主窗口
  createMainWindow()

  // 注册全局快捷键
  globalShortcut.register('Alt+Space', () => toggleMainWindow())
})

app.on('window-all-closed', () => {
  // 阻止应用在所有窗口关闭时退出
})
