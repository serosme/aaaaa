import type { ConfKey, MusicSchema, SpeechRecognition, StoreSchema } from './store.js'

export interface Application {
  name: string
  appId: string
}

export interface ElectronAPI {
  getApplications: () => Promise<Application[]>
  launchApplication: (appId: string) => Promise<void>
  selectDirectory: () => Promise<string | undefined>

  config: {
    get: <K extends ConfKey>(key: K) => Promise<StoreSchema[K]>
    set: <K extends ConfKey>(key: K, value: StoreSchema[K]) => Promise<void>
    unset: (key: ConfKey) => Promise<void>
    has: (key: ConfKey) => Promise<boolean>
  }

  conf: {
    music: {
      get: () => Promise<MusicSchema>
      set: (value: MusicSchema) => Promise<void>
    }
    speechRecognition: {
      get: () => Promise<SpeechRecognition>
      set: (value: SpeechRecognition) => Promise<void>
    }
  }
}
