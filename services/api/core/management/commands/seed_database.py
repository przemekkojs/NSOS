from django.core.management.base import BaseCommand
from django.contrib.auth.models import Group
from django.utils import timezone
from datetime import datetime, timedelta, time
from users.models import User, Student, Lecturer
from university.models import (
    University,
    Faculty,
    Position,
    Semester,
    UniversityMembership,
)
from teaching.models import Course, CourseGroup, Class, Schedule


class Command(BaseCommand):
    help = "Seed the database with sample data for development"

    def add_arguments(self, parser):
        parser.add_argument(
            "--clear",
            action="store_true",
            help="Clear existing data before seeding",
        )

    def handle(self, *args, **options):
        if options["clear"]:
            self.stdout.write("Clearing existing data...")
            self.clear_data()

        self.stdout.write("Starting database seed...")

        # Create data in order of dependencies
        self.create_universities()
        self.create_faculties()
        self.create_positions()
        self.create_semesters()
        self.create_users()
        self.create_lecturers()
        self.create_students()
        self.create_university_memberships()
        self.create_courses()
        self.create_course_groups()
        self.create_schedules()

        self.stdout.write(self.style.SUCCESS("\n✓ Database seeding complete!"))

    def clear_data(self):
        """Clear all data in reverse order of dependencies"""
        Class.objects.all().delete()
        Schedule.objects.all().delete()
        CourseGroup.objects.all().delete()
        Course.objects.all().delete()
        UniversityMembership.objects.all().delete()
        Student.objects.all().delete()
        Lecturer.objects.all().delete()
        User.objects.filter(is_superuser=False).delete()
        Semester.objects.all().delete()
        Position.objects.all().delete()
        Faculty.objects.all().delete()
        University.objects.all().delete()
        self.stdout.write(self.style.WARNING("✓ Cleared existing data"))

    def create_universities(self):
        self.stdout.write("\nCreating universities...")

        universities = [
            {
                "name": "University of Technology",
                "description": "Leading technical university focused on engineering and IT",
            },
            {
                "name": "State University",
                "description": "Public university with diverse academic programs",
            },
            {
                "name": "Academy of Sciences",
                "description": "Research-focused institution specializing in natural sciences",
            },
        ]

        for data in universities:
            university, created = University.objects.get_or_create(
                name=data["name"], defaults=data
            )
            if created:
                self.stdout.write(f"  ✓ Created: {university.name}")

    def create_faculties(self):
        self.stdout.write("\nCreating faculties...")

        faculties = [
            {
                "name": "Faculty of Computer Science",
                "description": "Computer Science and Information Technology",
            },
            {
                "name": "Faculty of Engineering",
                "description": "Mechanical and Civil Engineering",
            },
            {
                "name": "Faculty of Mathematics",
                "description": "Pure and Applied Mathematics",
            },
            {
                "name": "Faculty of Physics",
                "description": "Theoretical and Experimental Physics",
            },
            {
                "name": "Faculty of Business",
                "description": "Business Administration and Management",
            },
        ]

        for data in faculties:
            faculty, created = Faculty.objects.get_or_create(
                name=data["name"], defaults=data
            )
            if created:
                self.stdout.write(f"  ✓ Created: {faculty.name}")

    def create_positions(self):
        self.stdout.write("\nCreating positions...")

        positions = [
            {"name": "Professor", "hourly_rate": 150.00, "workload": Position.FULL},
            {
                "name": "Associate Professor",
                "hourly_rate": 120.00,
                "workload": Position.FULL,
            },
            {
                "name": "Assistant Professor",
                "hourly_rate": 100.00,
                "workload": Position.FULL,
            },
            {"name": "Lecturer", "hourly_rate": 80.00, "workload": Position.FULL},
            {
                "name": "Teaching Assistant",
                "hourly_rate": 60.00,
                "workload": Position.HALF,
            },
            {
                "name": "Adjunct Professor",
                "hourly_rate": 90.00,
                "workload": Position.THREE_QUARTER,
            },
        ]

        for data in positions:
            position, created = Position.objects.get_or_create(
                name=data["name"], defaults=data
            )
            if created:
                self.stdout.write(f"  ✓ Created: {position.name}")

    def create_semesters(self):
        self.stdout.write("\nCreating semesters...")

        faculties = Faculty.objects.all()[:3]
        current_year = datetime.now().year

        for faculty in faculties:
            # Winter semester
            winter, created = Semester.objects.get_or_create(
                faculty=faculty,
                academic_year=f"{current_year}/{current_year + 1}",
                type=Semester.WINTER,
                defaults={
                    "name": f"Winter {current_year}/{current_year + 1}",
                    "start_date": datetime(current_year, 10, 1).date(),
                    "end_date": datetime(current_year + 1, 2, 28).date(),
                },
            )
            if created:
                self.stdout.write(f"  ✓ Created: {winter.name} for {faculty.name}")

            # Summer semester
            summer, created = Semester.objects.get_or_create(
                faculty=faculty,
                academic_year=f"{current_year}/{current_year + 1}",
                type=Semester.SUMMER,
                defaults={
                    "name": f"Summer {current_year}/{current_year + 1}",
                    "start_date": datetime(current_year + 1, 3, 1).date(),
                    "end_date": datetime(current_year + 1, 6, 30).date(),
                },
            )
            if created:
                self.stdout.write(f"  ✓ Created: {summer.name} for {faculty.name}")

    def create_users(self):
        self.stdout.write("\nCreating users...")

        # Create admin
        admin, created = User.objects.get_or_create(
            username="admin",
            defaults={
                "email": "admin@university.edu",
                "first_name": "Admin",
                "last_name": "User",
                "is_superuser": True,
                "is_staff": True,
            },
        )
        if created:
            admin.set_password("admin123")
            admin.save()
            admin.groups.add(Group.objects.get_or_create(name="Admin")[0])
            self.stdout.write(f"  ✓ Created admin: {admin.username}")

    def create_lecturers(self):
        self.stdout.write("\nCreating lecturers...")

        faculties = Faculty.objects.all()
        positions = Position.objects.all()

        lecturers_data = [
            {
                "username": "john.smith",
                "email": "john.smith@university.edu",
                "first_name": "John",
                "last_name": "Smith",
                "faculty_idx": 0,
                "position_idx": 0,
                "status": Lecturer.ACTIVE,
            },
            {
                "username": "jane.doe",
                "email": "jane.doe@university.edu",
                "first_name": "Jane",
                "last_name": "Doe",
                "faculty_idx": 0,
                "position_idx": 1,
                "status": Lecturer.ACTIVE,
            },
            {
                "username": "robert.johnson",
                "email": "robert.johnson@university.edu",
                "first_name": "Robert",
                "last_name": "Johnson",
                "faculty_idx": 1,
                "position_idx": 2,
                "status": Lecturer.ACTIVE,
            },
            {
                "username": "maria.garcia",
                "email": "maria.garcia@university.edu",
                "first_name": "Maria",
                "last_name": "Garcia",
                "faculty_idx": 1,
                "position_idx": 3,
                "status": Lecturer.ACTIVE,
            },
            {
                "username": "david.brown",
                "email": "david.brown@university.edu",
                "first_name": "David",
                "last_name": "Brown",
                "faculty_idx": 2,
                "position_idx": 1,
                "status": Lecturer.ACTIVE,
            },
        ]

        for data in lecturers_data:
            user, created = User.objects.get_or_create(
                username=data["username"],
                defaults={
                    "email": data["email"],
                    "first_name": data["first_name"],
                    "last_name": data["last_name"],
                },
            )
            if created:
                user.set_password("password123")
                user.save()

            lecturer, created = Lecturer.objects.get_or_create(
                user=user,
                defaults={
                    "faculty": faculties[data["faculty_idx"]],
                    "position": positions[data["position_idx"]],
                    "status": data["status"],
                },
            )
            if created:
                self.stdout.write(f"  ✓ Created lecturer: {user.get_full_name()}")

    def create_students(self):
        self.stdout.write("\nCreating students...")

        faculties = Faculty.objects.all()
        semesters = Semester.objects.filter(type=Semester.WINTER)

        students_data = [
            {
                "username": "alice.wilson",
                "email": "alice.wilson@student.edu",
                "first_name": "Alice",
                "last_name": "Wilson",
                "index_number": "S001234",
                "field_of_study": "Computer Science",
                "year_of_study": 2,
                "faculty_idx": 0,
            },
            {
                "username": "bob.martinez",
                "email": "bob.martinez@student.edu",
                "first_name": "Bob",
                "last_name": "Martinez",
                "index_number": "S001235",
                "field_of_study": "Computer Science",
                "year_of_study": 3,
                "faculty_idx": 0,
            },
            {
                "username": "carol.anderson",
                "email": "carol.anderson@student.edu",
                "first_name": "Carol",
                "last_name": "Anderson",
                "index_number": "S001236",
                "field_of_study": "Software Engineering",
                "year_of_study": 1,
                "faculty_idx": 0,
            },
            {
                "username": "daniel.taylor",
                "email": "daniel.taylor@student.edu",
                "first_name": "Daniel",
                "last_name": "Taylor",
                "index_number": "S002234",
                "field_of_study": "Mechanical Engineering",
                "year_of_study": 2,
                "faculty_idx": 1,
            },
            {
                "username": "emma.thomas",
                "email": "emma.thomas@student.edu",
                "first_name": "Emma",
                "last_name": "Thomas",
                "index_number": "S002235",
                "field_of_study": "Civil Engineering",
                "year_of_study": 4,
                "faculty_idx": 1,
            },
            {
                "username": "frank.moore",
                "email": "frank.moore@student.edu",
                "first_name": "Frank",
                "last_name": "Moore",
                "index_number": "S003234",
                "field_of_study": "Mathematics",
                "year_of_study": 1,
                "faculty_idx": 2,
            },
            {
                "username": "grace.jackson",
                "email": "grace.jackson@student.edu",
                "first_name": "Grace",
                "last_name": "Jackson",
                "index_number": "S003235",
                "field_of_study": "Applied Mathematics",
                "year_of_study": 3,
                "faculty_idx": 2,
            },
        ]

        for data in students_data:
            user, created = User.objects.get_or_create(
                username=data["username"],
                defaults={
                    "email": data["email"],
                    "first_name": data["first_name"],
                    "last_name": data["last_name"],
                },
            )
            if created:
                user.set_password("password123")
                user.save()

            faculty = faculties[data["faculty_idx"]]
            semester = semesters.filter(faculty=faculty).first()

            student, created = Student.objects.get_or_create(
                user=user,
                defaults={
                    "index_number": data["index_number"],
                    "field_of_study": data["field_of_study"],
                    "year_of_study": data["year_of_study"],
                    "faculty": faculty,
                    "semester": semester,
                },
            )
            if created:
                self.stdout.write(
                    f"  ✓ Created student: {user.get_full_name()} ({data['index_number']})"
                )

    def create_university_memberships(self):
        self.stdout.write("\nCreating university memberships...")

        university = University.objects.first()
        lecturers = Lecturer.objects.all()

        for lecturer in lecturers:
            membership, created = UniversityMembership.objects.get_or_create(
                user=lecturer.user,
                university=university,
                defaults={
                    "position": lecturer.position,
                    "workload": lecturer.position.workload,
                    "is_active": True,
                    "start_date": datetime.now().date() - timedelta(days=365),
                },
            )
            if created:
                self.stdout.write(
                    f"  ✓ Created membership: {lecturer.user.get_full_name()} @ {university.name}"
                )

    def create_courses(self):
        self.stdout.write("\nCreating courses...")

        faculties = Faculty.objects.all()

        courses_data = [
            # Computer Science Faculty
            {
                "course_code": "CS101",
                "name": "Introduction to Programming",
                "weekly_hours": 4.0,
                "weeks_count": 15,
                "ects": 6.0,
                "course_type": "egz",
                "faculty_idx": 0,
            },
            {
                "course_code": "CS201",
                "name": "Data Structures and Algorithms",
                "weekly_hours": 4.0,
                "weeks_count": 15,
                "ects": 6.0,
                "course_type": "egz",
                "faculty_idx": 0,
            },
            {
                "course_code": "CS301",
                "name": "Database Systems",
                "weekly_hours": 3.0,
                "weeks_count": 15,
                "ects": 5.0,
                "course_type": "zst",
                "faculty_idx": 0,
            },
            {
                "course_code": "CS401",
                "name": "Web Development",
                "weekly_hours": 3.0,
                "weeks_count": 15,
                "ects": 5.0,
                "course_type": "zal",
                "faculty_idx": 0,
            },
            # Engineering Faculty
            {
                "course_code": "ME101",
                "name": "Engineering Mechanics",
                "weekly_hours": 4.0,
                "weeks_count": 15,
                "ects": 6.0,
                "course_type": "egz",
                "faculty_idx": 1,
            },
            {
                "course_code": "ME201",
                "name": "Thermodynamics",
                "weekly_hours": 4.0,
                "weeks_count": 15,
                "ects": 6.0,
                "course_type": "egz",
                "faculty_idx": 1,
            },
            # Mathematics Faculty
            {
                "course_code": "MATH101",
                "name": "Calculus I",
                "weekly_hours": 4.0,
                "weeks_count": 15,
                "ects": 6.0,
                "course_type": "egz",
                "faculty_idx": 2,
            },
            {
                "course_code": "MATH201",
                "name": "Linear Algebra",
                "weekly_hours": 4.0,
                "weeks_count": 15,
                "ects": 6.0,
                "course_type": "egz",
                "faculty_idx": 2,
            },
        ]

        for data in courses_data:
            course, created = Course.objects.get_or_create(
                course_code=data["course_code"],
                defaults={
                    "name": data["name"],
                    "weekly_hours": data["weekly_hours"],
                    "weeks_count": data["weeks_count"],
                    "ects": data["ects"],
                    "course_type": data["course_type"],
                    "faculty": faculties[data["faculty_idx"]],
                },
            )
            if created:
                self.stdout.write(
                    f"  ✓ Created course: {course.course_code} - {course.name}"
                )

    def create_course_groups(self):
        self.stdout.write("\nCreating course groups...")

        courses = Course.objects.all()
        lecturers = Lecturer.objects.all()
        semesters = Semester.objects.filter(type=Semester.WINTER)

        weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
        times = [
            (time(8, 0), time(9, 30)),
            (time(10, 0), time(11, 30)),
            (time(12, 0), time(13, 30)),
            (time(14, 0), time(15, 30)),
        ]

        for idx, course in enumerate(courses):
            semester = semesters.filter(faculty=course.faculty).first()
            lecturer = lecturers.filter(faculty=course.faculty).first()

            if not semester or not lecturer:
                continue

            # Create 2 groups per course
            for group_num in range(1, 3):
                weekday = weekdays[idx % len(weekdays)]
                start_time, end_time = times[group_num % len(times)]

                course_group, created = CourseGroup.objects.get_or_create(
                    course=course,
                    name=f"Group {group_num}",
                    semester=semester,
                    defaults={
                        "lecturer": lecturer,
                        "weekday": weekday,
                        "start_time": start_time,
                        "end_time": end_time,
                        "room": f"Room {100 + idx * 10 + group_num}",
                    },
                )
                if created:
                    self.stdout.write(
                        f"  ✓ Created: {course.course_code} - {course_group.name}"
                    )

    def create_schedules(self):
        self.stdout.write("\nCreating schedules with recurring patterns...")

        course_groups = CourseGroup.objects.all()[:8]
        students = Student.objects.all()[:3]
        current_date = timezone.now().date()

        # Map weekday names to iCal format
        weekday_map = {
            "Monday": "MO",
            "Tuesday": "TU",
            "Wednesday": "WE",
            "Thursday": "TH",
            "Friday": "FR",
        }

        for course_group in course_groups:
            semester = course_group.semester
            weekday_abbr = weekday_map.get(course_group.weekday, "MO")

            # Create recurring schedule for lecturer
            schedule, created = Schedule.objects.get_or_create(
                lecturer=course_group.lecturer,
                course_group=course_group,
                course=course_group.course,
                defaults={
                    "date": semester.start_date,
                    "start_time": course_group.start_time,
                    "end_time": course_group.end_time,
                    "room": course_group.room,
                    "recurrence_rule": f"FREQ=WEEKLY;BYDAY={weekday_abbr};INTERVAL=1",
                    "start_date": semester.start_date,
                    "end_date": semester.end_date,
                    "excluded_dates": [],
                    "notes": f"Recurring weekly class for {course_group.course.name}",
                },
            )
            if created:
                self.stdout.write(
                    f"  ✓ Created recurring schedule: {course_group.course.name} ({course_group.weekday})"
                )

                # Create Class instances for past and upcoming weeks
                class_dates = self._generate_class_dates(
                    semester.start_date,
                    current_date + timedelta(weeks=4),
                    weekday_abbr,
                )

                for class_date in class_dates[:10]:  # Limit to 10 classes
                    if class_date <= current_date + timedelta(weeks=4):
                        status = (
                            "completed" if class_date < current_date else "scheduled"
                        )

                        class_obj, class_created = Class.objects.get_or_create(
                            schedule=schedule,
                            date_held=class_date,
                            defaults={
                                "lecturer": course_group.lecturer,
                                "course_group": course_group,
                                "start_time": course_group.start_time,
                                "end_time": course_group.end_time,
                                "room": course_group.room,
                                "status": status,
                            },
                        )

            # Create schedules for students in the same faculty
            for student in students:
                if student.faculty == course_group.course.faculty:
                    student_schedule, created = Schedule.objects.get_or_create(
                        student=student,
                        course_group=course_group,
                        course=course_group.course,
                        defaults={
                            "date": semester.start_date,
                            "start_time": course_group.start_time,
                            "end_time": course_group.end_time,
                            "room": course_group.room,
                            "recurrence_rule": f"FREQ=WEEKLY;BYDAY={weekday_abbr};INTERVAL=1",
                            "start_date": semester.start_date,
                            "end_date": semester.end_date,
                            "excluded_dates": [],
                        },
                    )

    def _generate_class_dates(self, start_date, end_date, weekday_abbr):
        """Generate list of dates for a recurring weekly class"""
        weekday_to_int = {"MO": 0, "TU": 1, "WE": 2, "TH": 3, "FR": 4}
        target_weekday = weekday_to_int.get(weekday_abbr, 0)

        dates = []
        current = start_date

        # Find first occurrence
        while current.weekday() != target_weekday:
            current += timedelta(days=1)

        # Generate all dates
        while current <= end_date:
            dates.append(current)
            current += timedelta(weeks=1)

        return dates
