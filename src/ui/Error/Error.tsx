import { FC, ReactNode } from 'react'

import cx from 'clsx'

import classes from './Error.module.scss'

interface ErrorProps {
  children: ReactNode
  className?: string
}

export const Error: FC<ErrorProps> = ({ children, className }) => (
  <div className={cx(classes.error, className)}>{children}</div>
)
