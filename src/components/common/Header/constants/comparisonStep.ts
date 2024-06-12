export enum ComparisonStep {
  Type = 'Type',
  Setup = 'Setup',
  ReceiveResults = 'ReceiveResults',
  Results = 'Results',
  Conclusion = 'Conclusion',
}

export const maxSteps = 5

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
