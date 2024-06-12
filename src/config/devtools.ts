import { APP_NAME } from 'constants/env'
import { devtools as createDevtools } from 'zustand/middleware'

export const devtools: typeof createDevtools = (initializer, options) =>
  createDevtools(initializer, { ...options, name: APP_NAME })
