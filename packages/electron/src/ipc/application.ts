import { execSync, spawn } from 'node:child_process'
import { handle } from '../ipc.js'

export function applicationIpc() {
  handle('application:get', () => {
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
      id: app.AppID,
    }))
  })

  handle('application:launch', (_event, id) => {
    const child = spawn('explorer.exe', [`shell:AppsFolder\\${id}`], {
      detached: true,
      stdio: 'ignore',
    })

    child.unref()

    return true
  })
}
