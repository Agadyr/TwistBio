import { FC } from 'react'

import { Box } from '@mui/material'

import classes from './ResultPreviewsButtons.module.scss'

interface ResultPreviewsButtonsProps {
  openModalEtalon: boolean
  openModalMask: boolean
  openModalContur: boolean
  setOpenModalEtalon: (value: boolean) => void
  setOpenModalMask: (value: boolean) => void
  setOpenModalContur: (value: boolean) => void
  comparisonType: string | undefined
}

export const ResultPreviewsButtons: FC<ResultPreviewsButtonsProps> = ({
  openModalEtalon,
  openModalMask,
  openModalContur,
  setOpenModalEtalon,
  setOpenModalMask,
  setOpenModalContur,
  comparisonType,
}) => (
  <Box>
    <span
      className={`${classes.itemLabel} ${openModalEtalon ? classes.itemLabelRbBordered : 'btn btngray'}`}
      onClick={() => {
        setOpenModalEtalon(true)
        setOpenModalContur(false)
        setOpenModalMask(false)
      }}
    >
      Эталон
    </span>

    {comparisonType !== 'текстовое сравнение' && (
      <span
        className={`${
          openModalMask ? `${classes.itemLabel2} ${classes.itemLabelRbLBordered}` : `${classes.itemLabel2} btn btngray`
        }`}
        onClick={() => {
          setOpenModalMask(true)
          setOpenModalEtalon(false)
          setOpenModalContur(false)
        }}
      >
        Маска
      </span>
    )}

    {comparisonType !== 'текстовое сравнение' && (
      <span
        className={`${
          openModalContur
            ? `${classes.itemLabel3} ${classes.itemLabelRbLBordered}`
            : `${classes.itemLabel3} btn btngray`
        }`}
        onClick={() => {
          setOpenModalContur(true)
          setOpenModalEtalon(false)
          setOpenModalMask(false)
        }}
      >
        Маска контуров
      </span>
    )}
  </Box>
)
