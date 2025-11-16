import z from "zod";

export const loginFormSchema = z.object({
  email: z.email().meta({
    error: "validation.invalidEmail",
  }),
  password: z.string().min(1).meta({
    error: "validation.required",
  }),
});

export type LoginDto = z.output<typeof loginFormSchema>;

// TODO: stronger password validation with tests
export const registerFormSchema = z
  .object({
    email: z.email().meta({
      error: "validation.invalidEmail",
    }),
    password: z.string().meta({
      error: "validation.required",
    }), // FIXME: refine for client side validation also
    confirmPassword: z.string(),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword)
  .meta({
    error: "validation.passwordsDoNotMatch",
  });

export type RegisterDto = z.output<typeof registerFormSchema>;
