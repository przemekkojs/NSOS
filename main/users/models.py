from django.contrib.auth.models import AbstractUser
from django.db import models
from university.models import Faculty, Semester, Position


class User(AbstractUser):
    email = models.EmailField(unique=True)

    class Meta:
        verbose_name = "User"
        verbose_name_plural = "Users"

    def __str__(self):
        return self.username


class Lecturer(User):
    ACTIVE = 'active'
    INACTIVE = 'inactive'
    RETIRED = 'retired'

    STATUS_CHOICES = [
        (ACTIVE, 'Active'),
        (INACTIVE, 'Inactive'),
        (RETIRED, 'No longer employed'),
    ]

    faculty = models.ForeignKey(Faculty, on_delete=models.CASCADE, related_name='lecturers')
    position = models.ForeignKey(Position, on_delete=models.SET_NULL, null=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default=ACTIVE)

    class Meta:
        verbose_name = "Lecturer"
        verbose_name_plural = "Lecturers"

    def __str__(self):
        return f"{self.first_name} {self.last_name}"


class Student(User):
    index_number = models.CharField(max_length=20, unique=True)
    field_of_study = models.CharField(max_length=100)
    year_of_study = models.SmallIntegerField()
    semester = models.ForeignKey(Semester, on_delete=models.SET_NULL, null=True)
    faculty = models.ForeignKey(Faculty, on_delete=models.CASCADE, related_name='students')

    class Meta:
        verbose_name = "Student"
        verbose_name_plural = "Students"

    def __str__(self):
        return f"{self.index_number} - {self.first_name} {self.last_name}"
