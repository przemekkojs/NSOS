from rest_framework import viewsets
from core.permissions import IsAdmin, IsLecturerOrAdmin, IsStudentReadOnly
from .models import User, Lecturer, Student
from .serializers import UserSerializer, LecturerSerializer, StudentSerializer
from university.views import DenyAll, DefaultPagination
from core.mixins import AdminImportExportMixin, IMPORT_EXPORT_ACTIONS


class UserViewSet(AdminImportExportMixin, viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    pagination_class = DefaultPagination

    def get_permissions(self):
        if getattr(self, "action", None) in IMPORT_EXPORT_ACTIONS:
            return [IsAdmin()]
        user = self.request.user
        if not user.is_authenticated:
            return [DenyAll()]
        if user.is_staff:
            return [IsAdmin()]
        return [IsStudentReadOnly() if hasattr(user, 'student_profile') else IsLecturerOrAdmin()]

    def get_queryset(self):
        user = self.request.user
        if user.is_staff:
            return User.objects.all()
        return User.objects.filter(id=user.id)

class LecturerViewSet(AdminImportExportMixin, viewsets.ModelViewSet):
    queryset = Lecturer.objects.all()
    serializer_class = LecturerSerializer
    pagination_class = DefaultPagination

    def get_permissions(self):
        if getattr(self, "action", None) in IMPORT_EXPORT_ACTIONS:
            return [IsAdmin()]
        user = self.request.user
        if not user.is_authenticated:
            return [DenyAll()]
        if user.is_staff:
            return [IsAdmin()]
        if hasattr(user, 'lecturer_profile'):
            return [IsLecturerOrAdmin()]
        return [DenyAll()]

    def get_queryset(self):
        user = self.request.user
        if user.is_staff:
            return Lecturer.objects.all()
        if hasattr(user, 'lecturer_profile'):
            return Lecturer.objects.filter(id=user.lecturer_profile.id)
        return Lecturer.objects.none()

class StudentViewSet(AdminImportExportMixin, viewsets.ModelViewSet):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer
    pagination_class = DefaultPagination

    def get_permissions(self):
        if getattr(self, "action", None) in IMPORT_EXPORT_ACTIONS:
            return [IsAdmin()]
        user = self.request.user
        if not user.is_authenticated:
            return [DenyAll()]
        if user.is_staff:
            return [IsAdmin()]
        if hasattr(user, 'lecturer_profile'):
            return [IsLecturerOrAdmin()]
        if hasattr(user, 'student_profile'):
            return [IsStudentReadOnly()]
        return [DenyAll()]

    def get_queryset(self):
        user = self.request.user
        if user.is_staff:
            return Student.objects.all()
        if hasattr(user, 'lecturer_profile'):
            return Student.objects.filter(
                semester__semester_groups__lecturer=user.lecturer_profile
            ).distinct()
        if hasattr(user, 'student_profile'):
            return Student.objects.filter(user=user)
        return Student.objects.none()
