export const MICRO_EVENTS = {
  AUTH_LOGOUT: 'auth:logout',
  MENU_REFRESH: 'menu:refresh',
  THEME_CHANGE: 'theme:change',
  NOTIFICATION_PUSH: 'notification:push',
} as const

export type MicroEventName = (typeof MICRO_EVENTS)[keyof typeof MICRO_EVENTS]

// 所有跨应用事件必须在这里声明 payload 类型，避免事件名和数据结构自由生长。
export interface MicroEventPayloads {
  [MICRO_EVENTS.AUTH_LOGOUT]: { reason?: string }
  [MICRO_EVENTS.MENU_REFRESH]: { source: string }
  [MICRO_EVENTS.THEME_CHANGE]: { theme: 'light' | 'dark' }
  [MICRO_EVENTS.NOTIFICATION_PUSH]: { title: string; message: string }
}

type Listener<T> = (payload: T) => void

export interface EventBus {
  emit<K extends MicroEventName>(eventName: K, payload: MicroEventPayloads[K]): void
  on<K extends MicroEventName>(eventName: K, listener: Listener<MicroEventPayloads[K]>): () => void
}

export function createEventBus(): EventBus {
  const listeners = new Map<MicroEventName, Set<Listener<MicroEventPayloads[MicroEventName]>>>()

  return {
    emit(eventName, payload) {
      listeners.get(eventName)?.forEach((listener) => listener(payload))
    },
    on(eventName, listener) {
      const eventListeners = listeners.get(eventName) ?? new Set()
      eventListeners.add(listener as Listener<MicroEventPayloads[MicroEventName]>)
      listeners.set(eventName, eventListeners)

      // 返回取消订阅函数，子应用必须在 unmount 时调用，防止卸载后仍响应事件。
      return () => {
        eventListeners.delete(listener as Listener<MicroEventPayloads[MicroEventName]>)
      }
    },
  }
}
