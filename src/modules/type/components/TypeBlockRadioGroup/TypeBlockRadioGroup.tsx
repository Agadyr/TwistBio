import { Controller, useFormContext } from 'react-hook-form'

import { FormControl, FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material'
import { TypeBlockSelect } from 'modules/type/components/TypeBlockSelect'
import { UploadTypes } from 'modules/type/constatns/type'
import { useComparisonStages } from 'modules/type/queries/useComparisonStages'

export const TypeBlockRadioGroup = () => {
  const { control } = useFormContext()

  const { comparisonStages: packs, comparisonStagesRequestError: packsError } = useComparisonStages(UploadTypes.Pack)
  const { comparisonStages: instructions, comparisonStagesRequestError: instructionsError } = useComparisonStages(
    UploadTypes.Instruction,
  )

  return (
    <FormControl>
      <Typography component="p" marginBottom={4} variant="h6">
        Выберите, что хотите загрузить
      </Typography>

      <Controller
        control={control}
        name="uploadType"
        render={({ field: { onChange, value } }) => (
          <RadioGroup name="comparisonGroup" onChange={(event) => onChange(event.target.value)} value={value}>
            <FormControlLabel control={<Radio />} label={UploadTypes.Pack} value={UploadTypes.Pack} />
            <TypeBlockSelect
              disabled={value !== UploadTypes.Pack}
              error={packsError?.message as string}
              name="packStage"
              selectValues={packs}
            />

            <FormControlLabel control={<Radio />} label={UploadTypes.Instruction} value={UploadTypes.Instruction} />
            <TypeBlockSelect
              disabled={value !== UploadTypes.Instruction}
              error={instructionsError?.message as string}
              name="instructionStage"
              selectValues={instructions}
            />
          </RadioGroup>
        )}
      />
    </FormControl>
  )
}
