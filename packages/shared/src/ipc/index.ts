import type { ApplicationIPCChannels } from './application.js'
import type { ConfIPCChannels } from './conf.js'
import type { PathIPCChannels } from './path.js'

export type IPCChannels = PathIPCChannels & ConfIPCChannels & ApplicationIPCChannels
