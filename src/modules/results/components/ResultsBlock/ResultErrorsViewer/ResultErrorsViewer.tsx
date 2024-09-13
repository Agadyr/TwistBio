import { useEffect, useRef, useState } from 'react'

import { Box, Button, CircularProgress } from '@mui/material'
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
  const setIdOfError = useResultErrors((state) => state.setIdOfError)
  const setHoveredError = useResultErrors((state) => state.setHoveredError)
  const { pairErrors: newErrors } = usefilterPairErrors((state) => ({
    pairErrors: state.pairErrors,
  }))

  useEffect(() => {
    if (selectedError !== null) {
      const element = document.getElementById(`List${selectedError}`)
      if (element) {
        console.log(element)
        element.scrollIntoView({ block: 'center', behavior: 'smooth' })
      }
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

  const errorList = newErrors?.errors || pairErrors.errors

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

  const handleClick = (pairError: any) => {
    setIdOfError(pairError.id)
  }

  return (
    <>
      <Box className={classes.errors}>
        {errorList.map((pairError: any, index: number) => (
          <div
            className={cx(classes.item, { [classes.active]: pairError.id === selectedError })}
            id={`List${pairError.id}`}
            key={index}
            onClick={() => {
              setError(pairError)
              setOpenModal(true)
              setErrorId(index)
            }}
            onMouseEnter={() => setHoveredError(pairError.id)}
            onMouseLeave={() => setHoveredError(0)}
            ref={(el: HTMLDivElement) => {
              if (el) {
                itemRefs.current[pairError.id] = el
              } else {
                delete itemRefs.current[pairError.id]
              }
            }}
          >
            <span>{`№ ${pairError.number} ${pairError.status?.name}`}</span>
            <span>Тип: {pairError.type?.name}</span>
            <span>{`Критичность: ${pairError.severity?.name || 'неизвестно'}`}</span>
            <span>Комментарий: {pairError.comment}</span>
            <Box className={classes.last}>
              <Button
                className="btn btn-purple"
                onClick={(e) => {
                  e.stopPropagation()
                  handleClick(pairError)
                }}
                variant="outlined"
              >
                Zoom
              </Button>
            </Box>
          </div>
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
