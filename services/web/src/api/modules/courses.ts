import * as z from 'zod'
import { apiClient } from '../client'
import type { Faculty } from '@/core/types'

export interface Course {
  id: number
  name: string
  weeklyHours: number
  weeksCount: number
  ects: number
  courseGroup: string
  courseType: CourseType
  faculty: Faculty // TODO: change to Faculty type
}

export const courseTypes = ['zal', 'zst', 'egz', 'ekm'] as const
const courseTypeSchema = z.literal(courseTypes)
export type CourseType = z.infer<typeof courseTypeSchema>

export const createCourseSchema = z.object({
  name: z.string().max(255),
  weeklyHours: z.number().default(0),
  weeksCount: z.number().lt(2 ** 16),
  ects: z.number().gte(0).lte(30),
  courseGroup: z.string().max(50).optional(),
  courseType: courseTypeSchema,
  facultyId: z.number(),
})

export const updateCourseSchema = createCourseSchema.partial()

export type CreateCourseDto = z.infer<typeof createCourseSchema>
export type UpdateCourseDto = z.infer<typeof updateCourseSchema>

export const courseApi = {
  getAll: () => apiClient.get<Course[]>('/courses'),

  getById: (id: number) => apiClient.get<Course>(`/courses/${id}`),

  create: (data: CreateCourseDto | CreateCourseDto[]) =>
    apiClient.post<Course | Course[]>('/courses', data),

  update: (id: number, data: UpdateCourseDto) => apiClient.patch<Course>(`/courses/${id}`, data),

  delete: (id: number) => apiClient.delete<void>(`/courses/${id}`),
}
