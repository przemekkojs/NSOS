from django.db import models


class Faculty(models.Model):
    name = models.CharField(max_length=200, unique=True)
    description = models.TextField(blank=True, null=True)

    class Meta:
        verbose_name = "Faculty"
        verbose_name_plural = "Faculties"

    def __str__(self):
        return self.name


class Position(models.Model):
    FULL = 40
    HALF = 20
    THREE_QUARTER = 30

    WORKLOAD_CHOICES = [
        (FULL, "Full (40h)"),
        (HALF, "Half (20h)"),
        (THREE_QUARTER, "Three quarter (30h)"),
    ]

    name = models.CharField(max_length=100, unique=True)
    hourly_rate = models.DecimalField(max_digits=8, decimal_places=2)
    workload = models.IntegerField(choices=WORKLOAD_CHOICES, default=FULL)

    class Meta:
        verbose_name = "Position"
        verbose_name_plural = "Positions"

    def __str__(self):
        return f"{self.name} ({self.workload})"


class Semester(models.Model):
    WINTER = "winter"
    SUMMER = "summer"

    TYPE_CHOICES = [
        (WINTER, "Winter"),
        (SUMMER, "Summer"),
    ]

    name = models.CharField(max_length=50)
    faculty = models.ForeignKey(
        Faculty, on_delete=models.CASCADE, related_name="semesters"
    )
    type = models.CharField(max_length=10, choices=TYPE_CHOICES)
    academic_year = models.CharField(max_length=9)  # e.g. "2025/2026"
    start_date = models.DateField()
    end_date = models.DateField()

    class Meta:
        unique_together = ("faculty", "academic_year", "type")
        verbose_name = "Semester"
        verbose_name_plural = "Semesters"

    def __str__(self):
        return f"{self.name} ({self.academic_year})"
