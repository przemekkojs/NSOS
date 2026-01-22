from .models import Course, CourseGroup, Class, Schedule
from .serializers import CourseSerializer, CourseGroupSerializer, ClassSerializer, ScheduleSerializer
from university.views import RoleBasedViewSet
from django.contrib.auth import get_user_model
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import ScheduleItemSerializer

User = get_user_model()


class CourseViewSet(RoleBasedViewSet):
    queryset = Course.objects.select_related("faculty").all()
    serializer_class = CourseSerializer

class CourseGroupViewSet(RoleBasedViewSet):
    queryset = CourseGroup.objects.select_related("course", "lecturer", "semester").all()
    serializer_class = CourseGroupSerializer

class ClassViewSet(RoleBasedViewSet):
    queryset = Class.objects.select_related("lecturer", "course_group").all()
    serializer_class = ClassSerializer


class ScheduleViewSet(RoleBasedViewSet):
    queryset = Schedule.objects.select_related("lecturer", "student", "course_group").all()
    serializer_class = ScheduleSerializer

    def get_queryset(self):
        qs = super().get_queryset()
        user = self.request.user
        if user.is_staff:
            return qs
        if hasattr(user, "student"):
            return qs.filter(student__user=user)
        if hasattr(user, "lecturer"):
            return qs.filter(lecturer__user=user)
        return qs.none()


class UserScheduleView(APIView):
    def get(self, request):
        start_date = request.query_params.get("start_date")
        end_date = request.query_params.get("end_date")
        user_id = request.query_params.get("user_id")

        if not user_id:
            return Response(
                {"detail": "user_id is required"},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            user = User.objects.get(id=user_id)
        except User.DoesNotExist:
            return Response(
                {"detail": "User not found"},
                status=status.HTTP_404_NOT_FOUND
            )

        schedules = Schedule.objects.all()

        if start_date:
            schedules = schedules.filter(date__gte=start_date)

        if end_date:
            schedules = schedules.filter(date__lte=end_date)

        if user.is_student:
            schedules = schedules.filter(student=user.student_profile)
        elif user.is_lecturer:
            schedules = schedules.filter(lecturer=user.lecturer_profile)
        else:
            return Response(
                {"detail": "User is neither student nor lecturer"},
                status=status.HTTP_400_BAD_REQUEST
            )

        schedules = schedules.order_by("date", "start_time")

        serializer = ScheduleItemSerializer(schedules, many=True)
        return Response(serializer.data)
