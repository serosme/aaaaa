export interface MusicSchema {
  path: string
}

export interface StoreSchema {
  key: string
  music: MusicSchema
}

export type ConfKey = keyof StoreSchema
