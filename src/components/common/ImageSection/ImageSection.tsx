import { FC, RefObject, useEffect, useLayoutEffect, useState } from 'react'

import { Box, Typography } from '@mui/material'
import { FilePreview } from 'components/common/FilePreview'
import { CropRatio } from 'interfaces/common.interfaces'

import { ErrorImageFrame } from './ImageError'
import classes from './ImageSection.module.scss'

export const ImageSection: FC<{
  title: string
  src?: string
  cropRatio?: CropRatio[]
  imageRef?: RefObject<HTMLImageElement>
}> = ({ title, src, cropRatio, imageRef }) => {
  const [imgWrapClass, setImgWrapClass] = useState<string>(classes.imgWrap2)

  useLayoutEffect(() => {
    if (src && imageRef?.current) {
      const img = new Image()
      img.src = src
      img.onload = () => {
        const filePreviewElement = imageRef.current
        if (filePreviewElement) {
          const filePreviewRect = filePreviewElement.getBoundingClientRect()
          setImgWrapClass(filePreviewRect.height > 310 ? classes.imgWrap3 : classes.imgWrap2)
        }
      }
    }
  }, [src, imageRef, cropRatio])

  return (
    <Box>
      <Typography>{title}</Typography>
      <Box className={classes.imgWrap}>
        <Box className={imgWrapClass}>
          {src && (
            <>
              <FilePreview className={classes.img} fileUrl={src} pageNum={1} ref={imageRef} />
              {cropRatio &&
                cropRatio.map((item, index) => (
                  <div className={classes.container} key={index}>
                    <ErrorImageFrame cropRatio={item} />
                  </div>
                ))}
            </>
          )}
        </Box>
      </Box>
    </Box>
  )
}
