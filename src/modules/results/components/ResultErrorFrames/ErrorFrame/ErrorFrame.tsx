import { FC } from 'react'

import cx from 'clsx'
import { CropRatio } from 'interfaces/common.interfaces'
import { getFramePosition } from 'modules/results/helpers/getFramePosition'

import classes from './ErrorFrame.module.scss'

interface Props {
  hovered: boolean
  active: boolean
  newfontSize: string
  newTop: string
  errorNum: number
  cropRatio: CropRatio | null
  onClick: () => void
}

export const ErrorFrame: FC<Props> = ({ cropRatio, errorNum, onClick, active, hovered, newfontSize, newTop }) => {
  if (!cropRatio) {
    return null
  }
  const style = getFramePosition(cropRatio)
  console.log(newTop)
  return (
    <div
      className={cx(classes.errorFrame, { [classes.active]: active, [classes.hovered]: hovered })}
      onClick={onClick}
      style={style}
    >
      <div className={classes.errorNum} style={{ fontSize: newfontSize, top: newTop }}>
        {errorNum}
      </div>
    </div>
  )
}
