import { FileType } from 'components/common/FilePreview/constants/fileType'

export const getFileType = (fileUrl: string) => {
  const re = /(?:\.([^.]+))?$/
  const extension = re.exec(fileUrl)?.[1]
  return (Object.values(FileType) as FileType[]).find((fileType) => fileType.toLowerCase() === extension?.toLowerCase())
}
