export interface ChatIPCChannels {
  'chat:send': {
    args: [string]
    return: void
  }
}
