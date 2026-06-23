import type { AuthState } from './auth'
import type { EventBus } from './events'

export interface MicroAppRuntimeProps {
  // 主应用下发的只读运行时能力；子应用通过函数读取，避免缓存过期的 token/userInfo。
  getToken: () => string
  getUserInfo: () => AuthState['userInfo']
  getPermissions: () => string[]
  eventBus: EventBus
}

export interface MicroAppManifestItem {
  // version + entry 支持主应用锁定子应用版本，也支持灰度和快速回滚。
  version: string
  entry: string
  status: 'stable' | 'gray' | 'offline'
}

export type MicroAppManifest = Record<string, MicroAppManifestItem>
