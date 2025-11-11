interface BaseModel {
  id: number
}
/* University */

export interface Faculty extends BaseModel {
  name: string
  description: string
}

type Workload = 20 | 30 | 40

export interface Position extends BaseModel {
  name: string
  hourlyRate: number
  workload: Workload
}

type SemesterType = 'winter' | 'summer'

interface Semester {
  name: string
  faculty: Faculty
  type: SemesterType
  academicYear: string
  startDate: Date
  endDate: Date
}

/* Users models*/

export interface User extends BaseModel {
  email: string
  /** TODO: check if that exists */
  avatar?: string
  role: 'admin' | 'employee' | 'student'
}

type LecturerStatus = 'active' | 'inactive' | 'retired'

export interface Lecturer extends User {
  faculty: Faculty
  position: Position
  status: LecturerStatus
}

export interface Student extends User {
  indexNumber: string
  fieldOfStudy: string
  yearOfStudy: number
  semester: Semester
  faculty: Faculty
}
