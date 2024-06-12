import { ComparisonStep, useHeader } from 'components/common/Header'
import { ReceiveResultsBlock } from 'modules/receiveResults/components/ReceiveResultsBlock'

export const ReceiveResultsPage = () => {
  useHeader(ComparisonStep.ReceiveResults)
  return <ReceiveResultsBlock />
}
