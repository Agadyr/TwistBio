import { FrameData } from 'interfaces/common.interfaces'

const toPixel = (num?: number) => (num === undefined || num < 0 ? '' : `${num}px`)

export const calcStyles = (frameData: FrameData) =>
  (Object.keys(frameData) as Array<keyof FrameData>).reduce(
    (attrs, key) => ({
      ...attrs,
      [key]: toPixel(frameData[key]),
    }),
    {},
  )
