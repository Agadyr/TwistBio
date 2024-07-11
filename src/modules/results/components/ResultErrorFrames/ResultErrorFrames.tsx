import { FC, RefObject, useRef, useState } from 'react'

import { useParams } from '@tanstack/react-router'
import { useClickAway, useThrottleFn } from 'ahooks'
import { useResizeObserver } from 'hooks/useResizeObserver'
import { usePairErrors } from 'modules/results/queries'
import { useResultErrors } from 'modules/results/store'
import { usefilterPairErrors } from 'modules/results/store/store'

import { ErrorFrame } from './ErrorFrame'
import classes from './ResultErrorFrames.module.scss'

interface Props {
  imageRef: RefObject<HTMLImageElement>
  fontSize: string
  top: string
}

export const ResultErrorFrames: FC<Props> = ({ imageRef, fontSize, top }) => {
  const { comparisonId } = useParams({ from: '/_comparison/$comparisonId/results' })
  const { selectedError, setSelectedError, clearErrorSelection, selectedPair, hoveredError } = useResultErrors()
  const { pairErrors } = usePairErrors(Number(comparisonId), selectedPair as number)
  const [style, setStyle] = useState({})
  const ref = useRef<HTMLDivElement>(null)
  useClickAway(clearErrorSelection, [ref])
  const update = () => {
    const rect = imageRef.current?.getBoundingClientRect()
    if (rect) {
      const newStyle = {
        height: rect.height + 'px',
        width: rect.width + 'px',
      }
      setStyle(newStyle)
    }
  }
  const { run: onResizeThrottled } = useThrottleFn(update, { wait: 50 })
  useResizeObserver({ ref: imageRef, callback: onResizeThrottled, enabled: true })
  if (!pairErrors || !pairErrors.errors.length) {
    return
  }
  return (
    <div className={classes.container} ref={ref} style={style}>
      {pairErrors.errors.map(({ id, sampleCropRatio, imageCropRatio, number }) => (
        <ErrorFrame
          active={selectedError === id}
          cropRatio={sampleCropRatio || imageCropRatio}
          errorNum={number}
          hovered={hoveredError === id}
          key={id}
          newfontSize={fontSize}
          newTop={top}
          onClick={() => setSelectedError(id)}
        />
      ))}
    </div>
  )
}
