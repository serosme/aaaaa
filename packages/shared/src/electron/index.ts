import type { Application } from '../ipc/application.js'

export interface ElectronAPI {
  application: {
    get: () => Promise<Application[]>
    launch: (id: string) => Promise<boolean>
  }

  chat: {
    send: (text: string) => Promise<void>
  }

  path: {
    folder: {
      select: () => Promise<string>
    }
  }

  window: {
    create: (path: string) => Promise<number>
    close: (id: number) => Promise<boolean>
  }
}
