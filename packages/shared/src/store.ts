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
        key: 'qwen',
        js: 'https://chat.qwen.ai',
      },
      {
        key: 'deepseek',
        js: '// 默认中继脚本\nconsole.log("relay loaded");',
      },
      {
        key: 'chatgpt',
        js: '// 默认中继脚本\nconsole.log("relay loaded");',
      },
    ],
    items: {
      type: 'object',
      properties: {
        key: {
          type: 'string',
          description: '中继的唯一标识',
        },
        js: {
          type: 'string',
          description: '中继的 JavaScript 代码或脚本',
        },
      },
      required: ['key', 'js'],
      additionalProperties: false,
    },
  },
} satisfies Record<keyof StoreSchema, unknown>

export interface StoreSchema {
  asr: AsrConf
  music: MusicConf
  relay: RelayConf[]
}
