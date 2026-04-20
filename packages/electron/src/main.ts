import { app, globalShortcut, Menu } from 'electron'
import { applicationIpc } from './ipc/application.js'
import { chatIpc } from './ipc/chat.js'
import { pathIpc } from './ipc/path.js'
import { windowIpc } from './ipc/window.js'
import { createAppTray } from './tray/index.js'
import { startRendererProcess } from './utils/window.js'
import { useChat } from './window/chat.js'
import { useCommand } from './window/command.js'

// 移除默认菜单栏
Menu.setApplicationMenu(null)

app.whenReady().then(async () => {
  // 启动渲染进程
  startRendererProcess()

  // 启动命令面板
  const { create, toggle } = useCommand()
  await create()

  await useChat()

  // 注册 IPC
  applicationIpc()
  chatIpc()
  pathIpc()
  windowIpc()

  // 注册全局快捷键
  globalShortcut.register('Alt+Space', () => toggle())

  // 创建系统托盘
  createAppTray(
    () => {},
    {
      label: '退出',
      click: () => {
        app.quit()
      },
    },
  )
})
