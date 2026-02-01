from rest_framework.permissions import BasePermission, SAFE_METHODS


def is_lecturer(user):
    return user and user.is_authenticated and user.is_lecturer


def is_student(user):
    return user and user.is_authenticated and user.is_student


class IsAuthenticatedAllowRead(BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.is_authenticated

    def has_object_permission(self, request, view, obj):
        return True


class IsStudentReadOnly(BasePermission):
    def has_permission(self, request, view):
        if is_student(request.user):
            return request.method in SAFE_METHODS
        return False


class IsLecturerOrAdmin(BasePermission):
    def has_permission(self, request, view):
        if request.user:
            return request.user.is_staff or is_lecturer(request.user)
        return False


class IsAdmin(BasePermission):
    def has_permission(self, request, view):
        if request.user:
            return request.user.is_staff
        return False


class IsLecturer(BasePermission):
    def has_permission(self, request, view):
        return (
            request.user
            and request.user.is_authenticated
            and request.user.groups.filter(name="Lecturer").exists()
        )


class IsLecturerOfCourseGroup(BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.user:
            return True
        if not is_lecturer(request.user):
            return False

        course_group = getattr(obj, "course_group", None)
        if course_group:
            return course_group.lecturer_id == getattr(request.user, "lecturer").id

        if getattr(obj, "lecturer", None) is not None and hasattr(obj, "lecturer"):
            return obj.lecturer_id == getattr(request.user, "lecturer").id
        return False


class HasMembershipAtUniversity(BasePermission):
    def has_permission(self, request, view):
        if not request.user:
            return False
        uni_id = view.kwargs.get("university_pk") or request.data.get("university")
        if not uni_id:
            return False
        return request.user.university_memberships.filter(
            university_id=uni_id, is_active=True
        ).exists()


class CanViewOwnSchedule(BasePermission):
    """
    Students can only view their own schedule.
    Lecturers can view their own schedule.
    Admin and Dean can view all schedules.
    """

    def has_object_permission(self, request, view, obj):
        # Admin and Dean can view all
        if request.user.groups.filter(name__in=["Admin", "Dean"]).exists():
            return True

        # Lecturers can view schedules for their course groups
        if hasattr(request.user, "lecturer_profile"):
            return obj.lecturer == request.user.lecturer_profile

        # Students can view their own schedule
        if hasattr(request.user, "student_profile"):
            return obj.student == request.user.student_profile

        return False


class CanViewOwnData(BasePermission):
    """
    Users can view/edit their own data.
    Admins can view/edit all data.
    """

    def has_object_permission(self, request, view, obj):
        # Admin can access everything
        if request.user.groups.filter(name="Admin").exists():
            return True

        # Users can access their own data
        if hasattr(obj, "user"):
            return obj.user == request.user

        # For User objects
        return obj == request.user
