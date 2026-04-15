export interface MusicSchema {
  path: string
}

export interface SpeechRecognition {
  url: string
  key: string
}

export interface StoreSchema {
  speechRecognition: SpeechRecognition
  music: MusicSchema
}

export type ConfKey = keyof StoreSchema
