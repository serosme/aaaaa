/// <reference types="vite/client" />
import type { ElectronAPI } from '@app/shared'

export {}

declare global {
  interface Window {
    electronAPI: ElectronAPI
  }
}
