from django.contrib import admin
from import_export import resources
from import_export.admin import ImportExportModelAdmin
from .models import Course, CourseGroup, Class, Schedule


class PermissionedImportExportAdmin(ImportExportModelAdmin):
    def has_import_permission(self, request, obj=None):
        opts = self.model._meta
        return request.user.has_perm(f"{opts.app_label}.import_{opts.model_name}")

    def has_export_permission(self, request, obj=None):
        opts = self.model._meta
        return request.user.has_perm(f"{opts.app_label}.export_{opts.model_name}")


class CourseResource(resources.ModelResource):
    class Meta:
        model = Course
        # Start with course_code so datasets without an explicit id column don't fail.
        fields = (
            "course_code",
            "name",
            "weekly_hours",
            "weeks_count",
            "ects",
            "course_group",
            "course_type",
            "faculty",
        )
        export_order = fields
        import_id_fields = ("course_code",)
        skip_unchanged = True
        report_skipped = True


class CourseGroupResource(resources.ModelResource):
    class Meta:
        model = CourseGroup
        fields = (
            "course",
            "name",
            "lecturer",
            "weekday",
            "start_time",
            "end_time",
            "room",
            "semester",
        )
        export_order = fields
        import_id_fields = ("course", "name", "semester")
        skip_unchanged = True
        report_skipped = True


class ClassResource(resources.ModelResource):
    class Meta:
        model = Class
        fields = ("lecturer", "course_group", "date_held")
        export_order = fields
        import_id_fields = ("lecturer", "course_group", "date_held")
        skip_unchanged = True
        report_skipped = True


class ScheduleResource(resources.ModelResource):
    class Meta:
        model = Schedule
        fields = ("lecturer", "student", "course_group", "date", "start_time", "end_time")
        export_order = fields
        import_id_fields = ("student", "course_group", "date", "start_time")
        skip_unchanged = True
        report_skipped = True


@admin.register(Course)
class CourseAdmin(PermissionedImportExportAdmin):
    resource_class = CourseResource
    list_display = ("id", "name", "faculty", "ects")
    list_filter = ("faculty",)
    search_fields = ("name",)
    ordering = ("name",)


@admin.register(CourseGroup)
class CourseGroupAdmin(PermissionedImportExportAdmin):
    resource_class = CourseGroupResource
    list_display = ("id", "course", "semester", "lecturer")
    list_filter = ("semester", "lecturer", "course")
    search_fields = ("course__name", "lecturer__last_name")
    ordering = ("course__name",)


@admin.register(Class)
class ClassAdmin(PermissionedImportExportAdmin):
    resource_class = ClassResource
    list_display = ("id", "course_group", "lecturer")
    list_filter = ("course_group", "lecturer")
    search_fields = ("course_group__course__name", "lecturer__last_name")
    ordering = ("id",)


@admin.register(Schedule)
class ScheduleAdmin(PermissionedImportExportAdmin):
    resource_class = ScheduleResource
    list_display = ("id", "student", "lecturer")
    list_filter = ("lecturer",)
    search_fields = ("student__last_name", "lecturer__last_name")
    ordering = ("id",)
