import { createRootRoute } from '@tanstack/react-router'
import 'assets/scss/app.scss'
import { RootLayout } from 'layouts/RootLayout'

// Review если сделать одно подчерквание ломается роутеринг
export const Route = createRootRoute({
  component: RootLayout,
})
