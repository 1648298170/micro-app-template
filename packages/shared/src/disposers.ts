export type Disposer = () => void

// 子应用统一登记副作用清理函数，例如事件监听、定时器、订阅和 WebSocket。
export function createDisposerRegistry() {
  const disposers = new Set<Disposer>()

  return {
    add(disposer: Disposer) {
      disposers.add(disposer)
      return () => disposers.delete(disposer)
    },
    flush() {
      // unmount 时集中执行，避免微应用切换后出现内存泄漏或重复监听。
      disposers.forEach((dispose) => dispose())
      disposers.clear()
    },
    size() {
      return disposers.size
    },
  }
}
