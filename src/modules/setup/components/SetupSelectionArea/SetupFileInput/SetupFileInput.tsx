import { DragEvent, FC, useEffect, useRef, useState } from 'react'

import AddIcon from '@mui/icons-material/Add'
import { Box } from '@mui/material'
import { useParams } from '@tanstack/react-router'
import cx from 'clsx'
import { useComparison } from 'modules/comparison/queries'
import { ComparisonFileResponse, ComparisonOutlineResponse } from 'modules/setup/api'
import { availableExtensions } from 'modules/setup/constants/availableExtensions'
import { useUploadComparisonFile } from 'modules/setup/queries'

import classes from './SetupFileInput.module.scss'
import { SetupFileInputModal } from './SetupFileInputModal'

interface SetupFileInputProps {
  accept?: string
  filesPages: ComparisonOutlineResponse[]
  isReference: boolean
}

export const SetupFileInput: FC<SetupFileInputProps> = ({ isReference, filesPages }) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [file, setFile] = useState<File>()
  const [drag, setDrag] = useState(false)
  const [fileResponse, setFileResponse] = useState<ComparisonFileResponse>()
  const [openModal, setOpenModal] = useState(false)
  const { uploadComparisonFile, isUploadingComparisonFile, uploadComparisonFileError } = useUploadComparisonFile()
  const params = useParams({ from: '/_comparison/$comparisonId/setup' })
  const comparisonId = Number(params.comparisonId)
  const { comparison } = useComparison(comparisonId)
  const stageId = comparison?.stage.id

  const accept = stageId ? availableExtensions[stageId][isReference ? 'reference' : 'sample'] : ''

  const onDragStart = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setDrag(true)
  }

  const onDragLeave = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setDrag(false)
  }

  const onDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setFile(Array.from(event.dataTransfer.files)[0])
    setDrag(false)
  }

  useEffect(() => {
    if (file) {
      const formData = new FormData()
      formData.append('is_reference', JSON.stringify(isReference))
      formData.append('file', file)
      uploadComparisonFile(
        {
          comparisonId,
          payload: formData,
        },
        {
          onSuccess: setFileResponse,
        },
      )
      setOpenModal(true)
    }
  }, [file])

  useEffect(() => {
    inputRef.current!.value = ''
  })
  return (
    <Box
      className={cx(classes.upload, { [classes.drag]: drag, [classes.bottom]: filesPages.length })}
      component="label"
      onDragLeave={onDragLeave}
      onDragOver={onDragStart}
      onDragStart={onDragStart}
      onDrop={onDrop}
    >
      <AddIcon className={cx(classes.icon, { [classes.drag]: drag, [classes.bottom]: filesPages.length })} />
      <input
        accept={accept}
        hidden
        onChange={(event) => setFile(Array.from(event.target.files!)[0])}
        ref={inputRef}
        type="file"
      />
      <SetupFileInputModal
        error={!!uploadComparisonFileError}
        fileResponse={fileResponse}
        loading={isUploadingComparisonFile}
        openModal={openModal}
        setOpenModal={setOpenModal}
      />
    </Box>
  )
}
