import type { RegistrableApp } from 'qiankun'
import { eventBus } from './event-bus'
import { getPermissions, getToken, getUserInfo } from './auth'

const defaultEntries = {
  reactAdmin: 'http://localhost:7101',
  vueAdmin: 'http://localhost:7102',
}

// 主应用只声明微应用边界：name、entry、container、activeRule 和运行时 props。
// 生产环境建议从 manifest 服务解析 entry，避免主应用和子应用版本硬绑定。
export const microApps: RegistrableApp<Record<string, unknown>>[] = [
  {
    name: 'react-admin',
    entry: import.meta.env.VITE_REACT_ADMIN_ENTRY ?? defaultEntries.reactAdmin,
    container: '#micro-app-container',
    activeRule: '/react-admin',
    // props 是主应用和子应用之间的稳定协议，子应用不要直接读取主应用内部模块。
    props: {
      getToken,
      getUserInfo,
      getPermissions,
      eventBus,
    },
  },
  {
    name: 'vue-admin',
    entry: import.meta.env.VITE_VUE_ADMIN_ENTRY ?? defaultEntries.vueAdmin,
    container: '#micro-app-container',
    activeRule: '/vue-admin',
    // 保持所有子应用拿到同一套认证、权限和事件能力，避免通信方式发散。
    props: {
      getToken,
      getUserInfo,
      getPermissions,
      eventBus,
    },
  },
]
