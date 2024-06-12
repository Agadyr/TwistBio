import { useEffect } from 'react'
import { FormProvider } from 'react-hook-form'
import { toast } from 'react-toastify'

import { yupResolver } from '@hookform/resolvers/yup'
import { useNavigate, useParams } from '@tanstack/react-router'
import { useInitForm } from 'config/rhf'
import { useComparison } from 'modules/comparison/queries'
import { TypeBlockNextStepButton } from 'modules/type/components/TypeBlockNextStepButton'
import { TypeBlockRadioGroup } from 'modules/type/components/TypeBlockRadioGroup'
import { UploadTypes } from 'modules/type/constatns/type'
import { typeBlockSchema } from 'modules/type/helpers/validation'
import { ComparisonFormData } from 'modules/type/interfaces/typeBlock'
import { useComparisonStages } from 'modules/type/queries/useComparisonStages'
import { useUpdateComparison } from 'modules/type/queries/useUpdateComparison'

import classes from './TypeBlock.module.scss'

export const TypeBlock = () => {
  const methods = useInitForm<ComparisonFormData>({
    resolver: yupResolver(typeBlockSchema),
    defaultValues: {
      uploadType: UploadTypes.Pack,
      packStage: '',
      instructionStage: '',
    },
  })

  const navigate = useNavigate()
  const params = useParams({ from: '/_comparison/$comparisonId/type' })
  const comparisonId = Number(params.comparisonId)

  const onSuccessCreateComparison = () =>
    navigate({ to: '/$comparisonId/setup', params: { comparisonId: params.comparisonId } })

  const { handleSubmit, getValues, reset } = methods
  const { updateComparison, isUpdatingComparison } = useUpdateComparison(onSuccessCreateComparison, comparisonId)
  const { comparison } = useComparison(comparisonId)

  const onSubmit = () => {
    const field = getValues('uploadType') === UploadTypes.Pack ? 'packStage' : 'instructionStage'
    updateComparison({ comparisonId, payload: { stageId: getValues(field), step: comparison?.step || 2 } })
  }

  const { comparisonStages: packs } = useComparisonStages(UploadTypes.Pack)
  const { comparisonStages: instructions } = useComparisonStages(UploadTypes.Instruction)
  useEffect(() => {
    if (comparison) {
      const { uploadType, name } = comparison.stage
      const field = uploadType === UploadTypes.Pack ? 'packStage' : 'instructionStage'
      const list = uploadType === UploadTypes.Pack ? packs : instructions
      const item = list?.find((el) => el.name === name)
      reset({ uploadType: uploadType as UploadTypes, [field]: item?.id || '' })
    }
  }, [comparison, packs, instructions])

  const onError = () => toast.error('Что то пошло не так, попробуйте обновить страницу.')

  return (
    <FormProvider {...methods}>
      <form className={classes.form} onSubmit={handleSubmit(onSubmit, onError)}>
        <TypeBlockRadioGroup />
        <TypeBlockNextStepButton loading={isUpdatingComparison} />
      </form>
    </FormProvider>
  )
}
