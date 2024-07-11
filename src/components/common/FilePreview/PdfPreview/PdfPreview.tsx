import { forwardRef, ReactNode, useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import { Box, CircularProgress } from '@mui/material'
import cx from 'clsx'
import { pdfPreviewManager } from 'packages/pdfPreview'

import classes from './PdfPreview.module.scss'

interface Props {
  className?: string
  fileUrl: string
  pageNum: number
  children?: ReactNode
}

//Review: лучше вынестиPdfPreview в папку components внутри FilePreview
// Она булет возможно будет использоваться в других компонентах
export const PdfPreview = forwardRef<HTMLImageElement, Props>(({ fileUrl, pageNum, className, children }, ref) => {
  const [imgSrc, setImgSrc] = useState('')

  useEffect(() => {
    pdfPreviewManager
      .getPreview(fileUrl, pageNum)
      .then((img) => setImgSrc(img))
      .catch(() => toast.error('Не удалось загрузить превью страницы'))
  }, [fileUrl, pageNum])

  return (
    <>
      {!imgSrc ? (
        <Box className={cx(className, classes.center)}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <img className={className} ref={ref} src={imgSrc} />
          {children}
        </>
      )}
    </>
  )
})
