export interface ZoomHandlers {
  setFontSizeReference: (value: string) => void
  setMarginTopReference: (value: string) => void
  setFontSizeSample: (value: string) => void
  setMarginTopSample: (value: string) => void
}

export const handleZoom = (
  ref: any,
  isReference: boolean,
  { setFontSizeReference, setMarginTopReference, setFontSizeSample, setMarginTopSample }: ZoomHandlers,
) => {
  const { scale } = ref.state

  const setFontSize = isReference ? setFontSizeReference : setFontSizeSample
  const setMarginTop = isReference ? setMarginTopReference : setMarginTopSample

  if (scale >= 3) {
    setFontSize('4px')
    setMarginTop('-10px')
  } else if (scale >= 2.5) {
    setFontSize('6px')
    setMarginTop('-15px')
  } else if (scale >= 2) {
    setFontSize('8px')
  } else if (scale >= 1) {
    setFontSize('12px')
  } else {
    setFontSize('16px')
  }
}
