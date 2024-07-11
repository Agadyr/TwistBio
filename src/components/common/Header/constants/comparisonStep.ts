//TODO: enum лучше хранить в отдельной директории - enums или entities (где могут быть так же интерфейсы типы модели).
export enum ComparisonStep {
  Type = 'Type',
  Setup = 'Setup',
  ReceiveResults = 'ReceiveResults',
  Results = 'Results',
  Conclusion = 'Conclusion',
}
export const maxSteps = 5

export const typographyVariant = {
  [ComparisonStep.Type]: 'h5',
  [ComparisonStep.Setup]: 'h5',
  [ComparisonStep.ReceiveResults]: 'h4',
  [ComparisonStep.Results]: 'h5',
  [ComparisonStep.Conclusion]: 'h3',
}
export const stepNumber = {
  [ComparisonStep.Type]: 1,
  [ComparisonStep.Setup]: 2,
  [ComparisonStep.ReceiveResults]: 3,
  [ComparisonStep.Results]: 4,
  [ComparisonStep.Conclusion]: 5,
}

export const commonHeaders = {
  [ComparisonStep.Type]: 'Выбор типа загрузки',
  [ComparisonStep.Setup]: 'Выбор сравнения',
  [ComparisonStep.ReceiveResults]: 'Получаем результаты сравнения...',
  [ComparisonStep.Results]: 'Анализ результатов попиксельного сравнения',
  [ComparisonStep.Conclusion]: 'Заключение',
}
