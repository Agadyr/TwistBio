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
  const [error, setError] = useState<any>({})
  const [errorId, setErrorId] = useState<number | null>(null)
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
      console.log(selectedError, 'selectedError')
      itemRefs.current[selectedError].scrollIntoView({ block: 'center', behavior: 'smooth' })
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

  const errorList = newErrors?.errors ? newErrors?.errors : pairErrors?.errors

  const onChangeError = (errorChangeValue: string) => {
    if (errorChangeValue === 'previous' && errorId !== null && errorId > 0) {
      const newError = errorList[errorId - 1]
      setError(newError)
      setErrorId(errorId - 1)
    } else if (errorChangeValue === 'next' && errorId !== null && errorId < errorList.length - 1) {
      const newError = errorList[errorId + 1]
      setError(newError)
      setErrorId(errorId + 1)
    }
  }

  return (
    <>
      <Box className={classes.errors}>
        {errorList.map((pairError: any, index: number) => (
          <Box
            className={cx(classes.item, { [classes.active]: pairError.id === selectedError })}
            key={pairError.id}
            onClick={() => {
              setError(pairError)
              setOpenModal(true)
              setErrorId(index)
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
      <ResultErrorsModal
        error={error}
        onChangeError={onChangeError}
        openModal={openModal}
        setOpenModal={setOpenModal}
      />
    </>
  )
}
