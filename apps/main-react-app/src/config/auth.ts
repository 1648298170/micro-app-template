import type { AuthState } from '@packages/shared'

export const authState: AuthState = {
  token: 'dev-token',
  userInfo: {
    id: 'u-1001',
    name: 'Platform Admin',
    tenantId: 'tenant-main',
  },
  roles: ['admin'],
  permissions: ['react-admin:view', 'vue-admin:view', 'dashboard:view'],
}

export const getToken = () => authState.token
export const getUserInfo = () => authState.userInfo
export const getPermissions = () => authState.permissions
