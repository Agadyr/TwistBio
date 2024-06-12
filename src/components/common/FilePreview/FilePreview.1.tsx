import { forwardRef } from 'react'
import { PreviewTypes } from './constants/previewTypes'
import { getFileType } from './helpers/getFileType'
import { Props } from './FilePreview'

export const FilePreview = forwardRef<HTMLImageElement, Props>(({ fileUrl, className, pageNum, isRp }, ref) => {
  console.log(fileUrl)
  const fileType = getFileType(fileUrl)
  console.log(`${isRp} ISRP ` + fileType)
  if (!fileType) {
    return <div>нет расширения</div>
  }
  const Component = PreviewTypes[fileType]
  if (!Component) {
    return <div>нет превью для .{fileType} файлов</div>
  }
  return <Component className={className} fileUrl={fileUrl} pageNum={pageNum} ref={ref} />
})
