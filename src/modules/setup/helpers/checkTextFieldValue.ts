export const checkTextFieldValue = (value: string, pagesNumber: number): string => {
  const arr = value.split(',')
  for (let i = 0; i < arr.length; i++) {
    if (!isNaN(Number(arr[i]))) {
      const num = parseInt(arr[i])

      if (num === 0) {
        return 'Ошибка: Страницы 0 не существует'
      }
      if (num < 0) {
        return 'Ошибка: Число не должно быть отрицательным'
      }
      if (num > pagesNumber) {
        return `Ошибка: Число ${num} превышает количество страниц ${pagesNumber}`
      }
    } else {
      if (!/^(\d+-\d+|\d+)$/.test(arr[i])) {
        return `Ошибка: Элемент ${arr[i]} не является числом или диапазоном чисел`
      }

      const range = arr[i].split('-')
      const start = parseInt(range[0])
      const end = parseInt(range[1])

      if (start === 0 || end === 0) {
        return `Ошибка: Страницы 0 не существует, проверьте диапазон ${arr[i]}`
      }

      if (start > pagesNumber) {
        return `Ошибка: Начальное значение диапазона ${arr[i]} превышает количество страниц ${pagesNumber}`
      }
      if (end > pagesNumber) {
        return `Ошибка: Конечное значение диапазона ${arr[i]} превышает количество страниц ${pagesNumber}`
      }
      if (start > end) {
        return `Ошибка: Начальное значение диапазона ${arr[i]} больше конечного`
      }
      if (start === end) {
        return `Ошибка: Начальное и конечное значения диапазона ${arr[i]} равны`
      }
    }
  }
  return ''
}
