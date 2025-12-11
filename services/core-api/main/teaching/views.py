from rest_framework import viewsets
from .models import Course, CourseGroup, Class, Schedule
from .serializers import CourseSerializer, CourseGroupSerializer, ClassSerializer, ScheduleSerializer


class CourseViewSet(viewsets.ModelViewSet):
    queryset = Course.objects.select_related('faculty').all()
    serializer_class = CourseSerializer


class CourseGroupViewSet(viewsets.ModelViewSet):
    queryset = CourseGroup.objects.select_related('course', 'lecturer', 'semester').all()
    serializer_class = CourseGroupSerializer


class ClassViewSet(viewsets.ModelViewSet):
    queryset = Class.objects.select_related('lecturer', 'course_group').all()
    serializer_class = ClassSerializer


class ScheduleViewSet(viewsets.ModelViewSet):
    queryset = Schedule.objects.select_related('lecturer', 'student', 'course_group').all()
    serializer_class = ScheduleSerializer
