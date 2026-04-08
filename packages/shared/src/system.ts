export interface Application {
  name: string
  appId: string
}

export interface ElectronAPI {
  getNodeVersion: () => Promise<string>
  getApplications: () => Promise<Application[]>
  launchApplication: (appId: string) => Promise<void>
}
