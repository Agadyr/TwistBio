import { FC } from 'react'

import { Box, Typography } from '@mui/material'
import { Pair } from 'modules/comparison/api'

import { DetailsErrors } from './detailErrors/detailsErrors'
import classes from './detailsPairs.module.scss'

interface Props {
  item: Pair
  comparisonType: string
  id: number
}
export const DetailsPairs: FC<Props> = ({ item, comparisonType, id }) => {
  if (!item) {
    return 'none'
  }
  return (
    <>
      <Typography>{id + 1} проверка</Typography>
      <Typography>
        Файл-эталон: {item.referencePage.previewFullUrl}, страница {item.referencePage.number}
      </Typography>
      <Typography>
        Файл-образец: {item.samplePage.previewFullUrl}, страница {item.samplePage.number}
      </Typography>
      <Box className="df g-1">
        <img alt="" className={classes.img} src={item.referencePreviewMlCroppedFullUrl ?? undefined} />
        <img alt="" className={classes.img} src={item.samplePreviewMlCroppedFullUrl ?? undefined} />
      </Box>
      <Box className="df g-1">
        <img alt="" className={classes.img} src={item.maskFullUrl ?? undefined} />
        <img alt="" className={classes.img} src={item.outlineMaskFullUrl ?? undefined} />
      </Box>

      <Box className="df g-1">
        <Box>
          <Typography className="pb-1 pt-2">Цветовая карта Эталона</Typography>
          <img alt="" src={item.referenceColorMaskFullUrl ?? undefined} />
        </Box>
        <Box>
          <Typography className="pb-1 pt-2">Цветовая карта образца</Typography>
          <img alt="" src={item.sampleColorMaskFullUrl ?? undefined} />
        </Box>
      </Box>
      {item?.errors.map((error, index) => (
        <DetailsErrors comparisonType={comparisonType} error={error} item={item} key={index} />
      ))}
    </>
  )
}
