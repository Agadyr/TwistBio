import { FC, useState } from 'react'

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import { Box, IconButton, Typography } from '@mui/material'
import { FilePreview } from 'components/common/FilePreview'
import { ComparisonFileResponse } from 'modules/setup/api'

import classes from './SetupFileInputSlider.module.scss'

interface SetupSliderProps {
  pageAmount: number
  fileResponse?: ComparisonFileResponse
}

export const SetupFileInputSlider: FC<SetupSliderProps> = ({ fileResponse, pageAmount }) => {
  const [activePage, setActivePage] = useState(1)

  const nextSlide = () => {
    if (activePage < pageAmount) {
      setActivePage((prevState) => prevState + 1)
    }
  }

  const prevSlide = () => {
    if (activePage > 1) {
      setActivePage((prevState) => prevState - 1)
    }
  }

  return (
    <Box className={classes.slider}>
      <Box className={classes.wrapper}>
        {fileResponse && (
          <FilePreview className={classes.image} fileUrl={fileResponse.previewFullUrl} pageNum={activePage} />
        )}
      </Box>
      {pageAmount > 0 && (
        <Box className={classes.navigation}>
          <IconButton onClick={prevSlide}>
            <ArrowBackIosIcon />
          </IconButton>
          <Typography className={classes.pageIndex}>{activePage}</Typography>
          <IconButton onClick={nextSlide}>
            <ArrowForwardIosIcon />
          </IconButton>
        </Box>
      )}
    </Box>
  )
}
