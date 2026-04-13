import type { StoreSchema } from 'shared'
import Store from 'electron-store'

const schema = {
  key: {
    type: 'string',
    default: '',
  },
  musicDir: {
    type: 'string',
    default: 'C:\\Users\\User\\Downloads',
  },
  music: {
    type: 'array',
    default: [],
    items: {
      type: 'object',
      properties: {
        path: {
          type: 'string',
          minLength: 1,
        },
        name: {
          type: 'string',
          minLength: 1,
        },
      },
      required: ['path', 'name'],
      additionalProperties: false,
    },
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
