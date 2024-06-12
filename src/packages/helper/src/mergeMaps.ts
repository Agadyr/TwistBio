export const mergeMaps = <K, V>(map1: Map<K, V>, map2: Map<K, V>): void => {
  for (const [key, value] of map2) {
    map1.set(key, value)
  }
}
