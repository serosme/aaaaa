import type { ConfKey, StoreSchema } from './store.js'

export interface Application {
  name: string
  appId: string
}

export interface ElectronAPI {
  getApplications: () => Promise<Application[]>
  launchApplication: (appId: string) => Promise<void>

  config: {
    get: <K extends ConfKey>(key: K) => Promise<StoreSchema[K]>
    set: <K extends ConfKey>(key: K, value: StoreSchema[K]) => Promise<void>
    unset: (key: ConfKey) => Promise<void>
    has: (key: ConfKey) => Promise<boolean>
  }
}
