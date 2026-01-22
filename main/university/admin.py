from django.contrib import admin
from .models import Faculty, Position, Semester, University, UniversityMembership


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


@admin.register(University)
class UniversityAdmin(admin.ModelAdmin):
    list_display = ("name", "created_at")
    search_fields = ("name",)


@admin.register(UniversityMembership)
class UniversityMembershipAdmin(admin.ModelAdmin):
    list_display = ("user", "university", "position", "is_active")
    list_filter = ("university", "position", "is_active")
    search_fields = ("user__username", "user__first_name", "user__last_name")
