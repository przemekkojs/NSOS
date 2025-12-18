from django.contrib import admin
from import_export import resources
from import_export.admin import ImportExportModelAdmin
from .models import Faculty, Position, Semester, University, UniversityMembership


class PermissionedImportExportAdmin(ImportExportModelAdmin):
    def has_import_permission(self, request, obj=None):
        opts = self.model._meta
        return request.user.has_perm(f"{opts.app_label}.import_{opts.model_name}")

    def has_export_permission(self, request, obj=None):
        opts = self.model._meta
        return request.user.has_perm(f"{opts.app_label}.export_{opts.model_name}")


class FacultyResource(resources.ModelResource):
    class Meta:
        model = Faculty
        fields = ("name", "description")
        export_order = fields
        import_id_fields = ("name",)
        skip_unchanged = True
        report_skipped = True


class PositionResource(resources.ModelResource):
    class Meta:
        model = Position
        fields = ("name", "hourly_rate", "workload")
        export_order = fields
        import_id_fields = ("name",)
        skip_unchanged = True
        report_skipped = True


class SemesterResource(resources.ModelResource):
    class Meta:
        model = Semester
        fields = (
            "name",
            "faculty",
            "type",
            "academic_year",
            "start_date",
            "end_date",
        )
        export_order = fields
        import_id_fields = ("faculty", "academic_year", "type")
        skip_unchanged = True
        report_skipped = True


class UniversityResource(resources.ModelResource):
    class Meta:
        model = University
        fields = ("name", "description", "created_at")
        export_order = fields
        import_id_fields = ("name",)
        skip_unchanged = True
        report_skipped = True


class UniversityMembershipResource(resources.ModelResource):
    class Meta:
        model = UniversityMembership
        fields = (
            "user",
            "university",
            "position",
            "workload",
            "is_active",
            "start_date",
            "end_date",
        )
        export_order = fields
        import_id_fields = ("user", "university")
        skip_unchanged = True
        report_skipped = True


@admin.register(Faculty)
class FacultyAdmin(PermissionedImportExportAdmin):
    resource_class = FacultyResource
    list_display = ("id", "name")
    search_fields = ("name",)
    ordering = ("name",)


@admin.register(Position)
class PositionAdmin(PermissionedImportExportAdmin):
    resource_class = PositionResource
    list_display = ("id", "name", "hourly_rate")
    search_fields = ("name",)
    ordering = ("name",)


@admin.register(Semester)
class SemesterAdmin(PermissionedImportExportAdmin):
    resource_class = SemesterResource
    list_display = ("id", "name", "start_date", "end_date")
    list_filter = ("start_date", "end_date")
    search_fields = ("name",)
    ordering = ("-start_date",)


@admin.register(University)
class UniversityAdmin(PermissionedImportExportAdmin):
    resource_class = UniversityResource
    list_display = ('name', 'created_at')
    search_fields = ('name',)


@admin.register(UniversityMembership)
class UniversityMembershipAdmin(PermissionedImportExportAdmin):
    resource_class = UniversityMembershipResource
    list_display = ('user', 'university', 'position', 'is_active')
    list_filter = ('university', 'position', 'is_active')
    search_fields = ('user__username', 'user__first_name', 'user__last_name')
