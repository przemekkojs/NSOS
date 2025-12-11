from .models import Course, CourseGroup, Class, Schedule
from .serializers import CourseSerializer, CourseGroupSerializer, ClassSerializer, ScheduleSerializer
from university.views import RoleBasedViewSet


class CourseViewSet(RoleBasedViewSet):
    queryset = Course.objects.select_related('faculty').all()
    serializer_class = CourseSerializer

class CourseGroupViewSet(RoleBasedViewSet):
    queryset = CourseGroup.objects.select_related('course', 'lecturer', 'semester').all()
    serializer_class = CourseGroupSerializer

class ClassViewSet(RoleBasedViewSet):
    queryset = Class.objects.select_related('lecturer', 'course_group').all()
    serializer_class = ClassSerializer


class ScheduleViewSet(RoleBasedViewSet):
    queryset = Schedule.objects.select_related('lecturer', 'student', 'course_group').all()
    serializer_class = ScheduleSerializer

    def get_queryset(self):
        qs = super().get_queryset()
        user = self.request.user
        if user.is_staff:
            return qs
        if hasattr(user, 'student'):
            return qs.filter(student__user=user)
        if hasattr(user, 'lecturer'):
            return qs.filter(lecturer__user=user)
        return qs.none()
