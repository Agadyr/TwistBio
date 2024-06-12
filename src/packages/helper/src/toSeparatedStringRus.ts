export const toSeparatedStringRus = (string: string) => {
  if (/^[А-Яа-я]+$/.test(string.charAt(0))) {
    string = string.replace(/[А-Я]/g, (match) => ` ${match}`)
    string = string.toLowerCase()
    string = string.charAt(0).toUpperCase() + string.slice(1)
  }
  return string
}
