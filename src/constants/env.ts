const env = typeof process !== 'undefined' ? process.env : import.meta.env

export const IS_DEV = env.VITE_IS_DEV === 'true'
export const IS_DEV_MODE = env.MODE === 'development'

const global: any = typeof window !== 'undefined' ? window : {}
global.setSessionOver = (seconds: number) => {
  localStorage.setItem('SESSION_OVER_MS', String(seconds * 1000))
  window.location.reload()
}
global.removeSessionOver = () => {
  localStorage.removeItem('SESSION_OVER_MS')
  window.location.reload()
}

export const { VITE_API_URL: API_URL, TEST: isTest, VITE_APP_NAME: APP_NAME } = env
