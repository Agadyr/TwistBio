import { createLazyFileRoute } from '@tanstack/react-router'
import { ResultsBlock } from 'modules/results/components/ResultsBlock'

export const Route = createLazyFileRoute('/_comparison/$comparisonId/results')({
  component: ResultsBlock,
})
