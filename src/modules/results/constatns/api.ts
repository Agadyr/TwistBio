import { ComparisonError, ComparisonPairErrors } from 'modules/results/api'

export const errorsStatus: ComparisonError[] = [
  { name: 'Не обработано', code: 'code1', id: 1 },
  { name: 'Ошибка', code: 'code2', id: 2 },
  { name: 'Не Ошибка', code: 'code3', id: 3 },
]

export const errorsType: ComparisonError[] = [
  { name: 'Объект', code: 'code4', id: 1 },
  { name: 'Текст', code: 'code5', id: 2 },
  { name: 'Баркод', code: 'code6', id: 3 },
  { name: 'Штрих код', code: 'code7', id: 4 },
]
export const errorsSever: ComparisonError[] = [
  { name: 'Высокая', code: 'code8', id: 1 },
  { name: 'Средняя', code: 'code9', id: 2 },
  { name: 'Низкая', code: 'code10', id: 3 },
  { name: 'Не заполнено', code: 'code11', id: 4 },
]

export const pairErrors: ComparisonPairErrors = {
  id: 0,
  errors: [
    {
      id: 1,
      number: 0,
      type: {
        id: 1,
        name: 'Текст',
        code: 'string',
      },
      severity: {
        id: 1,
        name: 'Сильная',
        code: 'string',
      },
      status: {
        id: 1,
        name: 'Ошибка',
        code: 'string',
      },
      comment:
        // eslint-disable-next-line max-len
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      referenceCropRatio: [0.1, 0.2, 0.3, 0.1],
      sampleCropRatio: [0.4, 0.8, 0.4, 0.1],
      bestMatch: null,
      content: null,
      detectedValue: null,
      imageCropRatio: null,
      imageFullUrl: null,
    },
    {
      id: 2,
      number: 0,
      type: {
        id: 1,
        name: 'Текст',
        code: 'string',
      },
      severity: {
        id: 1,
        name: 'Сильная',
        code: 'string',
      },
      status: {
        id: 1,
        name: 'Ошибка',
        code: 'string',
      },
      comment:
        // eslint-disable-next-line max-len
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      referenceCropRatio: [0.1, 0.2, 0.3, 0.1],
      sampleCropRatio: [0.1, 0.1, 0.8, 0.8],
      bestMatch: null,
      content: null,
      detectedValue: null,
      imageCropRatio: null,
      imageFullUrl: null,
    },
    {
      id: 3,
      number: 0,
      type: {
        id: 1,
        name: 'Текст',
        code: 'string',
      },
      severity: {
        id: 1,
        name: 'Сильная',
        code: 'string',
      },
      status: {
        id: 1,
        name: 'Ошибка',
        code: 'string',
      },
      comment:
        // eslint-disable-next-line max-len
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      referenceCropRatio: [0.1, 0.2, 0.3, 0.1],
      sampleCropRatio: [0.2, 0.2, 0.7, 0.7],
      bestMatch: null,
      content: null,
      detectedValue: null,
      imageCropRatio: null,
      imageFullUrl: null,
    },
    {
      id: 4,
      number: 0,
      type: {
        id: 1,
        name: 'Текст',
        code: 'string',
      },
      severity: {
        id: 1,
        name: 'Сильная',
        code: 'string',
      },
      status: {
        id: 1,
        name: 'Ошибка',
        code: 'string',
      },
      comment:
        // eslint-disable-next-line max-len
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      referenceCropRatio: [0.1, 0.2, 0.3, 0.1],
      sampleCropRatio: [0.3, 0.3, 0.6, 0.6],
      bestMatch: null,
      content: null,
      detectedValue: null,
      imageCropRatio: null,
      imageFullUrl: null,
    },
    {
      id: 5,
      number: 0,
      type: {
        id: 1,
        name: 'Текст',
        code: 'string',
      },
      severity: {
        id: 1,
        name: 'Сильная',
        code: 'string',
      },
      status: {
        id: 1,
        name: 'Ошибка',
        code: 'string',
      },
      comment:
        // eslint-disable-next-line max-len
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      referenceCropRatio: [0.1, 0.2, 0.3, 0.1],
      sampleCropRatio: [0.4, 0.4, 0.5, 0.5],
      bestMatch: null,
      content: null,
      detectedValue: null,
      imageCropRatio: null,
      imageFullUrl: null,
    },
    {
      id: 6,
      number: 0,
      type: {
        id: 1,
        name: 'Текст',
        code: 'string',
      },
      severity: {
        id: 1,
        name: 'Сильная',
        code: 'string',
      },
      status: {
        id: 1,
        name: 'Ошибка',
        code: 'string',
      },
      comment:
        // eslint-disable-next-line max-len
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      referenceCropRatio: [0.1, 0.2, 0.3, 0.1],
      sampleCropRatio: [0.5, 0.5, 0.4, 0.4],
      bestMatch: null,
      content: null,
      detectedValue: null,
      imageCropRatio: null,
      imageFullUrl: null,
    },
    {
      id: 7,
      number: 0,
      type: {
        id: 1,
        name: 'Текст',
        code: 'string',
      },
      severity: {
        id: 1,
        name: 'Сильная',
        code: 'string',
      },
      status: {
        id: 1,
        name: 'Ошибка',
        code: 'string',
      },
      comment:
        // eslint-disable-next-line max-len
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      referenceCropRatio: [0.1, 0.2, 0.3, 0.1],
      sampleCropRatio: [0.6, 0.6, 0.3, 0.3],
      bestMatch: null,
      content: null,
      detectedValue: null,
      imageCropRatio: null,
      imageFullUrl: null,
    },
  ],
  maskFullUrl: 'string',
  outlineMaskFullUrl: 'string',
  sampleColorMaskFullUrl: 'string',
  referenceColorMaskFullUrl: 'string',
}
