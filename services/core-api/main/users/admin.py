from django.contrib import admin
from .models import User, Student, Lecturer


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ("id", "email", "first_name", "last_name", "is_active", "is_staff")
    list_filter = ("is_active", "is_staff", "is_superuser")
    search_fields = ("email", "first_name", "last_name")
    ordering = ("email",)
    readonly_fields = ("date_joined", "last_login")


@admin.register(Student)
class StudentAdmin(admin.ModelAdmin):
    list_display = ("id", "first_name", "last_name", "email", "semester")
    list_filter = ("semester",)
    search_fields = ("first_name", "last_name", "email")
    ordering = ("last_name", "first_name")


@admin.register(Lecturer)
class LecturerAdmin(admin.ModelAdmin):
    list_display = ("id", "first_name", "last_name", "email", "status")
    list_filter = ("status",)
    search_fields = ("first_name", "last_name", "email")
    ordering = ("last_name",)
