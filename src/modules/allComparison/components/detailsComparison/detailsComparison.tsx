import { FC, useEffect, useState } from 'react'

import { faDownload, faEnvelope, faPen, faPrint, faShareFromSquare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Box, Typography } from '@mui/material'
import { useNavigate } from '@tanstack/react-router'
import { Evaluation } from 'modules/comparison/api'
import { useDownloadComparisonReport } from 'modules/comparison/queries/useDownloadComparison'
import { usePrintComparisonReport } from 'modules/comparison/queries/usePrintComparison'

import classes from './detailsComparison.module.scss'
import { SendEmailModal } from './emailModal/emailModal'
import { UsersModal } from './usersModal/usersModal'

interface DetailComparisonProps {
  comparisonReport?: Evaluation
}

export const DetailComparison: FC<DetailComparisonProps> = ({ comparisonReport }) => {
  const [download, setDownload] = useState(0)
  const [printId, setPrintId] = useState<number | null>(null)
  const [sendEmailModal, setSendEmailModal] = useState(false)
  const [usersModal, setUsersModal] = useState(false)
  const [comparisonType, setComparisonType] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    if (comparisonReport?.stage.comparisonType === 'попиксельное сравнение') {
      setComparisonType('попиксельного сравнение')
    } else {
      setComparisonType('потекстового сравнение')
    }
  }, [comparisonReport])

  // Хук для загрузки отчета
  useDownloadComparisonReport(download === 0 ? 0 : download)

  // Хук для печати отчета
  usePrintComparisonReport(printId !== null ? printId : 0)

  if (!comparisonReport) {
    return <Typography>Нет данных для отображения</Typography>
  }

  const { id: comparisonId } = comparisonReport

  return (
    <>
      <Box className="df jcsb aic">
        <Typography className={classes.h1} variant="h3">
          Сравнение №{comparisonId}
        </Typography>
        <Box className={`${classes.icons} df jcsb`}>
          <FontAwesomeIcon
            icon={faPen}
            onClick={() => navigate({ to: '/$comparisonId/results', params: { comparisonId } })}
          />
          <FontAwesomeIcon
            icon={faDownload}
            onClick={() => {
              setDownload(Number(comparisonId))
            }}
          />
          <FontAwesomeIcon icon={faShareFromSquare} onClick={() => setUsersModal(true)} />
          <FontAwesomeIcon icon={faEnvelope} onClick={() => setSendEmailModal(true)} />
          <FontAwesomeIcon
            icon={faPrint}
            onClick={() => {
              setPrintId(Number(comparisonId))
            }}
          />
        </Box>
      </Box>
      <Box className="content">
        <Typography className={classes.body2}>Наименование Проекта: {comparisonReport.name}</Typography>
        <Typography className={classes.body2}>Начало проверки: {comparisonReport.createdAt}</Typography>
        <Typography className={classes.body2}>Автор: {comparisonReport.author.email}</Typography>
        <Typography className={classes.body2}>Номер Партии: {comparisonReport.number}</Typography>
        <Typography className={classes.body2}>Окончание проверки: {comparisonReport.updatedAt}</Typography>
        <Typography className={classes.body2}>Вид Загрузки: {comparisonReport.stage.uploadType}</Typography>
        <Typography className={classes.body2}>Этап: {comparisonReport.stage.name}</Typography>
        <Typography className={classes.body2}>Оценка: {comparisonReport.evaluation}</Typography>
      </Box>
      <Typography variant="h4">Обзор Проекта</Typography>
      <Typography className="text-danger">Заключение: различия обнаружены</Typography>

      <Typography>
        Проверка изображения: Важных отношений - {comparisonReport.countErrorsType.high}, допустимых отношений -{' '}
        {comparisonReport.countErrorsType.medium}
      </Typography>
      <Typography>
        Проверка штрих-кодов: с ошибкой - {comparisonReport.countErrorsType.barCodeErr}, проверенных -{' '}
        {comparisonReport.countErrorsType.barCodeCheck}
      </Typography>

      <Typography className={classes.h3}>Различия {comparisonType}</Typography>
      <SendEmailModal sendEmailModal={sendEmailModal} setSendEmailModal={setSendEmailModal} />
      <UsersModal setUsersModal={setUsersModal} usersModal={usersModal} />
    </>
  )
}
