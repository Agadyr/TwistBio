export type NonArray<T> = T extends Array<any> ? never : T
