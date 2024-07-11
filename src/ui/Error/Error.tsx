import { FC, ReactNode } from 'react'

//Review: Лучше использовать полное название для функции, не ясно что это за cx.
//Понятно что cx для стилизации применяется.
import cx from 'clsx'

import classes from './Error.module.scss'

interface ErrorProps {
  children: ReactNode
  className?: string
}

export const Error: FC<ErrorProps> = ({ children, className }) => (
  <div className={cx(classes.error, className)}>{children}</div>
)
