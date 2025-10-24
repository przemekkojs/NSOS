from django.contrib import admin
from .models import Course, CourseGroup, Class, Schedule


@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "faculty", "ects")
    list_filter = ("faculty",)
    search_fields = ("name",)
    ordering = ("name",)


@admin.register(CourseGroup)
class CourseGroupAdmin(admin.ModelAdmin):
    list_display = ("id", "course", "semester", "lecturer")
    list_filter = ("semester", "lecturer", "course")
    search_fields = ("course__name", "lecturer__last_name")
    ordering = ("course__name",)


@admin.register(Class)
class ClassAdmin(admin.ModelAdmin):
    list_display = ("id", "course_group", "lecturer")
    list_filter = ("course_group", "lecturer")
    search_fields = ("course_group__course__name", "lecturer__last_name")
    ordering = ("id",)


@admin.register(Schedule)
class ScheduleAdmin(admin.ModelAdmin):
    list_display = ("id", "student", "lecturer")
    list_filter = ("lecturer",)
    search_fields = ("student__last_name", "lecturer__last_name")
    ordering = ("id",)
