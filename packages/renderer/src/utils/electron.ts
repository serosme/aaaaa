import type { ElectronAPI } from 'shared'

function getElectronAPI(): ElectronAPI {
  return window.electronAPI
}

export const electron = {
  getApplications: () => {
    return getElectronAPI().getApplications()
  },
  launchApplication: (appId) => {
    return getElectronAPI().launchApplication(appId)
  },
  selectDirectory: () => {
    return getElectronAPI().selectDirectory()
  },

  config: {
    get: (key) => {
      return getElectronAPI().config.get(key)
    },
    set: (key, value) => {
      return getElectronAPI().config.set(key, value)
    },
    unset: (key) => {
      return getElectronAPI().config.unset(key)
    },
    has: (key) => {
      return getElectronAPI().config.has(key)
    },
  },
} satisfies ElectronAPI
