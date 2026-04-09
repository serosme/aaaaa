import type { Application } from '@app/shared'
import { execSync, spawn } from 'node:child_process'
import { ipcMain } from 'electron'
import { IPC_CHANNELS } from './channels.js'

export function getApplications(): Application[] {
  const stdout = execSync(
    'powershell -NoProfile -command "[Console]::OutputEncoding = [Text.UTF8Encoding]::UTF8; Get-StartApps | ConvertTo-Json"',
    { maxBuffer: 10 * 1024 * 1024 },
  ).toString()

  if (!stdout.trim()) {
    return []
  }

  const apps = JSON.parse(stdout) as Array<{ Name: string, AppID: string }>

  return apps.map(app => ({
    name: app.Name,
    appId: app.AppID,
  }))
}

export function launchApplication(appId: string): void {
  const child = spawn('explorer.exe', [`shell:AppsFolder\\${appId}`], {
    detached: true,
    stdio: 'ignore',
  })

  child.unref()
}

export function registerIpc() {
  ipcMain.handle(IPC_CHANNELS.GET_NODE_VERSION, () => {
    return '1111'
  })

  ipcMain.handle(IPC_CHANNELS.GET_APPLICATIONS, () => {
    return getApplications()
  })

  ipcMain.handle(IPC_CHANNELS.LAUNCH_APPLICATION, (_, appId: string) => {
    launchApplication(appId)
  })
}
