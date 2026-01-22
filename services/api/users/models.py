from django.contrib.auth.models import AbstractUser
from django.db import models
from university.models import Faculty, Semester, Position, University
from aws.s3 import PrivateMediaStorage


class User(AbstractUser):
    email = models.EmailField(unique=True)
    avatar = models.FileField(storage=PrivateMediaStorage(), null=True)

    class Meta:
        verbose_name = "User"
        verbose_name_plural = "Users"

    @property
    def is_student(self):
        return hasattr(self, "student_profile")

    @property
    def is_lecturer(self):
        return hasattr(self, "lecturer_profile")

    def __str__(self):
        return self.username

    def universities(self):
        """Zwraca queryset uniwersytetów powiązanych z userem."""
        return University.objects.filter(memberships__user=self)

    def membership_for(self, university):
        """Zwraca UniversityMembership albo None."""
        return (
            getattr(self, "university_memberships", None)
            .filter(university=university)
            .first()
        )

    def position_at(self, university):
        m = self.membership_for(university)
        return m.position if m else None


class Lecturer(models.Model):
    ACTIVE = "active"
    INACTIVE = "inactive"
    RETIRED = "retired"

    STATUS_CHOICES = [
        (ACTIVE, "Active"),
        (INACTIVE, "Inactive"),
        (RETIRED, "No longer employed"),
    ]
    user = models.OneToOneField(
        User, on_delete=models.CASCADE, related_name="lecturer_profile"
    )
    faculty = models.ForeignKey(
        Faculty, on_delete=models.CASCADE, related_name="lecturers"
    )
    position = models.ForeignKey(Position, on_delete=models.SET_NULL, null=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default=ACTIVE)

    class Meta:
        verbose_name = "Lecturer"
        verbose_name_plural = "Lecturers"

    def __str__(self):
        return f"{self.user.first_name} {self.user.last_name}"


class Student(models.Model):
    user = models.OneToOneField(
        User, on_delete=models.CASCADE, related_name="student_profile"
    )
    index_number = models.CharField(max_length=20, unique=True)
    field_of_study = models.CharField(max_length=100)
    year_of_study = models.SmallIntegerField()
    semester = models.ForeignKey(Semester, on_delete=models.SET_NULL, null=True)
    faculty = models.ForeignKey(
        Faculty, on_delete=models.CASCADE, related_name="students"
    )

    class Meta:
        verbose_name = "Student"
        verbose_name_plural = "Students"

    def __str__(self):
        return f"{self.index_number} - {self.user.first_name} {self.user.last_name}"
