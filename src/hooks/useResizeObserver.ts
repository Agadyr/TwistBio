import { RefObject, useEffect } from 'react'

interface ResizeObserverArgs {
  ref: RefObject<HTMLElement> | undefined
  callback: (width: number, height: number) => void
  dependencies?: any[]
  enabled?: boolean
}

export const useResizeObserver = ({ ref, callback, dependencies, enabled = true }: ResizeObserverArgs) => {
  useEffect(() => {
    if (!ref?.current || !enabled) {
      return
    }
    const resizeObserver = new ResizeObserver((entries) => {
      entries.forEach((entry) => {
        const { clientWidth, clientHeight } = entry.target
        callback(clientWidth, clientHeight)
      })
    })
    resizeObserver.observe(ref.current)
    return () => {
      resizeObserver.disconnect()
    }
  }, [ref, enabled, ...(dependencies || [])])
}
