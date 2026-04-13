export interface MusicItem {
  path: string
  name: string
}

export interface StoreSchema {
  key: string
  musicDir: string
  music: MusicItem[]
}

export type ConfKey = keyof StoreSchema
