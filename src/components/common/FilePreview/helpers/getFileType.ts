import { FileType } from 'components/common/FilePreview/constants/fileType'

export const getFileType = (fileUrl: string) => {
  if (!fileUrl) {
    return undefined
  }
  const base64Pattern = /^data:image\/([a-zA-Z]+);base64,/

  const match = fileUrl.match(base64Pattern)
  if (match) {
    const extension = match[1]
    return (Object.values(FileType) as FileType[]).find(
      (fileType) => fileType.toLowerCase() === extension.toLowerCase(),
    )
  }

  const re = /(?:\.([^.]+))?$/
  const extension = re.exec(fileUrl)?.[1]
  return (Object.values(FileType) as FileType[]).find((fileType) => fileType.toLowerCase() === extension?.toLowerCase())
}
