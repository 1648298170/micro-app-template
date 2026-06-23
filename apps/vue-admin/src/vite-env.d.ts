/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<object, object, unknown>
  export default component
}

declare module 'vite-plugin-qiankun/dist/helper' {
  export const qiankunWindow: Window & {
    __POWERED_BY_QIANKUN__?: boolean
  }

  export function renderWithQiankun(lifecycles: {
    bootstrap?: () => void | Promise<void>
    mount: (props: Record<string, unknown>) => void | Promise<void>
    unmount: (props?: Record<string, unknown>) => void | Promise<void>
    update?: (props?: Record<string, unknown>) => void | Promise<void>
  }): void
}
