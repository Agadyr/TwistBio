import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_aboutComparison/$id/aboutComparison')({
  component: () => <div>Hello /_aboutComparison/$id/aboutComparison!</div>
})