export type CropRatio = [number, number, number, number]

export interface FrameData {
  width: number
  height: number
  left: number
  top: number
}

export enum TypeofComparison {
  Pixel = 'попиксельное сравнение',
  Text = 'текстовое сравнение',
}
