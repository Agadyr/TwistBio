import { createRootRoute } from '@tanstack/react-router'
import 'assets/scss/app.scss'
import { RootLayout } from 'layouts/RootLayout'

export const Route = createRootRoute({
  component: RootLayout,
})
