import { createLazyFileRoute } from '@tanstack/react-router'
import AboutComparison from 'modules/allComparison/components/AboutComparison'

export const Route = createLazyFileRoute('/$compId/about')({
  component: () => <AboutComparison />,
})
