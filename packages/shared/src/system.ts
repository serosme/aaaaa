export interface Application {
  name: string
  appId: string
}

export interface ElectronAPI {
  getApplications: () => Promise<Application[]>
  launchApplication: (appId: string) => Promise<void>
}
