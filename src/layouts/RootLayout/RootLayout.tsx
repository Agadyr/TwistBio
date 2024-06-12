import { FC, lazy, Suspense } from 'react'
import { ToastContainer } from 'react-toastify'

import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Outlet } from '@tanstack/react-router'
import { queryClient } from 'config/queryClient'
import { IS_DEV_MODE } from 'constants/env'
import { toastsProps } from 'constants/toasts'

const TanStackRouterDevtools = IS_DEV_MODE
  ? lazy(() =>
      import('@tanstack/router-devtools').then((res) => ({
        default: res.TanStackRouterDevtools,
      })),
    )
  : () => null

export const RootLayout: FC = () => (
  <QueryClientProvider client={queryClient}>
    <Outlet />
    <ToastContainer {...toastsProps} />
    <ReactQueryDevtools initialIsOpen={false} position="bottom" />
    <Suspense>
      <TanStackRouterDevtools />
    </Suspense>
  </QueryClientProvider>
)
