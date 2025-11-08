import { z } from "zod";

export const permissions = [
  "admin.add_logentry",
  "admin.change_logentry",
  "admin.delete_logentry",
  "admin.view_logentry",
  "auth.add_group",
  "auth.add_permission",
  "auth.change_group",
  "auth.change_permission",
  "auth.delete_group",
  "auth.delete_permission",
  "auth.view_group",
  "auth.view_permission",
  "contenttypes.add_contenttype",
  "contenttypes.change_contenttype",
  "contenttypes.delete_contenttype",
  "contenttypes.view_contenttype",
  "sessions.add_session",
  "sessions.change_session",
  "sessions.delete_session",
  "sessions.view_session",
  "teaching.add_class",
  "teaching.add_course",
  "teaching.add_coursegroup",
  "teaching.add_schedule",
  "teaching.change_class",
  "teaching.change_course",
  "teaching.change_coursegroup",
  "teaching.change_schedule",
  "teaching.delete_class",
  "teaching.delete_course",
  "teaching.delete_coursegroup",
  "teaching.delete_schedule",
  "teaching.view_class",
  "teaching.view_course",
  "teaching.view_coursegroup",
  "teaching.view_schedule",
  "university.add_faculty",
  "university.add_position",
  "university.add_semester",
  "university.change_faculty",
  "university.change_position",
  "university.change_semester",
  "university.delete_faculty",
  "university.delete_position",
  "university.delete_semester",
  "university.view_faculty",
  "university.view_position",
  "university.view_semester",
  "users.add_lecturer",
  "users.add_student",
  "users.add_user",
  "users.change_lecturer",
  "users.change_student",
  "users.change_user",
  "users.delete_lecturer",
  "users.delete_student",
  "users.delete_user",
  "users.view_lecturer",
  "users.view_student",
  "users.view_user",
] as const;

export type Permission = (typeof permissions)[number];

export const PermissionSchema = z.literal(permissions);

// NOTE: Generated data from Django models below

// ============================================================================
// UNIVERSITY MODELS
// ============================================================================

export const InstitutionSchema = z.object({
  id: z.number(),
  name: z.string().max(200),
  description: z.string().nullable(),
  code: z.string().max(10),
  address: z.string().max(200),
});

export const FacultySchema = z.object({
  id: z.number(),
  name: z.string().max(200),
  description: z.string().nullable(),
});

export const PositionSchema = z.object({
  id: z.number(),
  name: z.string().max(100),
  hourly_rate: z.string().or(z.number()), // DecimalField can be string or number
  workload: z.literal(["40", "20", "30"]).or(z.number()),
});

export const SemesterSchema = z.object({
  id: z.number(),
  name: z.string().max(50),
  faculty: z.number(), // Foreign key ID
  type: z.literal(["winter", "summer"]),
  academic_year: z
    .string()
    .max(9)
    .regex(/^\d{4}\/\d{4}$/), // e.g., "2025/2026"
  start_date: z.string(), // ISO date string from API
  end_date: z.string(),
});

// ============================================================================
// USER MODELS
// ============================================================================

export const UserSchema = z.object({
  id: z.number(),
  username: z.string(),
  email: z.email(),
  first_name: z.string().optional(),
  last_name: z.string().optional(),
  is_active: z.boolean().optional(),
  is_staff: z.boolean().optional(),
  is_superuser: z.boolean().optional(),
  date_joined: z.string().optional(),
  groups: z.array(z.string()).optional(),
  permissions: z.array(PermissionSchema).optional(),
});

export const LecturerSchema = UserSchema.extend({
  faculty: z.number(), // Foreign key ID
  position: z.number().nullable(),
  status: z.literal(["active", "inactive", "retired"]),
});

export const StudentSchema = UserSchema.extend({
  index_number: z.string().max(20),
  field_of_study: z.string().max(100),
  year_of_study: z.number().int().positive(),
  semester: z.number().nullable(),
  faculty: z.number(), // Foreign key ID
});

// ============================================================================
// TEACHING MODELS
// ============================================================================

export const CourseSchema = z.object({
  id: z.number(),
  course_code: z.string().max(30),
  name: z.string().max(255),
  weekly_hours: z.string().or(z.number()), // DecimalField
  weeks_count: z.number().int().positive(),
  ects: z.string().or(z.number()), // DecimalField
  course_group: z.string().max(50).nullable(),
  course_type: z.literal(["zal", "zst", "egz", "ekm"]),
  faculty: z.number(), // Foreign key ID
});

export const CourseGroupSchema = z.object({
  id: z.number(),
  course: z.number(), // Foreign key ID
  name: z.string().max(100),
  lecturer: z.number().nullable(),
  weekday: z.string().max(10),
  start_time: z.string(), // Time string from API (HH:MM:SS)
  end_time: z.string(),
  room: z.string().max(50),
  semester: z.number(), // Foreign key ID
});

export const ClassSchema = z.object({
  id: z.number(),
  lecturer: z.number(), // Foreign key ID
  course_group: z.number(), // Foreign key ID
  date_held: z.string(), // ISO date string
});

export const ScheduleSchema = z.object({
  id: z.number(),
  lecturer: z.number().nullable(),
  student: z.number().nullable(),
  course_group: z.number(), // Foreign key ID
  date: z.string(), // ISO date string
  start_time: z.string(), // Time string (HH:MM:SS)
  end_time: z.string(),
});

