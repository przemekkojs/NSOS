from django.db import models
from university.models import Faculty, Semester
from users.models import Lecturer, Student

class Course(models.Model):
    COURSE_TYPE_CHOICES = [
        ('zal', 'Credit'),
        ('zst', 'Graded Credit'),
        ('egz', 'Exam'),
        ('ekm', 'Committee Exam'),
    ]

    course_code = models.CharField(max_length=30, unique=True)
    name = models.CharField(max_length=255)
    weekly_hours = models.DecimalField(max_digits=4, decimal_places=1)
    weeks_count = models.SmallIntegerField()
    ects = models.DecimalField(max_digits=4, decimal_places=1, default=0)
    course_group = models.CharField(max_length=50, blank=True, null=True)
    course_type = models.CharField(max_length=10, choices=COURSE_TYPE_CHOICES)
    faculty = models.ForeignKey(Faculty, on_delete=models.CASCADE, related_name='courses')

    class Meta:
        verbose_name = "Course"
        verbose_name_plural = "Courses"

    def __str__(self):
        return f"{self.course_code} - {self.name}"


class CourseGroup(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='course_groups')
    name = models.CharField(max_length=100)
    lecturer = models.ForeignKey(Lecturer, on_delete=models.SET_NULL, null=True, related_name='lecturer_groups')
    weekday = models.CharField(max_length=10)
    start_time = models.TimeField()
    end_time = models.TimeField()
    room = models.CharField(max_length=50)
    semester = models.ForeignKey(Semester, on_delete=models.CASCADE, related_name='semester_groups')

    class Meta:
        verbose_name = "Course Group"
        verbose_name_plural = "Course Groups"

    def __str__(self):
        return f"{self.name} - {self.course.name}"


class Class(models.Model):
    lecturer = models.ForeignKey(Lecturer, on_delete=models.CASCADE)
    course_group = models.ForeignKey(CourseGroup, on_delete=models.CASCADE)
    date_held = models.DateField()

    class Meta:
        verbose_name = "Class"
        verbose_name_plural = "Classes"

    def __str__(self):
        return f"{self.course_group} ({self.date_held})"


class Schedule(models.Model):
    lecturer = models.ForeignKey(Lecturer, on_delete=models.CASCADE, null=True, blank=True)
    student = models.ForeignKey(Student, on_delete=models.CASCADE, null=True, blank=True)
    course_group = models.ForeignKey(CourseGroup, on_delete=models.CASCADE)
    date = models.DateField()
    start_time = models.TimeField()
    end_time = models.TimeField()

    class Meta:
        verbose_name = "Schedule"
        verbose_name_plural = "Schedules"

    def __str__(self):
        return f"{self.date} - {self.course_group}"
