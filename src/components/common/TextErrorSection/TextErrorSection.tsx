import { FC } from 'react'

import { Box, Typography } from '@mui/material'

import classes from './TextErrorSection.module.scss'

export const TextErrorSection: FC<{ content: string[]; bestMatch?: string[] }> = ({ content, bestMatch }) => (
  <Box className={classes.imgx2}>
    {content.map((text, index) => (
      <Box key={index}>
        <Typography variant="h5">
          {index + 1}) {text}
        </Typography>
        {bestMatch && bestMatch[index] ? (
          bestMatch[index] === text ? (
            <Typography style={{ color: 'green' }}>Без Ошибок</Typography>
          ) : (
            <div>
              <Typography variant="h6">Правильно:</Typography>
              <Typography style={{ color: 'red' }} variant="h6">
                {bestMatch[index]}
              </Typography>
            </div>
          )
        ) : (
          <Typography style={{ color: 'red' }}>Не найдено</Typography>
        )}
      </Box>
    ))}
  </Box>
)
