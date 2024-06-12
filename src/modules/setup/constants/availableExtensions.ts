const extension = (reference: string[], sample: string[]) => ({
  reference: reference.join(','),
  sample: sample.join(','),
})

export const availableExtensions = {
  // пачек	ТЗ - регистрационный макет  (1-2.1)
  1: extension(['.doc', '.docx'], ['.pdf']),
  //Регистрационный макет - скан регистрационного макета МЗ (2.1-2.2)
  2: extension(['.pdf'], ['.pdf' /*, '.png', '.jpg'*/]),
  // Регистрационный макет/Скан регистрационного макета МЗ - производственный макет (2.2-3)
  3: extension(['.pdf' /*, '.png', '.jpg'*/], ['.pdf' /*, '.png', '.jpg'*/]),
  //Производственный макет - типографский макет (3-4)
  4: extension(['.pdf' /*, '.png', '.jpg'*/], ['.pdf' /*, '.png', '.jpg'*/]),
  //Производственный макет - скан пачки (3–5)
  5: extension(['.pdf' /*, '.png', '.jpg'*/], ['.pdf' /*, '.png', '.jpg'*/]),
  //Инструкция ДРЛС - производственный макет (1-3)
  6: extension(['.doc', '.docx'], ['.pdf']),
  //Инструкция ДРЛС - скан инструкции МЗ (1-2)
  7: extension(['.pdf'], ['.pdf' /*, '.png', '.jpg'*/]),
  //Производственный макет - типографский макет (3-4)
  8: extension(['.pdf' /*, '.png', '.jpg'*/], ['.pdf' /*, '.png', '.jpg'*/]),
  //Производственный макет - скан инструкции (3-5)
  9: extension(['.pdf' /*, '.png', '.jpg'*/], ['.pdf' /*, '.png', '.jpg'*/]),
} as Record<
  number,
  {
    reference: string
    sample: string
  }
>
