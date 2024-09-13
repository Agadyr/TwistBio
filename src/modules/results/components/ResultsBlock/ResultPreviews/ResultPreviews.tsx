import { useEffect, useRef, useState } from 'react'
import { ReactZoomPanPinchRef, TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch'

import { Box } from '@mui/material'
import { useParams } from '@tanstack/react-router'
import { FilePreview } from 'components/common/FilePreview'
import { TypeofComparison } from 'interfaces/common.interfaces'
import { useComparison } from 'modules/comparison/queries'
import { ResultErrorFrames } from 'modules/results/components/ResultErrorFrames'
import { handleZoom } from 'modules/results/helpers/ZoomHandlers'
import { usePairErrors } from 'modules/results/queries'
import { useResultErrors } from 'modules/results/store'
import { useComparisonFilesPages } from 'modules/setup/queries/useComparisonFilesPages'
import { useComparisonPagesPairs } from 'modules/setup/queries/useComparisonPagesPairs'
import { useSelectedPages } from 'modules/setup/store'

import classes from './ResultPreviews.module.scss'
import { ResultPreviewsButtons } from './ResultPreviewsButtons'

export const ResultPreviews = () => {
  const { comparisonId: stringId } = useParams({ from: '/_comparison/$comparisonId/results' })
  const comparisonId = Number(stringId)
  const { comparison } = useComparison(comparisonId)
  const referenceRef = useRef<HTMLImageElement>(null)
  const sampleRef = useRef<HTMLImageElement>(null)
  const firstReferenceRef = useRef<HTMLImageElement | null>(null)
  const firstSampleRef = useRef<HTMLImageElement | null>(null)
  const transformReferenceRef = useRef<ReactZoomPanPinchRef | null>(null)
  const transformSampleRef = useRef<ReactZoomPanPinchRef | null>(null)
  const isTextComparison = comparison?.stage.comparisonType === TypeofComparison.Text
  const { selectedPair } = useResultErrors()
  const selectedIndex = useSelectedPages((state) => state.selectedIndex)
  const idOfError = useResultErrors((state) => state.idOfError)
  const { pairErrors, pairErrorsAreLoading } = usePairErrors(Number(comparisonId), selectedPair as number)
  const { comparisonPagesPairs } = useComparisonPagesPairs(comparisonId)
  const { filesPages } = useComparisonFilesPages(comparisonId, true)
  const imageUrl = filesPages?.imageUrl || ''
  const pagePair = comparisonPagesPairs?.find((comparisonPagesPair) => comparisonPagesPair.id === selectedPair)
  const { referencePage, samplePage } = pagePair || {}

  const [openModalMask, setOpenModalMask] = useState(false)
  const [openModalContur, setOpenModalContur] = useState(false)
  const [openModalEtalon, setOpenModalEtalon] = useState(true)

  const [fontSizeReference, setFontSizeReference] = useState<string>('16px')
  const [marginTopReference, setMarginTopReference] = useState<string>('-20px')
  const [fontSizeSample, setFontSizeSample] = useState<string>('16px')
  const [marginTopSample, setMarginTopSample] = useState<string>('-20px')

  const contentStyle = {
    width: '100%',
    height: imageUrl ? 'auto' : '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }

  useEffect(() => {
    if (!firstReferenceRef.current && referenceRef.current) {
      firstReferenceRef.current = referenceRef.current
    }
    if (!firstSampleRef.current && sampleRef.current) {
      firstSampleRef.current = sampleRef.current
    }
  }, [referenceRef, sampleRef])

  useEffect(() => {
    if (transformReferenceRef.current && idOfError) {
      transformReferenceRef.current.zoomToElement(`ReferenceError${idOfError}`)
      setFontSizeReference('4px')
      setMarginTopReference('-10px')
    }
    if (transformSampleRef.current && idOfError) {
      transformSampleRef.current.zoomToElement(`SampleError${idOfError}`)
      setFontSizeSample('4px')
      setMarginTopSample('-10px')
    }
  }, [idOfError, transformReferenceRef, transformSampleRef])

  return (
    <Box className={classes.viewBlock}>
      <Box className={classes.viewItem}>
        <ResultPreviewsButtons
          comparisonType={comparison?.stage.comparisonType}
          openModalContur={openModalContur}
          openModalEtalon={openModalEtalon}
          openModalMask={openModalMask}
          setOpenModalContur={setOpenModalContur}
          setOpenModalEtalon={setOpenModalEtalon}
          setOpenModalMask={setOpenModalMask}
        />
        <TransformWrapper
          limitToBounds={false}
          onZoom={(ref) =>
            handleZoom(ref, true, {
              setFontSizeReference,
              setMarginTopReference,
              setFontSizeSample,
              setMarginTopSample,
            })
          }
          ref={transformReferenceRef}
        >
          <TransformComponent contentStyle={contentStyle}>
            {openModalMask && !openModalEtalon && !openModalContur && (
              <div className={classes.referenceWrapContainer}>
                <FilePreview
                  fileUrl={pairErrors?.maskFullUrl ? pairErrors?.maskFullUrl : '/images/red1.png'}
                  pageNum={1}
                />
              </div>
            )}
            {!!referencePage && openModalEtalon && !openModalContur && !openModalMask && (
              <>
                <div className={classes.referenceWrapContainer}>
                  {!imageUrl && (
                    <FilePreview
                      fileUrl={isTextComparison ? referencePage.previewFullUrl : referencePage.previewMlCroppedFullUrl}
                      pageNum={referencePage.number}
                      ref={referenceRef}
                    />
                  )}
                  {imageUrl && imageUrl !== null && (
                    <FilePreview fileUrl={imageUrl[selectedIndex || 0] || ''} pageNum={1} ref={referenceRef} />
                  )}
                  <ResultErrorFrames
                    fontSize={fontSizeReference}
                    imageRef={firstReferenceRef}
                    isReference
                    top={marginTopReference}
                  />
                </div>
              </>
            )}
            {openModalContur && !openModalEtalon && !openModalMask && (
              <div className={classes.referenceWrapContainer}>
                <FilePreview
                  fileUrl={pairErrors?.outlineMaskFullUrl ? pairErrors?.outlineMaskFullUrl : ' /images/black1.png '}
                  pageNum={2}
                />
              </div>
            )}
          </TransformComponent>
        </TransformWrapper>
      </Box>

      <Box className={classes.viewItem}>
        <span className={classes.itemLabel}>Образец</span>
        <TransformWrapper
          onZoom={(ref) =>
            handleZoom(ref, false, {
              setFontSizeReference,
              setMarginTopReference,
              setFontSizeSample,
              setMarginTopSample,
            })
          }
          ref={transformSampleRef}
        >
          <TransformComponent contentStyle={contentStyle}>
            {!!samplePage && (
              <>
                <div className={classes.sampleWrapContainer}>
                  <FilePreview
                    fileUrl={isTextComparison ? samplePage.previewFullUrl : samplePage.previewMlCroppedFullUrl}
                    pageNum={samplePage.number}
                    ref={sampleRef}
                  />
                  <ResultErrorFrames
                    fontSize={fontSizeSample}
                    imageRef={firstSampleRef}
                    isReference={false}
                    top={marginTopSample}
                  />
                </div>
              </>
            )}
          </TransformComponent>
        </TransformWrapper>
      </Box>
    </Box>
  )
}
