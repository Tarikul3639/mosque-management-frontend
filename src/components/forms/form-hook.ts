import { createFormHook, createFormHookContexts } from "@tanstack/react-form"

import { FormInput } from "./FormInput"
import { FormTextarea } from "./FormTextarea"

export const { fieldContext, formContext, useFieldContext, useFormContext } =
  createFormHookContexts()

export const { useAppForm } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: {
    FormInput,
    FormTextarea,
  },
  formComponents: {},
})

export type AppFormApi = ReturnType<typeof useAppForm>
