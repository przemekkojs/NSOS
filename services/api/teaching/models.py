from django.db import models
from university.models import Faculty, Semester
from users.models import Lecturer, Student
from datetime import timedelta


class Course(models.Model):
    COURSE_TYPE_CHOICES = [
        ("zal", "Credit"),
        ("zst", "Graded Credit"),
        ("egz", "Exam"),
        ("ekm", "Committee Exam"),
    ]

    course_code = models.CharField(max_length=30, unique=True)
    name = models.CharField(max_length=255)
    weekly_hours = models.DecimalField(max_digits=4, decimal_places=1)
    weeks_count = models.SmallIntegerField()
    ects = models.DecimalField(max_digits=4, decimal_places=1, default=0)
    course_group = models.ForeignKey(
        "CourseGroup",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="courses",
    )
    course_type = models.CharField(max_length=10, choices=COURSE_TYPE_CHOICES)
    faculty = models.ForeignKey(
        Faculty, on_delete=models.CASCADE, related_name="courses"
    )

    class Meta:
        verbose_name = "Course"
        verbose_name_plural = "Courses"

    def __str__(self):
        return f"{self.course_code} - {self.name}"


class CourseGroup(models.Model):
    course = models.ForeignKey(
        Course,
        on_delete=models.CASCADE,
        related_name="course_groups",
        blank=True,
        null=True,
    )
    name = models.CharField(max_length=100)
    lecturer = models.ForeignKey(
        Lecturer, on_delete=models.SET_NULL, null=True, related_name="lecturer_groups"
    )
    weekday = models.CharField(max_length=10)
    start_time = models.TimeField()
    end_time = models.TimeField()
    room = models.CharField(max_length=50)
    semester = models.ForeignKey(
        Semester, on_delete=models.CASCADE, related_name="semester_groups"
    )

    class Meta:
        verbose_name = "Course Group"
        verbose_name_plural = "Course Groups"

    def __str__(self):
        return f"{self.name} - {self.course.name}"

    def save(self, *args, **kwargs):
        is_new = self.pk is None
        super().save(*args, **kwargs)

        if is_new:
            self.generate_classes()

    def generate_classes(self):
        # Mapping string weekday to python isoweekday (1=Mon, 7=Sun)
        # Ensure your 'weekday' field matches these keys or adjust accordingly
        days_map = {
            'monday': 1, 'tuesday': 2, 'wednesday': 3, 'thursday': 4,
            'friday': 5, 'saturday': 6, 'sunday': 7
        }
        
        target_weekday = days_map.get(self.weekday)
        if not target_weekday:
            return

        current_date = self.semester.start_date
        end_date = self.semester.end_date
        
        classes_to_create = []

        while current_date <= end_date:
            # isoweekday() returns 1-7
            if current_date.isoweekday() == target_weekday:
                classes_to_create.append(
                    Class(
                        course_group=self,
                        lecturer=self.lecturer,
                        date_held=current_date,
                        start_time=self.start_time,
                        end_time=self.end_time,
                        room=self.room,
                        status="scheduled"
                    )
                )
            current_date += timedelta(days=1)

        # Bulk create for efficiency
        if classes_to_create:
            Class.objects.bulk_create(classes_to_create)


class Class(models.Model):
    schedule: "Schedule" = models.ForeignKey(
        "Schedule", on_delete=models.CASCADE, related_name="classes", null=True
    )  # type: ignore[assignment]
    lecturer = models.ForeignKey(Lecturer, on_delete=models.CASCADE)
    course_group = models.ForeignKey(CourseGroup, on_delete=models.CASCADE)

    date_held = models.DateField()
    start_time = models.TimeField()
    end_time = models.TimeField()
    room = models.CharField(max_length=50, blank=True)

    STATUS_CHOICES = [
        ("scheduled", "Scheduled"),
        ("completed", "Completed"),
        ("cancelled", "Cancelled"),
        ("rescheduled", "Rescheduled"),
    ]
    status = models.CharField(
        max_length=20, choices=STATUS_CHOICES, default="scheduled"
    )

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Class"
        verbose_name_plural = "Classes"
        ordering = ["date_held", "start_time"]
        unique_together = ["schedule", "date_held"]

    def __str__(self):
        return f"{self.schedule.course.name if self.schedule is not None else ""} ({self.date_held})"


class Schedule(models.Model):
    lecturer = models.ForeignKey(
        Lecturer,
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        related_name="schedules",
    )
    student = models.ForeignKey(
        Student, on_delete=models.CASCADE, null=True, blank=True
    )
    course_group = models.ForeignKey(
        CourseGroup, on_delete=models.CASCADE, related_name="schedules"
    )
    course: Course = models.ForeignKey(
        Course,
        on_delete=models.CASCADE,
        related_name="schedules",
        help_text="Specific course type (lecture, lab, seminar, etc.)",
    )  # type: ignore[assignment]

    date = models.DateField()
    start_time = models.TimeField()
    end_time = models.TimeField()
    room = models.CharField(max_length=50, blank=True)

    recurrence_rule = models.TextField(
        help_text="iCalendar RRULE format (e.g. FREQ=WEEKLY;BYDAY=MO,WE;INTERVAL=1)"
    )

    start_date = models.DateField(
        help_text="When this schedule pattern starts (defaults to semester start)"
    )
    end_date = models.DateField(
        help_text="When this schedule patterns ends (defaults to semester end)"
    )

    excluded_dates = models.JSONField(
        default=list,
        blank=True,
        help_text="List of ISO date strings to exclude (e.g. ['2026-03-15', '2026-04-20'])",
    )

    notes = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Schedule"
        verbose_name_plural = "Schedules"
        ordering = ["start_date", "start_time"]

    def get_recurrence_display(self):
        return self.recurrence_rule

    def __str__(self):
        return f"{self.date} - {self.course_group}"
