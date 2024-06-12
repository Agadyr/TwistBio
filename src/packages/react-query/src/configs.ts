export const noRetryOnError = {
  retry: false,
  retryOnMount: false,
  refetchOnMount: false,
  refetchOnWindowFocus: false,
}

export const retryOnMount = {
  retry: false,
  refetchOnWindowFocus: false,
  staleTime: 1000 * 60 * 5,
}
