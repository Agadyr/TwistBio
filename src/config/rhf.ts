import { FieldValues, useForm, UseFormProps, UseFormReturn } from 'react-hook-form'

export type FormDefault<T> = {
  [Prop in keyof T]: T[Prop] extends unknown[] ? T[Prop] : T[Prop] | ''
}

export const useInitForm = <TFieldValues extends FieldValues = FieldValues, TContext extends object = object>(
  props?: UseFormProps<FormDefault<TFieldValues>, TContext>,
): UseFormReturn<TFieldValues, TContext> => useForm<TFieldValues, TContext>(props as TFieldValues)
