from django.contrib import admin
from .models import User, Student, Lecturer


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "email",
        "full_name",
        "role",
        "is_active",
        "is_staff",
    )
    list_filter = ("is_active", "is_staff", "is_superuser")
    search_fields = ("email", "first_name", "last_name")
    ordering = ("email",)
    readonly_fields = ("date_joined", "last_login")

    def full_name(self, obj):
        return f"{obj.first_name} {obj.last_name}"

    full_name.short_description = "Full name"

    def role(self, obj):
        if hasattr(obj, "student_profile"):
            return "Student"
        if hasattr(obj, "lecturer_profile"):
            return "Lecturer"
        return "No role"

    role.short_description = "Role"


@admin.register(Student)
class StudentAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "index_number",
        "user_email",
        "user_full_name",
        "faculty",
        "semester",
    )
    search_fields = (
        "user__first_name",
        "user__last_name",
        "user__email",
        "index_number",
    )
    list_filter = ("faculty", "semester")

    def user_email(self, obj):
        return obj.user.email

    user_email.short_description = "Email"

    def user_full_name(self, obj):
        return f"{obj.user.first_name} {obj.user.last_name}"

    user_full_name.short_description = "Full name"


@admin.register(Lecturer)
class LecturerAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "user_email",
        "user_full_name",
        "faculty",
        "position",
        "status",
    )
    list_filter = ("faculty", "status")
    search_fields = ("user__first_name", "user__last_name", "user__email")

    def user_email(self, obj):
        return obj.user.email

    user_email.short_description = "Email"

    def user_full_name(self, obj):
        return f"{obj.user.first_name} {obj.user.last_name}"

    user_full_name.short_description = "Full name"
