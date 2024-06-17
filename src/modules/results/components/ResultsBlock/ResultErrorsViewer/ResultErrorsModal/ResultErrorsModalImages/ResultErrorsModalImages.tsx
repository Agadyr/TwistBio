import { FC, useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'

import { Box, Typography } from '@mui/material'
import { useParams } from '@tanstack/react-router'
import { useComparison } from 'modules/comparison/queries'
import { usePairErrors } from 'modules/results/queries'
import { useResultErrors } from 'modules/results/store'
import { useComparisonPagesPairs } from 'modules/setup/queries'
import { pdfPreviewManager } from 'packages/pdfPreview'

import classes from './ResultErrorsModalImages.module.scss'

interface ResultErrorsModalProps {
  error: any
}

export const ResultErrorsModalImages: FC<ResultErrorsModalProps> = ({ error }) => {
  const { comparisonId: stringId } = useParams({ from: '/_comparison/$comparisonId/results' })
  const comparisonId = Number(stringId)
  const { selectedPair } = useResultErrors()
  const { comparisonPagesPairs } = useComparisonPagesPairs(comparisonId)
  const { pairErrors, pairErrorsAreLoading } = usePairErrors(Number(comparisonId), selectedPair as number)
  const pagePair = comparisonPagesPairs?.find((comparisonPagesPair) => comparisonPagesPair.id === selectedPair)
  const { referencePage, samplePage } = pagePair || {}
  const [referenceImgSrc, setReferenceImgSrc] = useState<string>()
  const [sampleImgSrc, setSampleImgSrc] = useState<string>()
  const [croppedSampleImgSrc, setCroppedSampleImgSrc] = useState<string>()
  const [croppedReferenceImgSrc, setCroppedReferenceImgSrc] = useState<string>()
  const [croppedMaskImgSrc, setCroppedMaskSrc] = useState<string>()
  const { comparison } = useComparison(Number(comparisonId))
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const loadAndCropImage = (imgSrc: string, cropRatio: number[], setCroppedImgSrc: (src: string) => void) => {
    if (cropRatio && cropRatio.length === 4) {
      const image = new Image()
      image.crossOrigin = 'Anonymous'
      image.src = imgSrc
      console.log(imgSrc, image)
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
              console.log(croppedCanvas.toDataURL())
              setCroppedImgSrc(croppedCanvas.toDataURL())
            }
          }
        }
      }
      image.onerror = (error1) => {
        console.error('Failed to load image:', error1)
      }
    }
  }

  useEffect(() => {
    if (referencePage?.previewMlCroppedFullUrl && referencePage?.number !== undefined) {
      setReferenceImgSrc(referencePage?.previewMlCroppedFullUrl)
    } else if (referencePage?.previewFullUrl && referencePage.number !== undefined) {
      console.log('sadfasd')
      pdfPreviewManager
        .getPreview(referencePage?.previewFullUrl, referencePage?.number)
        .then((img) => setSampleImgSrc(img))
        .catch(() => toast.error('Не удалось загрузить превью страницы'))
    }
  }, [referencePage])

  useEffect(() => {
    if (samplePage?.previewMlCroppedFullUrl && samplePage?.number !== undefined) {
      setSampleImgSrc(samplePage?.previewMlCroppedFullUrl)
    } else if (samplePage?.previewFullUrl && samplePage.number !== undefined) {
      console.log('sadfasd')
      pdfPreviewManager
        .getPreview(samplePage?.previewFullUrl, samplePage?.number)
        .then((img) => setSampleImgSrc(img))
        .catch(() => toast.error('Не удалось загрузить превью страницы'))
    }
  }, [samplePage])

  useEffect(() => {
    if (!sampleImgSrc || !canvasRef.current) {
      return
    }

    const cropRatio = error.sampleCropRatio || error.referenceCropRatio
    loadAndCropImage(sampleImgSrc, cropRatio, setCroppedSampleImgSrc)
    console.log(croppedSampleImgSrc, 'CROPEPDCAMPLE')
  }, [sampleImgSrc, canvasRef.current])

  useEffect(() => {
    if (!referenceImgSrc || !canvasRef.current) {
      return
    }

    const cropRatio = error.sampleCropRatio || error.referenceCropRatio
    loadAndCropImage(referenceImgSrc, cropRatio, setCroppedReferenceImgSrc)
  }, [referenceImgSrc, canvasRef.current])

  useEffect(() => {
    if (pairErrors && pairErrors?.maskFullUrl && canvasRef.current) {
      loadAndCropImage(pairErrors?.maskFullUrl, error.sampleCropRatio, setCroppedMaskSrc)
    }
    // if (referencePage && referencePage?.previewMlCroppedFullUrl && canvasRef.current) {
    //   loadAndCropImage(referencePage?.previewMlCroppedFullUrl, error.sampleCropRatio, setCroppedReferenceImgSrc)
    // }
    // if (samplePage && samplePage?.previewMlCroppedFullUrl && canvasRef.current) {
    //   loadAndCropImage(samplePage?.previewMlCroppedFullUrl, error.sampleCropRatio, setCroppedSampleImgSrc)
    // }
  }, [
    pairErrors?.maskFullUrl,
    referencePage?.previewMlCroppedFullUrl,
    samplePage?.previewMlCroppedFullUrl,
    canvasRef.current,
  ])

  return (
    <Box className={classes.images}>
      <canvas ref={canvasRef} style={{ display: 'none' }} />
      {error.type.name !== 'Баркод' &&
        error.type.name !== 'Штрихкод' &&
        comparison?.stage.comparisonType !== 'текстовое сравнение' && (
          <>
            <Box>
              <Typography>Эталон</Typography>
              <Box className={classes.imgWrap}>
                {croppedReferenceImgSrc && (
                  <img alt="Cropped Reference" className={classes.img} src={croppedReferenceImgSrc} />
                )}
              </Box>
            </Box>
            <Box>
              <Typography>Образец</Typography>
              <Box className={classes.imgWrap}>
                {sampleImgSrc && (
                  <>
                    {croppedSampleImgSrc && (
                      <img alt="Cropped Sample" className={classes.img} src={croppedSampleImgSrc} />
                    )}
                  </>
                )}
              </Box>
            </Box>
            <Box>
              <Typography>Маска</Typography>
              <Box className={classes.imgWrap}>
                {croppedMaskImgSrc && <img alt="Cropped Reference" className={classes.img} src={croppedMaskImgSrc} />}
              </Box>
            </Box>
          </>
        )}
      {(error.type.name === 'Баркод' || error.type.name === 'Штрихкод') &&
        comparison?.stage.comparisonType !== 'текстовое сравнение' && (
          <>
            <Box>
              <Box className={classes.imgWrap}>
                <img alt="Cropped Reference" className={classes.img} src={error.imageFullUrl} />
              </Box>
            </Box>
          </>
        )}
      {error.type.name === 'Опечатка' && comparison?.stage.comparisonType === 'текстовое сравнение' && (
        <>
          <Box>
            <Box className={classes.imgWrap}>
              <Typography>1)Оброзующее</Typography>
              Правильно
              <Typography>2)вещество</Typography>
              Правильно
            </Box>
          </Box>
          <Box className={classes.imgWrap}>
            {croppedSampleImgSrc && <img alt="Cropped Reference" className={classes.img} src={croppedSampleImgSrc} />}
          </Box>
        </>
      )}
      {error.type.name === 'Нет в эталоне' && comparison?.stage.comparisonType === 'текстовое сравнение' && (
        <>
          <Box>
            <Typography>Эталон</Typography>
            <Box className={classes.imgx}>
              <img alt="Cropped Reference" className={classes.img} src="/chest.png" />
            </Box>
          </Box>
          <Box>
            <Typography>Образец</Typography>
            <Box className={classes.imgx}>
              <img alt="Cropped Reference" className={classes.img} src={croppedSampleImgSrc} />
            </Box>
          </Box>
        </>
      )}
      {error.type.name === 'Нет в образце' && comparison?.stage.comparisonType === 'текстовое сравнение' && (
        <>
          <Box>
            <Typography>Эталон</Typography>
            <Box className={classes.imgx}>
              <img alt="Cropped Reference" className={classes.img} src={croppedReferenceImgSrc} />
            </Box>
          </Box>
          <Box>
            <Typography>Образец</Typography>
            <Box className={classes.imgx}>
              <img alt="Cropped Reference" className={classes.img} src="/chest.png" />
            </Box>
          </Box>
        </>
      )}
    </Box>
  )
}
