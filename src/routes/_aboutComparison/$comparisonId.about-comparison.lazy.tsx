import { createLazyFileRoute } from '@tanstack/react-router'
import AboutComparison from 'modules/allComparison/components/AboutComparison'

export const Route = createLazyFileRoute('/_aboutComparison/$comparisonId/about-comparison')({
  component: AboutComparisonPage,
})

function AboutComparisonPage() {
  return <AboutComparison />
}
