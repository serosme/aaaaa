import type { ApplicationIPCChannels } from './application.js'
import type { ChatIPCChannels } from './chat.js'
import type { PathIPCChannels } from './path.js'
import type { WindowIPCChannels } from './window.js'

export type IPCChannels = PathIPCChannels & ApplicationIPCChannels & WindowIPCChannels & ChatIPCChannels
