import type { ElectronAPI } from 'shared'

export const electron = {
  chat: {
    send: (text: string) => window.electronAPI.chat.send(text),
  },

  path: {
    folder: {
      select: () => window.electronAPI.path.folder.select(),
    },
  },

  window: {
    create: (path: string) => window.electronAPI.window.create(path),
    close: (id: number) => window.electronAPI.window.close(id),
  },
} satisfies ElectronAPI
