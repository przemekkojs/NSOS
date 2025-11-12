import * as z from 'zod'
import { reactive } from 'vue'

export const useFormSchema = <T extends z.ZodObject, S = z.output<T>>(
  schema: T,
  initialData?: Partial<NoInfer<S>>,
) => {
  const state = reactive<Partial<S>>(initialData || {})

  return {
    state,
  }
}
