import { createLazyFileRoute } from '@tanstack/react-router'
import { ReceiveResultsPage } from 'pages/comparison/ReceiveResultsPage'

export const Route = createLazyFileRoute('/_comparison/$comparisonId/receive-results')({
  component: ReceiveResultsPage,
})
