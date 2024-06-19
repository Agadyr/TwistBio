import { forwardRef, ReactNode } from 'react'

import { PreviewTypes } from './constants/previewTypes'
import { getFileType } from './helpers/getFileType'

interface Props {
  className?: string
  fileUrl: string
  pageNum: number
  children?: ReactNode
}

export const FilePreview = forwardRef<HTMLImageElement, Props>(({ fileUrl, className, pageNum }, ref) => {
  const fileType = getFileType(fileUrl)
  if (!fileType) {
    return <div>нет расширения</div>
  }
  const Component = PreviewTypes[fileType]
  if (!Component) {
    return <div>нет превью для .{fileType} файлов</div>
  }
  return <Component className={className} fileUrl={fileUrl} pageNum={pageNum} ref={ref} />
})
