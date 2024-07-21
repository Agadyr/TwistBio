import { FC, useEffect, useRef, useState } from 'react'

import { Box, Typography } from '@mui/material'
import { ImageSectionAbout } from 'components/common/ImageSectionAbout'
import { Pair } from 'modules/comparison/api'
import { ComparisonPairError } from 'modules/results/api'
import { loadAndCropImage } from 'packages/CropImage'

import classes from './detailErrors.module.scss'

interface Props {
  error: ComparisonPairError
  item: Pair
  comparisonType: string
}

export const DetailsErrors: FC<Props> = ({ error, item, comparisonType }) => {
  const [croppedSampleImgSrc, setCroppedSampleImgSrc] = useState<string>()
  const [croppedReferenceImgSrc, setCroppedReferenceImgSrc] = useState<string>()
  const [croppedMaskImgSrc, setCroppedMaskSrc] = useState<string>()
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!item.referencePreviewMlCroppedFullUrl || !canvasRef.current) {
      return
    }

    const cropRatio = error.referenceCropRatio ?? error.sampleCropRatio
    if (Array.isArray(cropRatio)) {
      loadAndCropImage(item.referencePreviewMlCroppedFullUrl, cropRatio, setCroppedReferenceImgSrc, canvasRef)
    }
  }, [item, canvasRef.current, error])

  useEffect(() => {
    if (!item.samplePreviewMlCroppedFullUrl || !canvasRef.current) {
      return
    }

    const cropRatio = error.sampleCropRatio ?? error.referenceCropRatio
    if (Array.isArray(cropRatio)) {
      loadAndCropImage(item.samplePreviewMlCroppedFullUrl, cropRatio, setCroppedSampleImgSrc, canvasRef)
    }
  }, [item, canvasRef.current, error])

  useEffect(() => {
    if (!item.samplePreviewMlCroppedFullUrl || !canvasRef.current || !item.referencePreviewMlCroppedFullUrl) {
      return
    }

    if ((error.type?.name === 'Штрихкод' || error.type?.name === 'Баркод') && item?.maskFullUrl) {
      const cropRatio = error.barcodeCropRatio
      if (Array.isArray(cropRatio)) {
        loadAndCropImage(item.samplePreviewMlCroppedFullUrl, cropRatio, setCroppedSampleImgSrc, canvasRef)
        loadAndCropImage(item.referencePreviewMlCroppedFullUrl, cropRatio, setCroppedReferenceImgSrc, canvasRef)
        loadAndCropImage(item?.maskFullUrl, cropRatio, setCroppedMaskSrc, canvasRef)
      }
    }
  }, [item.samplePreviewMlCroppedFullUrl, canvasRef.current, error, item, item.referencePreviewMlCroppedFullUrl])

  useEffect(() => {
    if (item?.maskFullUrl && canvasRef.current) {
      const cropRatio = error.sampleCropRatio
      if (Array.isArray(cropRatio)) {
        loadAndCropImage(item?.maskFullUrl, cropRatio, setCroppedMaskSrc, canvasRef)
      }
    }
  }, [item?.maskFullUrl, canvasRef.current, error])

  if (!error) {
    return 'none'
  }

  return (
    <Box
      style={{
        justifyContent: comparisonType !== 'потекстовое сравнение' ? 'space-between' : 'none',
      }}
    >
      <canvas ref={canvasRef} style={{ display: 'none' }} />

      {error.type?.name !== 'Баркод (значение)' &&
        error.type?.name !== 'Штрихкод (значение)' &&
        error.type?.name !== 'Штрихкод' &&
        error.type?.name !== 'Баркод' &&
        comparisonType !== 'потекстовое сравнение' && (
          <>
            <Box className="df pt-3 g-3">
              <Typography className={classes.number}>№{error.id}</Typography>
              <Box>
                <Box className="df jcsb g-3">
                  <ImageSectionAbout src={croppedReferenceImgSrc} title="Эталон" />
                  <ImageSectionAbout src={croppedSampleImgSrc} title="Образец" />
                  <ImageSectionAbout src={croppedMaskImgSrc} title="Маска" />
                </Box>
                <Typography className="mt-2">Проверка: {error.status?.name}</Typography>
                <Typography>Ошибка - {error.type?.name}</Typography>
                <Typography>Критичность: {error.severity?.name}</Typography>
                <Typography>Комментарий: {error.comment === null ? 'Отсутствует' : error.comment}</Typography>
              </Box>
            </Box>
          </>
        )}

      {error.type?.name === 'Штрихкод (значение)' && comparisonType !== 'потекстовое сравнение' && (
        <>
          <Box className="g-3 pt-3" sx={{ display: 'flex' }}>
            <Typography className={classes.number}>№{error.id}</Typography>
            <Box>
              <ImageSectionAbout src={error.imageFullUrl ?? undefined} title="Штрихкод  (значение)" />
              <Typography className="mt-2">Распознанно: {error.detectedValue}</Typography>
              <Typography>Проверка - {error.severity?.name}</Typography>
              <Typography>Тип: {error.type.name}</Typography>
              <Typography>Комментарий: {error.comment === null ? 'Отсутствует' : error.comment}</Typography>
            </Box>
          </Box>
        </>
      )}
      {error.type?.name === 'Баркод (значение)' && comparisonType !== 'потекстовое сравнение' && (
        <>
          <Box className="g-3 pt-3" sx={{ display: 'flex' }}>
            <Typography className={classes.number}>№{error.id}</Typography>
            <Box>
              <ImageSectionAbout src={error.imageFullUrl ?? undefined} title="Баркод (значение)" />
              <Typography className="mt-2">Распознано: {error.detectedValue}</Typography>
              <Typography>Проверка - {error.severity?.name}</Typography>
              <Typography>Тип: {error.type.name}</Typography>
              <Typography>Комментарий: {error.comment === null ? 'Отсутствует' : error.comment}</Typography>
            </Box>
          </Box>
        </>
      )}

      {(error.type?.name === 'Штрихкод' || error.type?.name === 'Баркод') &&
        comparisonType !== 'потекстовое сравнение' && (
          <>
            <Box className="df pt-3 g-3">
              <Typography className={classes.number}>№{error.id}</Typography>
              <Box>
                <Box className="df jcsb g-3">
                  <ImageSectionAbout src={croppedReferenceImgSrc} title="Эталон" />
                  <ImageSectionAbout src={croppedSampleImgSrc} title="Образец" />
                  <ImageSectionAbout src={croppedMaskImgSrc} title="Маска" />
                </Box>
                <Typography className="mt-2">Проверка: {error.status?.name}</Typography>
                <Typography>Ошибка - {error.type?.name}</Typography>
                <Typography>Критичность: {error.severity?.name}</Typography>
                <Typography>Комментарий: {error.comment === null ? 'Отсутствует' : error.comment}</Typography>
              </Box>
            </Box>
          </>
        )}
    </Box>
  )
}
