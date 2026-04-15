import type { StoreSchema } from 'shared'
import Store from 'electron-store'

const schema = {
  music: {
    type: 'object',
    default: {
      path: 'C:\\Users\\User\\Downloads',
    },
    properties: {
      path: {
        type: 'string',
      },
    },
    required: ['path'],
  },
  speechRecognition: {
    type: 'object',
    default: {
      url: 'https://openspeech.bytedance.com/api/v3/auc/bigmodel/recognize/flash',
      key: '',
    },
    properties: {
      url: {
        type: 'string',
      },
      key: {
        type: 'string',
      },
    },
    required: ['url', 'key'],
  },
}

const store = new Store<StoreSchema>({ schema })

export function set<K extends keyof StoreSchema>(key: K, value: StoreSchema[K]) {
  store.set(key, value)
}

export function get<K extends keyof StoreSchema>(key: K): StoreSchema[K] {
  return store.get(key)
}

export function unset<K extends keyof StoreSchema>(key: K): void {
  store.delete(key)
}

export function has<K extends keyof StoreSchema>(key: K): boolean {
  return store.has(key)
}
