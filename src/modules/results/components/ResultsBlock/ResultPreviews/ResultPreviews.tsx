import { useRef, useState } from 'react'
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch'

import { Box } from '@mui/material'
import { useParams } from '@tanstack/react-router'
import { FilePreview } from 'components/common/FilePreview'
import { TypeofComparison } from 'interfaces/common.interfaces'
import { useComparison } from 'modules/comparison/queries'
import { ResultErrorFrames } from 'modules/results/components/ResultErrorFrames'
import { usePairErrors } from 'modules/results/queries'
import { useResultErrors } from 'modules/results/store'
import { useComparisonPagesPairs } from 'modules/setup/queries/useComparisonPagesPairs'

import classes from './ResultPreviews.module.scss'

export const ResultPreviews = () => {
  const { comparisonId: stringId } = useParams({ from: '/_comparison/$comparisonId/results' })
  const comparisonId = Number(stringId)
  const { comparison } = useComparison(comparisonId)
  const imageRef = useRef<HTMLImageElement>(null)
  const isTextComparison = comparison?.stage.comparisonType === TypeofComparison.Text
  const { selectedPair } = useResultErrors()
  const { pairErrors, pairErrorsAreLoading } = usePairErrors(Number(comparisonId), selectedPair as number)
  const { comparisonPagesPairs } = useComparisonPagesPairs(comparisonId)

  const pagePair = comparisonPagesPairs?.find((comparisonPagesPair) => comparisonPagesPair.id === selectedPair)
  const { referencePage, samplePage } = pagePair || {}
  const contentStyle = {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }
  const [openModalMask, setOpenModalMask] = useState(false)
  const [openModalContur, setOpenModalContur] = useState(false)
  const [openModalEtalon, setOpenModalEtalon] = useState(true)
  const [fontSize, setFontSize] = useState(false)
  const handleZoom = (ref: any, event: any) => {
    const { scale } = ref.state
    if (scale >= 2) {
      setFontSize(true)
    } else if (scale <= 2) {
      setFontSize(false)
    }
  }
  return (
    <Box className={classes.viewBlock}>
      <Box className={classes.viewItem}>
        <span
          className={classes.itemLabel}
          onClick={() => {
            setOpenModalEtalon(true)
            setOpenModalContur(false)
            setOpenModalMask(false)
          }}
        >
          Эталон
        </span>
        {comparison?.stage.comparisonType !== 'текстовое сравнение' && (
          <button
            className={`btn btngray ${classes.itemLabel2}`}
            onClick={() => {
              setOpenModalMask(true)
              setOpenModalEtalon(false)
              setOpenModalContur(false)
            }}
          >
            Маска
          </button>
        )}
        {comparison?.stage.comparisonType !== 'текстовое сравнение' && (
          <button
            className={`btn btngray ${classes.itemLabel3}`}
            onClick={() => {
              setOpenModalContur(true)
              setOpenModalEtalon(false)
              setOpenModalMask(false)
            }}
          >
            Маска контуров
          </button>
        )}
        <TransformWrapper onZoom={handleZoom}>
          <TransformComponent contentStyle={contentStyle}>
            <div className={classes.df}>
              {openModalMask && !openModalEtalon && !openModalContur && (
                <img
                  alt="sdf"
                  className={classes.img}
                  src={pairErrors?.maskFullUrl ? pairErrors?.maskFullUrl : '/images/red1.png'}
                />
              )}
              {!!referencePage && openModalEtalon && !openModalContur && !openModalMask && (
                <FilePreview
                  fileUrl={isTextComparison ? referencePage.previewFullUrl : referencePage.previewMlCroppedFullUrl}
                  pageNum={referencePage.number}
                />
              )}
              {openModalContur && !openModalEtalon && !openModalMask && (
                <img
                  alt="sdf"
                  className={classes.img}
                  src={pairErrors?.outlineMaskFullUrl ? pairErrors?.outlineMaskFullUrl : ' /images/black1.png '}
                />
              )}
            </div>
          </TransformComponent>
        </TransformWrapper>
      </Box>

      <Box className={classes.viewItem}>
        <span className={classes.itemLabel}>Образец</span>
        <TransformWrapper onZoom={handleZoom}>
          <TransformComponent contentStyle={contentStyle}>
            <div className={classes.sampleWrapContainer}>
              {!!samplePage && (
                <>
                  <FilePreview
                    fileUrl={isTextComparison ? samplePage.previewFullUrl : samplePage.previewMlCroppedFullUrl}
                    pageNum={samplePage.number}
                    ref={imageRef}
                  />
                  <ResultErrorFrames fontSize={fontSize} imageRef={imageRef} />
                </>
              )}
            </div>
          </TransformComponent>
        </TransformWrapper>
      </Box>
    </Box>
  )
}
