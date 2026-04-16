import path from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'
import { app, BrowserWindow, Menu } from 'electron'

let mainWindow: BrowserWindow

// 移除默认菜单栏
Menu.setApplicationMenu(null)

export function createMainWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 720,
    skipTaskbar: true,
    // transparent: true,
    // frame: false,
    webPreferences: {
      preload: fileURLToPath(new URL('../preload.js', import.meta.url)),
      sandbox: false,
      webSecurity: false,
      contextIsolation: true,
      nodeIntegration: false,
    },
  })

  if (process.env.NODE_ENV === 'dev') {
    mainWindow.loadURL('http://localhost:3000')
  }
  else {
    mainWindow.loadFile(path.join(app.getAppPath(), '../renderer/dist/index.html'))
  }

  // 监听窗口关闭事件，隐藏窗口而不是退出应用
  mainWindow.on('close', (event: Electron.Event) => {
    event.preventDefault()
    mainWindow?.hide()
  })

  // 监听窗口失焦事件，失焦时隐藏窗口
  mainWindow.on('blur', () => {
    hideMainWindow()
  })
}

export function showMainWindow() {
  if (!mainWindow.isVisible()) {
    mainWindow.show()
    mainWindow.focus()
  }
}

export function hideMainWindow() {
  mainWindow.hide()
}

export function toggleMainWindow() {
  if (mainWindow.isVisible()) {
    hideMainWindow()
  }
  else {
    showMainWindow()
  }
}

export function removeCloseListener() {
  mainWindow?.removeAllListeners('close')
}
