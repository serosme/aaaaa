export interface Application {
  name: string
  id: string
}

export interface ApplicationIPCChannels {
  'application:get': {
    args: []
    return: Application[]
  }
  'application:launch': {
    args: [string]
    return: boolean
  }
}
