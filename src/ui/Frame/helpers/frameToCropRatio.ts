import { CropRatio, FrameData } from 'interfaces/common.interfaces'

const round = (num: number, digits = 4) => Math.round(num * Math.pow(10, digits)) / Math.pow(10, digits)

export const frameToCropRatio = (frame: FrameData, containerRect?: DOMRect): CropRatio => {
  const { width: maxWidth, height: maxHeight } = containerRect ?? { width: 0, height: 0 }
  const { top, left, width, height } = frame
  const topRatio = round(top / maxHeight)
  const bottomRatio = round((maxHeight - top - height) / maxHeight)
  const leftRatio = round(left / maxWidth)
  const rightRatio = round((maxWidth - left - width) / maxWidth)
  return [leftRatio, topRatio, rightRatio, bottomRatio]
}
