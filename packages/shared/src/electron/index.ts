export interface ElectronAPI {
  chat: {
    send: (text: string) => Promise<void>
  }

  relay: {
    open: () => Promise<void>
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
