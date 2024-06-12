import { createFileRoute } from '@tanstack/react-router'
import { ComparisonLayout } from 'layouts/ComparisonLayout'

export const Route = createFileRoute('/_comparison')({
  component: ComparisonLayout,
})
