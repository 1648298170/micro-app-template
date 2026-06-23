export interface AppVersionInfo {
  appName: string
  version: string
  entry?: string
}

export function reportAppVersion(info: AppVersionInfo) {
  console.info(`[micro-app] ${info.appName}@${info.version}`, info.entry ?? '')
}
