import { useState } from 'react'

import { faFilter } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Box, Button, IconButton, Modal, Typography } from '@mui/material'
import { Link, useParams } from '@tanstack/react-router'
import { ComparisonStep, useHeader } from 'components/common/Header'
import { commonHeaders } from 'components/common/Header/constants/comparisonStep'
import { TypeofComparison } from 'interfaces/common.interfaces'
import { useComparison } from 'modules/comparison/queries'
import { usePairErrors } from 'modules/results/queries'
import { useResultErrors } from 'modules/results/store'

import { ResultErrorsViewer } from './ResultErrorsViewer'
import { ResultFiltersModal } from './ResultFiltersModal'
import { ResultPagesViewer } from './ResultPagesViewer'
import { ResultPreviews } from './ResultPreviews'
import classes from './ResultsBlock.module.scss'

export const ResultsBlock = () => {
  const params = useParams({ from: '/_comparison/$comparisonId/results' })
  const { comparison } = useComparison(Number(params.comparisonId))
  const { comparisonId } = useParams({ from: '/_comparison/$comparisonId/results' })
  const selectedPair = useResultErrors((state) => state.selectedPair)
  const { pairErrors, pairErrorsAreLoading } = usePairErrors(Number(comparisonId), selectedPair as number)
  const isTextComparison = comparison?.stage.comparisonType === TypeofComparison.Text
  const header = isTextComparison ? 'Анализ результатов текстового сравнения' : commonHeaders[ComparisonStep.Results]
  useHeader(ComparisonStep.Results, header)
  const [openModal, setOpenModal] = useState(false)
  const [openModalCard, setOpenModalCard] = useState(false)
  const [filter, onFilter] = useState(false)
  const onChange = (obj: any) => {
    if (obj === true) {
      onFilter(true)
    } else {
      onFilter(false)
    }
  }
  return (
    <>
      <Box className={classes.top}>
        <ResultPagesViewer />
        <Box className={classes.buttons}>
          <IconButton onClick={() => setOpenModal(true)}>
            <FontAwesomeIcon className={filter ? 'filter-selected' : ''} icon={faFilter} />
          </IconButton>
          {!isTextComparison && (
            <Button onClick={() => setOpenModalCard(true)} variant="contained">
              цв. карта
            </Button>
          )}
        </Box>
      </Box>
      <ResultFiltersModal onChange={onChange} openModal={openModal} setOpenModal={setOpenModal} />

      <Modal
        aria-describedby="keep-mounted-modal-description"
        aria-labelledby="keep-mounted-modal-title"
        keepMounted
        onClose={() => setOpenModalCard(false)}
        open={openModalCard}
      >
        <Box className={classes.modal}>
          <Box>
            <Typography variant="h6">Цветовая карта эталона</Typography>
            <img
              alt=""
              className={classes.box}
              src={pairErrors?.referenceColorMaskFullUrl ? pairErrors?.referenceColorMaskFullUrl : ' /images/mask.png '}
            />
          </Box>
          <Box>
            <Typography variant="h6">Цветовая карта Образца</Typography>
            <img
              alt=""
              className={classes.box}
              src={pairErrors?.sampleColorMaskFullUrl ? pairErrors?.sampleColorMaskFullUrl : ' /images/mask.png '}
            />
          </Box>
        </Box>
      </Modal>
      <Box className={classes.bottom}>
        <ResultPreviews />
        <ResultErrorsViewer />
      </Box>
      <Box className={classes.links}>
        <Button variant="outlined">
          <Link params={params} to="/$comparisonId/setup">
            Назад
          </Link>
        </Button>
        <Button variant="outlined">
          <Link params={params} to="/$comparisonId/conclusion">
            Перейти к заключению
          </Link>
        </Button>
      </Box>
    </>
  )
}
