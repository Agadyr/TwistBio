import { createLazyFileRoute } from '@tanstack/react-router'
import { ComparisonStep, useHeader } from 'components/common/Header'
import { TypeBlock } from 'modules/type/components/TypeBlock'

export const Route = createLazyFileRoute('/_comparison/$comparisonId/type')({
  component: TypePage,
})

function TypePage() {
  useHeader(ComparisonStep.Type)
  return <TypeBlock />
}
