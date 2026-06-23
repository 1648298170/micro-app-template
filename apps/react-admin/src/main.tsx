import type { MicroAppRuntimeProps } from '@packages/shared'
import { createDisposerRegistry, MICRO_EVENTS, reportAppVersion } from '@packages/shared'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { qiankunWindow, renderWithQiankun } from 'vite-plugin-qiankun/dist/helper'
import { App } from './App'
import './styles/global.css'

let root: ReactDOM.Root | null = null
const disposers = createDisposerRegistry()

type RuntimeProps = Partial<MicroAppRuntimeProps> & {
  container?: Element
}

function render(props?: RuntimeProps) {
  // qiankun 挂载时必须在主应用传入的 container 内查找根节点，避免误挂到全局 DOM。
  const container = props?.container as Element | undefined
  const mountPoint =
    container?.querySelector('#react-admin-root') ?? document.querySelector('#react-admin-root')

  root = ReactDOM.createRoot(mountPoint!)
  root.render(
    <React.StrictMode>
      <BrowserRouter basename={qiankunWindow.__POWERED_BY_QIANKUN__ ? '/react-admin' : '/'}>
        <App runtimeProps={props} />
      </BrowserRouter>
    </React.StrictMode>,
  )

  reportAppVersion({
    appName: 'react-admin',
    version: '0.1.0',
    entry: window.location.origin,
  })
}

renderWithQiankun({
  bootstrap() {
    console.info('[react-admin] bootstrap')
  },
  mount(props) {
    const runtimeProps = props as RuntimeProps
    const unsubscribe = runtimeProps.eventBus?.on(MICRO_EVENTS.NOTIFICATION_PUSH, (payload) => {
      console.info('[react-admin] notification', payload)
    })

    // 所有订阅都登记到 disposer，保证 unmount 时清理干净。
    if (unsubscribe) disposers.add(unsubscribe)
    render(runtimeProps)
  },
  unmount() {
    // React root 和跨应用事件订阅都必须释放，防止反复进入子应用后重复渲染或重复监听。
    root?.unmount()
    root = null
    disposers.flush()
  },
  update() {
    console.info('[react-admin] update')
  },
})

if (!qiankunWindow.__POWERED_BY_QIANKUN__) {
  render()
}
