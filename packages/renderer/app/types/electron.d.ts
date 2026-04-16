import type { ElectronAPI } from 'shared'

export {}

declare global {
  interface Window {
    electronAPI: ElectronAPI
  }
}
