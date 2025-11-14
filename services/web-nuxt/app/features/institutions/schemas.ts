import z from "zod";

export const createInstitutionSchema = z.object({
  name: z.string().min(1).meta({
    error: "validation.required",
  }),
  code: z.string().min(1).meta({
    error: "validation.required",
  }),
  address: z.string().optional(),
});

export type CreateInstitutionDto = z.infer<typeof createInstitutionSchema>;

export const updateInstitutionSchema = createInstitutionSchema.partial();

export type UpdateInstitutionDto = z.infer<typeof updateInstitutionSchema>;
