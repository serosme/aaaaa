export interface WindowIPCChannels {
  'window:create': {
    args: [string]
    return: number
  }
  'window:close': {
    args: [number]
    return: boolean
  }
}
