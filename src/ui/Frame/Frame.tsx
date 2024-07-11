import { FC, RefObject, useEffect, useState } from 'react'

import { useDebounceFn, useDeepCompareEffect, useThrottleFn } from 'ahooks'
import cx from 'clsx'
import { useResizeObserver } from 'hooks/useResizeObserver'
import { CropRatio, FrameData } from 'interfaces/common.interfaces'

import { initFrame } from './constants/frame'
import classes from './Frame.module.scss'
import { calcStyles, cropRatioToFrame } from './helpers'
import { frameToCropRatio } from './helpers/frameToCropRatio'
import { useResizeableFrame } from './hooks'

interface Props {
  scale: number
  cropRatio: CropRatio
  resizeable?: boolean
  refContainer: RefObject<HTMLDivElement>
  onFrameChange: (cropRatio: CropRatio) => void
}

export const Frame: FC<Props> = ({ scale, cropRatio, resizeable = false, refContainer, onFrameChange }) => {
  const [frameData, setFrameData] = useState<FrameData>(initFrame)
  const [containerRect, setContainerRect] = useState<DOMRect>()
  const { refResizerLeft, refResizerTop, refResizerRight, refResizerBottom } = useResizeableFrame({
    active: resizeable,
    frameData,
    setFrameData,
    scale,
    containerRect,
    refContainer,
  })

  const { run: onChangeFrame } = useDebounceFn(onFrameChange, { wait: 100 })

  const update = () => {
    const rect = refContainer.current?.getBoundingClientRect()
    if (rect) {
      setContainerRect(rect)
    }
  }

  const { run: onResizeThrottled } = useThrottleFn(update, { wait: 100 })
  useResizeObserver({ ref: refContainer, callback: onResizeThrottled, enabled: resizeable })

  useEffect(() => {
    update()
  }, [refContainer.current])

  useEffect(() => {
    if (containerRect) {
      onChangeFrame(frameToCropRatio(frameData, containerRect))
    }
  }, [frameData, containerRect])

  useDeepCompareEffect(() => {
    if (containerRect) {
      setFrameData(cropRatioToFrame(cropRatio, containerRect))
    }
  }, [cropRatio, containerRect])

  return (
    <div className={classes.container}>
      <div className={cx(classes.resizeable, { [classes.active]: resizeable })} style={calcStyles(frameData)}>
        <div className={cx(classes.resizer, classes.resizerLeft)} ref={refResizerLeft} />
        <div className={cx(classes.resizer, classes.resizerTop)} ref={refResizerTop} />
        <div className={cx(classes.resizer, classes.resizerRight)} ref={refResizerRight} />
        <div className={cx(classes.resizer, classes.resizerBottom)} ref={refResizerBottom} />
      </div>
    </div>
  )
}
