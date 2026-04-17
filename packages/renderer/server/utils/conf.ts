import type { StoreSchema } from 'shared'
import os from 'node:os'
import path from 'node:path'
import Conf from 'conf'

const schema = {
  music: {
    type: 'object',
    default: {
      path: 'aaa',
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
} as const

const conf = new Conf<StoreSchema>({
  cwd: path.join(os.homedir(), '.config', 'tools'),
  schema,
})

export default conf
