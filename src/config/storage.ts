import { storageAuthName, storageLang, storageRefreshName, storageTokenName } from 'constants/storage'

// Для работы хука useLocalStorage
const dispatchEventStorage = () => {
  const eventLocalStorage = new Event('local-storage')
  window.dispatchEvent(eventLocalStorage)
  const eventSessionStorage = new Event('session-storage')
  window.dispatchEvent(eventSessionStorage)
}

const storage = {
  setItem: <T>(name: string, data: T, remember: boolean = true): void => {
    const stringifiedData = JSON.stringify(data)
    if (remember) {
      window.localStorage.setItem(name, stringifiedData)
    } else {
      window.sessionStorage.setItem(name, stringifiedData)
    }
  },
  getItem: <T>(name: string): T | null => {
    const data = window.localStorage.getItem(name) || window.sessionStorage.getItem(name)
    if (!data) {
      return null
    }
    return JSON.parse(data) as T
  },
  removeItem: (key: string) => {
    window.localStorage.removeItem(key)
    window.sessionStorage.removeItem(key)
  },
  getToken: (): string => {
    const tokenLS = window.localStorage.getItem(storageTokenName) as string
    const tokenSession = window.sessionStorage.getItem(storageTokenName) as string
    return tokenLS ? tokenLS : tokenSession
  },
  setToken: (token: string, remember?: boolean): void => {
    const store = remember ? window.localStorage : window.sessionStorage
    const clearedStore = remember ? window.sessionStorage : window.localStorage
    store.setItem(storageTokenName, token)
    store.setItem(storageAuthName, JSON.stringify({ value: !!token }))
    clearedStore.removeItem(storageTokenName)
    clearedStore.removeItem(storageAuthName)
    dispatchEventStorage()
  },
  getRefresh: (): string => {
    const tokenLS = window.localStorage.getItem(storageRefreshName) as string
    const tokenSession = window.sessionStorage.getItem(storageRefreshName) as string
    return tokenLS ? tokenLS : tokenSession
  },
  setRefresh: (refresh: string, remember?: boolean): void => {
    const store = remember ? window.localStorage : window.sessionStorage
    const clearedStore = remember ? window.sessionStorage : window.localStorage
    store.setItem(storageRefreshName, refresh)
    clearedStore.removeItem(storageRefreshName)
  },
  clearToken: (): void => {
    window.localStorage.removeItem(storageLang)
    window.localStorage.removeItem(storageTokenName)
    window.localStorage.removeItem(storageAuthName)
    window.localStorage.removeItem(storageRefreshName)
    window.sessionStorage.removeItem(storageTokenName)
    window.sessionStorage.removeItem(storageAuthName)
    window.sessionStorage.removeItem(storageRefreshName)
    dispatchEventStorage()
  },
}

export default storage
