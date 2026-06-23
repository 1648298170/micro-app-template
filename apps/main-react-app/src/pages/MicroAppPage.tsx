import { useEffect } from 'react'
import { ensureMicroAppsStarted } from '../config/register-micro-apps'

export function MicroAppPage() {
  useEffect(() => {
    // 懒启动 qiankun：只有进入微应用路由时才注册和启动，减少主应用首屏负担。
    // 实际挂载容器由 BasicLayout 常驻提供，避免 mount 时容器已被路由卸载。
    ensureMicroAppsStarted()
  }, [])

  return null
}
