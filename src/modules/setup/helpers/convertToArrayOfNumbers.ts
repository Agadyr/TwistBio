export const convertToArrayOfNumbers = (value: string): number[] => {
  const arr = value.split(',')
  const result = []

  for (let i = 0; i < arr.length; i++) {
    if (arr[i]) {
      if (!isNaN(Number(arr[i]))) {
        result.push(parseInt(arr[i]))
      } else {
        const range = arr[i].split('-')
        const start = parseInt(range[0])
        const end = parseInt(range[1])

        for (let j = start; j <= end; j++) {
          result.push(j)
        }
      }
    }
  }

  return Array.from(new Set(result))
}
