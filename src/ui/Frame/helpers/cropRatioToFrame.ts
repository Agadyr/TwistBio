import { CropRatio } from 'interfaces/common.interfaces'

export const cropRatioToFrame = (cropRatio: CropRatio, containerRect?: DOMRect) => {
  const { width: maxWidth, height: maxHeight } = containerRect ?? { width: 0, height: 0 }
  const [leftRatio, topRatio, rightRatio, bottomRatio] = cropRatio
  const top = maxHeight * topRatio
  const bottom = maxHeight * bottomRatio
  const left = maxWidth * leftRatio
  const right = maxWidth * rightRatio
  const width = maxWidth - left - right
  const height = maxHeight - top - bottom
  return { top, left, width, height }
}
