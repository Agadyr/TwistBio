import { useEffect, useRef, useState } from 'react'

import { Box, CircularProgress } from '@mui/material'
import { useParams } from '@tanstack/react-router'
import cx from 'clsx'
import { usePairErrors } from 'modules/results/queries'
import { useResultErrors } from 'modules/results/store'
import { usefilterPairErrors } from 'modules/results/store/store'

import { ResultErrorsModal } from './ResultErrorsModal'
import classes from './ResultErrorsViewer.module.scss'

export const ResultErrorsViewer = () => {
  const itemRefs = useRef<Record<number, HTMLDivElement>>({})
  const [openModal, setOpenModal] = useState(false)
  const [error, setError] = useState({})
  const { comparisonId } = useParams({ from: '/_comparison/$comparisonId/results' })
  const selectedPair = useResultErrors((state) => state.selectedPair)
  const { pairErrors, pairErrorsAreLoading } = usePairErrors(Number(comparisonId), selectedPair as number)
  const selectedError = useResultErrors((state) => state.selectedError)
  const setHoveredError = useResultErrors((state) => state.setHoveredError)
  const { pairErrors: newErrors } = usefilterPairErrors((state) => ({
    pairErrors: state.pairErrors,
  }))
  useEffect(() => {
    if (selectedError) {
      itemRefs.current[selectedError]?.scrollIntoView({ block: 'center', behavior: 'smooth' })
    }
  }, [selectedError])

  if (pairErrorsAreLoading) {
    return (
      <Box className={classes.center}>
        <CircularProgress />
      </Box>
    )
  }
  if (!pairErrors || !pairErrors.errors.length) {
    return 'Нет ошибок'
  }
  const errorList = newErrors?.errors ? newErrors : pairErrors
  return (
    <>
      <Box className={classes.errors}>
        {errorList?.errors.map((pairError: any) => (
          <Box
            className={cx(classes.item, { [classes.active]: pairError.id === selectedError })}
            key={pairError.id}
            onClick={() => {
              setError(pairError)
              setOpenModal(true)
            }}
            onMouseEnter={() => setHoveredError(pairError.id)}
            onMouseLeave={() => setHoveredError(0)}
            ref={(el: HTMLDivElement) => (itemRefs.current[pairError.id] = el)}
          >
            <span>{`№ ${pairError.number} ${pairError.status?.name}`}</span>
            <span>Тип: {pairError.type?.name}</span>
            <span>{`Критичность: ${pairError.severity?.name || 'неизвестно'}`}</span>
            <span>Комментарий: {pairError.comment}</span>
          </Box>
        ))}
      </Box>
      <ResultErrorsModal error={error} openModal={openModal} setOpenModal={setOpenModal} />
    </>
  )
}
