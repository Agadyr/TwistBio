import { useNavigate, useParams } from '@tanstack/react-router'
import { ComparisonStep, useHeader } from 'components/common/Header'
import { useUpdateComparison } from 'modules/type/queries/useUpdateComparison'
import { FormData } from 'pages/comparison/Conclusion/interfaces/conclusionblock'

import FormInputs from './FormInputs/FormInputs'

export const Conclusion = () => {
  const navigate = useNavigate()
  const { comparisonId } = useParams({ from: '/_comparison/$comparisonId/conclusion' })
  const numberComparisonId = Number(comparisonId)

  const onSuccessCreateComparison = () => {
    navigate({ to: '/$compId/about', params: { compId: comparisonId } })
  }

  const { updateComparison } = useUpdateComparison(onSuccessCreateComparison, numberComparisonId)
  useHeader(ComparisonStep.Conclusion)
  const handleFormSubmit = (dataForConclusion: FormData) => {
    updateComparison({
      comparisonId: numberComparisonId,
      payload: {
        name: dataForConclusion.name,
        number: dataForConclusion.number,
        comment: dataForConclusion.comment,
        evaluation: dataForConclusion.evaluation,
      },
    })
  }
  return <FormInputs onSubmit={handleFormSubmit} />
}
