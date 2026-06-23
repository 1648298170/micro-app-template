import { registerMicroApps, start } from 'qiankun'
import { microApps } from './micro-apps'

let started = false

export function ensureMicroAppsStarted() {
  // qiankun 只能启动一次；页面重复进入微应用路由时直接复用已注册实例。
  if (started) return

  registerMicroApps(microApps, {
    beforeLoad: [
      async (app) => {
        console.info(`[qiankun] loading ${app.name}`)
      },
    ],
    afterMount: [
      async (app) => {
        console.info(`[qiankun] mounted ${app.name}`)
      },
    ],
    afterUnmount: [
      async (app) => {
        console.info(`[qiankun] unmounted ${app.name}`)
      },
    ],
  })

  start({
    prefetch: true,
    // experimentalStyleIsolation 会给子应用样式增加隔离作用域。
    // 仍需配合子应用根节点命名空间，尤其是弹窗、下拉等挂载到 body 的组件。
    sandbox: {
      experimentalStyleIsolation: true,
    },
  })

  started = true
}
