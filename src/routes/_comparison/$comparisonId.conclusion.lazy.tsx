import { createLazyFileRoute } from '@tanstack/react-router'
import { Conclusion } from 'pages/comparison/Conclusion'

export const Route = createLazyFileRoute('/_comparison/$comparisonId/conclusion')({
  component: Conclusion,
})
