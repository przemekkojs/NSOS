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

  const storedState = storage.getItem(context.store.$id)
  if (storedState) {
    try {
      context.store.$patch(JSON.parse(storedState))
    } catch (error) {
      console.error(`Failed to parse stored state fro ${context.store.$id}: `, error)
    }
  }

  context.store.$subscribe(() => {
    storage.setItem(context.store.$id, JSON.stringify(context.store.$state))
  })

  const originalReset = context.store.$reset.bind(context.store)
  return {
    $reset() {
      originalReset()
      storage.removeItem(context.store.$id)
    },
  }
}
