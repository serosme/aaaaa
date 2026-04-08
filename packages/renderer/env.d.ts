/// <reference types="vite/client" />

export {}

declare global {
  interface Window {
    electronAPI: {
      getNodeVersion: () => Promise<string>
    }
  }
}
