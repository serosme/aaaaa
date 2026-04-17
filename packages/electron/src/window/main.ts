import path from 'node:path'
import process from 'node:process'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { app, BrowserWindow, Menu } from 'electron'

let mainWindow: BrowserWindow

// 移除默认菜单栏
Menu.setApplicationMenu(null)

async function waitForServer(url: string, timeout = 1500000) {
  const start = Date.now()
  while (Date.now() - start < timeout) {
    try {
      if ((await fetch(url, { method: 'HEAD' })).status < 500)
        return
    }
    catch {}
    await new Promise(r => setTimeout(r, 300))
  }
  throw new Error(`Server not ready: ${url}`)
}

async function loadURL() {
  if (process.env.NODE_ENV === 'dev') {
    await waitForServer('http://localhost:3000')
  }
  else {
    import(pathToFileURL(path.join(app.getAppPath(), '../renderer/.output/server/index.mjs')).href)
    await waitForServer('http://localhost:3000')
  }
  mainWindow.loadURL('http://localhost:3000')
}

function openDevTools() {
  if (process.env.NODE_ENV === 'dev' || process.env.NODE_ENV === 'preview') {
    mainWindow.webContents.openDevTools()
  }
}

export async function createMainWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 720,
    show: false,
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

  //
  loadURL()

  // 打开开发者工具
  openDevTools()

  mainWindow.once('ready-to-show', () => {
    mainWindow.show()
  })

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
