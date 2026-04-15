import type { ApplicationIPCChannels } from './application/index.js'
import type { ConfIPCChannels } from './conf/index.js'

export type IPCChannels = ConfIPCChannels & ApplicationIPCChannels
