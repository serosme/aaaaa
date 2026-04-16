import path from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'
import { app, BrowserWindow } from 'electron'

export function createWindow(routePath: string): number {
  const newWindow = new BrowserWindow({
    width: 1280,
    height: 720,
    skipTaskbar: false,
    webPreferences: {
      preload: fileURLToPath(new URL('../preload.js', import.meta.url)),
      sandbox: false,
      webSecurity: false,
      contextIsolation: true,
      nodeIntegration: false,
    },
  })

  if (process.env.NODE_ENV === 'dev') {
    newWindow.loadURL(`http://localhost:3000/#${routePath}`)
    newWindow.webContents.openDevTools()
  }
  else {
    newWindow.loadFile(path.join(app.getAppPath(), '../renderer/.output/public/index.html'), { hash: routePath })
    newWindow.webContents.openDevTools()
  }

  return newWindow.id
}

export function closeWindow(id: number): boolean {
  const win = BrowserWindow.fromId(id)
  if (!win)
    return false
  win.close()
  return true
}
