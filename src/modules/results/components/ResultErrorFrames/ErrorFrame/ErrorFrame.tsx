import { FC, useEffect, useState } from 'react'

import cx from 'clsx'
import { CropRatio } from 'interfaces/common.interfaces'
import { getFramePosition } from 'modules/results/helpers/getFramePosition'
import { useResultErrors } from 'modules/results/store'

import classes from './ErrorFrame.module.scss'

interface Props {
  hovered: boolean
  active: boolean
  newfontSize: string
  newTop: string
  errorNum: number
  cropRatio: CropRatio | null
  lengthError: number
  index: number
  isReference: boolean
  onClick: () => void
}

export const ErrorFrame: FC<Props> = ({
  cropRatio,
  errorNum,
  onClick,
  active,
  hovered,
  newfontSize,
  newTop,
  lengthError,
  index,
  isReference,
}) => {
  const [string, setString] = useState<string>()
  useEffect(() => {
    if (isReference) {
      if (index.toString() === string) {
        setString(`TextError${index}`)
      } else {
        setString(`ReferenceError${index}`)
      }
    } else if (!isReference) {
      setString(`SampleError${index}`)
    }
  }, [index])
  if (!cropRatio) {
    return null
  }
  const style = getFramePosition(cropRatio)
  return (
    <div
      className={cx(classes.errorFrame, { [classes.active]: active, [classes.hovered]: hovered })}
      id={string}
      onClick={onClick}
      style={style}
    >
      <div
        className={lengthError <= 1 ? classes.errorNum : classes.errorNum2}
        style={{ fontSize: newfontSize, top: newTop }}
      >
        {errorNum}
      </div>
    </div>
  )
}
