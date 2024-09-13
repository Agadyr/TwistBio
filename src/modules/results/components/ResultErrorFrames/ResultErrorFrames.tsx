import { FC, RefObject, useRef, useState } from 'react'

import { useParams } from '@tanstack/react-router'
import { useThrottleFn } from 'ahooks'
import { useResizeObserver } from 'hooks/useResizeObserver'
import { CropRatio } from 'interfaces/common.interfaces'
import { usePairErrors } from 'modules/results/queries'
import { useResultErrors } from 'modules/results/store'

import { ErrorFrame } from './ErrorFrame'
import classes from './ResultErrorFrames.module.scss'

interface Props {
  imageRef: RefObject<HTMLImageElement>
  fontSize: string
  top: string
  isReference: boolean
}

export const ResultErrorFrames: FC<Props> = ({ imageRef, fontSize, top, isReference }) => {
  const { comparisonId } = useParams({ from: '/_comparison/$comparisonId/results' })
  const { selectedError, setSelectedError, selectedPair, hoveredError } = useResultErrors()
  const { pairErrors } = usePairErrors(Number(comparisonId), selectedPair as number)
  const [style, setStyle] = useState({})
  const ref = useRef<HTMLDivElement>(null)
  const update = () => {
    const rect = imageRef.current?.getBoundingClientRect()
    if (rect) {
      const newStyle = {
        height: rect.height + 'px',
        width: rect.width + 'px',
      }
      console.log(newStyle)
      setStyle(newStyle)
    }
  }
  const { run: onResizeThrottled } = useThrottleFn(update, { wait: 50 })
  useResizeObserver({ ref: imageRef, callback: onResizeThrottled, enabled: true })

  if (!pairErrors || !pairErrors.errors.length) {
    return null
  }
  return (
    <div className={classes.container} ref={ref} style={style}>
      {pairErrors.errors.map(({ id, imageCropRatio, referenceCropRatio, sampleCropRatio, number }, index) => {
        let cropRatios = isReference ? referenceCropRatio : sampleCropRatio
        if (!cropRatios) {
          cropRatios = imageCropRatio
        }
        return cropRatios?.map((cropRatio, innerIndex) => (
          <ErrorFrame
            active={selectedError === id}
            cropRatio={cropRatio as CropRatio}
            errorNum={number}
            hovered={hoveredError === id}
            index={id}
            isReference={isReference}
            key={`${index}-${innerIndex}`}
            lengthError={cropRatios.length}
            newfontSize={fontSize}
            newTop={top}
            onClick={() => setSelectedError(id)}
          />
        ))
      })}
    </div>
  )
}
