import { Dispatch, RefObject, SetStateAction, useEffect, useRef } from 'react'

import { FrameData } from 'interfaces/common.interfaces'
import { clamp } from 'lodash'

interface Props {
  active: boolean
  frameData: FrameData
  setFrameData: Dispatch<SetStateAction<FrameData>>
  scale: number
  containerRect?: DOMRect
  refContainer: RefObject<HTMLDivElement>
}

export const useResizeableFrame = ({ active, frameData, setFrameData, scale, containerRect }: Props) => {
  const { width: maxWidth, height: maxHeight } = containerRect ?? { width: 0, height: 0 }
  const refResizerLeft = useRef<HTMLDivElement>(null)
  const refResizerTop = useRef<HTMLDivElement>(null)
  const refResizerRight = useRef<HTMLDivElement>(null)
  const refResizerBottom = useRef<HTMLDivElement>(null)
  const refFrameData = useRef<FrameData>(frameData)
  refFrameData.current = frameData

  useEffect(() => {
    if (!active) {
      return
    }
    let startClickX = 0
    let startClickY = 0

    const onMouseMoveRightResize = (event: MouseEvent) => {
      const dx = event.clientX - startClickX
      startClickX = event.clientX
      let { width } = refFrameData.current
      width = clamp(width + dx / scale, 0, maxWidth - refFrameData.current.left)
      setFrameData((prevFrame) => ({ ...prevFrame, width }))
    }

    const onMouseMoveTopResize = (event: MouseEvent) => {
      const dy = event.clientY - startClickY
      startClickY = event.clientY

      let { height, top } = refFrameData.current
      const newHeight = clamp(height - dy / scale, 0, height + top)
      const newTop = clamp(top + dy / scale, 0, maxHeight - newHeight)

      if (newHeight > 0) {
        height = newHeight
        top = newTop
        setFrameData((prevFrame) => ({ ...prevFrame, height, top }))
      }
    }

    const onMouseMoveBottomResize = (event: MouseEvent) => {
      const dy = event.clientY - startClickY
      startClickY = event.clientY
      let { height } = refFrameData.current
      height = clamp(height + dy / scale, 0, maxHeight - refFrameData.current.top)
      setFrameData((prevFrame) => ({ ...prevFrame, height }))
    }

    const onMouseMoveLeftResize = (event: MouseEvent) => {
      const dx = event.clientX - startClickX
      startClickX = event.clientX
      let { left, width } = refFrameData.current
      const newWidth = clamp(width - dx / scale, 0, width + left)
      const newLeft = clamp(left + dx / scale, 0, maxWidth - newWidth)
      if (newWidth > 0) {
        width = newWidth
        left = newLeft
        setFrameData((prevFrame) => ({ ...prevFrame, width, left }))
      }
    }

    const onMouseUpResize = () => {
      document.removeEventListener('mousemove', onMouseMoveRightResize)
      document.removeEventListener('mousemove', onMouseMoveTopResize)
      document.removeEventListener('mousemove', onMouseMoveBottomResize)
      document.removeEventListener('mousemove', onMouseMoveLeftResize)
      document.removeEventListener('mouseup', onMouseUpResize)
    }

    const onMouseDownRightResize = (event: MouseEvent) => {
      startClickX = event.clientX
      document.addEventListener('mousemove', onMouseMoveRightResize)
      document.addEventListener('mouseup', onMouseUpResize)
    }

    const onMouseDownTopResize = (event: MouseEvent) => {
      startClickY = event.clientY
      document.addEventListener('mousemove', onMouseMoveTopResize)
      document.addEventListener('mouseup', onMouseUpResize)
    }

    const onMouseDownBottomResize = (event: MouseEvent) => {
      startClickY = event.clientY
      document.addEventListener('mousemove', onMouseMoveBottomResize)
      document.addEventListener('mouseup', onMouseUpResize)
    }

    const onMouseDownLeftResize = (event: MouseEvent) => {
      startClickX = event.clientX
      document.addEventListener('mousemove', onMouseMoveLeftResize)
      document.addEventListener('mouseup', onMouseUpResize)
    }

    const resizerRight = refResizerRight.current
    resizerRight?.addEventListener('mousedown', onMouseDownRightResize)

    const resizerTop = refResizerTop.current
    resizerTop?.addEventListener('mousedown', onMouseDownTopResize)

    const resizerBottom = refResizerBottom.current
    resizerBottom?.addEventListener('mousedown', onMouseDownBottomResize)

    const resizerLeft = refResizerLeft.current
    resizerLeft?.addEventListener('mousedown', onMouseDownLeftResize)

    return () => {
      resizerRight?.removeEventListener('mousedown', onMouseDownRightResize)
      resizerTop?.removeEventListener('mousedown', onMouseDownTopResize)
      resizerBottom?.removeEventListener('mousedown', onMouseDownBottomResize)
      resizerLeft?.removeEventListener('mousedown', onMouseDownLeftResize)
      document.removeEventListener('mousemove', onMouseMoveRightResize)
      document.removeEventListener('mousemove', onMouseMoveTopResize)
      document.removeEventListener('mousemove', onMouseMoveBottomResize)
      document.removeEventListener('mousemove', onMouseMoveLeftResize)
      document.removeEventListener('mouseup', onMouseUpResize)
    }
  }, [active, maxWidth, maxHeight, scale, containerRect, setFrameData])

  return { refResizerLeft, refResizerTop, refResizerRight, refResizerBottom }
}
