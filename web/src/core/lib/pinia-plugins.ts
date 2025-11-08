import type { PiniaPluginContext } from 'pinia'

declare module 'pinia' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  export interface DefineStoreOptionsBase<S, Store> {
    storage?: 'localStorage' | 'sessionStorage'
  }
}

export function storagePlugin(context: PiniaPluginContext) {
  if (context.options.storage === undefined) return

  const storage = context.options.storage === 'localStorage' ? localStorage : sessionStorage
  storage.setItem(context.store.$id, JSON.stringify(context.store.$state))
  const originalReset = context.store.$reset.bind(context.store)

  return {
    $reset() {
      originalReset()
      storage.removeItem(context.store.$id)
    },
  }
}
