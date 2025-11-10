import {
  createLecturerSchema,
  createStudentSchema,
  type CreateUserDto,
  type UserHeader,
} from './schemas'

export const userHeaderUserAdapter = (header: UserHeader): CreateUserDto => {
  if (header.userType === 'lecturer') {
    return createLecturerSchema.parse({
      email: header.email,
      avatar: header.avatar,
      faculty: header.faculty,
      position: header.position,
      status: header.status,
    })
  } else if (header.userType === 'student') {
    return createStudentSchema.parse({
      email: header.email,
      avatar: header.avatar,
      indexNumber: header.indexNumber,
      fieldOfStudy: header.fieldOfStudy,
      yearOfStudy: Number(header.yearOfStudy),
      semester: header.semester,
      faculty: header.faculty,
    })
  } else {
    throw new Error(`Unknown user type: ${header.userType}`)
  }
}
