import type { RelayConf } from './conf/relay.js'
import type { AsrConf } from './types/asr.js'
import type { MusicConf } from './types/music.js'

export const schema = {
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
    additionalProperties: false,
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
    additionalProperties: false,
  },
  relay: {
    type: 'array',
    default: [
      {
        name: 'qwen',
        url: 'https://chat.qwen.ai',
        send: 'alert(\'Hello {{TEXT}}!\');',
      },
      {
        name: 'deepseek',
        url: 'https://chat.deepseek.com',
        send: 'alert(\'Hello {{TEXT}}!\');',
      },
      {
        name: 'chatgpt',
        url: 'https://chatgpt.com',
        send: 'alert(\'Hello {{TEXT}}!\');',
      },
    ],
    items: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
        },
        url: {
          type: 'string',
        },
        send: {
          type: 'string',
        },
      },
      required: ['name', 'url', 'send'],
      additionalProperties: false,
    },
  },
} satisfies Record<keyof StoreSchema, unknown>

export interface StoreSchema {
  asr: AsrConf
  music: MusicConf
  relay: RelayConf[]
}
