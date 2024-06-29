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

const ImageSection: FC<{ title: string; src?: string }> = ({ title, src }) => (
  <Box>
    <Typography>{title}</Typography>
    <Box className={classes.imgWrap}>{src && <img alt={title} className={classes.img} src={src} />}</Box>
  </Box>
)

const TextErrorSection: FC<{ content: string[]; bestMatch?: string[] }> = ({ content, bestMatch }) => (
  <Box className={classes.imgx2}>
    {content.map((text, index) => (
      <Box key={index}>
        <Typography variant="h5">
          {index + 1}) {text}
        </Typography>
        {bestMatch && bestMatch[index] ? (
          bestMatch[index] === text ? (
            <Typography style={{ color: 'green' }}>Без Ошибок</Typography>
          ) : (
            <div>
              <Typography variant="h6">Правильно:</Typography>
              <Typography style={{ color: 'red' }} variant="h6">
                {bestMatch[index]}
              </Typography>
            </div>
          )
        ) : (
          <Typography style={{ color: 'red' }}>Не найдено</Typography>
        )}
      </Box>
    ))}
  </Box>
)

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
      image.onerror = (error1) => {
        console.error('Failed to load image:', error1)
      }
    }
  }

  useEffect(() => {
    if (referencePage?.previewMlCroppedFullUrl && referencePage?.number !== undefined) {
      setReferenceImgSrc(referencePage?.previewMlCroppedFullUrl)
    } else if (referencePage?.previewFullUrl && referencePage.number !== undefined) {
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
  }, [sampleImgSrc, canvasRef.current, error])

  useEffect(() => {
    if (!referenceImgSrc || !canvasRef.current) {
      return
    }

    const cropRatio = error.sampleCropRatio || error.referenceCropRatio
    loadAndCropImage(referenceImgSrc, cropRatio, setCroppedReferenceImgSrc)
  }, [referenceImgSrc, canvasRef.current, error])

  useEffect(() => {
    if (pairErrors && pairErrors?.maskFullUrl && canvasRef.current) {
      loadAndCropImage(pairErrors?.maskFullUrl, error.sampleCropRatio, setCroppedMaskSrc)
    }
  }, [
    pairErrors?.maskFullUrl,
    referencePage?.previewMlCroppedFullUrl,
    samplePage?.previewMlCroppedFullUrl,
    canvasRef.current,
    error,
  ])
  return (
    <Box className={classes.images}>
      <canvas ref={canvasRef} style={{ display: 'none' }} />

      {error.type.name !== 'Баркод' &&
        error.type.name !== 'Штрихкод' &&
        comparison?.stage.comparisonType !== 'текстовое сравнение' && (
          <>
            <ImageSection src={croppedReferenceImgSrc} title="Эталон" />
            <ImageSection src={croppedSampleImgSrc} title="Образец" />
            <ImageSection src={croppedMaskImgSrc} title="Маска" />
          </>
        )}

      {(error.type.name === 'Баркод' || error.type.name === 'Штрихкод') &&
        comparison?.stage.comparisonType !== 'текстовое сравнение' && (
          <ImageSection src={error.imageFullUrl} title="Баркод/Штрихкод" />
        )}

      {error.type.name === 'Опечатка' && comparison?.stage.comparisonType === 'текстовое сравнение' && (
        <>
          <Box>
            <Typography>Эталон</Typography>
            <TextErrorSection bestMatch={error.bestMatch} content={error.content} />
          </Box>
          <Box> {croppedSampleImgSrc && <ImageSection src={croppedSampleImgSrc} title="Образец" />} </Box>
        </>
      )}

      {error.type.name === 'Нет в эталоне' && comparison?.stage.comparisonType === 'текстовое сравнение' && (
        <>
          <ImageSection src="/chest.png" title="Эталон" />
          <Box>
            <Typography>Образец</Typography>
            {!error.content ? (
              <ImageSection src={croppedSampleImgSrc} title="Образец" />
            ) : (
              <TextErrorSection bestMatch={error.bestMatch} content={error.content} />
            )}
          </Box>
        </>
      )}

      {error.type.name === 'Нет в образце' && comparison?.stage.comparisonType === 'текстовое сравнение' && (
        <>
          <Box>
            <Typography>Эталон</Typography>
            {!error.content ? (
              <ImageSection src={croppedReferenceImgSrc} title="Эталон" />
            ) : (
              <TextErrorSection bestMatch={error.bestMatch} content={error.content} />
            )}
          </Box>
          <ImageSection src="/chest.png" title="Образец" />
        </>
      )}
    </Box>
  )
}
