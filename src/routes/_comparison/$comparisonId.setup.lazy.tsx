import { createLazyFileRoute } from '@tanstack/react-router'
import { ComparisonStep, useHeader } from 'components/common/Header'
import { SetupBlock } from 'modules/setup/components/SetupBlock'

export const Route = createLazyFileRoute('/_comparison/$comparisonId/setup')({
  component: SetupPage,
})

function SetupPage() {
  useHeader(ComparisonStep.Setup)
  return <SetupBlock />
}
