export interface IntegrationItem{
    connected: boolean,
    name: string,
}
  
export interface LambaSettings {
    icon: string
    theme: string
    title: string
    appId: string,
    customerId: string,
    enabledServices: string[],
    usageCapabilities: string[], 
}

export interface LambaPublicRuntimeConfig{
    alwaysUseUpToDateVersions: boolean
}
  