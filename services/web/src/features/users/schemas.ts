import z from 'zod'

/**
 * Make sure users.example.csv looks like this interface
 */
export interface UserHeader {
  email: string
  avatar: string
  userType: string
  indexNumber: string
  fieldOfStudy: string
  yearOfStudy: string
  semester: string
  faculty: string
  position: string
  status: string
}

/* create */

export const createLecturerSchema = z.object({
  email: z.email(),
  avatar: z.url().optional(),
  faculty: z.string(),
  position: z.string(),
  status: z.enum(['active', 'inactive', 'retired']),
})

export const createStudentSchema = z.object({
  email: z.email(),
  avatar: z.url().optional(),
  indexNumber: z.string(),
  fieldOfStudy: z.string(),
  yearOfStudy: z.number().min(1).max(10),
  semester: z.string(),
  faculty: z.string(),
})

export const createUserSchema = z.union([createLecturerSchema, createStudentSchema])

export type CreateLecturerDto = z.infer<typeof createLecturerSchema>
export type CreateStudentDto = z.infer<typeof createStudentSchema>
export type CreateUserDto = z.infer<typeof createUserSchema>

/** update */

export const updateUserSchema = z.union([
  createLecturerSchema.partial(),
  createStudentSchema.partial(),
])

export type UpdateUserDto = z.infer<typeof updateUserSchema>
