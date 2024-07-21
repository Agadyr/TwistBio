import { RefObject } from 'react'

export const loadAndCropImage = (
  imgSrc: string,
  cropRatio: number[] | null,
  setCroppedImgSrc: (src: string) => void,
  canvasRef: RefObject<HTMLCanvasElement>,
) => {
  if (cropRatio && cropRatio.length === 4) {
    const image = new Image()
    image.crossOrigin = 'Anonymous'
    image.src = imgSrc
    image.onload = () => {
      const canvas = canvasRef.current
      if (canvas) {
        const ctx = canvas.getContext('2d')
        if (ctx) {
          canvas.width = image.width
          canvas.height = image.height
          ctx.drawImage(image, 0, 0)

          const cropX = cropRatio[0] * image.width
          const cropY = cropRatio[1] * image.height
          const cropWidth = cropRatio[2] * image.width - cropX
          const cropHeight = cropRatio[3] * image.height - cropY

          const croppedCanvas = document.createElement('canvas')
          const croppedCtx = croppedCanvas.getContext('2d')
          if (croppedCtx) {
            croppedCanvas.width = cropWidth
            croppedCanvas.height = cropHeight
            croppedCtx.drawImage(canvas, cropX, cropY, cropWidth, cropHeight, 0, 0, cropWidth, cropHeight)
            setCroppedImgSrc(croppedCanvas.toDataURL())
          }
        }
      }
    }
    image.onerror = (error) => {
      console.error('Failed to load image:', error)
    }
  }
}
