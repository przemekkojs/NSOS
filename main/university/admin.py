from django.contrib import admin
from .models import Faculty, Position, Semester


@admin.register(Faculty)
class FacultyAdmin(admin.ModelAdmin):
    list_display = ("id", "name")
    search_fields = ("name",)
    ordering = ("name",)


@admin.register(Position)
class PositionAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "hourly_rate")
    search_fields = ("name",)
    ordering = ("name",)


@admin.register(Semester)
class SemesterAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "start_date", "end_date")
    list_filter = ("start_date", "end_date")
    search_fields = ("name",)
    ordering = ("-start_date",)
