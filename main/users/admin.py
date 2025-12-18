from django.contrib import admin
from django.core.exceptions import ValidationError
from import_export import resources
from import_export.admin import ImportExportModelAdmin
from .models import User, Student, Lecturer


class PermissionedImportExportAdmin(ImportExportModelAdmin):
    def has_import_permission(self, request, obj=None):
        opts = self.model._meta
        return request.user.has_perm(f"{opts.app_label}.import_{opts.model_name}")

    def has_export_permission(self, request, obj=None):
        opts = self.model._meta
        return request.user.has_perm(f"{opts.app_label}.export_{opts.model_name}")


class UserResource(resources.ModelResource):
    class Meta:
        model = User
        fields = (
            "username",
            "email",
            "first_name",
            "last_name",
            "is_active",
            "date_joined",
        )
        export_order = fields
        import_id_fields = ("email",)
        skip_unchanged = True
        report_skipped = True

    def before_import(self, dataset, using_transactions, dry_run, **kwargs):
        if "password" in (dataset.headers or []):
            raise ValidationError("Importing passwords is not allowed. Remove the 'password' column.")

    def before_save_instance(self, instance, using_transactions, dry_run):
        # If no password provided during import, set an unusable one to avoid storing plain text.
        if not instance.password:
            instance.set_unusable_password()


class StudentResource(resources.ModelResource):
    class Meta:
        model = Student
        fields = (
            "index_number",
            "user",
            "field_of_study",
            "year_of_study",
            "semester",
            "faculty",
        )
        export_order = fields
        import_id_fields = ("index_number",)
        skip_unchanged = True
        report_skipped = True


class LecturerResource(resources.ModelResource):
    class Meta:
        model = Lecturer
        fields = (
            "user",
            "faculty",
            "position",
            "status",
        )
        export_order = fields
        import_id_fields = ("user",)
        skip_unchanged = True
        report_skipped = True


@admin.register(User)
class UserAdmin(PermissionedImportExportAdmin):
    resource_class = UserResource
    list_display = ("id", "email", "full_name", "role", "is_active", "is_staff",)
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
class StudentAdmin(PermissionedImportExportAdmin):
    resource_class = StudentResource
    list_display = ("id", "index_number", "user_email", "user_full_name", "faculty", "semester")
    search_fields = ("user__first_name", "user__last_name", "user__email", "index_number")
    list_filter = ("faculty", "semester")

    def user_email(self, obj):
        return obj.user.email
    user_email.short_description = "Email"

    def user_full_name(self, obj):
        return f"{obj.user.first_name} {obj.user.last_name}"
    user_full_name.short_description = "Full name"



@admin.register(Lecturer)
class LecturerAdmin(PermissionedImportExportAdmin):
    resource_class = LecturerResource
    list_display = ("id", "user_email", "user_full_name", "faculty", "position", "status")
    list_filter = ("faculty", "status")
    search_fields = ("user__first_name", "user__last_name", "user__email")

    def user_email(self, obj):
        return obj.user.email
    user_email.short_description = "Email"

    def user_full_name(self, obj):
        return f"{obj.user.first_name} {obj.user.last_name}"
    user_full_name.short_description = "Full name"
