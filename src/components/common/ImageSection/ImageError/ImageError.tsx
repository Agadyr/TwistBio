import { FC } from 'react'

import { CropRatio } from 'interfaces/common.interfaces'
import { getFramePosition } from 'modules/results/helpers/getFramePosition'

import classes from './ImageError.module.scss'

interface Props {
  cropRatio: CropRatio | null
}

export const ErrorImageFrame: FC<Props> = ({ cropRatio }) => {
  if (!cropRatio) {
    return null
  }
  const style = getFramePosition(cropRatio)
  return <div className={classes.errorFrame} style={style} />
}
