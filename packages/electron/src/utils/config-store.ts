import type { StoreSchema } from 'shared'
import Store from 'electron-store'

const schema = {
  music: {
    type: 'object',
    default: {
      path: '',
    },
    properties: {
      path: {
        type: 'string',
      },
    },
    required: ['path'],
  },
  asr: {
    type: 'object',
    default: {
      key: '',
    },
    properties: {
      key: {
        type: 'string',
      },
    },
    required: ['key'],
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