// ============================================================================
// NESTED/EXPANDED SCHEMAS (for API responses with nested objects)
// ============================================================================

export const FacultyExpandedSchema = FacultySchema.extend({
  semesters: z.array(SemesterSchema).optional(),
  lecturers: z.array(LecturerSchema).optional(),
  students: z.array(StudentSchema).optional(),
  courses: z.array(CourseSchema).optional(),
});

export const CourseExpandedSchema = CourseSchema.extend({
  faculty: FacultySchema,
  course_groups: z.array(CourseGroupSchema).optional(),
});

export const CourseGroupExpandedSchema = CourseGroupSchema.extend({
  course: CourseSchema,
  lecturer: LecturerSchema.nullable(),
  semester: SemesterSchema,
});

export const LecturerExpandedSchema = LecturerSchema.extend({
  faculty: FacultySchema,
  position: PositionSchema.nullable(),
});

export const StudentExpandedSchema = StudentSchema.extend({
  faculty: FacultySchema,
  semester: SemesterSchema.nullable(),
});

// ============================================================================
// CREATE/UPDATE SCHEMAS (for POST/PUT/PATCH requests)
// ============================================================================

export const InstitutionCreateSchema = InstitutionSchema.omit({ id: true });

export const FacultyCreateSchema = FacultySchema.omit({ id: true });

export const PositionCreateSchema = PositionSchema.omit({ id: true });

export const SemesterCreateSchema = SemesterSchema.omit({ id: true });

export const UserCreateSchema = z.object({
  username: z.string().min(1).max(150),
  email: z.email(),
  password: z.string().min(8),
  first_name: z.string().optional(),
  last_name: z.string().optional(),
});
export const UserUpdateSchema = UserCreateSchema.omit({ password: true });

export const LecturerCreateSchema = UserCreateSchema.extend({
  faculty: z.number(),
  position: z.number().nullable(),
  status: z.literal(["active", "inactive", "retired"]).default("active"),
});

export const StudentCreateSchema = UserCreateSchema.extend({
  index_number: z.string().max(20),
  field_of_study: z.string().max(100),
  year_of_study: z.number().int().positive(),
  semester: z.number().nullable(),
  faculty: z.number(),
});

export const CourseCreateSchema = CourseSchema.omit({ id: true });

export const CourseGroupCreateSchema = CourseGroupSchema.omit({ id: true });

export const ClassCreateSchema = ClassSchema.omit({ id: true });

export const ScheduleCreateSchema = ScheduleSchema.omit({ id: true });

// ============================================================================
// AUTH SCHEMAS
// ============================================================================

export const LoginRequestSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export const LoginResponseSchema = z.object({
  token: z.string(),
  user_id: z.number(),
  username: z.string(),
  email: z.email(),
  groups: z.array(z.string()).optional(),
});

export const RegisterRequestSchema = z.object({
  username: z.string().min(1).max(150),
  email: z.email(),
  password: z.string().min(8),
  user_type: z.literal(["student", "lecturer"]).optional(),
});

// ============================================================================
// TYPE EXPORTS (for TypeScript usage)
// ============================================================================

export type Institution = z.infer<typeof InstitutionSchema>;
export type Faculty = z.infer<typeof FacultySchema>;
export type Position = z.infer<typeof PositionSchema>;
export type Semester = z.infer<typeof SemesterSchema>;
export type User = z.infer<typeof UserSchema>;
export type Lecturer = z.infer<typeof LecturerSchema>;
export type Student = z.infer<typeof StudentSchema>;
export type Course = z.infer<typeof CourseSchema>;
export type CourseGroup = z.infer<typeof CourseGroupSchema>;
export type Class = z.infer<typeof ClassSchema>;
export type Schedule = z.infer<typeof ScheduleSchema>;

export type FacultyExpanded = z.infer<typeof FacultyExpandedSchema>;
export type CourseExpanded = z.infer<typeof CourseExpandedSchema>;
export type CourseGroupExpanded = z.infer<typeof CourseGroupExpandedSchema>;
export type LecturerExpanded = z.infer<typeof LecturerExpandedSchema>;
export type StudentExpanded = z.infer<typeof StudentExpandedSchema>;

export type InstitutionCreate = z.infer<typeof InstitutionCreateSchema>;
export type FacultyCreate = z.infer<typeof FacultyCreateSchema>;
export type PositionCreate = z.infer<typeof PositionCreateSchema>;
export type SemesterCreate = z.infer<typeof SemesterCreateSchema>;
export type UserCreate = z.infer<typeof UserCreateSchema>;
export type LecturerCreate = z.infer<typeof LecturerCreateSchema>;
export type StudentCreate = z.infer<typeof StudentCreateSchema>;
export type CourseCreate = z.infer<typeof CourseCreateSchema>;
export type CourseGroupCreate = z.infer<typeof CourseGroupCreateSchema>;
export type ClassCreate = z.infer<typeof ClassCreateSchema>;
export type ScheduleCreate = z.infer<typeof ScheduleCreateSchema>;

export type UserUpdate = z.infer<typeof UserUpdateSchema>;

export type LoginRequest = z.infer<typeof LoginRequestSchema>;
export type LoginResponse = z.infer<typeof LoginResponseSchema>;
export type RegisterRequest = z.infer<typeof RegisterRequestSchema>;

export const inviteUsersSchema = z.object({
  emails: z.array(z.email()).min(1),
});

export type InviteUsersDto = z.infer<typeof inviteUsersSchema>;
