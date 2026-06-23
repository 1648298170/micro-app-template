export interface UserInfo {
  id: string
  name: string
  tenantId: string
}

export interface AuthState {
  token: string
  userInfo: UserInfo
  roles: string[]
  permissions: string[]
}

export function hasPermission(permissions: string[], code: string) {
  return permissions.includes(code)
}
