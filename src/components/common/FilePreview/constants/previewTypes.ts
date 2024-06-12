import { FC, Ref } from 'react'

import { ImagePreview } from 'components/common/FilePreview/ImagePreview'
import { PdfPreview } from 'components/common/FilePreview/PdfPreview'

import { FileType } from './fileType'

interface Props {
  className?: string
  fileUrl: string
  pageNum: number
  ref?: Ref<HTMLImageElement>
}

export const PreviewTypes = {
  [FileType.Pdf]: PdfPreview,
  [FileType.Jpeg]: ImagePreview,
  [FileType.Jpg]: ImagePreview,
  [FileType.Png]: ImagePreview,
} as Record<FileType, FC<Props>>
