import type { MicroAppRuntimeProps } from '@packages/shared'
import { createDisposerRegistry, MICRO_EVENTS, reportAppVersion } from '@packages/shared'
import { createApp, type App as VueApp } from 'vue'
import { createRouter, createWebHistory, type Router } from 'vue-router'
import { qiankunWindow, renderWithQiankun } from 'vite-plugin-qiankun/dist/helper'
import RootApp from './App.vue'
import OperationsView from './pages/OperationsView.vue'
import './styles/global.css'

let app: VueApp<Element> | null = null
let router: Router | null = null
const disposers = createDisposerRegistry()

type RuntimeProps = Partial<MicroAppRuntimeProps> & {
  container?: Element
}

function render(props?: RuntimeProps) {
  // qiankun 模式挂载到主应用 container；独立运行时挂载到自身 index.html 的根节点。
  const container = props?.container as Element | undefined
  const mountPoint =
    container?.querySelector('#vue-admin-root') ?? document.querySelector('#vue-admin-root')

  router = createRouter({
    // basename 必须和主应用 activeRule 保持一致，否则刷新和内部跳转容易 404。
    history: createWebHistory(qiankunWindow.__POWERED_BY_QIANKUN__ ? '/vue-admin' : '/'),
    routes: [{ path: '/', component: OperationsView }],
  })

  app = createApp(RootApp, { runtimeProps: props })
  // qiankun 挂载模式下，Vue DevTools 浏览器扩展可能在子应用卸载后继续访问旧 app 记录，
  // 导致扩展自身的 prepare.js 报 Cannot read properties of undefined (reading 'app')。
  // 独立运行时保留 devtools，嵌入主应用时关闭，降低扩展对微前端生命周期的干扰。
  ;(app.config as typeof app.config & { devtools?: boolean }).devtools =
    !qiankunWindow.__POWERED_BY_QIANKUN__
  app.use(router)
  app.mount(mountPoint!)

  reportAppVersion({
    appName: 'vue-admin',
    version: '0.1.0',
    entry: window.location.origin,
  })
}

renderWithQiankun({
  bootstrap() {
    console.info('[vue-admin] bootstrap')
  },
  mount(props) {
    const runtimeProps = props as RuntimeProps
    const unsubscribe = runtimeProps.eventBus?.on(MICRO_EVENTS.NOTIFICATION_PUSH, (payload) => {
      console.info('[vue-admin] notification', payload)
    })

    // 子应用监听主应用事件后，需要在 unmount 阶段统一取消订阅。
    if (unsubscribe) disposers.add(unsubscribe)
    render(runtimeProps)
  },
  unmount() {
    // Vue app、router 引用和事件订阅一起释放，保证子应用可重复挂载。
    app?.unmount()
    app = null
    router = null
    disposers.flush()
  },
  update() {
    console.info('[vue-admin] update')
  },
})

if (!qiankunWindow.__POWERED_BY_QIANKUN__) {
  render()
}
