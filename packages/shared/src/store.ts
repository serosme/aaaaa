export interface MusicConf {
  path: string
}

export interface SpeechRecognition {
  url: string
  key: string
}

export interface StoreSchema {
  speechRecognition: SpeechRecognition
  music: MusicConf
}

export type ConfKey = keyof StoreSchema
