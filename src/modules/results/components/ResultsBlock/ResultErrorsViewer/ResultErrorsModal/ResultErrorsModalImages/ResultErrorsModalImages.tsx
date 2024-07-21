import { FC, useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'

import { Box, Typography } from '@mui/material'
import { useParams } from '@tanstack/react-router'
import { ImageSection } from 'components/common/ImageSection'
import { TextErrorSection } from 'components/common/TextErrorSection'
import { useComparison } from 'modules/comparison/queries'
import { usePairErrors } from 'modules/results/queries'
import { useResultErrors } from 'modules/results/store'
import { useComparisonPagesPairs } from 'modules/setup/queries'
import { loadAndCropImage } from 'packages/CropImage'
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

  console.log(error)

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
    loadAndCropImage(sampleImgSrc, cropRatio, setCroppedSampleImgSrc, canvasRef)
  }, [sampleImgSrc, canvasRef.current, error])

  useEffect(() => {
    if (!referenceImgSrc || !canvasRef.current) {
      return
    }

    const cropRatio = error.sampleCropRatio || error.referenceCropRatio
    loadAndCropImage(referenceImgSrc, cropRatio, setCroppedReferenceImgSrc, canvasRef)
  }, [referenceImgSrc, canvasRef.current, error])
  useEffect(() => {
    if (!sampleImgSrc || !canvasRef.current || !referenceImgSrc) {
      return
    }
    if ((error.type.name === 'Штрихкод' || error.type.name === 'Баркод') && pairErrors?.maskFullUrl) {
      loadAndCropImage(sampleImgSrc, error.barcodeCropRatio, setCroppedSampleImgSrc, canvasRef)
      loadAndCropImage(referenceImgSrc, error.barcodeCropRatio, setCroppedReferenceImgSrc, canvasRef)
      loadAndCropImage(pairErrors?.maskFullUrl, error.barcodeCropRatio, setCroppedMaskSrc, canvasRef)
    }
  }, [sampleImgSrc, canvasRef.current, error, pairErrors, referenceImgSrc])

  useEffect(() => {
    if (pairErrors && pairErrors?.maskFullUrl && canvasRef.current) {
      loadAndCropImage(pairErrors?.maskFullUrl, error.sampleCropRatio, setCroppedMaskSrc, canvasRef)
    }
  }, [
    pairErrors?.maskFullUrl,
    referencePage?.previewMlCroppedFullUrl,
    samplePage?.previewMlCroppedFullUrl,
    canvasRef.current,
    error,
  ])
  return (
    <Box
      className={classes.images}
      style={{ justifyContent: comparison?.stage.comparisonType !== 'текстовое сравнение' ? 'space-between' : 'none' }}
    >
      <canvas ref={canvasRef} style={{ display: 'none' }} />

      {error.type.name !== 'Баркод (значение)' &&
        error.type.name !== 'Штрихкод (значение)' &&
        error.type.name !== 'Штрихкод' &&
        error.type.name !== 'Баркод' &&
        comparison?.stage.comparisonType !== 'текстовое сравнение' && (
          <>
            <ImageSection src={croppedReferenceImgSrc} title="Эталон" />
            <ImageSection src={croppedSampleImgSrc} title="Образец" />
            <ImageSection src={croppedMaskImgSrc} title="Маска" />
          </>
        )}

      {error.type.name === 'Штрихкод (значение)' && comparison?.stage.comparisonType !== 'текстовое сравнение' && (
        <ImageSection src={error.imageFullUrl} title="Штрихкод  (значение)" />
      )}
      {error.type.name === 'Баркод (значение)' && comparison?.stage.comparisonType !== 'текстовое сравнение' && (
        <ImageSection src={error.imageFullUrl} title="Баркод (значение)" />
      )}

      {(error.type.name === 'Штрихкод' || error.type.name === 'Баркод') &&
        comparison?.stage.comparisonType !== 'текстовое сравнение' && (
          <>
            <ImageSection src={croppedReferenceImgSrc} title="Эталон" />
            <ImageSection src={croppedSampleImgSrc} title="Образец" />
            <ImageSection src={croppedMaskImgSrc} title="Маска" />
          </>
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
