import type { ElectronAPI } from 'shared'

export const electron = {
  application: {
    get: () => window.electronAPI.application.get(),
    launch: (id: string) => window.electronAPI.application.launch(id),
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
