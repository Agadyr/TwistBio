import { CropRatio } from 'interfaces/common.interfaces'

export const getFramePosition = (cropRatio: CropRatio) => {
  const [left, top, right, bottom] = cropRatio
  const style = {
    top: `${top * 100}%`,
    left: `${left * 100}%`,
    height: `${(bottom - top) * 100}%`,
    width: `${(right - left) * 100}%`,
  }
  return style
}
