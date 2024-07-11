export const transformCoordinates = (coords: number[]): number[] => {
  const [x1, y1, x2, y2] = coords
  return [x1, y1, 1 - x2, 1 - y2]
}
