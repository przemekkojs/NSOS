import z from 'zod'

export const createInstitutionSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  code: z.string().min(1, 'Code is required'),
  address: z.string().optional(),
})

export type CreateInstitutionSchema = z.infer<typeof createInstitutionSchema>

export const updateInstitutionSchema = createInstitutionSchema.partial()

export type UpdateInstitutionSchema = z.infer<typeof updateInstitutionSchema>
