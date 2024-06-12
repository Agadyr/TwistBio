import { forwardRef, ReactNode } from 'react'

interface Props {
  className?: string
  fileUrl: string
  pageNum: number
  children?: ReactNode
}

export const ImagePreview = forwardRef<HTMLImageElement, Props>(({ fileUrl, className, children }, ref) => (
  <>
    <img className={className} ref={ref} src={fileUrl} />
    {children}
  </>
))
